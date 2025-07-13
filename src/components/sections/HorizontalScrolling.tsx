"use client";

import React, { useEffect, useRef } from "react";
import { animate, scroll } from "motion";
import { serviceData } from "../data/serviceData";

const HorizontalServicesGallery: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const items = document.querySelectorAll(".img-container");

        if (items.length === 0) return;

        scroll(
            animate(".img-group", {
                transform: ["none", `translateX(-${(items.length - 1) * 100}vw)`],
            }),
            {
                target: document.querySelector(".img-group-container")!,
            }
        );

        scroll(
            animate(".progress", { scaleX: [0, 1] }),
            {
                target: document.querySelector(".img-group-container")!,
            }
        );
    }, []);

    return (
        <>
            <article id="gallery" className="text-white w-[98vw] overflow-hidden">
                <header className="h-[70vh] flex items-center justify-center">
                    <h2 className="text-5xl font-bold">Our Services</h2>
                </header>

                <section className="img-group-container relative h-[500vh] overflow-hidden">
                    <div className="sticky top-0 h-screen overflow-hidden">
                        <ul className="img-group flex transition-transform duration-700">
                            {serviceData.map((service, index) => (
                                <li
                                    key={service.id}
                                    className="img-container w-[100vw] h-screen flex flex-col items-center justify-center flex-shrink-0"
                                >
                                    <div className="text-5xl mb-4">{service.icon}</div>
                                    <h3 className="text-3xl font-bold mb-2">{service.title}</h3>
                                    <p className="text-lg max-w-md text-center px-4 text-gray-300">
                                        {service.description}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>


                <footer className="h-[70vh] flex items-center justify-center text-gray-400 text-sm">
                    <p>© MetaQube Services Showcase</p>
                </footer>
            </article>

            <div className="progress fixed bottom-[50px] left-0 right-0 h-[5px] bg-[#3fa7f5] origin-left scale-x-0" />
        </>
    );
};

export default HorizontalServicesGallery;
