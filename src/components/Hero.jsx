import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EncryptedText } from './EncryptedText';
import { Spotlight } from './Spotlight';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const cardsRef = useRef([]);
    const containerRef = useRef(null);
    const headerRef = useRef(null);

    const cards = [
        {
            title: "Planner",
            description: "AI Itineraries",
            color: "bg-[#7c7fff]",
            icon: "🎵",
            shape: "rounded-full"
        },
        {
            title: "Budget",
            description: "Smart Tracking",
            color: "bg-[#00a859]",
            icon: "🎬",
            shape: "rounded-[40px]"
        },
        {
            title: "Support",
            description: "24/7 Agent",
            color: "bg-[#ff6d38]",
            icon: "👻",
            shape: "rounded-[40px] rounded-r-[100px]"
        },
        {
            title: "Gems",
            description: "Hidden Places",
            color: "bg-[#ffc107]",
            icon: "🛍️",
            shape: "rounded-[40px]"
        },
        {
            title: "Booking",
            description: "Seamless",
            color: "bg-[#4a90e2]",
            icon: "👕",
            shape: "rounded-full"
        }
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            // 1. Entrance animation for header elements (excluding title which handles itself)
            gsap.from(headerRef.current.querySelectorAll('p, div'), {
                opacity: 0,
                y: 20,
                duration: 1,
                stagger: 0.15,
                ease: "power3.out"
            });

            // 2. High-Impact Timeline for Card Reveals
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "+=2000",
                    scrub: 1,
                    pin: true,
                    anticipatePin: 1
                }
            });

            // Initial card state - hidden and ready to slide up
            gsap.set(cardsRef.current, {
                opacity: 0,
                y: 60,
                rotate: -8,
                scale: 0.8,
                filter: "blur(12px) grayscale(1)"
            });

            // Highlight Cards one by one with a cinematic "scroll-in" effect
            cardsRef.current.forEach((card, index) => {
                if (!card) return;

                tl.to(card, {
                    opacity: 1,
                    y: 0,
                    rotate: 0,
                    scale: 1.1,
                    filter: "blur(0px) grayscale(0) brightness(1.2)",
                    duration: 2,
                    ease: "power2.out"
                })
                    .to(card, {
                        scale: 1,
                        filter: "blur(0px) grayscale(0) brightness(1)",
                        duration: 1,
                        ease: "power2.inOut"
                    }, ">-0.5");
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="hero-section min-h-screen w-full bg-black/[0.96] antialiased text-white flex flex-col items-center justify-center overflow-hidden relative">
            {/* New Spotlight Effect */}
            <Spotlight />

            {/* Optional subtle grid - although Spotlight has one, adding a custom overlay for depth */}
            <div className="absolute inset-0 h-full w-full bg-grid-white/[0.02] pointer-events-none z-0"></div>

            <div className="flex flex-col items-center w-full max-w-6xl mx-auto z-10 py-10">
                <div ref={headerRef} className="hero-content text-center mb-12 mt-10">
                    <h1 className="hero-title text-7xl md:text-[8rem] font-bold mb-4 tracking-tighter leading-[0.9] uppercase flex flex-col items-center">
                        <EncryptedText
                            text="Your travel"
                            revealDelayMs={50}
                            initialDelayMs={500}
                            encryptedClassName="text-neutral-500"
                            revealedClassName="text-white"
                        />
                        <EncryptedText
                            text="runs the world.."
                            revealDelayMs={50}
                            initialDelayMs={800}
                            encryptedClassName="text-neutral-500"
                            revealedClassName="text-white"
                            className="mt-2"
                        />
                    </h1>
                </div>

                <div className="w-full max-w-[1200px] flex flex-wrap justify-center gap-4 px-4 overflow-visible">
                    {cards.map((card, index) => (
                        <div
                            key={index}
                            ref={el => cardsRef.current[index] = el}
                            className={`${card.color} ${card.shape} hero-card w-[180px] h-[180px] p-4 flex flex-col justify-center items-center text-black relative group overflow-hidden transition-all duration-300 hover:scale-110 animate-blinking`}
                            style={{ animationDelay: `${index * 0.5}s` }}
                        >
                            <div className="text-5xl mb-3 group-hover:scale-125 transition-transform duration-500">{card.icon}</div>
                            <div className="text-center">
                                <h2 className="text-sm font-black uppercase leading-none tracking-tighter mb-1">
                                    {card.title}
                                </h2>
                                <p className="text-[8px] font-bold opacity-60 uppercase tracking-widest">
                                    {card.description}
                                </p>
                            </div>
                            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Hero;
