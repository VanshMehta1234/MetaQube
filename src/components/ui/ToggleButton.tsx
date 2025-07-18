import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Key = "fast" | "cheap" | "good";
const data = [
  { key: "fast", label: "Fast" },
  { key: "cheap", label: "Cheap" },
  { key: "good", label: "Good" },
] as const;

const sentences: Record<string, string> = {
  cheap_fast: "You’ll get it quickly and cheaply — but it won’t be good.",
  fast_good: "You’ll get it quickly and well — but it won’t be cheap.",
  cheap_good: "You’ll get it cheaply and well — but it won’t be fast.",
  all: "Pick any two…",
};

export default function FastCheapGood() {
  const [on, setOn] = useState<Record<Key, boolean>>({
    fast: false,
    cheap: false,
    good: false,
  });

  const [order, setOrder] = useState<Key[]>([]);

  const toggle = (key: Key) => {
    setOn((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      let newOrder = [...order];
      if (next[key]) {
        newOrder.push(key);
      } else {
        newOrder = newOrder.filter((k) => k !== key);
      }
      if (newOrder.length > 2) {
        const idxToRemove = Math.floor(Math.random() * 2);
        const keyToRemove = newOrder[idxToRemove];
        next[keyToRemove] = false;
        newOrder.splice(idxToRemove, 1);
      }
      setOrder(newOrder);
      return next;
    });
  };

  const active = (Object.keys(on) as Key[]).filter(
    (k) => on[k as Key]
  ) as Key[];

  const sentenceKey =
    active.length === 2
      ? active.sort((a, b) => a.localeCompare(b)).join("_")
      : "all";
  const sentence = sentences[sentenceKey] ?? sentences.all;

  return (
    <div className="flex flex-col items-center p-6 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 space-y-6">
      {/* Bigger heading */}
      <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-transparent bg-gradient-to-r from-white via-emerald-400 to-emerald-600 bg-clip-text">
        Pick Two
      </h2>

      {/* Toggles */}
      {data.map(({ key, label }) => (
        <div key={key} className="flex items-center space-x-4">
          <span className="text-lg font-semibold text-white w-20">{label}</span>
          <motion.button
            onClick={() => toggle(key)}
            className="relative w-20 h-10 rounded-full border-2 transition-colors duration-300"
            style={{
              borderColor: on[key] ? "#1ad1b5" : "#374151",
              backgroundColor: on[key] ? "#1ad1b5" : "#111111",
            }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              className="absolute top-1 left-1 w-8 h-8 bg-white rounded-full shadow-lg"
              animate={{ x: on[key] ? 28 : 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            />
          </motion.button>
        </div>
      ))}

      {/* Smaller sentence */}
      <AnimatePresence>
        <motion.div
          key={sentence}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="text-center text-sm sm:text-base font-medium text-white max-w-xs"
        >
          {sentence}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}