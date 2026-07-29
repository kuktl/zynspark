import React, { ReactNode } from "react";
import { motion } from "motion/react";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  id?: string;
  key?: React.Key;
}

export default function AnimatedSection({
  children,
  className = "",
  delay = 0,
  direction = "up",
  id,
}: AnimatedSectionProps) {
  const getInitialPosition = () => {
    switch (direction) {
      case "up":
        return { y: 28, x: 0 };
      case "down":
        return { y: -28, x: 0 };
      case "left":
        return { x: 28, y: 0 };
      case "right":
        return { x: -28, y: 0 };
      case "none":
        return { x: 0, y: 0 };
      default:
        return { y: 28, x: 0 };
    }
  };

  const initial = {
    opacity: 0,
    ...getInitialPosition(),
  };

  return (
    <motion.div
      id={id}
      initial={initial}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration: 0.65,
        delay: delay,
        ease: [0.16, 1, 0.3, 1], // Custom smooth cubic-bezier
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
