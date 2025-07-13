"use client";
import WorldMapUI from "../ui/world-map";
import { motion } from "motion/react";

const WorldMap=()=> {
  return (
    <div className=" py-40 dark:bg-black bg-white w-full">
      <div className="max-w-7xl mx-auto text-center">
  <p className="font-bold text-xl md:text-4xl dark:text-white text-black">
    Global{" "}
    <span className="text-neutral-400">
      {"Reach & Impact".split("").map((word, idx) => (
        <motion.span
          key={idx}
          className="inline-block"
          initial={{ x: -10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: idx * 0.04 }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  </p>
  <p className="text-sm md:text-lg text-neutral-500 max-w-2xl mx-auto py-4">
    We help businesses around the globe build powerful web, AI, and cloud solutions.
    Our services power clients across industries in multiple countries — and counting.
  </p>
</div>

      <WorldMapUI
        dots={[
  {
    start: { lat: 64.2008, lng: -149.4937 },
    end: { lat: 34.0522, lng: -118.2437, label: "USA", clientCount: 5 },
  },
  {
    start: { lat: 64.2008, lng: -149.4937 },
    end: { lat: -15.7975, lng: -47.8919, label: "Brazil", clientCount: 2 },
  },
  {
    start: { lat: 28.6139, lng: 77.209 },
    end: { lat: -1.2921, lng: 36.8219, label: "Kenya", clientCount: 1 },
  },
  // ...add more
]}

      />
    </div>
  );
}

export default WorldMap;