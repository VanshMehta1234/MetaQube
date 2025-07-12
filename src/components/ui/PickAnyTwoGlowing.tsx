import React, { useState } from 'react';
import { motion } from 'framer-motion';

const options = [
	{ label: 'Fast' },
	{ label: 'Cheap' },
	{ label: 'Good' },
];

const results: Record<string, { title: string; desc: string }> = {
	'Fast,Cheap': {
		title: 'Fast & Cheap',
		desc: 'Quality may be compromised.',
	},
	'Fast,Good': {
		title: 'Fast & Good',
		desc: 'It won’t be cheap.',
	},
	'Cheap,Good': {
		title: 'Cheap & Good',
		desc: 'It won’t be fast.',
	},
};

function getResult(selected: string[]) {
	if (selected.length !== 2) return null;
	const key = selected.slice().sort().join(',');
	return results[key];
}

// SVG cube with perspective and glowing edges
function GlowingCube3D({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
	return (
		<button
			onClick={onClick}
			className={`group relative w-28 h-28 flex items-center justify-center transition-transform duration-200 ${active ? 'scale-110' : 'hover:scale-105'}`}
			style={{ outline: 'none' }}
			aria-pressed={active}
		>
			<svg width="112" height="112" viewBox="0 0 112 112" className="absolute inset-0 z-0">
				<g filter="url(#glow3d)">
					{/* Top face */}
					<polygon points="56,18 94,38 56,58 18,38" fill="#10151C" stroke="#1AD1B5" strokeWidth="2.5" />
					{/* Left face */}
					<polygon points="18,38 56,58 56,94 18,74" fill="#10151C" stroke="#1AD1B5" strokeWidth="2.5" />
					{/* Right face */}
					<polygon points="94,38 56,58 56,94 94,74" fill="#10151C" stroke="#1AD1B5" strokeWidth="2.5" />
					{/* Edges */}
					<polyline points="56,18 56,58 56,94" stroke="#1AD1B5" strokeWidth="2" />
				</g>
				<defs>
					<filter id="glow3d" x="-20%" y="-20%" width="140%" height="140%">
						<feDropShadow dx="0" dy="0" stdDeviation="8" floodColor="#1AD1B5" floodOpacity="0.7" />
						<feDropShadow dx="0" dy="0" stdDeviation="16" floodColor="#1AD1B5" floodOpacity="0.4" />
					</filter>
				</defs>
			</svg>
			<span className="relative z-10 text-xl font-bold text-white tracking-wide select-none" style={{ fontFamily: "'Inter', sans-serif" }}>
				{label}
			</span>
		</button>
	);
}

const PickAnyTwoGlowing: React.FC = () => {
	const [selected, setSelected] = useState<string[]>([]);
	const result = getResult(selected);

	// Triangle vertex positions for cubes
	const positions = [
		{ left: '50%', top: '0%', translate: '-50%,0' }, // Top
		{ left: '0%', top: '85%', translate: '0,-50%' }, // Bottom left
		{ left: '100%', top: '85%', translate: '-100%,-50%' }, // Bottom right
	];

	// Neon triangle pulse
	const trianglePulse = {
		initial: { opacity: 0.8 },
		animate: {
			opacity: [0.8, 1, 0.8],
			filter: [
				'drop-shadow(0 0 24px #1AD1B5) drop-shadow(0 0 48px #1AD1B5AA)',
				'drop-shadow(0 0 48px #1AD1B5) drop-shadow(0 0 64px #1AD1B5AA)',
				'drop-shadow(0 0 24px #1AD1B5) drop-shadow(0 0 48px #1AD1B5AA)',
			],
			transition: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' },
		},
	};

	return (
		<section className="relative w-full flex flex-col items-center justify-center py-16 sm:py-24 bg-transparent overflow-hidden">
			{/* Radial grid background */}
			<div className="absolute inset-0 z-0 pointer-events-none">
				<svg className="w-full h-full" viewBox="0 0 800 600" fill="none">
					<defs>
						<radialGradient id="gridGlow" cx="50%" cy="50%" r="50%">
							<stop offset="0%" stopColor="#1AD1B5" stopOpacity="0.10" />
							<stop offset="100%" stopColor="#000" stopOpacity="0" />
						</radialGradient>
					</defs>
					<rect width="800" height="600" fill="url(#gridGlow)" />
					<g stroke="#1AD1B5" strokeWidth="0.7" opacity="0.13">
						{[...Array(12)].map((_, i) => (
							<ellipse key={i} cx="400" cy="400" rx={120 + i * 40} ry={60 + i * 20} fill="none" />
						))}
						{[...Array(16)].map((_, i) => (
							<line key={i} x1="400" y1="400" x2={400 + 400 * Math.cos((i * Math.PI) / 8)} y2={400 + 400 * Math.sin((i * Math.PI) / 8)} />
						))}
					</g>
				</svg>
			</div>
			{/* Heading and subtitle */}
			<div className="relative z-10 text-center mb-8">
				<h2 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-metaEmerald-400 mb-4" style={{ fontFamily: "'Inter', sans-serif" }}>
					Pick Any Two
				</h2>
				<p className="text-xl sm:text-2xl text-white/80 font-medium max-w-2xl mx-auto">
					In the world of innovation, you can only optimize for two. What matters most for your next AI + Web3 project?
				</p>
			</div>
			{/* Glowing cubes and neon triangle */}
			<div className="relative z-10 flex flex-col items-center">
				<div className="relative w-[360px] h-[340px] mx-auto">
					{/* Neon triangle SVG */}
					<motion.svg
						className="absolute inset-0 w-full h-full"
						viewBox="0 0 360 340"
						fill="none"
						{...trianglePulse}
					>
						<polygon
							points="180,40 40,300 320,300"
							stroke="#1AD1B5"
							strokeWidth="7"
							strokeLinejoin="round"
							fill="none"
							style={{
								filter: 'drop-shadow(0 0 32px #1AD1B5) drop-shadow(0 0 64px #1AD1B5AA)',
							}}
						/>
					</motion.svg>
					{/* Glowing Cube Buttons */}
					{options.map((opt, i) => (
						<div
							key={opt.label}
							className="absolute"
							style={{
								left: positions[i].left,
								top: positions[i].top,
								transform: `translate(${positions[i].translate})`,
							}}
						>
							<GlowingCube3D
								label={opt.label}
								active={selected.includes(opt.label)}
								onClick={() => {
									setSelected((prev) => {
										if (prev.includes(opt.label)) return prev.filter((l) => l !== opt.label);
										if (prev.length === 2) return [prev[1], opt.label];
										return [...prev, opt.label];
									});
								}}
							/>
						</div>
					))}
				</div>
				{/* Result Panel */}
				<div className="mt-12 w-full max-w-md px-6">
					<div className="relative bg-white/10 backdrop-blur-md rounded-2xl border border-metaEmerald-400/40 shadow-[0_0_40px_12px_rgba(26,209,181,0.35)] p-7 text-center">
						<div className="absolute -inset-1 rounded-2xl pointer-events-none border-2 border-metaEmerald-400 blur-[6px] opacity-90 animate-glow" />
						<h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-metaEmerald-400 mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>
							{result ? result.title : 'Pick Any Two:'}
						</h3>
						<p className="text-lg sm:text-xl text-white/90 font-medium">
							{result ? result.desc : 'Select any two options to see the tradeoff.'}
						</p>
					</div>
				</div>
			</div>
			{/* Custom keyframes for subtle glowing animation */}
			<style>{`
        @keyframes glow {
          0% { box-shadow: 0 0 32px 8px #1AD1B5AA; }
          100% { box-shadow: 0 0 64px 16px #1AD1B5BB; }
        }
        .animate-glow { animation: glow 2.5s ease-in-out infinite alternate; }
      `}</style>
		</section>
	);
};

export default PickAnyTwoGlowing;
