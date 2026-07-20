"use client";

import { motion } from "framer-motion";
import type { ComponentProps } from "react";

type RevealProps = ComponentProps<typeof motion.div> & { delay?: number };

// Small, reusable scroll/entrance animation — kept subtle on purpose
// (short distance, quick duration) per the "animation only where it helps"
// design brief. Used across public listing grids.
export function Reveal({ delay = 0, children, ...props }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
