import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useScroll, useTransform } from 'framer-motion';
import DecryptedText from './DecryptedText';

gsap.registerPlugin(ScrollTrigger);

const SectionWipe = ({ containerRef }) => {
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "start start"]
    });

    // Sweep from -120% to 120% as we scroll into the section
    const sweepX = useTransform(scrollYProgress, [0, 1], ["-120%", "120%"]);
    const sweepY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

    const layers = [
        { color: '#7B61FF' },
        { color: '#B6FF33' },
        { color: '#FFC700' },
        { color: '#A0D7FB' },
        { color: '#F8F6E9' },
    ];

    return (
        <div className="absolute inset-0 pointer-events-none z-[50] overflow-hidden">
            {layers.map((layer, i) => (
                <motion.div
                    key={i}
                    style={{
                        x: sweepX,
                        y: sweepY,
                        backgroundColor: layer.color,
                        clipPath: 'polygon(0% 0%, 85% 0%, 100% 100%, 0% 100%)',
                        zIndex: 100 - i,
                        rotate: -15,
                        scaleY: 1.5,
                        transition: { delay: i * 0.01 }
                    }}
                    className="absolute inset-0 w-[150vw] h-[120vh] -top-[10vh]"
                />
            ))}
        </div>
    );
};

const Destinations = () => {
    const sectionRef = useRef(null);
    const contentRef = useRef(null);
    const counterRef = useRef(null);
    const progressRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // 1. Color Wash Transition - REMOVED, replaced by SectionWipe component

            // 2. Content Reveal
            gsap.from(contentRef.current, {
                opacity: 0,
                y: 100,
                duration: 1.5,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 100%",
                }
            });

            // 3. Counting Effect for Progress Card
            const countObj = { val: 0 };
            gsap.to(countObj, {
                val: 94,
                duration: 1.5,
                delay: 0.5, // Wait for the color wash to settle
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 90%",
                },
                onStart: () => {
                    gsap.to(".status-text", { opacity: 0.4, repeat: 5, yoyo: true, duration: 0.2 });
                },
                onUpdate: () => {
                    if (counterRef.current) {
                        counterRef.current.innerText = Math.floor(countObj.val) + "%";
                    }
                    if (progressRef.current) {
                        progressRef.current.style.width = countObj.val + "%";
                    }
                },
                onComplete: () => {
                    gsap.to(".status-text", { opacity: 1, duration: 0.5 });
                }
            });

            // 4. Parallax Floating Character
            gsap.to(".traveler-asset", {
                y: -30,
                duration: 2.5,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });

            // 5. Scroll-linked Destination Cards Animation
            gsap.to(".dest-cards-container", {
                y: -400, // Move cards up
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1.5,
                }
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="destinations"
            ref={sectionRef}
            className="w-full min-h-screen bg-[#7c3aed] relative overflow-hidden flex flex-col justify-center py-24 px-10 md:px-20"
        >
            {/* The Diagonal Wipe Transition */}
            <SectionWipe containerRef={sectionRef} />

            <div className="absolute inset-0 z-0 opacity-40">
                <svg className="w-full h-full" viewBox="0 0 1440 800" fill="none" preserveAspectRatio="none">
                    <path d="M1440 800V0C1300 150 1100 50 900 200C700 350 500 250 300 400C100 550 0 450 0 600V800H1440Z" fill="#5b21b6" />
                    <path d="M0 800V200C150 350 350 250 550 400C750 550 950 450 1150 600C1350 750 1440 650 1440 800H0Z" fill="#4c1d95" opacity="0.5" />
                </svg>
            </div>

            <div ref={contentRef} className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center max-w-7xl mx-auto w-full">
                {/* Left Content */}
                <div className="flex flex-col items-start space-y-12">
                    <span className="text-white/60 font-black uppercase tracking-[0.4em] text-xs">Your Navigator</span>

                    <h2 className="text-white text-4xl md:text-6xl font-black uppercase tracking-tighter leading-[0.9]">
                        <DecryptedText text="Exploring shouldn't" animateOn="view" revealDirection="start" speed={40} className="text-white" encryptedClassName="text-white/30" /> <br />
                        <span className="text-black bg-white px-2 inline-block my-1">
                            <DecryptedText text="cost your privacy." animateOn="view" revealDirection="start" speed={40} delay={0.5} className="text-black" encryptedClassName="text-black/30" />
                        </span> <br />
                        <DecryptedText text="Zyvox is your guard." animateOn="view" revealDirection="start" speed={40} delay={1} className="text-white" encryptedClassName="text-white/30" />
                    </h2>

                    <div className="space-y-6 w-full max-w-md">
                        <div className="bg-[#fbbf24] border-[3px] border-black p-6 rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                            <div className="flex justify-between items-end mb-4">
                                <span ref={counterRef} className="text-black font-black text-5xl">0%</span>
                                <span className="status-text text-black/60 font-bold text-[10px] uppercase text-right leading-none">
                                    Save <br /> your time...
                                </span>
                            </div>
                            <div className="w-full h-4 bg-black/10 rounded-full overflow-hidden border-2 border-black">
                                <div ref={progressRef} className="h-full bg-black w-[0%]" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Visual: Scrolling Destination Cards */}
                <div className="relative h-[600px] overflow-hidden flex items-center justify-center">
                    <div className="dest-cards-container flex flex-col gap-8 py-20">
                        {[
                            { name: "Tokyo", img: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=600&h=400" },
                            { name: "Santorini", img: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=600&h=400" },
                            { name: "New York", img: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=600&h=400" },
                            { name: "Bali", img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&h=400" },
                            { name: "Paris", img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&h=400" },
                            { name: "Kyoto", img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&h=400" }
                        ].map((dest, i) => (
                            <div key={i} className="dest-card relative w-[300px] md:w-[400px] aspect-[4/3] bg-black border-[4px] border-black rounded-3xl overflow-hidden shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] group hover:-translate-y-2 hover:-translate-x-2 hover:shadow-[20px_20px_0px_0px_rgba(0,0,0,1)] transition-all duration-300">
                                <img src={dest.img} alt={dest.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6">
                                    <span className="text-white font-black text-2xl uppercase tracking-tighter italic">{dest.name}</span>
                                    <span className="text-white/60 font-bold text-[10px] uppercase tracking-widest mt-1">Limited Availability</span>
                                </div>
                            </div>
                        ))}
                    </div>


                </div>
            </div>
        </section>
    );
};

export default Destinations;
