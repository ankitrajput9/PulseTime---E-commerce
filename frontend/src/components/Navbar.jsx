"use client";
import React from "react";
import { FiLogOut, FiShoppingCart, FiPlusSquare, FiWatch } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router"; 
import { removeUser } from "../features/authSlice";
import { motion } from "framer-motion";

const Navbar = () => {
  const dispatch = useDispatch();
  let {items}=useSelector((state)=>state.cart)
  
  const logouthandler = async () => {
    dispatch(removeUser());
  };

  

  return (
    <nav className="sticky top-0 w-full z-106  pointer-events-none">
      <div className="max-w-full mx-auto flex justify-between items-center bg-[#0A0A0A]/50 backdrop-blur border border-zinc-800  rounded px-6 py-3 pointer-events-auto relative overflow-hidden">
        
        {/* Subtle Brushed Metal Texture Overlay */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[repeating-linear-gradient(90deg,#fff,#fff_1px,transparent_1px,transparent_4px)]"></div>

        {/* 1. Left Section: Brand with "Watch Hand" Animation */}
        <Link to="/" className="flex items-center gap-4 group">
          <div className="relative">
             <div className="w-11 h-11 rounded-full border-2 border-[#C5A059]/30 flex items-center justify-center bg-black shadow-[0_0_15px_rgba(197,160,89,0.1)] group-hover:border-[#C5A059] transition-all duration-500">
               <motion.div 
                 animate={{ rotate: 360 }}
                 transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                 className="absolute inset-0 flex items-center justify-center"
               >
                 <div className="h-[40%] w-0.5 bg-[#C5A059] rounded-full origin-bottom mb-[40%]"></div>
               </motion.div>
               <FiWatch className="text-[#C5A059] z-10" size={20} />
             </div>
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-light tracking-[0.2em] uppercase italic text-white leading-none">
              PULSE<span className="font-bold text-[#C5A059]">TIME</span>
            </h1>
            <span className="text-[7px] text-zinc-500 tracking-[0.4em] uppercase font-mono mt-1">Official Chronograph</span>
          </div>
        </Link>

        {/* 2. Middle Section: Beveled Menu Items */}
        <div className="hidden md:flex items-center bg-zinc-950/50 border border-zinc-800/50 rounded-full px-2 py-1">
          <div className="flex items-center gap-1">
            <NavLink to="/" label="Home" />
            <NavLink to="/home/products" label="Products" />
            {/* <NavLink to="/home/cart" label="Cart" /> */}
            <NavLink to="/home/create-product" label="Provisioning" icon={<FiPlusSquare />} />
          </div>
        </div>

        {/* 3. Right Section: Utility Icons */}
        <div className="flex items-center gap-6">
          <Link to="/home/cart" className="relative group p-2">
            <FiShoppingCart size={20} className="text-zinc-400 group-hover:text-[#C5A059] transition-colors" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 text-white text-[8px] font-bold rounded-full flex items-center justify-center">{items?.length}</span>
          </Link>

          <div className="w-px h-6 bg-zinc-800"></div>

          <button 
            onClick={logouthandler} 
            className="flex items-center justify-center w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-red-500/50 hover:bg-red-500/5 transition-all cursor-pointer group"
            title="Terminate Session"
          >
            <FiLogOut size={18} className="text-zinc-500 group-hover:text-red-500 transition-colors" />
          </button>
        </div>
      </div>
    </nav>
  );
};

// Internal Helper Component for Sleek Links
const NavLink = ({ to, label, icon }) => (
  <Link 
    to={to} 
    className="px-5 py-2 text-[10px] font-bold uppercase tracking-widest text-zinc-500 hover:text-white transition-all rounded-full hover:bg-zinc-900 flex items-center gap-2"
  >
    {icon && <span className="text-[#C5A059]">{icon}</span>}
    {label}
  </Link>
);

export default Navbar;