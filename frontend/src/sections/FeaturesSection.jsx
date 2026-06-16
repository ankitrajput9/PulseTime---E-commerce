"use client";
import React from "react";
import { motion } from "framer-motion";
import { FiSettings, FiTarget, FiShield } from "react-icons/fi";

const FeaturesSection = () => {
  const features = [
    {
      icon: <FiSettings className="text-[#C5A059]" />,
      title: "Caliper Precision",
      desc: "Our movements are calibrated to a tolerance of 0.001mm for absolute accuracy."
    },
    {
      icon: <FiTarget className="text-[#C5A059]" />,
      title: "Tourbillon Tech",
      desc: "Counteracting gravity through advanced rotating escapement engineering."
    },
    {
      icon: <FiShield className="text-[#C5A059]" />,
      title: "Sapphire Armor",
      desc: "Vickers scale 9 hardness rating, ensuring your timepiece remains flawless."
    }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center   overflow-hidden bg-black">
      
      {/* --- BACKGROUND VIDEO LAYER --- */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-60"
        >
          {/* REPLACE WITH YOUR VIDEO PATH */}
          <source src="/feature-BG.mp4" type="video/mp4" />
        </video>
        {/* Dark Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-linear-to-b from-black via-transparent to-black opacity-80" />
      </div>

      {/* --- CONTENT LAYER --- */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 w-full space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* LEFT SIDE: PRIMARY TEXT */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[#C5A059] font-mono text-xs tracking-[0.5em] uppercase mb-4 block">
              Horological Mastery
            </span>
            <h2 className="text-6xl md:text-7xl font-light text-white uppercase italic tracking-tighter leading-none mb-8">
              Engineered <br />
              <span className="font-bold text-[#C5A059]">Beyond Time.</span>
            </h2>
            <p className="text-zinc-300 font-mono text-sm leading-relaxed uppercase tracking-[0.2em] max-w-md backdrop-blur-sm bg-black/10 p-4 rounded-lg border-l border-[#C5A059]/30">
              Every PulseTime piece undergoes 400 hours of rigorous calibration to ensure the internal pulse never misses a beat.
            </p>
          </motion.div>

          {/* RIGHT SIDE: FEATURE LIST */}
          {/* <div className="space-y-6">
            {features.map((f, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.6 }}
                className="flex items-center gap-6 p-6 rounded-[2rem] bg-zinc-950/40 backdrop-blur-md border border-zinc-800/50 hover:border-[#C5A059]/40 transition-all duration-500 group"
              >
                <div className="w-16 h-16 rounded-2xl bg-black border border-zinc-800 flex items-center justify-center text-2xl group-hover:shadow-[0_0_20px_rgba(197,160,89,0.2)] transition-all">
                  {f.icon}
                </div>
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-widest text-white mb-1 group-hover:text-[#C5A059] transition-colors">
                    {f.title}
                  </h4>
                  <p className="text-[10px] text-zinc-400 font-mono uppercase tracking-wider leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div> */}
        </div>
      </div>

      {/* FOOTER DECORATION */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4 opacity-30">
        <div className="h-px w-20 bg-[#C5A059]" />
        <span className="text-[10px] text-white font-mono tracking-[1em] uppercase">Mechanical Status: Active</span>
        <div className="h-px w-20 bg-[#C5A059]" />
      </div>
    </section>
  );
};

export default FeaturesSection;