"use client";
import { lazy, Suspense, memo } from "react";
import { motion } from "motion/react";

// Lazy load the WorldMapUI component to improve initial page load performance
const WorldMapUI = lazy(() => import("../ui/world-map"));

// Define central hub points for better performance and visual appearance
const ASIA_HUB = { lat: 34.0479, lng: 100.6197 }; // Central Asia
const NORTH_AMERICA_HUB = { lat: 54.5260, lng: -105.2551 }; // Central Canada
const EUROPE_HUB = { lat: 54.5260, lng: 15.2551 }; // Central Europe

const WorldMap = () => {
  return (
    <div className="py-40 dark:bg-black bg-white w-full">
      <div className="max-w-7xl mx-auto text-center mb-16 pt-20">
        <h2 className="font-bold text-2xl md:text-5xl text-white mb-4">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Global&nbsp;
          </motion.span>
          <motion.span
            className="text-[#3fa7f5]"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Reach&nbsp;
          </motion.span>
          <motion.span
            className="text-[#3fa7f5]"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            & Impact
          </motion.span>
        </h2>

        <p className="text-md md:text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
          Helping businesses across continents build cutting-edge solutions in Web Development,
          Artificial Intelligence, and Cloud Infrastructure. Our network spans industries and borders — powering tomorrow's tech, today.
        </p>
      </div>

      <Suspense fallback={
        <div className="w-full aspect-[2/1] bg-black rounded-lg relative font-sans pt-24 mt-20 flex items-center justify-center">
          <div className="text-[#3fa7f5] text-lg">Loading global impact map...</div>
        </div>
      }>
        <WorldMapUI
          dots={[
            // North America
            {
              start: NORTH_AMERICA_HUB,
              end: { lat: 37.7749, lng: -122.4194, label: "United States", clientCount: 12 },
            },
            {
              start: NORTH_AMERICA_HUB,
              end: { lat: 43.6532, lng: -79.3832, label: "Canada", clientCount: 5 },
            },
            {
              start: NORTH_AMERICA_HUB,
              end: { lat: 19.4326, lng: -99.1332, label: "Mexico", clientCount: 3 },
            },
            
            // South America
            {
              start: NORTH_AMERICA_HUB,
              end: { lat: -15.7975, lng: -47.8919, label: "Brazil", clientCount: 4 },
            },
            {
              start: NORTH_AMERICA_HUB,
              end: { lat: -34.6037, lng: -58.3816, label: "Argentina", clientCount: 2 },
            },
            
            // Europe
            {
              start: EUROPE_HUB,
              end: { lat: 51.5074, lng: -0.1278, label: "United Kingdom", clientCount: 8 },
            },
            {
              start: EUROPE_HUB,
              end: { lat: 48.8566, lng: 2.3522, label: "France", clientCount: 6 },
            },
            {
              start: EUROPE_HUB,
              end: { lat: 52.5200, lng: 13.4050, label: "Germany", clientCount: 7 },
            },
            
            // Asia - Adjusted coordinates
            {
              start: ASIA_HUB,
              end: { lat: 28.6139, lng: 77.209, label: "India", clientCount: 15 }, // Delhi coordinates
            },
            {
              start: ASIA_HUB,
              end: { lat: 35.6762, lng: 139.6503, label: "Japan", clientCount: 6 },
            },
            {
              start: ASIA_HUB,
              end: { lat: 1.3521, lng: 103.8198, label: "Singapore", clientCount: 5 },
            },
            
            // Africa
            {
              start: EUROPE_HUB,
              end: { lat: -1.2921, lng: 36.8219, label: "Kenya", clientCount: 3 },
            },
            {
              start: EUROPE_HUB,
              end: { lat: -33.9249, lng: 18.4241, label: "South Africa", clientCount: 4 },
            },
            
            // Australia
            {
              start: ASIA_HUB,
              end: { lat: -33.8688, lng: 151.2093, label: "Australia", clientCount: 7 },
            },
          ]}
        />
      </Suspense>
    </div>
  );
}

export default memo(WorldMap);