import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "AI Resume Screener",
    description: "AI tool to screen resumes based on job descriptions.",
    stack: ["React", "OpenAI", "Tailwind"],
    image: "https://source.unsplash.com/featured/400x220?resume,code",
    live: "#",
    github: "#",
  },
  {
    title: "E-Commerce UI",
    description: "Responsive e-commerce UI with cart and Stripe checkout.",
    stack: ["Next.js", "Stripe", "MongoDB"],
    image: "https://source.unsplash.com/featured/400x220?ecommerce,ui",
    live: "#",
    github: "#",
  },
  {
    title: "3D Developer Portfolio",
    description: "A 3D interactive portfolio using shaders & WebGL.",
    stack: ["Three.js", "R3F", "Framer Motion"],
    image: "https://source.unsplash.com/featured/400x220?3d,developer",
    live: "#",
    github: "#",
  },
  {
    title: "3D Developer Portfolio",
    description: "A 3D interactive portfolio using shaders & WebGL.",
    stack: ["Three.js", "R3F", "Framer Motion"],
    image: "https://source.unsplash.com/featured/400x220?3d,developer",
    live: "#",
    github: "#",
  },
  {
    title: "3D Developer Portfolio",
    description: "A 3D interactive portfolio using shaders & WebGL.",
    stack: ["Three.js", "R3F", "Framer Motion"],
    image: "https://source.unsplash.com/featured/400x220?3d,developer",
    live: "#",
    github: "#",
  },
  {
    title: "3D Developer Portfolio",
    description: "A 3D interactive portfolio using shaders & WebGL.",
    stack: ["Three.js", "R3F", "Framer Motion"],
    image: "https://source.unsplash.com/featured/400x220?3d,developer",
    live: "#",
    github: "#",
  },
  {
    title: "3D Developer Portfolio",
    description: "A 3D interactive portfolio using shaders & WebGL.",
    stack: ["Three.js", "R3F", "Framer Motion"],
    image: "https://source.unsplash.com/featured/400x220?3d,developer",
    live: "#",
    github: "#",
  },
  {
    title: "Blog CMS",
    description: "Markdown CMS with live preview and simple UI.",
    stack: ["Next.js", "Supabase", "Tailwind CSS"],
    image: "https://source.unsplash.com/featured/400x220?blog,markdown",
    live: "#",
    github: "#",
  },
];

const HorizontalScroll: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const horizontal = horizontalRef.current;
    if (!container || !horizontal) return;

    const ctx = gsap.context(() => {
      const scrollLength = horizontal.scrollWidth - window.innerWidth;

      gsap.to(horizontal, {
        x: () => `-${scrollLength}px`,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: container,
          start: "top-=100 top",
          end: () => `+=${horizontal.scrollWidth + 500}`,
          markers: true,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="w-full h-screen bg-[#0f0f0f] text-white overflow-hidden"
    >
      <h2 className="text-4xl font-semibold px-10 pt-12 pb-6 text-white">
        Projects
      </h2>

      <div ref={horizontalRef} className="flex px-10 space-x-10">
        {projects.map((project, index) => (
          <div
            key={index}
            className="min-w-[380px] bg-[#151515] border border-[#1f1f1f] rounded-xl p-4 flex-shrink-0 shadow-md hover:shadow-lg transition duration-300"
          >
            <img
              src={project.image}
              alt={project.title}
              className="rounded-lg mb-4 w-full h-[200px] object-cover"
            />
            <h3 className="text-xl font-medium text-white">{project.title}</h3>
            <p className="text-sm text-gray-400 mt-1">{project.description}</p>

            <div className="flex flex-wrap gap-2 mt-4">
              {project.stack.map((tech, idx) => (
                <span
                  key={idx}
                  className="text-xs bg-[#1e1e1e] text-blue-300 px-2 py-1 rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex gap-3 mt-5">
              <a
                href={project.live}
                className="text-sm bg-blue-600 hover:bg-blue-700 transition px-4 py-1 rounded-full text-white"
              >
                Live
              </a>
              <a
                href={project.github}
                className="text-sm border border-blue-500 text-blue-400 hover:bg-blue-600 hover:text-white transition px-4 py-1 rounded-full"
              >
                Code
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HorizontalScroll;
