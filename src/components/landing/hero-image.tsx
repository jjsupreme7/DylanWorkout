"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Trophy, Flame } from "lucide-react";

export function HeroImage() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="relative">
      <div className="rounded-lg overflow-hidden border-2 border-brand/30 shadow-brand">
        <motion.div
          animate={
            prefersReducedMotion
              ? {}
              : { scale: [1, 1.05] }
          }
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
          }}
        >
          <Image
            src="/images/hero/hero-training.jpg"
            alt="Coach Delan training a client"
            width={640}
            height={480}
            className="w-full h-auto object-cover aspect-[4/3]"
            priority
            sizes="(max-width: 1024px) 100vw, 45vw"
          />
        </motion.div>
      </div>

      {/* Floating PR notification */}
      <motion.div
        initial={prefersReducedMotion ? {} : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="absolute -bottom-4 -left-4 rounded-lg border border-brand/20 bg-black/90 px-4 py-3 shadow-brand flex items-center gap-3"
      >
        <div className="h-9 w-9 rounded-full bg-gold-muted flex items-center justify-center">
          <Trophy className="h-4.5 w-4.5 text-gold" strokeWidth={1.5} />
        </div>
        <div>
          <p className="text-xs font-semibold text-gold">New PR!</p>
          <p className="text-xs text-text-muted">Bench Press — 205 lbs</p>
        </div>
      </motion.div>

      {/* Floating streak badge */}
      <motion.div
        initial={prefersReducedMotion ? {} : { opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="absolute -top-3 -right-3 rounded-lg border border-brand/20 bg-black/90 px-4 py-2.5 shadow-brand flex items-center gap-2"
      >
        <Flame className="h-4 w-4 text-brand" strokeWidth={1.5} />
        <span className="text-sm font-semibold">12 day streak</span>
      </motion.div>
    </div>
  );
}
