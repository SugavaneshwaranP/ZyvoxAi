import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { User, Plane, Globe, Activity, ArrowRight, Layout, Link as LinkIcon, Check, Bell } from 'lucide-react';

const Footer = () => {
    const containerRef = useRef(null);
    const [showNotification, setShowNotification] = useState(false);

    const handleSubscribe = () => {
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 4000);
    };

    // Track scroll progress of the entire container
    // Offset "start start", "end end" is crucial for the 500vh pin duration
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // 1. Text Scaling & Opacity (Exact Template Ranges)
    const textScale = useTransform(scrollYProgress, [0, 0.4], [1, 12]);
    const textOpacity = useTransform(scrollYProgress, [0.35, 0.45], [1, 0]);

    // 2. Floating Badges Parallax (Exact Template Ranges)
    const badgeY1 = useTransform(scrollYProgress, [0, 0.4], [0, -200]);
    const badgeY2 = useTransform(scrollYProgress, [0, 0.4], [0, 150]);

    // 3. Arrow Transitions (Exact Template Ranges & Colors)
    const arrow1X = useTransform(scrollYProgress, [0.3, 0.6], ["100%", "-100%"]);
    const arrow2X = useTransform(scrollYProgress, [0.4, 0.7], ["100%", "-100%"]);
    const arrow3X = useTransform(scrollYProgress, [0.5, 0.8], ["100%", "-100%"]);

    // 4. Content Reveal (Exact Template Ranges)
    const contentOpacity = useTransform(scrollYProgress, [0.7, 0.9], [0, 1]);
    const contentY = useTransform(scrollYProgress, [0.7, 0.9], [100, 0]);

    return (
        <div ref={containerRef} className="relative bg-black h-[500vh] w-full">
            {/* Sticky Wrapper - Pins content to viewport */}
            <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center bg-black z-[100]">

                {/* HERO SECTION: Text and Badges */}
                <motion.div
                    style={{ scale: textScale, opacity: textOpacity }}
                    className="relative z-10 flex flex-col items-center text-center px-4"
                >
                    <h1 className="text-white text-7xl md:text-9xl font-black uppercase tracking-tighter leading-[0.85]">
                        Designing <br /> Your Next <br /> Odyssey
                    </h1>

                    {/* Badges - Positioned exactly as template */}
                    <motion.div style={{ y: badgeY1 }} className="absolute top-0 -left-10 bg-[#D94827] px-3 py-1 rounded-lg flex items-center gap-2 text-xs font-bold text-white rotate-[-5deg]">
                        <Layout size={14} /> G.A.T.E.S.
                    </motion.div>
                    <motion.div style={{ y: badgeY2 }} className="absolute bottom-1/4 -right-5 bg-[#6366F1] px-3 py-1 rounded-lg flex items-center gap-2 text-xs font-bold text-white rotate-[8deg]">
                        <Activity size={14} /> ACTIVE_SYNC
                    </motion.div>
                    <motion.div className="absolute bottom-0 left-1/4 bg-[#FACC15] px-3 py-1 rounded-lg flex items-center gap-2 text-xs font-bold text-black border border-black/10">
                        <LinkIcon size={14} /> CONNECTIONS
                    </motion.div>
                </motion.div>

                {/* Subtext (Static until fade) */}
                <motion.p
                    style={{ opacity: textOpacity }}
                    className="absolute bottom-10 max-w-md text-center text-gray-400 text-sm z-10 uppercase tracking-widest font-black"
                >
                    Join a community building the next era of <br /> autonomous travel experiences.
                </motion.p>

                {/* ARROW TRANSITION LAYER */}
                <div className="absolute inset-0 z-20 pointer-events-none">
                    <motion.div
                        style={{ x: arrow1X, clipPath: 'polygon(0% 0%, 90% 0%, 100% 50%, 90% 100%, 0% 100%)' }}
                        className="absolute top-[0%] h-[34%] w-[150%] bg-[#D94827]"
                    />
                    <motion.div
                        style={{ x: arrow2X, clipPath: 'polygon(0% 0%, 90% 0%, 100% 50%, 90% 100%, 0% 100%)' }}
                        className="absolute top-[33%] h-[34%] w-[150%] bg-[#6366F1]"
                    />
                    <motion.div
                        style={{ x: arrow3X, clipPath: 'polygon(0% 0%, 90% 0%, 100% 50%, 90% 100%, 0% 100%)' }}
                        className="absolute top-[66%] h-[35%] w-[150%] bg-[#FACC15]"
                    />
                </div>

                {/* FINAL CONTENT SECTION */}
                <motion.div
                    style={{ opacity: contentOpacity, y: contentY }}
                    className="absolute inset-0 z-30 bg-white flex flex-col p-6 md:p-12"
                >
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 items-center max-w-7xl mx-auto w-full">
                        {/* Travel Illustration */}
                        <div className="bg-gray-100 rounded-3xl h-[45vh] md:h-full flex items-center justify-center overflow-hidden border border-gray-200">
                            <img
                                src="/assets/features/wp4069431.jpg"
                                alt="Travel Destination"
                                className="object-cover h-full w-full grayscale hover:grayscale-0 transition-all duration-1000"
                            />
                        </div>

                        {/* CTA Card */}
                        <div className="bg-[#6366F1] rounded-3xl p-10 text-white flex flex-col justify-between h-full shadow-2xl">
                            <div>
                                <h2 className="text-5xl md:text-7xl font-bold mb-4 tracking-tighter leading-none">Ready to <br /> Depart?</h2>
                                <p className="text-indigo-100 font-medium text-lg">Join the community of travelers reshaping global exploration with AI precision.</p>
                            </div>
                            <Link to="/signup" className="mt-8 bg-black text-white rounded-full py-4 px-8 flex items-center justify-between font-bold group hover:bg-[#D94827] transition-all duration-300">
                                <span className="flex items-center gap-4">
                                    <User className="bg-white/10 rounded-full p-2" size={32} />
                                    LAUNCH
                                </span>
                                <span className="group-hover:translate-x-3 transition-transform text-xl">→</span>
                            </Link>
                        </div>
                    </div>

                    {/* Footer Area */}
                    <footer className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-8 border-t border-gray-100 pt-8 text-black w-full max-w-7xl mx-auto mb-10">
                        <div>
                            <h4 className="font-bold text-gray-400 uppercase text-[10px] tracking-widest mb-4">Experience</h4>
                            <ul className="space-y-2 font-black text-sm uppercase">
                                <li className="hover:text-[#6366F1] cursor-pointer">Destinations</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-400 uppercase text-[10px] tracking-widest mb-4">Connect with us</h4>
                            <div className="flex flex-col gap-3">
                                <button
                                    onClick={handleSubscribe}
                                    className="bg-black text-white px-6 py-2 rounded-full font-black text-xs uppercase tracking-widest hover:bg-[#D94827] transition-colors flex items-center gap-2 w-fit group"
                                >
                                    <Bell size={12} className="group-hover:rotate-12 transition-transform" />
                                    Subscribe
                                </button>
                                <p className="text-[10px] uppercase font-bold text-gray-400 max-w-[150px] leading-tight opacity-60">
                                    Join our exclusive network for updates.
                                </p>
                            </div>
                        </div>
                        <div className="col-span-2 flex flex-col md:items-end gap-6 justify-between">
                            <div className="flex gap-2">
                                {['X', 'Discord', 'Instagram'].map(social => (
                                    <button key={social} className="px-6 py-2 border border-gray-200 rounded-full font-black text-[10px] tracking-widest hover:bg-black hover:text-white transition-all uppercase">
                                        {social}
                                    </button>
                                ))}
                            </div>
                            <p className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">© 2025 ANTIGRAVITY_TRAVEL_AGENT</p>
                        </div>
                    </footer>
                </motion.div>
            </div>
            {/* Custom Subscription Notification */}
            <AnimatePresence>
                {showNotification && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="fixed bottom-10 right-10 z-[110] bg-white border-[3px] border-black shadow-[8px_8px_0px_#000] rounded-2xl p-6 max-w-sm"
                    >
                        <div className="flex items-start gap-4">
                            <div className="bg-[#B6FF33] p-2 rounded-full border-2 border-black">
                                <Check size={20} className="text-black" />
                            </div>
                            <div>
                                <h4 className="font-black uppercase text-lg leading-none mb-1">Subscribed!</h4>
                                <p className="text-sm font-bold text-gray-600 leading-tight">
                                    You're in. We'll notify you about our next planetary launch.
                                </p>
                            </div>
                        </div>
                        {/* Progress bar timer */}
                        <motion.div
                            initial={{ width: "100%" }}
                            animate={{ width: "0%" }}
                            transition={{ duration: 4, ease: "linear" }}
                            className="absolute bottom-0 left-0 h-1 bg-black"
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Footer;
