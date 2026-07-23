"use client";

import { motion } from "framer-motion";

// A template re-mounts on every navigation (unlike layout), so this wraps each
// public page in a subtle fade/slide-up transition on route change.
export default function PublicTemplate({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
