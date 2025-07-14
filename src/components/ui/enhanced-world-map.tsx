"use client";

import { useRef, useState, useMemo, useCallback, memo } from "react";
import { motion } from "motion/react";

// Interface for location data
interface Location {
  id: string;
  name: string;
  position: [number, number]; // [x, y] coordinates (0-100% of container)
  clientCount: number;
}

interface EnhancedWorldMapProps {
  locations?: Location[];
  lineColor?: string;
}

// Pre-defined locations with accurate positioning on the map
const DEFAULT_LOCATIONS: Location[] = [
  // North America
  { id: "usa", name: "United States", position: [19, 38], clientCount: 12 },
  { id: "canada", name: "Canada", position: [18, 30], clientCount: 5 },
  { id: "mexico", name: "Mexico", position: [17, 45], clientCount: 3 },
  
  // South America
  { id: "brazil", name: "Brazil", position: [30, 60], clientCount: 4 },
  { id: "argentina", name: "Argentina", position: [28, 70], clientCount: 2 },
  
  // Europe
  { id: "uk", name: "United Kingdom", position: [45, 32], clientCount: 8 },
  { id: "france", name: "France", position: [47, 35], clientCount: 6 },
  { id: "germany", name: "Germany", position: [49, 33], clientCount: 7 },
  
  // Asia
  { id: "india", name: "India", position: [65, 45], clientCount: 15 },
  { id: "japan", name: "Japan", position: [80, 38], clientCount: 6 },
  { id: "singapore", name: "Singapore", position: [72, 55], clientCount: 5 },
  
  // Africa
  { id: "kenya", name: "Kenya", position: [55, 55], clientCount: 3 },
  { id: "south-africa", name: "South Africa", position: [53, 68], clientCount: 4 },
  
  // Australia
  { id: "australia", name: "Australia", position: [85, 68], clientCount: 7 },
];

// Hub positions for connection lines
const HUBS: Record<string, [number, number]> = {
  northAmerica: [20, 35],
  europe: [48, 30],
  asia: [70, 40],
};

