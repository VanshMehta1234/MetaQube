import React from 'react';

// Countries highlighted in the image
const countries = [
  { name: "USA", coordinates: [25, 40] },
  { name: "Canada", coordinates: [18, 32] },
  { name: "UK", coordinates: [47, 32] },
  { name: "Belgium", coordinates: [48, 33] },
  { name: "India", coordinates: [68, 45] },
  { name: "UAE", coordinates: [62, 43] },
  { name: "Cambodia", coordinates: [76, 48] },
  { name: "Hong Kong", coordinates: [78, 45] },
];

const WorldMap: React.FC = () => {
  return (
    <section className="py-20 bg-black text-white overflow-hidden">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Our Global Presence</h2>
        
        <div className="relative w-full max-w-5xl mx-auto h-[500px] rounded-lg overflow-hidden">
          {/* Static map background */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1500' height='750' viewBox='0 0 1500 750'%3E%3Crect width='1500' height='750' fill='%23000000'/%3E%3Cpath d='M321,184 L368,131 L465,125 L502,157 L507,201 L544,233 L594,218 L598,198 L627,228 L626,277 L643,307 L673,318 L704,350 L711,391 L688,443 L682,485 L720,503 L761,494 L790,503 L827,495 L855,453 L841,448 L846,431 L818,420 L832,397 L862,384 L854,371 L842,349 L850,337 L829,315 L829,295 L813,288 L798,268 L775,282 L757,289 L747,275 L746,252 L754,237 L772,226 L763,219 L777,201 L794,197 L799,184 L783,180 L775,171 L786,162 L726,126 L685,125 L661,128 L647,140 L621,129 L618,111 L610,98 L613,75 L623,56 L608,53 L585,65 L556,103 L535,161 L489,186 L483,208 L458,205 L446,221 L433,218 L407,215 L383,204 L345,213 L321,184Z' fill='%23333' stroke='%23222' stroke-width='2' opacity='0.8'/%3E%3Cpath d='M106,240 L216,227 L220,188 L241,173 L240,131 L251,103 L267,98 L290,105 L299,98 L333,92 L321,184 L270,218 L262,280 L220,333 L204,393 L181,419 L141,425 L140,394 L110,370 L98,319 L106,240Z' fill='%23333' stroke='%23222' stroke-width='2' opacity='0.8'/%3E%3Cpath d='M1118,428 L1073,421 L1060,427 L1042,427 L1029,416 L1030,389 L1015,365 L1010,349 L1020,329 L1031,308 L1059,308 L1075,293 L1087,266 L1112,260 L1138,239 L1152,237 L1176,251 L1178,268 L1196,279 L1195,296 L1205,316 L1202,329 L1184,342 L1172,343 L1174,367 L1169,371 L1170,407 L1157,433 L1142,438 L1118,428Z' fill='%23333' stroke='%23222' stroke-width='2' opacity='0.8'/%3E%3Cpath d='M1223,558 L1295,523 L1329,540 L1368,521 L1396,521 L1410,533 L1402,557 L1375,575 L1350,606 L1319,635 L1293,638 L1267,625 L1249,604 L1232,586 L1223,558Z' fill='%23333' stroke='%23222' stroke-width='2' opacity='0.8'/%3E%3Cpath d='M627,518 L687,518 L747,505 L762,465 L790,453 L816,451 L841,448 L846,431 L818,420 L832,397 L862,384 L905,387 L942,384 L971,381 L979,390 L994,390 L990,412 L1007,421 L1032,417 L1047,436 L1043,454 L1060,471 L1080,473 L1100,479 L1097,486 L1073,492 L1060,504 L1060,525 L1071,546 L1059,565 L1039,566 L1022,578 L992,593 L950,601 L916,617 L915,633 L891,638 L890,661 L841,659 L823,643 L774,641 L760,629 L736,630 L716,618 L693,624 L670,622 L623,609 L596,607 L598,580 L586,566 L582,538 L618,534 L627,518Z' fill='%23333' stroke='%23222' stroke-width='2' opacity='0.8'/%3E%3Cpath d='M542,318 L536,297 L552,275 L598,262 L637,270 L648,285 L674,280 L673,318 L643,307 L626,277 L627,228 L598,198 L594,218 L544,233 L507,201 L470,217 L448,221 L433,218 L428,237 L407,254 L399,271 L354,289 L341,304 L329,331 L304,358 L276,366 L255,404 L255,426 L268,448 L290,452 L312,446 L327,434 L362,434 L383,429 L433,429 L458,414 L487,413 L496,389 L516,382 L530,365 L542,318Z' fill='%23333' stroke='%23222' stroke-width='2' opacity='0.8'/%3E%3Cpath d='M711,391 L687,443 L682,485 L720,503 L761,494 L790,503 L827,495 L855,453 L816,451 L790,453 L762,465 L747,505 L687,518 L627,518 L618,534 L582,538 L548,517 L530,489 L477,473 L458,414 L487,413 L496,389 L516,382 L530,365 L542,318 L536,297 L552,275 L598,262 L637,270 L648,285 L674,280 L673,318 L704,350 L711,391Z' fill='%23333' stroke='%23222' stroke-width='2' opacity='0.8'/%3E%3Cpath d='M940,136 L930,148 L920,151 L918,159 L905,164 L896,177 L879,178 L868,196 L872,217 L865,233 L867,250 L852,262 L857,281 L870,297 L883,313 L893,328 L905,387 L962,384 L980,376 L999,376 L1008,360 L1029,359 L1030,389 L1015,365 L1010,349 L1020,329 L1031,308 L1059,308 L1075,293 L1087,266 L1077,255 L1072,240 L1057,235 L1050,224 L1037,220 L1025,232 L1008,232 L997,222 L984,224 L985,211 L977,190 L961,185 L958,175 L968,167 L965,154 L945,137 L940,136Z' fill='%23333' stroke='%23222' stroke-width='2' opacity='0.8'/%3E%3Cpath d='M507,157 L517,149 L534,131 L546,103 L562,99 L570,85 L577,78 L585,65 L608,53 L623,56 L613,75 L610,98 L618,111 L621,129 L647,140 L661,128 L685,125 L726,126 L728,118 L736,112 L736,99 L731,88 L738,70 L755,79 L775,78 L798,82 L815,85 L824,95 L840,95 L854,88 L866,96 L868,112 L874,122 L889,125 L887,142 L896,177 L879,178 L868,196 L852,197 L840,190 L825,192 L820,181 L809,180 L799,184 L794,197 L777,201 L763,219 L772,226 L754,237 L746,252 L747,275 L757,289 L775,282 L798,268 L813,288 L829,295 L829,315 L850,337 L842,349 L854,371 L862,384 L842,384 L830,382 L824,369 L810,363 L789,366 L776,373 L770,359 L768,346 L758,329 L747,316 L727,318 L711,325 L695,318 L687,310 L673,318 L643,307 L626,277 L627,228 L598,198 L594,218 L544,233 L507,201 L502,157Z' fill='%23333' stroke='%23222' stroke-width='2' opacity='0.8'/%3E%3C/svg%3E")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          ></div>
          
          {/* Country markers */}
          <div className="absolute inset-0">
            {countries.map((country, index) => (
              <div 
                key={index} 
                className="absolute"
                style={{
                  left: `${country.coordinates[0]}%`,
                  top: `${country.coordinates[1]}%`,
                }}
              >
                <div className="relative group">
                  {/* Blue dot */}
                  <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                  
                  {/* Country label */}
                  <div className="absolute whitespace-nowrap">
                    <div className="flex items-center">
                      {/* Connecting line */}
                      <div 
                        className="absolute bg-white h-px" 
                        style={{ 
                          width: '30px',
                          transform: country.name === "Hong Kong" || country.name === "Cambodia" ? 'translateX(10px)' : 'translateX(-40px)',
                        }}
                      ></div>
                      
                      {/* Text label */}
                      <span 
                        className="text-white text-xs font-medium"
                        style={{ 
                          position: 'absolute',
                          transform: country.name === "Hong Kong" || country.name === "Cambodia" ? 'translateX(45px)' : 'translateX(-75px)',
                        }}
                      >
                        {country.name}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorldMap;
