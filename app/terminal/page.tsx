"use client";

import dynamic from "next/dynamic";

const TerminalView = dynamic(() => import("@/components/terminal/Terminal"), { ssr: false });

export default function TerminalPage() {
  return <TerminalView />;
}
