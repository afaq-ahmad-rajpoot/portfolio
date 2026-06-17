import { NextRequest } from "next/server";
import { Resend } from "resend";
import { PORTFOLIO_DATA } from "@/lib/data";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  let name = "";
  let email = "";
  let message = "";
  try {
    const body = await req.json();
    name = (body.name ?? "").toString().trim().slice(0, 120);
    email = (body.email ?? "").toString().trim().slice(0, 200);
    message = (body.message ?? "").toString().trim().slice(0, 4000);
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!name || !email || !message) {
    return Response.json({ error: "All fields are required." }, { status: 400 });
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return Response.json({ error: "Invalid email address." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL || PORTFOLIO_DATA.personal.email;

  if (!apiKey) {
    // Graceful fallback so the form still "works" in local/dev without a key.
    console.warn("[contact] RESEND_API_KEY missing — logging submission instead:", { name, email, message });
    return Response.json({ ok: true, simulated: true });
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FROM || "Portfolio <onboarding@resend.dev>",
      to,
      replyTo: email,
      subject: `[Portfolio] New transmission from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });
    if (error) {
      return Response.json({ error: error.message }, { status: 502 });
    }
    return Response.json({ ok: true });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Failed to send.";
    return Response.json({ error: msg }, { status: 500 });
  }
}