// Memoized location point component
const LocationPoint = memo(({ 
  x, 
  y, 
  isHovered, 
  lineColor,
  onMouseEnter,
  onMouseLeave
}: { 
  x: number;
  y: number;
  isHovered: boolean;
  lineColor: string;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) => (
  <g className="cursor-pointer" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
    <circle 
      cx={`${x}%`} 
      cy={`${y}%`} 
      r={isHovered ? 6 : 4} 
      fill={isHovered ? "#fff" : lineColor}
      stroke={lineColor}
      strokeWidth="1"
    />
    {isHovered && (
      <circle 
        cx={`${x}%`} 
        cy={`${y}%`} 
        r="10" 
        fill="none"
        stroke={lineColor}
        strokeWidth="1"
        opacity="0.5"
      >
        <animate attributeName="r" from="6" to="15" dur="1.5s" repeatCount="indefinite" />
        <animate attributeName="opacity" from="0.5" to="0" dur="1.5s" repeatCount="indefinite" />
      </circle>
    )}
  </g>
));

// Memoized connection line component
const ConnectionLine = memo(({ 
  startX, 
  startY, 
  endX, 
  endY, 
  lineColor,
  animate,
  delay
}: {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  lineColor: string;
  animate: boolean;
  delay: number;
}) => {
  // Create a curved path between points
  const path = `M ${startX}% ${startY}% Q ${(startX + endX) / 2}% ${Math.min(startY, endY) - 10}% ${endX}% ${endY}%`;
  
  return (
    <motion.path
      d={path}
      stroke={lineColor}
      strokeWidth="1"
      fill="none"
      initial={animate ? { pathLength: 0 } : { pathLength: 1 }}
      animate={{ pathLength: 1 }}
      transition={animate ? {
        duration: 0.8,
        delay: delay * 0.1,
        ease: "easeOut"
      } : {}}
    />
  );
});

function EnhancedWorldMap({
  locations = DEFAULT_LOCATIONS,
  lineColor = "#3fa7f5"
}: EnhancedWorldMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredLocation, setHoveredLocation] = useState<Location | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  // Handle mouse enter for location points
  const handleMouseEnter = useCallback((location: Location) => {
    setHoveredLocation(location);
    
    // Calculate tooltip position based on the location's position
    const x = location.position[0];
    const y = location.position[1];
    
    setTooltipPosition({ x, y });
  }, []);

  // Handle mouse leave
  const handleMouseLeave = useCallback(() => {
    setHoveredLocation(null);
  }, []);

  // Determine which hub to use for each location
  const getHubForLocation = useCallback((position: [number, number]): [number, number] => {
    const [x] = position;
    
    if (x < 35) return HUBS.northAmerica;
    if (x < 60) return HUBS.europe;
    return HUBS.asia;
  }, []);

  // Memoize connections to prevent recalculation
  const connections = useMemo(() => {
    return locations.map(location => {
      const hub = getHubForLocation(location.position);
      return {
        location,
        hub,
      };
    });
  }, [locations, getHubForLocation]);

  return (
    <div 
      ref={containerRef}
      className="w-full aspect-[2/1] bg-black rounded-lg relative overflow-hidden"
    >
      {/* Instruction text */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-gray-400 text-sm flex items-center gap-2 bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm z-10">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Hover over locations to see client count
      </div>
      
      {/* World map background */}
      <div className="absolute inset-0 opacity-40">
        <svg width="100%" height="100%" viewBox="0 0 100 50" preserveAspectRatio="xMidYMid meet">
          {/* World map outline - simplified for performance */}
          <path 
            d="M10,20 L15,20 L18,23 L25,23 L28,21 L33,21 L35,19 L40,19 L38,25 L35,28 L35,32 L30,35 L28,38 L25,38 L20,35 L18,30 L15,28 L10,28 L8,25 L10,20 M45,15 L50,15 L55,18 L58,18 L60,20 L65,20 L68,18 L70,18 L75,20 L80,20 L85,18 L90,18 L90,25 L88,28 L85,30 L80,30 L78,32 L75,32 L70,30 L68,28 L65,28 L60,30 L58,33 L55,33 L50,30 L48,28 L45,28 L42,25 L45,15 M60,35 L65,35 L68,38 L70,38 L75,35 L80,35 L80,40 L75,42 L70,42 L65,40 L60,40 L60,35"
            stroke="#555"
            strokeWidth="0.5"
            fill="none"
          />
          
          {/* Dotted pattern for continents */}
          <pattern id="dots" width="2" height="2" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.5" fill="#555" />
          </pattern>
          
          {/* Apply dotted pattern to continent shapes */}
          <path 
            d="M10,20 L15,20 L18,23 L25,23 L28,21 L33,21 L35,19 L40,19 L38,25 L35,28 L35,32 L30,35 L28,38 L25,38 L20,35 L18,30 L15,28 L10,28 L8,25 L10,20z M45,15 L50,15 L55,18 L58,18 L60,20 L65,20 L68,18 L70,18 L75,20 L80,20 L85,18 L90,18 L90,25 L88,28 L85,30 L80,30 L78,32 L75,32 L70,30 L68,28 L65,28 L60,30 L58,33 L55,33 L50,30 L48,28 L45,28 L42,25 L45,15z M60,35 L65,35 L68,38 L70,38 L75,35 L80,35 L80,40 L75,42 L70,42 L65,40 L60,40 L60,35z"
            fill="url(#dots)"
          />
        </svg>
      </div>
      
      {/* World map with dots */}
      <div className="absolute inset-0">
        <svg width="100%" height="100%" viewBox="0 0 100 50" preserveAspectRatio="xMidYMid meet">
          {/* Connection lines */}
          <defs>
            <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={lineColor} stopOpacity="0.3" />
              <stop offset="50%" stopColor={lineColor} stopOpacity="1" />
              <stop offset="100%" stopColor={lineColor} stopOpacity="0.3" />
            </linearGradient>
          </defs>
          
          {/* Draw connection lines */}
          {connections.map((connection, index) => (
            <ConnectionLine
              key={`line-${connection.location.id}`}
              startX={connection.hub[0]}
              startY={connection.hub[1]}
              endX={connection.location.position[0]}
              endY={connection.location.position[1]}
              lineColor="url(#line-gradient)"
              animate={index < 5} // Only animate first 5 for performance
              delay={index}
            />
          ))}
          
          {/* Hub points */}
          {Object.values(HUBS).map((hub, index) => (
            <circle
              key={`hub-${index}`}
              cx={`${hub[0]}%`}
              cy={`${hub[1]}%`}
              r="3"
              fill={lineColor}
              opacity="0.7"
            />
          ))}
          
          {/* Location points */}
          {locations.map(location => (
            <LocationPoint
              key={location.id}
              x={location.position[0]}
              y={location.position[1]}
              isHovered={hoveredLocation?.id === location.id}
              lineColor={lineColor}
              onMouseEnter={() => handleMouseEnter(location)}
              onMouseLeave={handleMouseLeave}
            />
          ))}
        </svg>
      </div>
      
      {/* Tooltip */}
      {hoveredLocation && (
        <div 
          className="absolute bg-black/90 border border-[#3fa7f5] text-white text-sm px-4 py-2 rounded-md shadow-lg pointer-events-none backdrop-blur-sm z-50 transform -translate-x-1/2 -translate-y-full"
          style={{ 
            left: `${tooltipPosition.x}%`, 
            top: `${tooltipPosition.y}%`,
            marginTop: "-10px"
          }}
        >
          <div className="font-semibold">{hoveredLocation.name}</div>
          <div className="text-[#3fa7f5]">
            {hoveredLocation.clientCount} client{hoveredLocation.clientCount !== 1 ? "s" : ""}
          </div>
          <div className="absolute w-3 h-3 bg-black/90 border-b border-r border-[#3fa7f5] transform rotate-45 left-1/2 bottom-0 translate-y-1.5 -translate-x-1/2"></div>
        </div>
      )}
    </div>
  );
}

export default memo(EnhancedWorldMap); 