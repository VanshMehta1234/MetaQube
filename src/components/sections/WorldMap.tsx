// components/WorldMap.tsx
import React, { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
} from "react-simple-maps";

// TopoJSON URL
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// Highlighted countries with client counts
const highlightedCountries: Record<string, { clients: number }> = {
  USA: { clients: 12 },
  IND: { clients: 30 },
  CAN: { clients: 5 },
  BEL: { clients: 3 },
  HKG: { clients: 7 },
  KHM: { clients: 4 },
  ARE: { clients: 2 },
};

const WorldMap: React.FC = () => {
  const [tooltipContent, setTooltipContent] = useState<string>("");

  return (
    // <div className="w-full flex flex-col items-center justify-center py-8 px-2 sm:px-8 md:px-16 bg-black rounded-xl">
    //   <h2 className="text-center text-[#0ff] text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6" style={{ fontFamily: "'Inter', sans-serif" }}>
    //     Our Global Presence
    //   </h2>
    //   <div className="w-full max-w-4xl h-[320px] sm:h-[420px] md:h-[520px] lg:h-[600px] mx-auto">
    //     <ComposableMap
    //       projectionConfig={{ scale: 160 }}
    //       style={{ width: "100%", height: "100%" }}
    //     >
    //       <Geographies geography={geoUrl}>
    //         {({ geographies }) =>
    //           geographies.map((geo) => {
    //             const iso = geo.properties.ISO_A3;
    //             const isHighlighted = highlightedCountries[iso];
    //             return (
    //               <Geography
    //                 key={geo.rsmKey}
    //                 geography={geo}
    //                 onMouseEnter={() => {
    //                   const { NAME } = geo.properties;
    //                   const clients = isHighlighted?.clients ?? 0;
    //                   if (isHighlighted) {
    //                     setTooltipContent(`${NAME}: ${clients} clients`);
    //                   }
    //                 }}
    //                 onMouseLeave={() => setTooltipContent("")}
    //                 fill={isHighlighted ? "#00ffff" : "#222"}
    //                 stroke="#444"
    //                 style={{
    //                   default: { outline: "none" },
    //                   hover: { fill: "#0ff", outline: "none" },
    //                   pressed: { outline: "none" },
    //                 }}
    //               />
    //             );
    //           })
    //         }
    //       </Geographies>
    //     </ComposableMap>
    //   </div>
    //   {tooltipContent && (
    //     <div className="text-center mt-4 text-white text-base sm:text-lg font-mono">
    //       {tooltipContent}
    //     </div>
    //   )}
    // </div>
    <>
    </>
  );
};

export default WorldMap;
