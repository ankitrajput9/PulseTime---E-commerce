"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const Preloader = () => {
  const containerRef = useRef();
  const bezelRef = useRef();
  const hourHandRef = useRef();
  const minuteHandRef = useRef();
  const secondHandRef = useRef();
  const textRef = useRef();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const tl = gsap.timeline();

    // 1. Initial Entrance
    tl.fromTo(containerRef.current, 
      { opacity: 0 }, 
      { opacity: 1, duration: 1 }
    );

    // 2. Mechanical Bezel Rotation (Constant)
    gsap.to(bezelRef.current, {
      rotate: 360,
      duration: 10,
      repeat: -1,
      ease: "linear",
    });

    // 3. Ticking Second Hand (Realistic Ticks)
    gsap.to(secondHandRef.current, {
      rotate: 360,
      duration: 60,
      repeat: -1,
      ease: "steps(60)", // Creates the mechanical ticking look
    });

    // 4. Smooth Minute Hand
    gsap.to(minuteHandRef.current, {
      rotate: 360,
      duration: 3600,
      repeat: -1,
      ease: "linear",
    });

    // 5. Loading Progress Logic
    let obj = { value: 0 };
    gsap.to(obj, {
      value: 100,
      duration: 4,
      ease: "power2.inOut",
      onUpdate: () => setProgress(Math.floor(obj.value)),
      onComplete: () => {
        // Exit Animation
        gsap.to(containerRef.current, {
          y: "-100%",
          duration: 1.2,
          ease: "expo.inOut",
          delay: 0.5,
          pointerEvents: "none"
        });
      }
    });

    // 6. Text Pulse
    gsap.fromTo(textRef.current, 
      { opacity: 0.3 }, 
      { opacity: 1, duration: 1, repeat: -1, yoyo: true, ease: "sine.inOut" }
    );

  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 flex flex-col items-center justify-center bg-[#050505] z-100 overflow-hidden"
    >
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#1a1a1a_0%,transparent_70%)] opacity-50" />

      {/* MECHANICAL WATCH PRELOADER */}
      <div className="relative w-80 h-80 flex items-center justify-center mb-12">
        
        {/* Outer Bezel (Copper/Gold Gradient) */}
        <div 
          ref={bezelRef}
          className="absolute inset-0 rounded-full border-[6px] border-[#C5A059]/30 shadow-[0_0_40px_rgba(197,160,89,0.1)]"
          style={{
            background: "conic-gradient(from 0deg, transparent, #C5A059, transparent, #C5A059, transparent)"
          }}
        >
          {/* Bezel Markers */}
          {[...Array(12)].map((_, i) => (
            <div 
              key={i} 
              className="absolute w-1 h-3 bg-[#C5A059] left-1/2 -translate-x-1/2 origin-[0_157px]"
              style={{ transform: `rotate(${i * 30}deg)` }}
            />
          ))}
        </div>

        {/* Watch Face (Brushed Texture) */}
        <div className="absolute inset-4 bg-[#0a0a0a] rounded-full flex items-center justify-center shadow-inner overflow-hidden border border-zinc-800">
           {/* Brushed lines pattern */}
           <div className="absolute inset-0 opacity-10 bg-[repeating-linear-gradient(90deg,#fff,#fff_1px,transparent_1px,transparent_4px)]" />
           
           {/* Inner Dial Markers */}
           {[...Array(60)].map((_, i) => (
             <div 
               key={i} 
               className={`absolute w-px bg-zinc-600 left-1/2 -translate-x-1/2 origin-[0_130px] ${i % 5 === 0 ? 'h-4 bg-zinc-400' : 'h-2'}`}
               style={{ transform: `rotate(${i * 6}deg)` }}
             />
           ))}

           {/* Watch Hands */}
           <div className="relative w-full h-full">
              {/* Center Pin */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#C5A059] rounded-full z-40 shadow-lg border border-black" />
              
              {/* Hour Hand */}
              <div 
                ref={hourHandRef}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full w-2 h-20 bg-zinc-400 rounded-full origin-bottom z-10"
                style={{ transform: 'rotate(90deg)' }}
              />

              {/* Minute Hand */}
              <div 
                ref={minuteHandRef}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full w-1.5 h-28 bg-zinc-200 rounded-full origin-bottom z-20"
                style={{ transform: 'rotate(200deg)' }}
              />

              {/* Second Hand (The Pulse) */}
              <div 
                ref={secondHandRef}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full w-px h-32 bg-[#C5A059] origin-bottom z-30 shadow-[0_0_10px_#C5A059]"
              />
           </div>
        </div>
      </div>

      {/* Text Elements */}
      <div className="text-center z-10">
        <h1 className="text-[#EAEAEA] text-4xl font-light tracking-[0.4em] uppercase mb-2">
          PULSE<span className="text-[#C5A059] font-bold">TIME</span>
        </h1>
        <p ref={textRef} className="text-zinc-500 font-mono text-xs tracking-[0.5em] uppercase mb-4">
          Synchronizing Calibration...
        </p>
        
        {/* Counter */}
        <div className="text-[#C5A059] font-mono text-2xl font-bold">
          {progress}<span className="text-sm ml-1">%</span>
        </div>
      </div>

      {/* Decorative Corner Details */}
      <div className="absolute bottom-10 left-10 text-[8px] font-mono text-zinc-800 tracking-widest leading-loose">
        REF. 1805QM04 <br />
        CALIBRE. V2.0
      </div>
    </div>
  );
};

export default Preloader;