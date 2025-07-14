"use client";

import { useRef, useState, useMemo, useCallback, memo } from "react";
import { motion } from "motion/react";
import DottedMap from "dotted-map";

// Cache the SVG map to prevent regeneration on every component mount
let cachedSvgMap: string | null = null;

interface Dot {
  start: { lat: number; lng: number };
  end: { lat: number; lng: number; label: string; clientCount: number };
}

interface MapProps {
  dots?: Dot[];
  lineColor?: string;
}

// Memoize individual path to prevent unnecessary re-renders
const AnimatedPath = memo(({ d, delay, lineColor, index }: { d: string; delay: number; lineColor: string; index: number }) => {
  // Only animate first 5 paths for better performance
  const shouldAnimate = index < 5;
  
  return (
    <motion.path
      d={d}
      fill="none"
      stroke="url(#path-gradient)"
      strokeWidth="1"
      initial={shouldAnimate ? { pathLength: 0 } : { pathLength: 1 }}
      animate={{ pathLength: 1 }}
      transition={shouldAnimate ? {
        duration: 1,
        delay: delay,
        ease: "easeOut",
      } : {}}
    />
  );
});

// Memoize individual point to prevent unnecessary re-renders
const MapPoint = memo(({ 
  point, 
  isHovered, 
  lineColor, 
  onMouseEnter, 
  onMouseLeave,
  animate = true
}: { 
  point: { x: number; y: number }; 
  isHovered: boolean; 
  lineColor: string;
  onMouseEnter: (e: React.MouseEvent) => void;
  onMouseLeave: () => void;
  animate?: boolean;
}) => (
  <>
    <circle
      cx={point.x}
      cy={point.y}
      r={isHovered ? "6" : "4"}
      fill={isHovered ? "#ffffff" : lineColor}
      stroke={lineColor}
      strokeWidth="1"
      cursor="pointer"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    />
    {animate && (
      <circle
        cx={point.x}
        cy={point.y}
        r="2"
        fill={lineColor}
        opacity="0.5"
      >
        <animate attributeName="r" from="2" to="8" dur="1.5s" repeatCount="indefinite" />
        <animate attributeName="opacity" from="0.5" to="0" dur="1.5s" repeatCount="indefinite" />
      </circle>
    )}
  </>
));

// Generate the SVG map once and cache it
const generateSvgMap = () => {
  if (cachedSvgMap) return cachedSvgMap;
  
  const map = new DottedMap({ height: 100, grid: "diagonal" });
  const svg = map.getSVG({
    radius: 0.22,
    color: "#FFFFFF40",
    shape: "circle",
    backgroundColor: "#000000",
  });
  
  cachedSvgMap = svg;
  return svg;
};

function WorldMapUI({
  dots = [],
  lineColor = "#3fa7f5",
}: MapProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [tooltip, setTooltip] = useState<{
    label: string;
    clientCount: number;
    x: number;
    y: number;
  } | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Use cached SVG map
  const svgMap = useMemo(() => generateSvgMap(), []);

  // Memoize projection function
  const projectPoint = useCallback((lat: number, lng: number) => {
    const x = (lng + 180) * (800 / 360);
    const y = (90 - lat) * (400 / 180);
    return { x, y };
  }, []);

  // Memoize path creation function
  const createCurvedPath = useCallback((start: { x: number; y: number }, end: { x: number; y: number }) => {
    const midX = (start.x + end.x) / 2;
    const midY = Math.min(start.y, end.y) - 50;
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
  }, []);

  // Pre-calculate all points and paths
  const pointsAndPaths = useMemo(() => {
    return dots.map(dot => {
      const startPoint = projectPoint(dot.start.lat, dot.start.lng);
      const endPoint = projectPoint(dot.end.lat, dot.end.lng);
      const pathD = createCurvedPath(startPoint, endPoint);
      return { startPoint, endPoint, pathD, dot };
    });
  }, [dots, projectPoint, createCurvedPath]);

  // Handle mouse enter with useCallback
  const handleMouseEnter = useCallback((e: React.MouseEvent, dot: Dot, index: number) => {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    setTooltip({
      label: dot.end.label,
      clientCount: dot.end.clientCount,
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setHoveredIndex(index);
  }, []);

  // Handle mouse leave with useCallback
  const handleMouseLeave = useCallback(() => {
    setTooltip(null);
    setHoveredIndex(null);
  }, []);

  return (
    <div className="w-full aspect-[2/1] bg-black rounded-lg relative font-sans pt-24 mt-20">
      {/* Instruction text */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-gray-400 text-sm flex items-center gap-2 bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm z-10">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Hover over locations to see client count
      </div>
      
      <img
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
        className="h-full w-full [mask-image:linear-gradient(to_bottom,transparent,white_10%,white_90%,transparent)] pointer-events-none select-none"
        alt="world map"
        height="495"
        width="1056"
        draggable={false}
        loading="lazy"
      />

      <svg
        ref={svgRef}
        viewBox="0 0 800 400"
        className="w-full h-full absolute inset-0 select-none"
      >
        <defs>
          <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="5%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="95%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Paths */}
        {pointsAndPaths.map((item, i) => (
          <g key={`path-group-${i}`}>
            <AnimatedPath d={item.pathD} delay={0.1 * i} lineColor={lineColor} index={i} />
          </g>
        ))}

        {/* Points */}
        {pointsAndPaths.map((item, i) => {
          const isHovered = hoveredIndex === i;
          // Only animate the first 5 points for better performance
          const shouldAnimate = i < 5;
          
          return (
            <g key={`points-${i}`}>
              {/* Start point - no animation for better performance */}
              <circle cx={item.startPoint.x} cy={item.startPoint.y} r="2" fill={lineColor} />

              {/* End point */}
              <MapPoint 
                point={item.endPoint} 
                isHovered={isHovered} 
                lineColor={lineColor}
                onMouseEnter={(e) => handleMouseEnter(e, item.dot, i)}
                onMouseLeave={handleMouseLeave}
                animate={shouldAnimate}
              />
            </g>
          );
        })}
      </svg>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="absolute bg-black/90 border border-[#3fa7f5] text-white text-sm px-4 py-2 rounded-md shadow-lg pointer-events-none backdrop-blur-sm z-50 transform -translate-y-full"
          style={{ top: tooltip.y - 10, left: tooltip.x }}
        >
          <div className="font-semibold">{tooltip.label}</div>
          <div className="text-[#3fa7f5]">
            {tooltip.clientCount} client{tooltip.clientCount !== 1 ? "s" : ""}
          </div>
          <div className="absolute w-3 h-3 bg-black/90 border-b border-r border-[#3fa7f5] transform rotate-45 left-1/2 bottom-0 translate-y-1.5 -translate-x-1/2"></div>
        </div>
      )}
    </div>
  );
}

// Memoize the entire component to prevent unnecessary re-renders
export default memo(WorldMapUI);
