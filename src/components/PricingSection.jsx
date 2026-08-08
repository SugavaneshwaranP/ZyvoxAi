import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import ScrollReveal from './ScrollReveal';

/**
 * PRICING CARD COMPONENT
 */
const PricingCard = ({ title, price, features, color, buttonText, isPopular }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10%" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            whileHover={{ y: -10, rotate: isPopular ? 1 : -1 }}
            className={`relative p-8 rounded-[32px] border-[4px] border-black bg-white shadow-[12px_12px_0px_#000] flex flex-col h-full reveal-item ${isPopular ? 'z-10' : 'z-0'}`}
        >
            {isPopular && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[#B6FF33] border-2 border-black px-4 py-1 rounded-full font-black text-xs uppercase tracking-widest shadow-[4px_4px_0px_#000]">
                    Most Popular
                </div>
            )}
            <div className="mb-6">
                <h3 className="text-2xl font-black uppercase mb-2">{title}</h3>
                <div className="flex items-baseline">
                    <span className="text-5xl font-[1000] tracking-tighter">₹{price}</span>
                    <span className="text-gray-500 font-bold ml-1">/mo</span>
                </div>
            </div>
            <ul className="mb-8 flex-grow space-y-4">
                {features.map((feature, i) => (
                    <li key={i} className="flex items-start font-bold">
                        <span className="mr-2 mt-1 px-1">✦</span>
                        <span>{feature}</span>
                    </li>
                ))}
            </ul>
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ backgroundColor: color }}
                className="w-full py-4 rounded-2xl border-[3px] border-black font-black uppercase text-xl shadow-[6px_6px_0px_#000] transition-shadow hover:shadow-none"
            >
                {buttonText}
            </motion.button>
        </motion.div>
    );
};

const PricingSection = () => {
    const [billingCycle, setBillingCycle] = useState('monthly');
    const sectionRef = useRef(null);

    const pricingData = [
        {
            title: "Basic",
            monthlyPrice: 0,
            yearlyPrice: 0,
            features: ["Basic itinerary planning", "Destination guides", "1 active trip", "Community support"],
            color: "#A0D7FB",
            buttonText: "Start Exploring",
            isPopular: false
        },
        {
            title: "Explorer Plus",
            monthlyPrice: 499,
            yearlyPrice: 1499,
            features: ["Curated itineraries", "Priority booking", "5 active trips", "24/7 Chat support", "Travel insurance assistance"],
            color: "#B6FF33",
            buttonText: "Get Pro Nomad",
            isPopular: true
        },
        {
            title: "Global Voyager",
            monthlyPrice: 1999,
            yearlyPrice: 6999,
            features: ["Luxury concierge", "Private airport transfers", "Unlimited trips", "VIP lounge access", "Personal travel manager"],
            color: "#FFC700",
            buttonText: "Go Global",
            isPopular: false
        }
    ];

    return (
        <section id="pricing" ref={sectionRef} className="relative z-20 bg-[#F8F6E9] py-32 px-6 border-t-[6px] border-black text-[#111111] font-sans overflow-hidden">
            <ScrollReveal
                selector=".reveal-item"
                baseRotation={4}
                blurStrength={12}
                containerClassName="max-w-7xl mx-auto"
                scrollContainerRef={null}
            >
                <div className="flex flex-col items-center mb-20">
                    <h2 className="text-6xl md:text-[8vw] font-[1000] uppercase tracking-tighter leading-none text-center mb-12 reveal-item">
                        Plan your next <br /> <span className="text-[#7B61FF]">Adventure</span>
                    </h2>

                    {/* TOGGLE */}
                    <div className="flex items-center gap-4 bg-white p-2 rounded-full border-[3px] border-black shadow-[6px_6px_0px_#000] reveal-item">
                        <button
                            onClick={() => setBillingCycle('monthly')}
                            className={`px-8 py-3 rounded-full font-black uppercase text-sm transition-colors ${billingCycle === 'monthly' ? 'bg-[#111111] text-white' : 'text-[#111111] hover:bg-gray-100'}`}
                        >
                            Monthly
                        </button>
                        <button
                            onClick={() => setBillingCycle('yearly')}
                            className={`px-8 py-3 rounded-full font-black uppercase text-sm transition-colors ${billingCycle === 'yearly' ? 'bg-[#111111] text-white' : 'text-[#111111] hover:bg-gray-100'}`}
                        >
                            Yearly <span className="text-[#B6FF33] ml-1">(-30%)</span>
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {pricingData.map((plan) => (
                        <PricingCard
                            key={plan.title}
                            title={plan.title}
                            price={billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice}
                            features={plan.features}
                            color={plan.color}
                            buttonText={plan.buttonText}
                            isPopular={plan.isPopular}
                        />
                    ))}
                </div>
            </ScrollReveal>
        </section>
    );
};

export default PricingSection;
