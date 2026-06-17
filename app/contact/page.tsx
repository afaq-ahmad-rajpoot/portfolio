"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { PORTFOLIO_DATA } from "@/lib/data";
import { ScrambleText } from "@/components/ui/Scramble";

const Globe = dynamic(() => import("@/components/three/Globe"), { ssr: false });

type Status = "idle" | "sending" | "sent" | "error";

const SEQUENCE = [
  "Encrypting payload...",
  "Routing transmission to Faisalabad...",
  "Establishing secure channel...",
  "Signal received.",
];

export default function ContactPage() {
  const { personal } = PORTFOLIO_DATA;
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [log, setLog] = useState<string[]>([]);
  const [error, setError] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setError("");
    setLog([]);

    SEQUENCE.forEach((line, i) =>
      setTimeout(() => setLog((prev) => [...prev, line]), i * 500)
    );

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      // wait for the dramatic sequence to finish
      await new Promise((r) => setTimeout(r, SEQUENCE.length * 500));
      if (!res.ok) throw new Error(data.error || "Transmission failed");
      setStatus("sent");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Transmission failed");
      setStatus("error");
    }
  };

  const firing = status === "sending" || status === "sent";

  return (
    <div className="relative min-h-screen pt-14">
      <div className="pointer-events-none fixed inset-0 z-0 opacity-70">
        <Globe firing={firing} />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-6 py-16">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-phosphor/60">
          // OUTBOUND TRANSMISSION
        </p>
        <h1 className="mt-3 font-display text-5xl font-extrabold text-white glow sm:text-7xl">
          <ScrambleText text="CONTACT" autoOnMount />
        </h1>

        {status === "sent" ? (
          <div className="mt-12 border border-phosphor/40 bg-black/70 p-8 font-mono text-sm backdrop-blur-sm">
            {log.map((l, i) => (
              <p key={i} className="text-phosphor/80">&gt; {l}</p>
            ))}
            <p className="mt-4 text-phosphor glow">✓ TRANSMISSION COMPLETE — Afaq will respond shortly.</p>
            <button
              onClick={() => { setStatus("idle"); setForm({ name: "", email: "", message: "" }); setLog([]); }}
              className="mt-6 btn-flicker px-4 py-2 text-xs uppercase tracking-widest interactive"
            >
              [ NEW TRANSMISSION ]
            </button>
          </div>
        ) : (
          <form
            onSubmit={onSubmit}
            className="mt-12 space-y-5 border border-phosphor/20 bg-black/70 p-6 font-mono text-sm backdrop-blur-sm sm:p-8"
          >
            {(["name", "email"] as const).map((field) => (
              <label key={field} className="block">
                <span className="text-phosphor/70">
                  root@visitor:~$ {field.toUpperCase().padEnd(8, " ")} &gt;
                </span>
                <input
                  type={field === "email" ? "email" : "text"}
                  required
                  value={form[field]}
                  onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                  className="mt-1 w-full border border-phosphor/30 bg-black/60 px-3 py-2 text-phosphor outline-none focus:border-phosphor"
                />
              </label>
            ))}
            <label className="block">
              <span className="text-phosphor/70">root@visitor:~$ MESSAGE  &gt;</span>
              <textarea
                required
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="mt-1 w-full resize-none border border-phosphor/30 bg-black/60 px-3 py-2 text-phosphor outline-none focus:border-phosphor"
              />
            </label>

            {status === "sending" && (
              <div className="space-y-1 text-electric">
                {log.map((l, i) => (
                  <p key={i}>&gt; {l}</p>
                ))}
              </div>
            )}
            {status === "error" && <p className="text-danger">✗ ERROR :: {error}</p>}

            <button
              type="submit"
              disabled={status === "sending"}
              className="btn-flicker px-6 py-3 text-xs uppercase tracking-widest interactive disabled:opacity-50"
            >
              {status === "sending" ? "TRANSMITTING..." : "TRANSMIT ↗"}
            </button>
          </form>
        )}

        {/* Social / direct links */}
        <div className="mt-10 flex flex-wrap gap-x-8 gap-y-2 font-mono text-xs text-phosphor/70">
          <a href={`mailto:${personal.email}`} className="link-underline">✉ {personal.email}</a>
          <a href={`tel:${personal.phone}`} className="link-underline">☎ {personal.phone}</a>
          <a href={personal.github} target="_blank" rel="noreferrer" className="link-underline">⌥ GitHub</a>
          <a href={personal.linkedin} target="_blank" rel="noreferrer" className="link-underline">in LinkedIn</a>
        </div>
      </div>
    </div>
  );
}
