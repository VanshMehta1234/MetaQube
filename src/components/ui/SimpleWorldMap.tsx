import React, { useState, memo, useMemo } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Sphere
} from "react-simple-maps";
import { motion } from "motion/react";

// World map topojson data
const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

// Client location data
interface ClientLocation {
  name: string;
  coordinates: [number, number]; // [longitude, latitude]
  clientCount: number;
  region?: string;
}

// Hub coordinates for connection lines
const hubs = {
  northAmerica: [-100, 40] as [number, number],
  southAmerica: [-60, -15] as [number, number],
  europe: [15, 50] as [number, number],
  asia: [90, 30] as [number, number],
  africa: [20, 0] as [number, number],
  oceania: [135, -25] as [number, number],
};

const clientLocations: ClientLocation[] = [
  // North America
  { name: "United States", coordinates: [-95.7129, 37.0902], clientCount: 12, region: "northAmerica" },
  { name: "Canada", coordinates: [-106.3468, 56.1304], clientCount: 5, region: "northAmerica" },
  { name: "Mexico", coordinates: [-102.5528, 23.6345], clientCount: 3, region: "northAmerica" },
  
  // South America
  { name: "Brazil", coordinates: [-51.9253, -14.235], clientCount: 4, region: "southAmerica" },
  { name: "Argentina", coordinates: [-63.6167, -38.4161], clientCount: 2, region: "southAmerica" },
  
  // Europe
  { name: "United Kingdom", coordinates: [-3.436, 55.3781], clientCount: 8, region: "europe" },
  { name: "France", coordinates: [2.2137, 46.2276], clientCount: 6, region: "europe" },
  { name: "Germany", coordinates: [10.4515, 51.1657], clientCount: 7, region: "europe" },
  
  // Asia
  { name: "India", coordinates: [78.9629, 20.5937], clientCount: 15, region: "asia" },
  { name: "Japan", coordinates: [138.2529, 36.2048], clientCount: 6, region: "asia" },
  { name: "Singapore", coordinates: [103.8198, 1.3521], clientCount: 5, region: "asia" },
  
  // Africa
  { name: "Kenya", coordinates: [37.9062, -0.0236], clientCount: 3, region: "africa" },
  { name: "South Africa", coordinates: [22.9375, -30.5595], clientCount: 4, region: "africa" },
  
  // Australia
  { name: "Australia", coordinates: [133.7751, -25.2744], clientCount: 7, region: "oceania" },
];

interface SimpleWorldMapProps {
  primaryColor?: string;
  secondaryColor?: string;
}

// Connection line component
const ConnectionLine = memo(({ 
  from, 
  to, 
  color 
}: { 
  from: [number, number]; 
  to: [number, number]; 
  color: string;
}) => {
  // Calculate control point for curved line
  const controlPoint = useMemo(() => {
    const midX = (from[0] + to[0]) / 2;
    const midY = (from[1] + to[1]) / 2;
    
    // Adjust the curve based on whether the line crosses the map edge
    const dx = to[0] - from[0];
    const adjustY = Math.abs(dx) > 180 ? -20 : 20;
    
    return [midX, midY - adjustY];
  }, [from, to]);
  
  // Handle the case where the line should wrap around the world
  const path = useMemo(() => {
    const dx = to[0] - from[0];
    
    // If the line crosses the map edge, draw it differently
    if (Math.abs(dx) > 180) {
      // Split into two lines at the edge of the map
      if (dx > 0) {
        // Line crosses from right to left
        const westPoint: [number, number] = [-179.9, from[1] + (to[1] - from[1]) * ((-179.9 - from[0]) / (to[0] - from[0] - 360))];
        const eastPoint: [number, number] = [179.9, to[1] + (from[1] - to[1]) * ((179.9 - to[0]) / (from[0] - to[0] + 360))];
        
        return `M ${from[0]} ${from[1]} Q ${from[0] - 20} ${from[1] - 20} ${westPoint[0]} ${westPoint[1]} M ${eastPoint[0]} ${eastPoint[1]} Q ${to[0] + 20} ${to[1] - 20} ${to[0]} ${to[1]}`;
      } else {
        // Line crosses from left to right
        const eastPoint: [number, number] = [179.9, from[1] + (to[1] - from[1]) * ((179.9 - from[0]) / (to[0] - from[0] + 360))];
        const westPoint: [number, number] = [-179.9, to[1] + (from[1] - to[1]) * ((-179.9 - to[0]) / (from[0] - to[0] - 360))];
        
        return `M ${from[0]} ${from[1]} Q ${from[0] + 20} ${from[1] - 20} ${eastPoint[0]} ${eastPoint[1]} M ${westPoint[0]} ${westPoint[1]} Q ${to[0] - 20} ${to[1] - 20} ${to[0]} ${to[1]}`;
      }
    } else {
      // Normal case - no wrapping
      return `M ${from[0]} ${from[1]} Q ${controlPoint[0]} ${controlPoint[1]} ${to[0]} ${to[1]}`;
    }
  }, [from, to, controlPoint]);
  
  return (
    <motion.path
      d={path}
      stroke={color}
      strokeWidth={1}
      fill="none"
      strokeOpacity={0.4}
      strokeLinecap="round"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
    />
  );
});

