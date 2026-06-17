import { NextRequest } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { PORTFOLIO_DATA } from "@/lib/data";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function POST(req: NextRequest) {
  let message = "";
  try {
    const body = await req.json();
    message = (body.message ?? "").toString().slice(0, 1000);
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!message.trim()) {
    return Response.json({ error: "Empty question." }, { status: 400 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: "AI offline. Set ANTHROPIC_API_KEY in your environment to enable chat." },
      { status: 503 }
    );
  }

  const anthropic = new Anthropic({ apiKey });

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      try {
        const aiStream = anthropic.messages.stream({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 512,
          system: PORTFOLIO_DATA.terminal.systemPrompt,
          messages: [{ role: "user", content: message }],
        });

        aiStream.on("text", (text) => {
          controller.enqueue(encoder.encode(text));
        });

        await aiStream.finalMessage();
        controller.close();
      } catch (err) {
        const msg = err instanceof Error ? err.message : "AI request failed.";
        controller.enqueue(encoder.encode(`\n[error] ${msg}`));
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache",
    },
  });
}
