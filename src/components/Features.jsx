import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { StickyScrollReveal } from './StickyScrollReveal';
import TextType from './TextType';
import FloatingElements from './FloatingElements';

gsap.registerPlugin(ScrollTrigger);

const Features = () => {
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const gridRef = useRef(null);
    const runnerLeftRef = useRef(null);
    const runnerRightRef = useRef(null);
    const scanLinesRef = useRef(null);
    const progressRef = useRef({ top: null, right: null, bottom: null, left: null });

    const content = [
        {
            title: "AI-Powered Itinerary Planning",
            description: "Transform your travel dreams into reality with intelligent route optimization. Our AI analyzes millions of data points to craft the perfect journey tailored to your preferences, budget, and timeline.",
            content: (
                <div className="h-full w-full relative group">
                    <img src="/assets/features/1_MtZ0n0nFFWmebZTncI2sqA.jpg" alt="AI Travel Planning" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col items-center justify-end p-8 text-center">
                        <h3 className="text-3xl font-[1000] uppercase tracking-widest text-white drop-shadow-2xl">Smart Routes</h3>
                        <p className="mt-2 text-sm text-white/80 font-bold">AI-OPTIMIZED PATHWAYS</p>
                    </div>
                </div>
            ),
        },
        {
            title: "Global Destination Discovery",
            description: "Explore the world's most breathtaking locations with our curated destination database. From hidden gems to iconic landmarks, discover places that match your travel style and aspirations.",
            content: (
                <div className="h-full w-full relative group">
                    <img src="/assets/features/360_F_614228326_oNI45dDAFTzWlWIVFGpzmGjaotf331U6.jpg" alt="Global Destinations" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#7a78ff]/60 via-transparent to-black/70 flex flex-col items-center justify-center p-6 text-center">
                        <h3 className="text-3xl font-[1000] uppercase tracking-widest text-white drop-shadow-2xl">World Atlas</h3>
                        <div className="mt-4 flex gap-2">
                            <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-black text-white">195 COUNTRIES</span>
                            <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-black text-white">10K+ CITIES</span>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: "Seamless Travel Experience",
            description: "From booking to boarding, enjoy a frictionless travel experience. Our platform handles every detail—flights, accommodations, transfers, and activities—all synchronized in one elegant interface.",
            content: (
                <div className="h-full w-full relative group">
                    <img src="/assets/features/photo-1544620347-c4fd4a3d5957.jpg" alt="Seamless Travel" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                    <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center p-6 text-center backdrop-blur-[2px]">
                        <h3 className="text-3xl font-[1000] uppercase tracking-widest text-white drop-shadow-2xl">End-to-End</h3>
                        <p className="mt-3 text-sm font-mono text-[#7a78ff] tracking-wider">UNIFIED_BOOKING_SYSTEM</p>
                        <div className="mt-6 w-32 h-[2px] bg-white/60 animate-pulse" />
                    </div>
                </div>
            ),
        },
        {
            title: "Premium Travel Concierge",
            description: "Experience luxury travel redefined. Our elite concierge service provides 24/7 support, exclusive access to premium experiences, and personalized assistance throughout your journey.",
            content: (
                <div className="h-full w-full relative group">
                    <img src="/assets/features/wp4782898.jpg" alt="Premium Concierge" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/90 via-black/50 to-transparent flex flex-col items-center justify-center p-6 text-center">
                        <h3 className="text-3xl font-[1000] uppercase tracking-widest text-[#7a78ff] drop-shadow-2xl">VIP Access</h3>
                        <p className="mt-3 text-xs font-black text-white/90 tracking-widest">EXCLUSIVE EXPERIENCES</p>
                        <div className="mt-6 px-4 py-2 border-2 border-white/40 rounded-lg backdrop-blur-sm">
                            <span className="text-[10px] font-mono text-white">CONCIERGE_ACTIVE_247</span>
                        </div>
                    </div>
                </div>
            ),
        },
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            const scrollEnd = "+=3000";

            // Pin the section
            ScrollTrigger.create({
                trigger: sectionRef.current,
                start: "top top",
                end: scrollEnd,
                pin: true,
                scrub: 1
            });

            // 1. Elegant Title Reveal
            gsap.fromTo(titleRef.current,
                { opacity: 0, y: 50, scale: 0.9 },
                {
                    opacity: 1, y: 0, scale: 1,
                    duration: 1.5,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 40%"
                    }
                }
            );

            // 2. Dual Runner Text Parallax
            gsap.to(runnerLeftRef.current, {
                xPercent: -40,
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: scrollEnd,
                    scrub: 1
                }
            });

            gsap.to(runnerRightRef.current, {
                xPercent: 40,
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: scrollEnd,
                    scrub: 1
                }
            });

            // 3. Warping Grid Animation
            gsap.to(gridRef.current, {
                skewX: 10,
                scale: 1.1,
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: scrollEnd,
                    scrub: 2
                }
            });

            // 4. Scanning Lines Animation
            const lines = scanLinesRef.current.querySelectorAll('.scan-line');
            lines.forEach((line, i) => {
                gsap.to(line, {
                    y: "100%",
                    ease: "none",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top top",
                        end: scrollEnd,
                        scrub: 0.5 + (i * 0.2)
                    }
                });
            });

            // 5. Edge Progress Borders
            const progressTl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: scrollEnd,
                    scrub: 0.2
                }
            });

            progressTl
                .fromTo(progressRef.current.top, { scaleX: 0 }, { scaleX: 1, ease: "none" })
                .fromTo(progressRef.current.right, { scaleY: 0 }, { scaleY: 1, ease: "none" })
                .fromTo(progressRef.current.bottom, { scaleX: 0 }, { scaleX: 1, ease: "none" })
                .fromTo(progressRef.current.left, { scaleY: 0 }, { scaleY: 1, ease: "none" });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="features"
            ref={sectionRef}
            className="relative min-h-screen w-full bg-[#ff6d38] overflow-hidden flex flex-col items-center justify-center p-12"
        >
            {/* Edge Progress Borders */}
            <div ref={el => progressRef.current.top = el} className="absolute top-0 left-0 w-full h-[12px] bg-black z-50 origin-left" />
            <div ref={el => progressRef.current.right = el} className="absolute top-0 right-0 w-[12px] h-full bg-black z-50 origin-top" />
            <div ref={el => progressRef.current.bottom = el} className="absolute bottom-0 left-0 w-full h-[12px] bg-black z-50 origin-right" />
            <div ref={el => progressRef.current.left = el} className="absolute top-0 left-0 w-[12px] h-full bg-black z-50 origin-bottom" />

            {/* Background Layers */}
            <div className="absolute inset-0 z-0">
                {/* Warping Grid */}
                <div
                    ref={gridRef}
                    className="absolute inset-0 opacity-10 pointer-events-none"
                    style={{
                        backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
                        backgroundSize: '80px 80px'
                    }}
                />

                {/* Scanning Lines */}
                <div ref={scanLinesRef} className="absolute inset-0 pointer-events-none overflow-hidden">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="scan-line absolute w-full h-[2px] bg-[#7a78ff] opacity-20" />
                    ))}
                </div>

                {/* Dual Scrolling Text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none opacity-20">
                    <div ref={runnerLeftRef} className="whitespace-nowrap text-[25vw] font-[1000] uppercase tracking-tighter text-[#7a78ff]" style={{ opacity: 0.3 }}>
                        EXPLORE DISCOVER ADVENTURE IMMERSE NAVIGATE
                    </div>
                    <div ref={runnerRightRef} className="whitespace-nowrap text-[20vw] font-[1000] uppercase tracking-tighter text-black" style={{ opacity: 0.1 }}>
                        SERVICES BENEFITS TECH FUTURE LIMITLESS
                    </div>
                </div>

                <FloatingElements count={8} containerRef={sectionRef} />
            </div>

            <div className="w-full max-w-7xl mx-auto px-6 h-full flex flex-col items-center justify-center relative z-10">
                {/* Header Area */}
                <div className="text-center mb-8">
                    <h2 ref={titleRef} className="text-black text-[clamp(3.5rem,7vw,8rem)] font-[1000] uppercase tracking-tighter leading-[0.8]">
                        THE NEXT <br />
                        <TextType
                            text={['ERA', 'GEAR', 'PHASE']}
                            className="text-white mix-blend-difference"
                            cursorClassName="text-white"
                            cursorCharacter=""
                            typingSpeed={100}
                            deletingSpeed={50}
                            pauseDuration={2000}
                        />
                    </h2>
                </div>

                {/* STICKY SCROLL AREA */}
                <div className="w-full h-[70vh] rounded-[40px] border-[6px] border-black bg-white shadow-[20px_20px_0px_#000] overflow-hidden">
                    <StickyScrollReveal content={content} />
                </div>

                {/* SCROLL HINT */}
                <div className="mt-8 flex flex-col items-center opacity-70 animate-bounce">
                    <span className="text-black font-black text-[10px] tracking-widest uppercase">Syncing Travel Data</span>
                    <span className="text-xl mt-1 font-black">↓</span>
                </div>
            </div>
        </section>
    );
};

export default Features;