const SimpleWorldMap: React.FC<SimpleWorldMapProps> = ({ 
  primaryColor = "#3fa7f5", 
  secondaryColor = "#ffffff" 
}) => {
  const [tooltipContent, setTooltipContent] = useState<ClientLocation | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const handleMarkerMouseEnter = (
    event: React.MouseEvent<SVGPathElement>,
    location: ClientLocation
  ) => {
    setTooltipContent(location);
    setTooltipPosition({
      x: event.clientX,
      y: event.clientY
    });
  };

  const handleMarkerMouseLeave = () => {
    setTooltipContent(null);
  };

  return (
    <div className="relative w-full h-full">
      {/* Instruction text */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-gray-400 text-sm flex items-center gap-2 bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm z-10">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Hover over locations to see client count
      </div>
      
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 150,
          center: [0, 20]
        }}
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "#000000"
        }}
      >
        {/* No ZoomableGroup to keep the map fixed */}
        {/* Add sphere for better visibility */}
        <Sphere id="rsm-sphere" fill="transparent" stroke="#333333" strokeWidth={0.5} />
        
        {/* Draw connection lines first so they appear behind markers */}
        {clientLocations.map((location) => {
          if (location.region) {
            const hub = hubs[location.region as keyof typeof hubs];
            return (
              <ConnectionLine
                key={`line-${location.name}`}
                from={hub}
                to={location.coordinates}
                color={primaryColor}
              />
            );
          }
          return null;
        })}
        
        {/* Draw hub points */}
        {Object.entries(hubs).map(([key, coordinates]) => (
          <Marker key={`hub-${key}`} coordinates={coordinates}>
            <circle r={3} fill={primaryColor} opacity={0.7} />
          </Marker>
        ))}
        
        {/* Draw map */}
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="#1a1a1a"
                stroke="#333333"
                strokeWidth={0.5}
                style={{
                  default: { outline: "none" },
                  hover: { outline: "none", fill: "#222222" },
                  pressed: { outline: "none" },
                }}
              />
            ))
          }
        </Geographies>

        {/* Draw location markers */}
        {clientLocations.map((location, index) => (
          <g key={`marker-${location.name}`}>
            {/* Pulse animation */}
            <motion.circle
              cx={0}
              cy={0}
              r={6}
              fill={`${primaryColor}33`} // Semi-transparent
              transform={`translate(${location.coordinates[0]}, ${location.coordinates[1]})`}
              style={{
                transformBox: "fill-box",
                transformOrigin: "center center",
              }}
              animate={{
                r: [6, 20],
                opacity: [0.7, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: index * 0.2 % 2, // Stagger the animations
              }}
            />

            {/* Main marker */}
            <Marker
              key={`marker-${location.name}`}
              coordinates={location.coordinates}
            >
              <circle
                r={5}
                fill={primaryColor}
                stroke={secondaryColor}
                strokeWidth={1}
                onMouseEnter={(e) => handleMarkerMouseEnter(e, location)}
                onMouseLeave={handleMarkerMouseLeave}
                style={{ cursor: "pointer" }}
              />
            </Marker>
          </g>
        ))}
      </ComposableMap>

      {/* Tooltip */}
      {tooltipContent && (
        <div
          className="fixed bg-black/90 border border-[#3fa7f5] text-white text-sm px-4 py-2 rounded-md shadow-lg pointer-events-none backdrop-blur-sm z-50"
          style={{
            left: tooltipPosition.x + 10,
            top: tooltipPosition.y - 50,
          }}
        >
          <div className="font-semibold">{tooltipContent.name}</div>
          <div className="text-[#3fa7f5]">
            {tooltipContent.clientCount} client{tooltipContent.clientCount !== 1 ? "s" : ""}
          </div>
          <div className="absolute w-3 h-3 bg-black/90 border-b border-r border-[#3fa7f5] transform rotate-45 left-5 bottom-0 translate-y-1.5"></div>
        </div>
      )}
    </div>
  );
};

export default memo(SimpleWorldMap); 