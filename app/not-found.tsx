import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-danger">// SEGFAULT</p>
      <h1 className="mt-4 font-display text-7xl font-extrabold text-white glow rgb-split">404</h1>
      <p className="mt-4 font-mono text-sm text-phosphor/70">
        ERROR :: route not found in this system.
      </p>
      <Link
        href="/"
        className="mt-8 btn-flicker px-6 py-3 font-mono text-xs uppercase tracking-widest interactive"
      >
        ← RETURN TO ROOT
      </Link>
    </div>
  );
}
