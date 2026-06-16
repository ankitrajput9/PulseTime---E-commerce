"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { axiosInstance } from "../mediaApi/ApiInstance";
import { useDispatch } from "react-redux";
import { addUser } from "../features/authSlice";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";

const Register = ({ setToggle }) => {
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    try {
      const res = await axiosInstance.post("/auth/register", data);
      dispatch(addUser(res.data.newUser));
      reset();
    } catch (error) {
      console.log("Register error:", error);
    }
  };

  const handleGoogleRegister = async () => {
    window.location.href = "http://localhost:3000/api/auth/google";
    
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505] relative overflow-hidden font-sans">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-175 h-175 border border-[#C5A059]/10 rounded-full" />
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="relative z-10 backdrop-blur-xl bg-zinc-900/40 border border-zinc-800 rounded-[2.5rem] p-10 w-full max-w-md shadow-2xl"
      >
        <div className="flex flex-col items-center mb-10">
          <div className="w-14 h-14 mb-4 rounded-full border border-[#C5A059]/50 flex items-center justify-center bg-zinc-900 shadow-[0_0_20px_rgba(197,160,89,0.1)]">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C5A059" strokeWidth="1.5">
              <path d="M12 6v6l4 2" strokeLinecap="round" />
              <circle cx="12" cy="12" r="10" strokeOpacity="0.2" />
            </svg>
          </div>
          <h1 className="text-3xl font-light tracking-[0.3em] text-white uppercase italic">
            PULSE<span className="font-bold text-[#C5A059]">TIME</span>
          </h1>
          <p className="text-[9px] text-zinc-500 uppercase tracking-[0.5em] mt-2 font-mono">Precision Enrollment</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input type="text" placeholder="USER NAME" {...register("userName", { required: true })}
            className="w-full bg-black/40 border border-zinc-800 px-6 py-4 rounded-xl text-white focus:border-[#C5A059] outline-none transition-all placeholder:text-zinc-700 font-mono text-[11px] uppercase"
          />
          <input type="email" placeholder="EMAIL ADDRESS" {...register("email", { required: true })}
            className="w-full bg-black/40 border border-zinc-800 px-6 py-4 rounded-xl text-white focus:border-[#C5A059] outline-none transition-all placeholder:text-zinc-700 font-mono text-[11px] uppercase"
          />
          <div className="grid grid-cols-2 gap-4">
            <input type="password" placeholder="SECURITY" {...register("password", { required: true })}
              className="w-full bg-black/40 border border-zinc-800 px-6 py-4 rounded-xl text-white focus:border-[#C5A059] outline-none transition-all placeholder:text-zinc-700 font-mono text-[11px] uppercase"
            />
            <input type="text" placeholder="MOBILE" {...register("mobile", { required: true })}
              className="w-full bg-black/40 border border-zinc-800 px-6 py-4 rounded-xl text-white focus:border-[#C5A059] outline-none transition-all placeholder:text-zinc-700 font-mono text-[11px] uppercase"
            />
          </div>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit"
            className="w-full py-4 rounded-xl bg-[#C5A059] text-black font-black uppercase tracking-[0.2em] text-[11px] shadow-lg mt-4"
          >
            Synchronize Profile
          </motion.button>
        </form>

        <button onClick={handleGoogleRegister} className="w-full flex cursor-pointer items-center justify-center gap-3 border border-zinc-800 py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest text-zinc-400 mt-6 hover:bg-zinc-900 transition-all">
          <FcGoogle size={18} /> Sync with Google
        </button>

        <p className="text-center text-[10px] tracking-widest text-zinc-500 mt-8 uppercase">
          Already authenticated? 
          <span onClick={() => setToggle((prev) => !prev)} className="text-[#C5A059] font-bold cursor-pointer ml-2 hover:underline underline-offset-8">
            Return to Login
          </span>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;