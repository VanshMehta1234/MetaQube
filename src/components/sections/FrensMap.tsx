import React, { useState, useRef, useEffect } from "react";
import { motion, useAnimation, PanInfo } from "framer-motion";
import { useAppStore } from "../../store/useAppStore";

// Company-specific logo styles (used for fallback colors)
const logoStyles = {
  Buildspace: "bg-emerald-100",
  Coinbase: "bg-blue-50",
  Paradigm: "bg-gray-50",
  Uniswap: "bg-pink-50",
  Opensea: "bg-blue-50",
  Foundation: "bg-gray-50",
  MetaMask: "bg-orange-50",
  Polygon: "bg-purple-50",
};

// Company data with logo paths - pointing to local files
const frens = [
  {
    id: 1,
    name: "ETHGlobal",
    description: "Ethereum ecosystem",
    category: "Crypto",
    logoPath: "/logos/ethglobal.svg",
  },
  {
    id: 2,
    name: "Tron",
    description: "When innovation meets liquidity",
    category: "Blockchain",
    logoPath: "/logos/tron.svg", // Update with your actual logo filename
  },
  {
    id: 3,
    name: "Chainlink",
    description: "Off-chain to on-chain bridge",
    category: "Infrastructure",
    logoPath: "/logos/chainlink.svg", // Update with your actual logo filename
  },
  {
    id: 4,
    name: "Superfluid",
    description: "Money that streams",
    category: "DeFi",
    logoPath: "/logos/superfluid.svg", // Update with your actual logo filename
  },
  {
    id: 5,
    name: "Bera chain",
    description: "",
    category: "Blockchain",
    logoPath: "/logos/berachain.svg", // Update with your actual logo filename
  },
  {
    id: 6,
    name: "Polygon",
    description: "Indian native chain",
    category: "Blockchain",
    logoPath: "/logos/polygon.svg", // Update with your actual logo filename
  },
  {
    id: 7,
    name: "Guj government",
    description: "Government of Gujarat ",
    category: "Government",
    logoPath: "/logos/governmentofgujarat.png", // Update with your actual logo filename
  },
  {
    id: 8,
    name: "Zeeve",
    description: "Building Blockchain ecosystem",
    category: "Infrastructure",
    logoPath: "/logos/zeeve.svg", // Update with your actual logo filename
  },
];

const categories = Array.from(new Set(frens.map((fren) => fren.category)));

// Threshold for when to use a carousel instead of grid
const CAROUSEL_THRESHOLD = 4;

