"use client";
import React from "react";
import { motion } from "framer-motion";

const SpecificationVault = () => {
  return (
    <section className="relative bg-[#050505] py-32 px-4 overflow-hidden">
      {/* Decorative Technical Lines - Reverted to PulseTime Gold */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-lineaar-to-b from-[#C5A059] via-transparent to-[#C5A059]" />
        <div className="absolute top-1/2 left-0 w-full h-px bg-linear-to-r from-transparent via-zinc-800 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 relative z-10">
        
        {/* LEFT: THE HERITAGE BLOCK */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-[#C5A059] font-mono text-[10px] uppercase tracking-[0.6em] mb-6">
              Heritage // Est. 2026
            </h3>
            <h2 className="text-5xl font-bold text-white uppercase italic tracking-tighter leading-none mb-8">
              Legacy of <br />
              <span className="text-zinc-700 font-light">Mechanical</span> <br />
              Symmetry.
            </h2>
            <div className="w-20 h-1 bg-[#C5A059] mb-8" />
            <p className="text-zinc-500 font-mono text-xs leading-relaxed uppercase tracking-widest max-w-sm">
              Born from the pursuit of absolute chronometric performance, PulseTime represents the intersection of vintage aesthetics and modern caliber technology.
            </p>
          </motion.div>
        </div>

        {/* RIGHT: THE SPECIFICATION GRID */}
        <div className="lg:col-span-7">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-zinc-900 border border-zinc-900 rounded-[2.5rem] overflow-hidden shadow-2xl">
            
            <SpecCard 
              number="01" 
              title="Calibration" 
              value="400 Hours" 
              desc="Each movement is tested across 5 positions to ensure chronometer certification standards."
            />
            <SpecCard 
              number="02" 
              title="Material" 
              value="904L Steel" 
              desc="Utilizing high-grade aerospace steel for maximum corrosion resistance and mirror-finish luster."
            />
            <SpecCard 
              number="03" 
              title="Power" 
              value="72H Reserve" 
              desc="Bi-directional self-winding movement providing three full days of autonomous operation."
            />
            <SpecCard 
              number="04" 
              title="Water" 
              value="100 Meters" 
              desc="Triple-lock winding crown system ensuring hermetic seals for aquatic versatility."
            />

          </div>
        </div>
      </div>
    </section>
  );
};

// Internal Spec Component
const SpecCard = ({ number, title, value, desc }) => (
  <motion.div 
    whileHover={{ backgroundColor: "rgba(197, 160, 89, 0.03)" }}
    className="bg-[#050505] p-12 flex flex-col gap-8 group transition-colors duration-500"
  >
    <div className="flex justify-between items-start">
      <span className="text-zinc-900 font-black text-5xl group-hover:text-[#C5A059]/10 transition-colors duration-700">
        {number}
      </span>
      <div className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center text-[#C5A059] text-[12px] font-bold group-hover:border-[#C5A059]/50 transition-all">
        +
      </div>
    </div>
    
    <div>
      <h4 className="text-[#C5A059] font-mono text-[9px] uppercase tracking-[0.4em] mb-3">{title}</h4>
      <p className="text-white text-3xl font-bold uppercase tracking-tighter mb-4 italic">{value}</p>
      <p className="text-zinc-600 text-[10px] uppercase tracking-wider leading-relaxed font-mono">
        {desc}
      </p>
    </div>
  </motion.div>
);

export default SpecificationVault;