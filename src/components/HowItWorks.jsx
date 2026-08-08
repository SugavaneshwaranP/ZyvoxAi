import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Music, Clapperboard, Ghost, ShoppingBag, Shirt } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const WorkflowCard = ({ title, subtext, color, shape, index, Icon }) => {
    const cardRef = useRef(null);

    const getCardStyle = () => {
        let borderRadius = '60px';
        let width = '380px';
        let height = '380px';

        if (shape === 'circle') {
            borderRadius = '50%';
        } else if (shape === 'd-shape') {
            borderRadius = '80px 220px 220px 80px';
        }

        return {
            backgroundColor: color,
            borderRadius,
            width,
            height
        };
    };

    return (
        <div className="flex-shrink-0 relative group">
            <motion.div
                ref={cardRef}
                whileHover={{ scale: 1.05, rotate: index % 2 === 0 ? 2 : -2 }}
                className="flex flex-col items-center justify-center p-12 transition-all duration-500 shadow-[0_20px_50px_rgba(0,0,0,0.3)] border-4 border-black/5"
                style={getCardStyle()}
            >
                {/* Icon Container */}
                <div className="mb-6 flex items-center justify-center">
                    <Icon size={80} strokeWidth={1.5} className="text-black/80 drop-shadow-lg" />
                </div>

                {/* Text Content */}
                <div className="text-center">
                    <h3 className="text-black text-4xl font-[1000] uppercase tracking-tighter leading-none mb-2">
                        {title}
                    </h3>
                    <p className="text-black/60 text-xs font-black uppercase tracking-[0.2em]">
                        {subtext}
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

const HowItWorks = () => {
    const sectionRef = useRef(null);
    const scrollContainerRef = useRef(null);

    const workflowSteps = [
        {
            title: "Planner",
            subtext: "AI Itineraries",
            color: "#8B8Aff", // Light Purple
            shape: "circle",
            Icon: Music // Approximate look from image (Music note)
        },
        {
            title: "Budget",
            subtext: "Smart Tracking",
            color: "#16A34A", // Vibrant Green
            shape: "square",
            Icon: Clapperboard // Approximate (Board)
        },
        {
            title: "Support",
            subtext: "24/7 Agent",
            color: "#F97316", // Vibrant Orange
            shape: "d-shape",
            Icon: Ghost // Approximate (Ghost)
        },
        {
            title: "Gems",
            subtext: "Hidden Places",
            color: "#FACC15", // Vibrant Yellow
            shape: "square",
            Icon: ShoppingBag // Approximate (Bag)
        },
        {
            title: "Booking",
            subtext: "Seamless",
            color: "#3B82F6", // Vibrant Blue
            shape: "circle",
            Icon: Shirt // Approximate (Coat)
        }
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            const container = scrollContainerRef.current;
            const totalWidth = container.scrollWidth - window.innerWidth;

            gsap.to(container, {
                x: -totalWidth,
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    pin: true,
                    start: "top top",
                    end: () => `+=${totalWidth + 1000}`,
                    scrub: 1,
                    invalidateOnRefresh: true,
                }
            });

            // Gentle float effect for particles
            gsap.to(".bg-sparkle", {
                y: "random(-100, 100)",
                x: "random(-100, 100)",
                duration: "random(5, 10)",
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                stagger: 0.1
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="how-it-works"
            ref={sectionRef}
            className="w-full bg-black h-screen overflow-hidden relative flex flex-col justify-center py-20"
        >
            {/* Background Aesthetics */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                {/* Visual particles for high-end feel */}
                {Array.from({ length: 30 }).map((_, i) => (
                    <div
                        key={i}
                        className="bg-sparkle absolute w-1 h-1 bg-white/20 rounded-full"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`
                        }}
                    />
                ))}
            </div>

            <div className="px-16 mb-16 relative z-10">
                <h2 className="text-white text-[clamp(2.5rem,6vw,9rem)] font-[1000] uppercase tracking-tighter leading-[0.8]">
                    Workflow <br />
                    <span className="text-white/10 uppercase italic">Architectures</span>
                </h2>
            </div>

            <div className="relative z-10 w-full overflow-hidden flex items-center">
                <div
                    ref={scrollContainerRef}
                    className="flex items-center gap-16 h-max px-16 pr-[40vw]"
                >
                    {workflowSteps.map((step, index) => (
                        <WorkflowCard
                            key={index}
                            {...step}
                            index={index}
                        />
                    ))}
                </div>
            </div>

            {/* Side Label */}
            <div className="absolute right-12 top-1/2 -translate-y-1/2 rotate-90 z-10">
                <span className="text-white/5 font-mono text-[10px] tracking-[2em] whitespace-nowrap">SYSTEM_DEPLOYMENT</span>
            </div>

            {/* Interaction Hint */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-20 text-white uppercase font-black text-[9px] tracking-[0.5em] animate-pulse">
                Swipe to Explore the Loop
            </div>
        </section>
    );
};

export default HowItWorks;