const FrensMap: React.FC = () => {
  const { metaMirrorMode } = useAppStore();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [carouselPosition, setCarouselPosition] = useState(0);

  const filteredFrens = selectedCategory
    ? frens.filter((fren) => fren.category === selectedCategory)
    : frens;

  // Determine whether to show carousel or grid
  const shouldShowCarousel = filteredFrens.length > CAROUSEL_THRESHOLD;

  // Create duplicated arrays for more seamless infinite scroll (only when using carousel)
  const duplicatedFrens = shouldShowCarousel
    ? [...filteredFrens, ...filteredFrens, ...filteredFrens]
    : [];

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(selectedCategory === category ? null : category);
  };

  // Handle start of dragging
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (!shouldShowCarousel) return;

    setIsDragging(true);
    controls.stop(); // Stop auto-scrolling when user starts dragging

    // Get initial position
    if ("touches" in e) {
      setDragStartX(e.touches[0].clientX);
    } else {
      setDragStartX(e.clientX);
    }
  };

  // Handle drag event with smoother circular behavior
  const handleDrag = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging || !shouldShowCarousel || !carouselRef.current) return;

    // Calculate drag distance
    const currentX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const deltaX = currentX - dragStartX;

    // Get container width for more consistent feel across screen sizes
    const containerWidth = carouselRef.current.clientWidth;
    // Adjust sensitivity based on screen width for more consistent feel
    const dragFactor = 0.3 * (containerWidth / 1000);

    // Calculate new position with improved sensitivity
    const newPosition = carouselPosition - deltaX * dragFactor;

    // Update position with circular behavior
    setDragStartX(currentX);
    setCarouselPosition(newPosition);

    // Apply the new position with smooth transition
    controls.set({
      x: `-${newPosition % 100}%`,
    });
  };

  // Handle end of dragging with momentum effect
  const handleDragEnd = () => {
    if (!shouldShowCarousel) return;

    setIsDragging(false);

    // Add a slight momentum effect when releasing drag
    controls.start({
      x: `-${carouselPosition % 100}%`,
      transition: { duration: 0.5, ease: "easeOut" },
    });

    // Wait for momentum to finish before resuming auto-scroll
    setTimeout(resumeAutoScroll, 600);
  };

  // Wheel event handler with improved smoothness
  const handleWheel = (e: React.WheelEvent) => {
    if (!shouldShowCarousel || !carouselRef.current) return;

    e.preventDefault(); // Prevent vertical scrolling
    controls.stop(); // Stop auto-scrolling during wheel interaction

    // Get container width for more consistent scrolling
    const containerWidth = carouselRef.current.clientWidth;

    // Adjust sensitivity based on screen width and delta magnitude
    const wheelFactor = 0.02 * (containerWidth / 1000);
    const deltaMagnitude = Math.min(Math.abs(e.deltaY), 100); // Cap for large delta values
    const direction = e.deltaY > 0 ? 1 : -1;

    // Calculate new position with improved sensitivity
    const newPosition =
      carouselPosition + direction * deltaMagnitude * wheelFactor;
    setCarouselPosition(newPosition);

    // Apply the new position with improved easing
    controls.start({
      x: `-${newPosition % 100}%`,
      transition: {
        duration: 0.8,
        ease: [0.32, 0.72, 0.35, 1.0], // Custom cubic-bezier for natural feel
      },
    });

    // Resume auto-scrolling after a longer delay for better UX
    clearTimeout(wheelTimeout.current);
    wheelTimeout.current = setTimeout(
      resumeAutoScroll,
      2500
    ) as unknown as number;
  };

  // Reference for wheel timeout
  const wheelTimeout = useRef<number>(0);

  // Function to start or resume auto-scrolling with improved smoothness
  const resumeAutoScroll = () => {
    if (!shouldShowCarousel) return;

    // Use the current position as starting point for smoother transition
    const currentPos = carouselPosition % 100;

    // Detect mobile device
    const isMobile = typeof window !== "undefined" && window.innerWidth < 640;

    controls.start({
      // Animation moves from current position through a full cycle
      x: [`-${currentPos}%`, `-${currentPos + 100}%`],
      transition: {
        x: {
          duration: isMobile ? 10 : 60, // Faster on mobile
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop",
        },
      },
    });
  };

  // Start the automatic animation with improved initial behavior
  useEffect(() => {
    if (!shouldShowCarousel) return;

    // Smoother initial animation with a slight delay
    controls.set({ x: "0%" });
    setCarouselPosition(0);

    // Small delay before starting animation for better initial rendering
    const startTimer = setTimeout(() => {
      resumeAutoScroll();
    }, 100);

    // Clean up timeouts on unmount
    return () => {
      clearTimeout(startTimer);
      if (wheelTimeout.current) {
        clearTimeout(wheelTimeout.current);
      }
    };
  }, [controls, filteredFrens.length, shouldShowCarousel]);

  // Fallback function for when an image fails to load
  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>,
    fren: (typeof frens)[0]
  ) => {
    const target = e.target as HTMLImageElement;
    const initials = fren.name.slice(0, 2).toUpperCase();
    const bgColor =
      logoStyles[fren.name as keyof typeof logoStyles] || "bg-white";

    // Create a placeholder SVG
    const placeholderSvg = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100"><rect width="100" height="100" fill="${
      bgColor === "bg-emerald-100"
        ? "rgb(16,185,129)"
        : bgColor === "bg-blue-50"
        ? "rgb(59,130,246)"
        : bgColor === "bg-gray-50"
        ? "rgb(75,85,99)"
        : bgColor === "bg-pink-50"
        ? "rgb(236,72,153)"
        : bgColor === "bg-orange-50"
        ? "rgb(249,115,22)"
        : bgColor === "bg-purple-50"
        ? "rgb(147,51,234)"
        : "rgb(156,163,175)"
    }" rx="50" ry="50"/><text x="50" y="50" font-family="Arial" font-size="35" fill="white" text-anchor="middle" dominant-baseline="central" font-weight="bold">${initials}</text></svg>`;

    target.src = placeholderSvg;
  };

  // Function to render a company card
  const renderCompanyCard = (fren: (typeof frens)[0], index?: number) => (
    <motion.div
      key={index !== undefined ? `${fren.id}-${index}` : fren.id}
      className={`px-2 pb-6 pt-2 ${
        shouldShowCarousel
          ? "w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 flex-shrink-0"
          : ""
      }`}
      initial={{ opacity: 1 }}
      style={{ willChange: "transform" }}
    >
      <motion.div
        className={`${
          metaMirrorMode ? "bg-deepCosmos-800" : "bg-white"
        } p-6 rounded-2xl shadow-xl border ${
          metaMirrorMode ? "border-deepCosmos-700" : "border-quantumGrey-200"
        } hover:border-metaEmerald-500 transition-all h-full relative group overflow-visible`}
        whileHover={{
          y: -10,
          boxShadow: metaMirrorMode
            ? "0 20px 40px -15px rgba(0, 0, 0, 0.6)"
            : "0 20px 40px -15px rgba(0, 0, 0, 0.15)",
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-metaEmerald-500/10 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity" />

        <motion.div
          className="w-24 h-24 mx-auto mb-6 relative"
          whileHover={{ rotate: 360, scale: 1.1 }}
          transition={{ duration: 0.7 }}
        >
          <div className="absolute inset-0 bg-metaEmerald-500 rounded-full opacity-10 animate-pulse" />
          <div
            className={`w-full h-full relative z-10 rounded-full ${
              logoStyles[fren.name as keyof typeof logoStyles] || "bg-white"
            } p-3 flex items-center justify-center overflow-hidden border ${
              metaMirrorMode ? "border-deepCosmos-600" : "border-gray-100"
            } shadow-lg`}
          >
            <div className="flex items-center justify-center w-full h-full">
              <img
                src={fren.logoPath}
                alt={`${fren.name} logo`}
                className="object-contain w-16 h-16"
                onError={(e) => handleImageError(e, fren)}
              />
            </div>
          </div>
        </motion.div>

        <div className="text-center relative z-10">
          <motion.h3
            className={`text-xl font-bold mb-2 ${
              metaMirrorMode ? "text-prismWhite" : "text-deepCosmos-900"
            }`}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "tween", duration: 0.2 }}
          >
            {fren.name}
          </motion.h3>
          <p
            className={`text-sm mb-4 ${
              metaMirrorMode ? "text-quantumGrey-300" : "text-deepCosmos-700"
            }`}
          >
            {fren.description}
          </p>
          <div className="flex items-center justify-center">
            <motion.span
              className={`px-3 py-1 text-xs font-medium rounded-full ${
                metaMirrorMode
                  ? "bg-metaEmerald-500/20 text-metaEmerald-500"
                  : "bg-metaEmerald-800/20 text-metaEmerald-800"
              }`}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "tween", duration: 0.2 }}
            >
              {fren.category}
            </motion.span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <section
      id="frens"
      className={`py-24 transition-colors relative overflow-visible ${
        metaMirrorMode ? "bg-deepCosmos-900" : "bg-quantumGrey-50"
      }`}
    >
      {/* Enhanced background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-20">
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.div
              key={`wave-${i}`}
              className="absolute inset-0"
              style={{
                border: `1px solid ${
                  metaMirrorMode
                    ? "rgba(26, 209, 181, 0.3)"
                    : "rgba(26, 209, 181, 0.5)"
                }`,
                borderRadius: "40%",
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.1, 0.3],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 15,
                delay: i * 3,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <div className="text-center mb-16 relative">
            {/* <h2
              className={`font-bold text-2xl md:text-5xl mb-4 ${
                metaMirrorMode ? "text-prismWhite" : "text-deepCosmos-900"
              }`}
            >
              Our <span className="text-[#3fa7f5]">Frens</span>
            </h2>
            <p
              className={`text-xl max-w-2xl mx-auto ${
                metaMirrorMode ? "text-quantumGrey-300" : "text-deepCosmos-600"
              }`}
            >
              Building alongside the best in the industry to create the future
              of digital experiences.
            </p> */}
            <h2 className={`font-bold text-3xl sm:text-4xl md:text-5xl mb-3 ${
            metaMirrorMode ? 'text-prismWhite' : 'text-deepCosmos-900'
            }`}>
              Our <span className="text-metaEmerald-500">Frens</span>
            </h2>
            <p className={`text-base sm:text-lg md:text-xl max-w-2xl mx-auto ${
              metaMirrorMode ? 'text-quantumGrey-300' : 'text-deepCosmos-600'
            }`}>
              Building alongside the best in the industry to create the future
              of digital experiences.
            </p>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3 mt-8 mb-10">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? metaMirrorMode
                      ? "bg-metaEmerald-500 text-deepCosmos-900 shadow-glow-sm"
                      : "bg-metaEmerald-600 text-white shadow-lg"
                    : metaMirrorMode
                    ? "bg-deepCosmos-700 text-quantumGrey-300 hover:bg-deepCosmos-600"
                    : "bg-white text-deepCosmos-800 hover:bg-quantumGrey-100 border border-quantumGrey-200"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>

        <div className="px-0 md:px-2">
          {shouldShowCarousel ? (
            /* Auto-scrolling carousel for many items */
            <div
              ref={carouselRef}
              className="overflow-hidden relative py-2 max-w-7xl mx-auto"
              style={{
                willChange: "transform",
                margin: "0 auto",
                cursor: isDragging ? "grabbing" : "grab",
              }}
              onMouseDown={handleDragStart}
              onMouseMove={handleDrag}
              onMouseUp={handleDragEnd}
              onMouseLeave={handleDragEnd}
              onTouchStart={handleDragStart}
              onTouchMove={handleDrag}
              onTouchEnd={handleDragEnd}
              onWheel={handleWheel}
            >
              <motion.div
                className="flex"
                animate={controls}
                style={{
                  willChange: "transform",
                  backfaceVisibility: "hidden",
                }}
              >
                {duplicatedFrens.map((fren, index) =>
                  renderCompanyCard(fren, index)
                )}
              </motion.div>
            </div>
          ) : (
            /* Grid display for fewer items */
            <div
              className={`grid gap-6 max-w-7xl mx-auto ${
                filteredFrens.length === 1
                  ? "grid-cols-1 place-items-center"
                  : filteredFrens.length === 2
                  ? "grid-cols-1 sm:grid-cols-2 max-w-2xl"
                  : filteredFrens.length === 3
                  ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl"
                  : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              }`}
            >
              {filteredFrens.map((fren) => renderCompanyCard(fren))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FrensMap;
