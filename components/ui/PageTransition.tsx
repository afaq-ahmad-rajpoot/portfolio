"use client";

import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Enter-only transition keyed by pathname: when the route changes, React
  // remounts this node with the NEW content immediately (no mode="wait" delay,
  // no frozen-router flash of the old page), and the enter animation replays.
  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Glitch scanline sweep on enter */}
      <motion.div
        initial={{ y: "-100%", opacity: 1 }}
        animate={{ y: "120%", opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="pointer-events-none fixed left-0 top-0 z-[70] h-24 w-full"
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(0,255,65,0.15), transparent)",
        }}
        aria-hidden="true"
      />
      {children}
    </motion.div>
  );
}
