import React, { memo } from "react";
import { VectorMap } from "@react-jvectormap/core";
import { worldMill } from "@react-jvectormap/world";
import "./jvectormap.css";

// Client location data
interface ClientLocation {
  name: string;
  coordinates: [number, number]; // [longitude, latitude]
  clientCount: number;
  region?: string;
  countryCode?: string;
}

const clientLocations: ClientLocation[] = [
  // North America
  { name: "United States", coordinates: [-95.7129, 37.0902], clientCount: 12, region: "northAmerica", countryCode: "US" },
  { name: "Canada", coordinates: [-106.3468, 56.1304], clientCount: 5, region: "northAmerica", countryCode: "CA" },
  { name: "Mexico", coordinates: [-102.5528, 23.6345], clientCount: 3, region: "northAmerica", countryCode: "MX" },
  
  // South America
  { name: "Brazil", coordinates: [-51.9253, -14.235], clientCount: 4, region: "southAmerica", countryCode: "BR" },
  { name: "Argentina", coordinates: [-63.6167, -38.4161], clientCount: 2, region: "southAmerica", countryCode: "AR" },
  
  // Europe
  { name: "United Kingdom", coordinates: [-3.436, 55.3781], clientCount: 8, region: "europe", countryCode: "GB" },
  { name: "France", coordinates: [2.2137, 46.2276], clientCount: 6, region: "europe", countryCode: "FR" },
  { name: "Germany", coordinates: [10.4515, 51.1657], clientCount: 7, region: "europe", countryCode: "DE" },
  
  // Asia
  { name: "India", coordinates: [78.9629, 20.5937], clientCount: 15, region: "asia", countryCode: "IN" },
  { name: "Japan", coordinates: [138.2529, 36.2048], clientCount: 6, region: "asia", countryCode: "JP" },
  { name: "Singapore", coordinates: [103.8198, 1.3521], clientCount: 5, region: "asia", countryCode: "SG" },
  
  // Africa
  { name: "Kenya", coordinates: [37.9062, -0.0236], clientCount: 3, region: "africa", countryCode: "KE" },
  { name: "South Africa", coordinates: [22.9375, -30.5595], clientCount: 4, region: "africa", countryCode: "ZA" },
  
  // Australia
  { name: "Australia", coordinates: [133.7751, -25.2744], clientCount: 7, region: "oceania", countryCode: "AU" },
];

// Country name map for countries that might have different names in the library
const countryNameMap: Record<string, string> = {
  "GB": "United Kingdom",
  "US": "United States",
  // Add more mappings as needed
};

interface JVectorWorldMapProps {
  primaryColor?: string;
}

const JVectorWorldMap: React.FC<JVectorWorldMapProps> = ({ 
  primaryColor = "#3fa7f5"
}) => {
  // Prepare data for the map
  const clientCountByCountry: Record<string, number> = {};
  
  clientLocations.forEach(location => {
    if (location.countryCode) {
      clientCountByCountry[location.countryCode] = location.clientCount;
    }
  });

  // Create color scale based on client count
  const getColorScale = () => {
    // Generate color scale from dark blue to light blue
    const colors = [
      "#0a2d4a", // Dark blue for low values
      "#164b77",
      "#2169a5",
      "#2c87d3",
      primaryColor  // Light blue for high values
    ];
    
    return colors;
  };

  // Type definition for tooltip element
  interface TooltipElement {
    html: (content: string) => void;
    text: () => string;
  }

  // Suppress TypeScript errors for JVectorMap props
  const mapProps = {
    map: worldMill,
    backgroundColor: "#000000",
    containerStyle: {
      width: "100%",
      height: "100%"
    },
    containerClassName: "world-map",
    regionStyle: {
      initial: {
        fill: "#1a1a1a",
        stroke: "#333333",
        "stroke-width": 0.5,
        "stroke-opacity": 1
      },
      hover: {
        fill: "#222222",
        cursor: "pointer",
        "stroke-width": 1,
        "stroke": "#3fa7f5"
      },
      selected: {
        fill: "#2a2a2a"
      }
    },
    series: {
      regions: [{
        attribute: 'fill',
        values: clientCountByCountry,
        scale: getColorScale(),
        normalizeFunction: 'polynomial'
      }]
    },
    onRegionTipShow: function(_e: Event, el: TooltipElement, code: string) {
      // Get country name from the tooltip text or use our mapping
      let countryName = el.text();
      if (countryNameMap[code]) {
        countryName = countryNameMap[code];
      }
      
      // Check if this country has client data
      if (clientCountByCountry[code]) {
        const location = clientLocations.find(loc => loc.countryCode === code);
        if (location) {
          // Create custom tooltip content with client data
          const content = `
            <div style="font-weight: bold; margin-bottom: 4px;">${location.name}</div>
            <div style="color: ${primaryColor};">
              <span style="font-weight: bold; font-size: 16px;">${location.clientCount}</span> 
              client${location.clientCount !== 1 ? 's' : ''}
            </div>
          `;
          
          // Set tooltip content
          el.html(content);
        }
      } else {
        // Create custom tooltip content for countries without client data
        const content = `
          <div style="font-weight: bold; margin-bottom: 4px;">${countryName}</div>
          <div style="color: ${primaryColor};">No clients</div>
        `;
        
        // Set tooltip content
        el.html(content);
      }
    },
    zoomOnScroll: false,
    zoomMax: 1,
    zoomMin: 1,
    regionsSelectable: false,
    regionsSelectableOne: false
  };

  return (
    <div className="relative w-full h-full">
      <div className="w-full h-full bg-black">
        {/* @ts-expect-error - JVectorMap has type issues */}
        <VectorMap {...mapProps} />
      </div>
    </div>
  );
};

export default memo(JVectorWorldMap); 