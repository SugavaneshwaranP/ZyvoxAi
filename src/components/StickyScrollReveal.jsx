import React, { useRef, useState, useEffect } from "react";
import { useScroll, motion, AnimatePresence, useMotionValueEvent } from "framer-motion";

export const StickyScrollReveal = ({
    content,
    contentClassName,
}) => {
    const [activeCard, setActiveCard] = useState(0);
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end end"],
    });
    const cardLength = content.length;

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        const cardsBreakpoints = content.map((_, index) => index / cardLength);
        const closestBreakpointIndex = cardsBreakpoints.reduce(
            (acc, breakpoint, index) => {
                const distance = Math.abs(latest - breakpoint);
                if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
                    return index;
                }
                return acc;
            },
            0
        );
        setActiveCard(closestBreakpointIndex);
    });

    return (
        <motion.div
            className="h-full overflow-y-auto flex justify-center relative space-x-10 px-10 no-scrollbar"
            ref={ref}
            style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
            }}
        >
            <div className="relative flex items-start px-4">
                <div className="max-w-xl">
                    {content.map((item, index) => (
                        <div key={item.title + index} className="my-40 first:mt-20 last:mb-60">
                            <motion.h2
                                initial={{ opacity: 0, x: -20 }}
                                animate={{
                                    opacity: activeCard === index ? 1 : 0.2,
                                    x: activeCard === index ? 0 : -20,
                                    scale: activeCard === index ? 1.05 : 1,
                                }}
                                transition={{ duration: 0.5, ease: "circOut" }}
                                className="text-4xl md:text-5xl font-black text-black uppercase tracking-tighter leading-none"
                            >
                                {item.title}
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{
                                    opacity: activeCard === index ? 1 : 0.1,
                                    y: activeCard === index ? 0 : 10,
                                }}
                                transition={{ duration: 0.5, ease: "circOut", delay: 0.1 }}
                                className="text-xl text-black font-bold max-w-sm mt-8 leading-tight"
                            >
                                {item.description}
                            </motion.p>

                            {/* Mobile Content Display */}
                            <div className="lg:hidden mt-10 h-60 w-full rounded-2xl border-[3px] border-black overflow-hidden shadow-[8px_8px_0px_#000]">
                                {item.content}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Desktop Sticky Visuals */}
            <div className="hidden lg:flex items-center justify-center sticky top-0 h-full w-[500px]">
                <div
                    className={`h-[450px] w-full rounded-[40px] bg-white overflow-hidden border-[6px] border-black shadow-[20px_20px_0px_#000] relative ${contentClassName}`}
                >
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeCard}
                            initial={{
                                opacity: 0,
                                scale: 1.1,
                                filter: "blur(10px)",
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                filter: "blur(0px)",
                            }}
                            exit={{
                                opacity: 0,
                                scale: 0.9,
                                filter: "blur(10px)",
                            }}
                            transition={{
                                duration: 0.5,
                                ease: "easeInOut",
                            }}
                            className="h-full w-full"
                        >
                            {content[activeCard].content ?? null}
                        </motion.div>
                    </AnimatePresence>

                    {/* Technical Travel Overlay */}
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-0 left-0 w-full h-full border-[1px] border-black/10 mix-blend-overlay" />
                        <div className="absolute top-6 right-6 font-mono text-[10px] text-white/50 bg-black/40 px-2 py-1 rounded backdrop-blur-md">
                            ASSET_ID: PX_{activeCard + 402}
                        </div>
                        <div className="absolute bottom-6 left-6 font-mono text-[8px] text-[#7a78ff] tracking-widest uppercase">
                            [ ACTIVE_SYNC_PROTOCOL_V4 ]
                        </div>
                        {/* Scanning Bar */}
                        <motion.div
                            animate={{ top: ['0%', '100%', '0%'] }}
                            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                            className="absolute left-0 w-full h-[1px] bg-[#7a78ff]/30 z-10"
                        />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
