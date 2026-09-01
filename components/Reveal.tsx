"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";

// Single reveal primitive: fade + 12px rise on entering the viewport, spring-eased.
// Renders static when the user prefers reduced motion.
export default function Reveal({ delay = 0, ...props }: HTMLMotionProps<"div"> & { delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-48px" }}
      transition={{ type: "spring", stiffness: 100, damping: 20, delay }}
      {...props}
    />
  );
}
