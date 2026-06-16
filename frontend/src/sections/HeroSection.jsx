"use client";
import React, { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { FiArrowRight, FiArrowLeft } from "react-icons/fi";
import { axiosInstance } from "../mediaApi/ApiInstance";
import { useDispatch, useSelector } from "react-redux";
import { getproducts } from "../features/productSlice";

const HeroSection = () => {
  const { products } = useSelector((state) => state.products);
  const [index, setIndex] = useState(0);

  // ✅ ALWAYS CALL HOOKS (No condition above this)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["20deg", "-20deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-20deg", "20deg"]);

 
  // Reset index safely
  useEffect(() => {
    if (products && index >= products.length) {
      setIndex(0);
    }
  }, [products, index]);

  const currentProduct = products?.[index];

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const nextSlide = () =>
    setIndex((prev) =>
      products?.length ? (prev + 1) % products.length : 0
    );

  const prevSlide = () =>
    setIndex((prev) =>
      products?.length ? (prev - 1 + products.length) % products.length : 0
    );

  return (
    <section className="relative h-screen w-full bg-[#050505] flex items-center overflow-hidden selection:bg-[#C5A059] selection:text-black">
      
      {/* If no products show simple loading UI */}
      {!currentProduct ? (
        <div className="h-screen w-full flex items-center justify-center text-white text-xl">
          Loading Products...
        </div>
      ) : (
        <>
          {/* Background Watermark */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
            <motion.h1
              key={currentProduct.brand}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.03, scale: 1 }}
              transition={{ duration: 1.5 }}
              className="text-[20vw] font-black text-white tracking-tighter uppercase italic"
            >
              {currentProduct.brand}
            </motion.h1>
          </div>

          <div className="max-w-7xl mx-auto w-full px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">

            {/* LEFT SIDE */}
            <div className="order-2 lg:order-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentProduct._id}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.6 }}
                >
                  <span className="text-[#C5A059] px-4 font-mono text-xl tracking-[0.5em] uppercase mb-4 block">
                    {currentProduct.brand}
                  </span>

                  <h2 className="text-6xl md:text-7xl font-bold text-white uppercase italic tracking-tighter leading-tight mb-6">
                    {currentProduct.productName}
                  </h2>
                  <p className="text-[#C5A059] text-2xl font-bold mb-8">
                    ₹{currentProduct.price?.amount}{" "}
                    {currentProduct.price?.currency}
                  </p>

                  <div className="flex items-center gap-6">
                    <button className="bg-[#C5A059] text-black px-10 py-4 rounded-full font-black uppercase text-[10px] tracking-widest shadow-[0_10px_30px_rgba(197,160,89,0.3)] hover:scale-105 transition-transform">
                      Explore Specs
                    </button>

                    <div className="flex gap-4">
                      <button
                        onClick={prevSlide}
                        className="p-3 border border-zinc-800 rounded-full text-zinc-500 hover:text-[#C5A059] hover:border-[#C5A059] transition-all"
                      >
                        <FiArrowLeft size={20} />
                      </button>
                      <button
                        onClick={nextSlide}
                        className="p-3 border border-zinc-800 rounded-full text-zinc-500 hover:text-[#C5A059] hover:border-[#C5A059] transition-all"
                      >
                        <FiArrowRight size={20} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* RIGHT SIDE IMAGE */}
            <div
              className="order-1 lg:order-2 flex justify-center items-center h-150 perspective-[1000px]"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentProduct._id}
                  style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                  initial={{ opacity: 0, z: -200 }}
                  animate={{ opacity: 1, z: 0 }}
                  exit={{ opacity: 0, z: 200 }}
                  transition={{ duration: 0.8, ease: "circOut" }}
                  className="relative w-full h-full flex items-center justify-center"
                >
                  <div className="absolute w-96 h-96 bg-[#C5A059]/10 rounded-full blur-[120px] -z-10" />

                  <motion.div style={{ translateZ: 100 }}>
                    <img
                      src={currentProduct.images?.[0]}
                      alt={currentProduct.productName}
                      className="w-96 md:w-90 drop-shadow-[0_50px_100px_rgba(0,0,0,0.8)] pointer-events-none select-none"
                    />
                  </motion.div>

                  <motion.div
                    style={{ translateZ: -50 }}
                    animate={{ rotate: -360 }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 -z-20 w-[120%] h-[120%] border border-[#C5A059]/10 rounded-full border-dashed"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default HeroSection;