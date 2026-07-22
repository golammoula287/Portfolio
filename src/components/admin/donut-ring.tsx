"use client";

import { motion } from "framer-motion";

type DonutRingProps = {
  value: number;
  total: number;
  size?: number;
  strokeWidth?: number;
};

export function DonutRing({ value, total, size = 120, strokeWidth = 12 }: DonutRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const ratio = total > 0 ? value / total : 0;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeWidth={strokeWidth}
        className="fill-none stroke-muted"
      />
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        className="fill-none stroke-primary"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset: circumference * (1 - ratio) }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
    </svg>
  );
}
