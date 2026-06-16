"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMinus, FiPlus, FiTrash2, FiShoppingBag, FiArrowRight } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "../mediaApi/ApiInstance";

const Cart = () => {
  // Logic preserved: Getting data from Redux and mapping it
  const dispatch = useDispatch()
  const { items } = useSelector((state) => state.cart);
const cartPRODUCTS = items.map((elem) => ({
  ...elem.product_id,
  quantity: elem.quantity
}));
  const [cartItems, setCartItems] = useState(cartPRODUCTS);

  // Sync state if Redux items change
useEffect(() => {
  setCartItems(
    items.map((elem) => ({
      ...elem.product_id,
      quantity: elem.quantity
    }))
  );
}, [items]);


  // Quantity Handlers (Logic preserved)
  const updateQuantity = (_id, delta) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === _id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
      )
    );
  };

  const removeItem = async(id) => {
    setCartItems((prev) => prev.filter((item) => item._id !== id));
  await axiosInstance.delete("/cart/delete/"+id) 
    dispatch(removeFromCart({_id:id}))
  };

  // Totals Calculation (Logic preserved)
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price.amount * item.quantity), 0);
  const shipping = subtotal > 0 ? "FREE" : 0;
  const total = subtotal;

  return (
    <div className="min-h-screen bg-[#050505] py-20 px-4 md:px-12 relative overflow-hidden selection:bg-[#C5A059] selection:text-black text-white">
      
      {/* Background Decorative Element */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none flex items-center justify-center select-none">
        <h1 className="text-[30vw] font-black italic tracking-tighter uppercase">BAG</h1>
      </div>

      <div className="max-w-8xl mx-auto relative z-10">
        <header className="mb-4 border-b border-zinc-900 pb-6 flex justify-between items-end">
          <div>
            <span className="text-[#C5A059] font-mono text-[10px] uppercase tracking-[0.5em] mb-3 block">Order Manifest</span>
            <h1 className="text-6xl font-light uppercase italic tracking-tighter">Selected <span className="font-bold">Chronographs</span></h1>
          </div>
          <div className="text-right">
             <span className="text-zinc-600 font-mono text-[10px] uppercase tracking-widest block mb-1">Status: Pending Acquisition</span>
             <span className="text-zinc-400 font-mono text-xs uppercase tracking-widest">{cartItems.length} Units</span>
          </div>
        </header>

        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
            
            {/* 1. PRODUCT LIST (Scrollable Section) */}
            <div className="lg:col-span-2 space-y-6">
              <AnimatePresence mode="popLayout">
                {cartItems.map((item) => (
                  <motion.div
                    key={item._id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    className="group bg-zinc-950/50 border border-zinc-900 p-8 rounded-[2.5rem] flex flex-col md:flex-row items-center gap-10 hover:border-[#C5A059]/20 transition-all duration-500 shadow-xl"
                  >
                    {/* Luxury Image Case */}
                    <div className="w-40 h-40 bg-black rounded-3xl p-6 shrink-0 border border-zinc-900 overflow-hidden relative group-hover:border-[#C5A059]/30 transition-colors">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,160,89,0.05)_0%,transparent_70%)]" />
                      <img src={item.images[0]} alt={item.productName} className="w-full h-full object-contain relative z-10 group-hover:scale-110 transition-transform duration-700" />
                    </div>

                    {/* Content Section */}
                    <div className="grow text-center md:text-left">
                      <p className="text-[#C5A059] font-mono text-[9px] uppercase tracking-[0.4em] mb-2 font-bold">{item.brand}</p>
                      <h3 className="text-2xl font-bold tracking-tight uppercase mb-2 text-white italic">{item.productName}</h3>
                      <div className="flex gap-4 justify-center md:justify-start">
                         <span className="text-[10px] text-zinc-500 font-mono border border-zinc-800 px-2 py-0.5 rounded uppercase">{item.specifications?.caseMaterial || "Steel"}</span>
                         <span className="text-[10px] text-zinc-500 font-mono border border-zinc-800 px-2 py-0.5 rounded uppercase">{item.specifications?.caseDiameter || "42mm"}</span>
                      </div>
                    </div>

                    {/* Mechanical Quantity Controls */}
                    <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-full p-1.5 shadow-inner">
                      <button
                        onClick={() => updateQuantity(item._id, -1)}
                        className="w-10 h-10 flex items-center justify-center hover:bg-zinc-800 rounded-full transition-all text-zinc-400 hover:text-white"
                      >
                        <FiMinus size={14} />
                      </button>
                      <span className="w-12 text-center font-mono text-sm font-black text-[#C5A059]">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item._id, 1)}
                        className="w-10 h-10 flex items-center justify-center hover:bg-zinc-800 rounded-full transition-all text-zinc-400 hover:text-white"
                      >
                        <FiPlus size={14} />
                      </button>
                    </div>

                    {/* Valuation & Delete */}
                    <div className="flex flex-col items-end min-w-35">
                      <span className="text-xl font-black tracking-tighter text-white">
                        ₹{(item.price.amount * item.quantity).toLocaleString()}
                      </span>
                      <button
                        onClick={() => removeItem(item._id)}
                        className="mt-4 text-zinc-700 hover:text-red-500 transition-all p-2 bg-zinc-900/50 rounded-full border border-transparent hover:border-red-900/30"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* 2. VALUATION SUMMARY (Sticky Section) */}
            <div className="lg:col-span-1 sticky top-32">
              <div className="bg-[#0A0A0A] border border-zinc-800 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden group">
                
                {/* Brushed Metal Texture Effect */}
                <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[repeating-linear-gradient(90deg,#fff,#fff_1px,transparent_1px,transparent_4px)]"></div>
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#C5A059]/5 blur-[80px] rounded-full group-hover:bg-[#C5A059]/10 transition-colors duration-700"></div>

                <h2 className="text-[11px] font-black uppercase tracking-[0.5em] text-[#C5A059] mb-10 border-b border-zinc-900 pb-5">Final Valuation</h2>

                <div className="space-y-7 mb-12">
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest">Chronograph Subtotal</span>
                    <span className="font-bold tracking-tighter text-zinc-200">₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest">Insured Logistics</span>
                    <span className="font-bold tracking-tighter text-[#C5A059]">{shipping}</span>
                  </div>
                  <div className="h-px bg-zinc-900 shadow-sm" />
                  <div className="flex justify-between items-end">
                    <span className="text-zinc-300 font-mono text-xs uppercase font-black tracking-tighter">Total Acquisition Value</span>
                    <span className="text-4xl font-black tracking-tighter text-[#C5A059] drop-shadow-lg">₹{total.toLocaleString()}</span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02, backgroundColor: "#fff", color: "#000" }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-[#C5A059] text-black py-6 rounded-3xl font-black uppercase tracking-[0.3em] text-[12px] shadow-[0_15px_35px_rgba(197,160,89,0.15)] flex items-center justify-center gap-4 transition-colors duration-500"
                >
                  Confirm Acquisition <FiArrowRight size={18} />
                </motion.button>

                <p className="text-[9px] text-zinc-700 font-mono text-center mt-8 uppercase tracking-[0.3em] leading-relaxed">
                  Secured Protocol <br /> Precision Guaranteed
                </p>
              </div>
            </div>

          </div>
        ) : (
          /* EMPTY STATE (Luxury Themed) */
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="py-32 flex flex-col items-center justify-center border border-dashed border-zinc-800 rounded-[4rem] bg-zinc-950/20 backdrop-blur-sm"
          >
            <div className="w-24 h-24 rounded-full border border-zinc-900 flex items-center justify-center mb-8 bg-black shadow-inner">
              <FiShoppingBag className="text-zinc-800 animate-pulse" size={36} />
            </div>
            <h3 className="text-3xl font-light uppercase italic tracking-[0.2em] text-zinc-600 mb-2">Vault is Empty</h3>
            <p className="text-zinc-700 font-mono text-[10px] uppercase tracking-widest mb-10 italic">No pieces selected for acquisition.</p>
            <button className="px-10 py-4 bg-zinc-900 text-white rounded-full text-[10px] font-black uppercase tracking-[0.3em] hover:bg-[#C5A059] hover:text-black transition-all duration-500 border border-zinc-800">
              Return to Catalog
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Cart;