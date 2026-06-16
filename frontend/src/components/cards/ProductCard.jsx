"use client";
import React from "react";
import { motion } from "framer-motion";
import { FiShoppingCart, FiZap } from "react-icons/fi";
import { useNavigate } from "react-router";
import { axiosInstance } from "../../mediaApi/ApiInstance";
import { useSelector } from "react-redux";

const ProductCard = ({ product }) => {
const {user}= useSelector((state)=> state.auth)

  const navigate = useNavigate()
const handleSingleProduct = () => {
try {
  navigate(`/home/products/${product._id}`)
} catch (error) {
  console.log("Error in sending single product details ")
}

}


const handleAddtoCart = async() => {

  const addtocart = await axiosInstance.post(`/cart/add/${product._id}/${user._id}`)

  console.log(addtocart)

}
 


  const { productName, brand, price, specifications, images, category, description } = product;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -6 }}
      className="group relative bg-zinc-900/40 border border-zinc-800 rounded-3xl overflow-hidden backdrop-blur-sm transition-all duration-500 hover:border-[#C5A059]/40 hover:shadow-[0_15px_40px_rgba(0,0,0,0.5)] max-w-sm"
     
    >
      {/* TOP BAR */}
      <div className="flex justify-between items-center p-4 pb-0">
        <span className="text-[8px] font-mono text-zinc-600 uppercase tracking-[0.3em]">
          {category} // {specifications?.caseDiameter || "42MM"}
        </span>
        <div className="h-2 w-2 rounded-full bg-[#C5A059] shadow-[0_0_8px_#C5A059]"></div>
      </div>

      {/* IMAGE SECTION */}
      <div className="relative h-48 w-full flex items-center justify-center p-6" 
       onClick={handleSingleProduct}
      >
        <motion.img
          whileHover={{ scale: 1.08 }}
          src={images && images[0] ? images[0] : "/placeholder-watch.png"}
          alt={productName}
          className="h-full object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.8)]"
        />
        {/* BRAND & NAME */}
        <div className="mb-3">
          <p className="text-[#C5A059] font-mono text-[9px] uppercase tracking-[0.3em] mb-1">
            {brand}
          </p>
          <h3 className="text-xl font-semibold text-white tracking-tight group-hover:text-[#C5A059] transition-colors">
            {productName}
          </h3>
        </div>
      </div>

      {/* DETAILS */}
      <div className="p-5 pt-0">

        {/* DESCRIPTION (Normal Font Added) */}
        <p className="text-sm text-zinc-400 mb-4 line-clamp-2">
          {description}
        </p>

        {/* TECH SPECS */}
        <div className="grid grid-cols-2 gap-4 mb-4 border-y border-zinc-800/50 py-3">
          <div className="flex flex-col">
            <span className="text-[8px] text-zinc-600 uppercase tracking-widest font-mono">
              Material
            </span>
            <span className="text-xs text-zinc-300 font-semibold">
              {specifications?.caseMaterial || "Steel"}
            </span>
          </div>
          <div className="flex flex-col border-l border-zinc-800 pl-3">
            <span className="text-[8px] text-zinc-600 uppercase tracking-widest font-mono">
              Resistance
            </span>
            <span className="text-xs text-zinc-300 font-semibold">
              {specifications?.waterResistance || "50M"}
            </span>
          </div>
        </div>

        {/* PRICE & BUTTONS */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[8px] text-zinc-500 uppercase tracking-widest font-mono">
              Price
            </span>
            <p className="text-lg font-bold text-white">
              {price?.currency === "USD" ? "$" : "₹"}
              {price?.amount?.toLocaleString()}
            </p>
          </div>

          {/* BUTTON GROUP */}
          <div className="flex gap-2">
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="flex items-center gap-1 bg-zinc-800 hover:bg-zinc-700 text-white px-3 py-2 rounded-lg text-xs transition-all"
             onClick={handleAddtoCart}            
            >
              <FiShoppingCart size={14} />
              Cart
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.9 }}
              className="flex items-center gap-1 bg-[#C5A059] hover:bg-white hover:text-black text-black px-4 py-2 rounded-lg text-xs font-bold transition-all"
            >
              Buy
              <FiZap size={12} />
            </motion.button>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="h-1 w-0 bg-[#C5A059] absolute bottom-0 left-0 transition-all duration-700 group-hover:w-full"></div>
    </motion.div>
  );
};

export default ProductCard;