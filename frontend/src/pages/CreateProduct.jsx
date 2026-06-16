"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { axiosInstance } from "../mediaApi/ApiInstance";
import { motion, AnimatePresence } from "framer-motion";

const CreateProduct = () => {
  const { register, handleSubmit, reset } = useForm();
  const [preview, setPreview] = useState([]);

  const handlePreview = (e) => {
    const files = Array.from(e.target.files);
    setPreview(files.map((file) => URL.createObjectURL(file)));
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("productName", data.productName);
      formData.append("description", data.description);
      formData.append("brand", data.brand);
      formData.append("stock", data.stock);
      formData.append("category", data.category);

      // make them string other wise got 400 error 
     formData.append(
  "price",
  JSON.stringify({
    amount: data.amount,
    currency: data.currency
  })
);

formData.append(
  "specifications",
  JSON.stringify({
    caseMaterial: data.caseMaterial,
    caseDiameter: data.caseDiameter,
    waterResistance: data.waterResistance
  })
);

      for (let i = 0; i < data.images.length; i++) {
        formData.append("images", data.images[i]);
      }

      await axiosInstance.post("/products/create", formData);
      reset();
      setPreview([]);
    } catch (err) {
      console.log(err);
    }
  };

  // Reusable tailwind class for inputs to keep code clean
  const inputStyle = "bg-black/40 border border-zinc-800 p-4 rounded-xl text-white focus:border-[#C5A059] outline-none transition-all placeholder:text-zinc-700 font-mono text-xs uppercase tracking-wider w-full";

  return (
    <div className="min-h-screen bg-[#050505] py-30 px-4 relative overflow-hidden selection:bg-[#C5A059] selection:text-black">
      
      {/* Background Dial Detail */}
      <div className="absolute top-0 right-0 opacity-10 pointer-events-none translate-x-1/3 -translate-y-1/3">
        <div className="w-200 h-200 border border-[#C5A059] rounded-full" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto backdrop-blur-2xl bg-zinc-900/40 border border-zinc-800 p-8 md:p-12 rounded-[2.5rem] shadow-2xl relative z-10"
      >
        <div className="mb-12 border-b border-zinc-800 pb-8 flex justify-between items-end">
          <div>
            <span className="text-[10px] uppercase tracking-[0.5em] text-[#C5A059] font-mono mb-2 block">Catalog Provisioning</span>
            <h2 className="text-4xl font-light text-white uppercase italic tracking-tighter">
              Create <span className="font-bold">Product</span>
            </h2>
          </div>
          <div className="hidden md:block text-right font-mono text-[9px] text-zinc-600 uppercase">
            Protocol: 1805QM04 <br /> Status: Ready
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">

          {/* Core Info */}
          <div className="col-span-2">
            <label className="label-style">Watch Model Name</label>
            <input {...register("productName")} placeholder="Ex: Grand Tourer" className={inputStyle}/>
          </div>

          <div>
            <label className="label-style">Manufacturer / Brand</label>
            <input {...register("brand")} placeholder="PulseTime" className={inputStyle}/>
          </div>

          <div>
            <label className="label-style">Inventory Count</label>
            <input {...register("stock")} placeholder="00" className={inputStyle}/>
          </div>

          {/* Pricing & Category */}
          <div className="flex gap-2">
            <div className="grow">
              <label className="label-style">Valuation</label>
              <input {...register("amount")} placeholder="Amount" className={inputStyle}/>
            </div>
            <div className="w-28">
              <label className="label-style">Currency</label>
              <select {...register("currency")} className={`${inputStyle} appearance-none cursor-pointer`}>
                <option value="INR">INR</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="AUD">AUD</option>
              </select>
            </div>
          </div>

          <div>
            <label className="label-style">Classification</label>
            <select {...register("category")} className={`${inputStyle} appearance-none cursor-pointer text-[#C5A059]`}>
              <option value="Analog">Analog</option>
              <option value="Digital">Digital</option>
              <option value="Smart">Smart</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Analog-Digital">Analog-Digital</option>
            </select>
          </div>

          {/* Specifications Section */}
          <div className="col-span-2 grid grid-cols-3 gap-4 pt-4">
             <div className="col-span-3 h-px bg-zinc-800 mb-4" />
             <div>
               <label className="label-style">Case Material</label>
               <input {...register("caseMaterial")} placeholder="Steel/Gold" className={inputStyle}/>
             </div>
             <div>
               <label className="label-style">Diameter (mm)</label>
               <input {...register("caseDiameter")} placeholder="42mm" className={inputStyle}/>
             </div>
             <div>
               <label className="label-style">Water Res.</label>
               <input {...register("waterResistance")} placeholder="50m" className={inputStyle}/>
             </div>
          </div>

          <div className="col-span-2">
            <label className="label-style">Technical Description</label>
            <textarea {...register("description")} placeholder="Describe the movement and design..."
              className={`${inputStyle} h-32 resize-none`}/>
          </div>

          {/* Upload Section */}
          <div className="col-span-2">
            <label className="label-style">Visual Assets (Multi-Select)</label>
            <div className="relative group">
               <input
                type="file"
                multiple
                {...register("images")}
                onChange={handlePreview}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
              />
              <div className="w-full border-2 border-dashed border-zinc-800 p-10 rounded-2xl flex flex-col items-center justify-center group-hover:border-[#C5A059]/50 transition-colors bg-black/20">
                <svg className="w-10 h-10 text-zinc-700 mb-4 group-hover:text-[#C5A059] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                <span className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase">Sync High-Res Frames</span>
              </div>
            </div>

            {/* Live Gallery Preview */}
            <AnimatePresence>
              {preview.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="flex gap-4 mt-6 flex-wrap p-4 bg-zinc-950/50 rounded-2xl border border-zinc-800"
                >
                  {preview.map((src, i) => (
                    <motion.div 
                      key={i} 
                      whileHover={{ scale: 1.1 }}
                      className="relative w-24 h-24 rounded-lg overflow-hidden border border-[#C5A059]/30 group"
                    >
                      <img src={src} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"/>
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-[8px] text-[#C5A059] font-mono">FRAME_{i+1}</span>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <motion.button
            whileHover={{ scale: 1.01, backgroundColor: "#D4B370" }}
            whileTap={{ scale: 0.99 }}
            className="col-span-2 bg-[#C5A059] text-black py-5 rounded-2xl font-black uppercase tracking-[0.4em] text-xs shadow-[0_10px_30px_rgba(197,160,89,0.2)]"
          >
            Deploy to Collection
          </motion.button>

        </form>
      </motion.div>
      
      {/* Global CSS for the label style */}
      <style >{`
        .label-style {
          display: block;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: #71717a;
          margin-bottom: 0.5rem;
          margin-left: 0.25rem;
        }
      `}</style>
    </div>
  );
};

export default CreateProduct;