"use client";
import { useParams } from "react-router";
import { axiosInstance } from "../mediaApi/ApiInstance";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiShoppingCart, FiShield, FiRotateCw, FiTruck } from "react-icons/fi";

const ProductDetails = () => {
  const { productId } = useParams();
  const [singleProduct, setSingleProduct] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        let res = await axiosInstance(`/products/${productId}`);
        setSingleProduct(res.data.product);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      }
    })();
  }, [productId]);

  if (!singleProduct) {
    // Keeping your logic: replace with a high-end spinner later if needed
    return (
      <div className="h-screen bg-[#050505] flex items-center justify-center">
        <h1 className="text-[#C5A059] font-mono tracking-widest animate-pulse">SYNCHRONIZING...</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen  bg-[#050505] text-white pt-24 pb-12 px-6 md:px-12 selection:bg-[#C5A059] selection:text-black">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        
        {/* LEFT SIDE: VISUAL GALLERY */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="sticky top-32 space-y-6"
        >
          <div className="aspect-square bg-zinc-900/30 border border-zinc-800 rounded-[3rem] overflow-hidden flex items-center justify-center p-12 relative group">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(197,160,89,0.08)_0%,_transparent_70%)]" />
            
            <img 
              src={singleProduct.images?.[0] || "/placeholder.png"} 
              alt={singleProduct.productName}
              className="w-full h-full object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.8)] z-10 hover:scale-105 transition-transform duration-700"
            />
          </div>

          {/* Thumbnail Strip */}
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {singleProduct.images?.map((img, i) => (
              <div key={i} className="w-24 h-24 shrink-0 bg-zinc-900/50 border border-zinc-800 rounded-2xl p-2 cursor-pointer hover:border-[#C5A059] transition-all">
                <img src={img} className="w-full h-full object-contain" alt="preview" />
              </div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT SIDE: TECHNICAL SPECS & INFO */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-10"
        >
          {/* Header Info */}
          <div>
            <span className="text-[#C5A059] font-mono text-[10px] uppercase tracking-[0.5em] mb-4 block">
              {singleProduct.brand} // OFFICIAL COLLECTION
            </span>
            <h1 className="text-6xl font-light uppercase italic tracking-tighter leading-none mb-4">
              {singleProduct.productName}
            </h1>
            <p className="text-zinc-500 font-mono text-xs leading-relaxed uppercase tracking-widest max-w-lg">
              {singleProduct.description}
            </p>
          </div>

          {/* Price & Primary Action */}
          <div className="bg-zinc-900/40 border border-zinc-800 p-8 rounded-4xl flex items-center justify-between">
            <div>
              <p className="text-[8px] text-zinc-600 uppercase tracking-widest font-mono mb-1">Retail Valuation</p>
              <h3 className="text-4xl font-bold tracking-tighter text-[#C5A059]">
                {singleProduct.price?.currency === "USD" ? "$" : "₹"}{singleProduct.price?.amount?.toLocaleString()}
              </h3>
            </div>
            <button className="bg-[#C5A059] text-black px-12 py-5 rounded-2xl font-black uppercase text-xs tracking-widest shadow-[0_10px_30px_rgba(197,160,89,0.2)] hover:bg-white transition-all group flex items-center gap-3">
              Add to Cart <FiShoppingCart size={16} />
            </button>
          </div>

          {/* Technical Specifications Grid */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400 mb-6 border-b border-zinc-800 pb-2">Technical Specs</h4>
            <div className="grid grid-cols-2 gap-y-8 gap-x-12">
              <SpecItem label="Movement" value={singleProduct.category} />
              <SpecItem label="Case Material" value={singleProduct.specifications?.caseMaterial} />
              <SpecItem label="Diameter" value={singleProduct.specifications?.caseDiameter} />
              <SpecItem label="Water Resistance" value={singleProduct.specifications?.waterResistance} />
              <SpecItem label="Inventory Status" value={singleProduct.stock > 0 ? "IN STOCK" : "OUT OF STOCK"} />
              <SpecItem label="Reference No." value={`#${productId.slice(-6).toUpperCase()}`} />
            </div>
          </div>

          {/* Luxury Service Badges */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-zinc-900">
            <ServiceBadge icon={<FiShield />} label="Lifetime Warranty" />
            <ServiceBadge icon={<FiRotateCw />} label="Precision Check" />
            <ServiceBadge icon={<FiTruck />} label="Insured Delivery" />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Internal Helper Components
const SpecItem = ({ label, value }) => (
  <div className="flex flex-col gap-1">
    <span className="text-[8px] text-zinc-600 uppercase tracking-widest font-mono">{label}</span>
    <span className="text-[11px] text-zinc-200 font-bold uppercase tracking-wider">{value || "N/A"}</span>
  </div>
);

const ServiceBadge = ({ icon, label }) => (
  <div className="flex flex-col items-center text-center gap-2 p-4 rounded-2xl border border-zinc-900/50">
    <div className="text-[#C5A059] text-xl">{icon}</div>
    <span className="text-[7px] text-zinc-500 uppercase tracking-widest font-bold">{label}</span>
  </div>
);

export default ProductDetails;