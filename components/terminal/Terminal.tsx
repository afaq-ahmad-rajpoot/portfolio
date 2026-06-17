"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import "@xterm/xterm/css/xterm.css";
import { PORTFOLIO_DATA } from "@/lib/data";
import { runCommand, COMMAND_NAMES, type CommandContext } from "./commands";

const THEMES: Record<string, { background: string; foreground: string; cursor: string }> = {
  matrix: { background: "#050505", foreground: "#00FF41", cursor: "#00FF41" },
  amber: { background: "#0a0600", foreground: "#FFB000", cursor: "#FFB000" },
  blue: { background: "#000810", foreground: "#00C2FF", cursor: "#00C2FF" },
  white: { background: "#0a0a0a", foreground: "#e0e0e0", cursor: "#ffffff" },
};

const PROMPT = "\x1b[1m\x1b[32mafaq@portfolio\x1b[0m:\x1b[36m~\x1b[0m$ ";

export default function TerminalView() {
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    let disposed = false;
    let cleanup = () => {};

    (async () => {
      const { Terminal } = await import("@xterm/xterm");
      const { FitAddon } = await import("@xterm/addon-fit");
      if (disposed || !ref.current) return;

      const term = new Terminal({
        fontFamily: '"JetBrains Mono", monospace',
        fontSize: 14,
        cursorBlink: true,
        theme: THEMES.matrix,
        convertEol: true,
      });
      const fit = new FitAddon();
      term.loadAddon(fit);
      term.open(ref.current);
      fit.fit();

      const onResize = () => fit.fit();
      window.addEventListener("resize", onResize);

      let line = "";
      let cursor = 0;
      const history: string[] = [];
      let histIdx = -1;
      let mode: "shell" | "matrix" | "busy" = "shell";
      let matrixTimer: ReturnType<typeof setInterval> | null = null;

      const writePrompt = () => term.write("\r\n" + PROMPT);

      term.writeln(PORTFOLIO_DATA.terminal.welcomeMessage);
      term.write(PROMPT);

      const stopMatrix = () => {
        if (matrixTimer) clearInterval(matrixTimer);
        matrixTimer = null;
        mode = "shell";
        term.write("\x1b[2J\x1b[H");
        writePrompt();
      };

      const ctx: CommandContext = {
        navigate: (p) => setTimeout(() => router.push(p), 500),
        setTheme: (name) => term.options.theme = THEMES[name] ?? THEMES.matrix,
        clear: () => term.write("\x1b[2J\x1b[H"),
        print: (t) => term.write(t),
        startMatrix: () => {
          mode = "matrix";
          const chars = "アイウエオ0123456789ABCDEF";
          const cols = term.cols;
          let count = 0;
          matrixTimer = setInterval(() => {
            let row = "";
            for (let i = 0; i < cols; i++)
              row += Math.random() > 0.5 ? chars[Math.floor(Math.random() * chars.length)] : " ";
            term.write("\x1b[32m" + row + "\x1b[0m\r\n");
            if (++count > 60) stopMatrix();
          }, 80);
        },
        startSnake: () => {
          term.writeln("\r\n\x1b[33m[Snake] Full game runs best on desktop. Eat \x1b[32m@\x1b[33m, avoid walls. (demo)\x1b[0m");
          term.writeln("\x1b[32m########################\x1b[0m");
          term.writeln("\x1b[32m#  oOO            @    #\x1b[0m");
          term.writeln("\x1b[32m########################\x1b[0m");
        },
      };

      const askAI = async (question: string) => {
        mode = "busy";
        term.write("\r\n\x1b[36m[AI] thinking...\x1b[0m\r\n");
        try {
          const res = await fetch("/api/terminal", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: question }),
          });
          if (!res.ok || !res.body) {
            const data = await res.json().catch(() => ({}));
            term.write("\x1b[33m" + (data.error || "AI offline. Set ANTHROPIC_API_KEY to enable chat.") + "\x1b[0m");
          } else {
            const reader = res.body.getReader();
            const decoder = new TextDecoder();
            term.write("\x1b[32m");
            while (true) {
              const { done, value } = await reader.read();
              if (done) break;
              term.write(decoder.decode(value).replace(/\n/g, "\r\n"));
            }
            term.write("\x1b[0m");
          }
        } catch {
          term.write("\x1b[33mAI request failed.\x1b[0m");
        }
        mode = "shell";
        writePrompt();
      };

      const execute = (raw: string) => {
        const input = raw.trim();
        if (input) {
          history.push(input);
          histIdx = history.length;
        }
        if (input.toLowerCase().startsWith("ask ")) {
          askAI(input.slice(4));
          return;
        }
        if (input.toLowerCase() === "chat") {
          term.write("\r\n\x1b[36mChat mode: type 'ask <question>' to talk to the AI about Afaq.\x1b[0m");
          writePrompt();
          return;
        }
        const out = runCommand(input, ctx);
        if (out !== null) {
          if (out) term.write("\r\n" + out.replace(/\n/g, "\r\n"));
          writePrompt();
        }
        // null => async/clear handled elsewhere; redraw prompt unless navigating/matrix
        if (out === null && mode === "shell") {
          // clear() case
          term.write(PROMPT);
        }
      };

      const redrawLine = () => {
        term.write("\r\x1b[K" + PROMPT + line);
        const back = line.length - cursor;
        if (back > 0) term.write("\x1b[" + back + "D");
      };

      const disposable = term.onData((data) => {
        if (mode === "matrix") {
          if (data.toLowerCase() === "q") stopMatrix();
          return;
        }
        if (mode === "busy") return;

        const code = data.charCodeAt(0);

        // Enter
        if (data === "\r") {
          const current = line;
          line = "";
          cursor = 0;
          execute(current);
          return;
        }
        // Ctrl+C
        if (data === "\x03") {
          term.write("^C");
          line = "";
          cursor = 0;
          writePrompt();
          return;
        }
        // Backspace
        if (code === 127) {
          if (cursor > 0) {
            line = line.slice(0, cursor - 1) + line.slice(cursor);
            cursor--;
            redrawLine();
          }
          return;
        }
        // Escape sequences (arrows)
        if (data === "\x1b[A") {
          if (histIdx > 0) {
            histIdx--;
            line = history[histIdx] ?? "";
            cursor = line.length;
            redrawLine();
          }
          return;
        }
        if (data === "\x1b[B") {
          if (histIdx < history.length - 1) {
            histIdx++;
            line = history[histIdx] ?? "";
          } else {
            histIdx = history.length;
            line = "";
          }
          cursor = line.length;
          redrawLine();
          return;
        }
        if (data === "\x1b[C") { if (cursor < line.length) { cursor++; term.write("\x1b[C"); } return; }
        if (data === "\x1b[D") { if (cursor > 0) { cursor--; term.write("\x1b[D"); } return; }
        // Tab completion
        if (data === "\t") {
          const match = COMMAND_NAMES.filter((c) => c.startsWith(line));
          if (match.length === 1) {
            line = match[0] + " ";
            cursor = line.length;
            redrawLine();
          } else if (match.length > 1) {
            term.write("\r\n" + match.join("  "));
            writePrompt();
            term.write(line);
          }
          return;
        }
        // Printable
        if (code >= 32) {
          line = line.slice(0, cursor) + data + line.slice(cursor);
          cursor += data.length;
          redrawLine();
        }
      });

      cleanup = () => {
        window.removeEventListener("resize", onResize);
        if (matrixTimer) clearInterval(matrixTimer);
        disposable.dispose();
        term.dispose();
      };
    })();

    return () => {
      disposed = true;
      cleanup();
    };
  }, [router]);

  return (
    <div className="flex h-screen flex-col bg-black pt-14">
      <div className="border-b border-phosphor/20 bg-black px-4 py-2 font-mono text-[10px] uppercase tracking-wider text-phosphor/60">
        [TERMINAL v2.1.0] :: USER: visitor :: SESSION: active :: AI: online :: DEV: afaq@eprecisio
      </div>
      <div ref={ref} className="flex-1 overflow-hidden p-2" />
    </div>
  );
}
