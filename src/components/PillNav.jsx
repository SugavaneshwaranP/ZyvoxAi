import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const NavButton = ({ item, isActive, onClick, className, children }) => {
    const isHash = item.href.startsWith('#');

    const handleClick = (e) => {
        if (isHash) {
            const id = item.href.substring(1);
            const el = document.getElementById(id);
            if (el) {
                e.preventDefault();
                el.scrollIntoView({ behavior: 'smooth' });
                window.history.pushState(null, null, item.href);
            }
        }
        if (onClick) onClick();
    };

    if (isHash) {
        return (
            <a href={item.href} onClick={handleClick} className={className}>
                {children}
            </a>
        );
    }

    return (
        <Link to={item.href} onClick={handleClick} className={className}>
            {children}
        </Link>
    );
};

const PillNav = ({
    items = [],
    activeHref,
    logo,
    logoAlt = 'Logo'
}) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 100);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isDocked = isScrolled && !isHovered;
    const navItems = items || [];

    return (
        <div className="fixed top-0 left-0 w-full z-[99999] pointer-events-none p-6">
            <motion.nav
                layout
                initial={false}
                animate={{
                    left: isScrolled ? '24px' : '50%',
                    x: isScrolled ? '0%' : '-50%',
                    top: '24px',
                }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className={`
                    pointer-events-auto relative flex items-center gap-2 p-1.5 
                    bg-[#050505]/80 backdrop-blur-2xl border border-white/10 
                    rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.1)]
                    overflow-hidden max-w-max
                `}
            >
                {/* Logo / Dock Icon */}
                <motion.div layout className="relative z-10">
                    <Link
                        to="/"
                        className="w-11 h-11 flex items-center justify-center bg-white/10 rounded-full hover:bg-white/20 transition-all active:scale-90"
                    >
                        {logo ? (
                            <img src={logo} alt={logoAlt} className="w-7 h-7 object-cover rounded-full" />
                        ) : (
                            <span className="text-xl"></span>
                        )}
                    </Link>
                </motion.div>

                {/* Links Container */}
                <motion.div
                    layout
                    initial={false}
                    animate={{
                        width: isDocked ? 0 : 'auto',
                        opacity: isDocked ? 0 : 1,
                        marginLeft: isDocked ? 0 : 4,
                        marginRight: isDocked ? 0 : 8,
                    }}
                    transition={{ type: "spring", stiffness: 500, damping: 35 }}
                    className="flex items-center gap-1 overflow-hidden whitespace-nowrap"
                >
                    {navItems.map((item) => {
                        const isActive = activeHref === item.href;
                        return (
                            <NavButton
                                key={item.href}
                                item={item}
                                isActive={isActive}
                                className={`
                                    px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-[2px]
                                    transition-all duration-300 relative group
                                    ${isActive
                                        ? 'text-black z-10'
                                        : 'text-white/60 hover:text-white hover:bg-white/5'}
                                `}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="active-nav-pill"
                                        className="absolute inset-0 bg-white rounded-full -z-10 shadow-[0_0_20px_rgba(255,255,255,0.4)]"
                                        transition={{ type: "spring", stiffness: 500, damping: 35 }}
                                    />
                                )}
                                {item.label}
                            </NavButton>
                        );
                    })}
                </motion.div>

                {/* Mobile Menu Toggle (Simplified) */}
                <motion.button
                    layout
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="md:hidden w-11 h-11 flex flex-col items-center justify-center gap-1.5 active:scale-95 transition-transform"
                >
                    <div className="w-5 h-0.5 bg-white rounded-full" />
                    <div className="w-5 h-0.5 bg-white rounded-full" />
                </motion.button>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        className="absolute top-24 left-6 right-6 p-4 bg-black/95 backdrop-blur-3xl border border-white/10 rounded-3xl pointer-events-auto md:hidden shadow-[0_40px_100px_rgba(0,0,0,0.9)]"
                    >
                        <motion.div
                            initial="closed"
                            animate="open"
                            variants={{
                                open: { transition: { staggerChildren: 0.05 } },
                                closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }
                            }}
                            className="flex flex-col gap-2"
                        >
                            {navItems.map((item) => (
                                <motion.div
                                    key={item.href}
                                    variants={{
                                        open: { opacity: 1, x: 0 },
                                        closed: { opacity: 0, x: -10 }
                                    }}
                                >
                                    <NavButton
                                        item={item}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="p-4 rounded-2xl bg-white/5 text-white font-bold uppercase tracking-widest text-center hover:bg-white/10 transition-colors block"
                                    >
                                        {item.label}
                                    </NavButton>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default PillNav;
