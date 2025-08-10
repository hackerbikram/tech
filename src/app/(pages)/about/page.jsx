"use client";


import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Resume from '../../../components/resume';

export default function AboutPage() {
  const [showMore, setShowMore] = useState(false);

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white px-6 py-12 flex flex-col items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.h1
        className="text-4xl sm:text-6xl font-extrabold mb-6 glowing-text text-center"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        About <span className="text-purple-400">Us</span>
      </motion.h1>
      <button onClick={()=>{
        return (<Resume/>)
      }}
      className="rounded-2xl bg-blue-500 text-white p-4 m-3">Resume</button>

      <p className="max-w-3xl text-center text-lg sm:text-xl text-gray-200 mb-10 leading-relaxed">
        We craft beautiful web experiences with modern tech and unique style.
      </p>

      <div className="grid sm:grid-cols-2 gap-8 max-w-4xl">
        {[
          {
            title: "🚀 What We Do",
            text: "We build 3D UIs, AI bots, beautiful frontends, and scalable backends.",
          },
          {
            title: "🌐 Our Vision",
            text: "To merge design, interaction, and performance into unforgettable websites.",
          },
        ].map((item, idx) => (
          <motion.div
            key={idx}
            className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl hover:scale-105 transition-transform"
            whileHover={{ scale: 1.05 }}
          >
            <h2 className="text-xl font-semibold text-purple-300 mb-2">{item.title}</h2>
            <p className="text-gray-300">{item.text}</p>
          </motion.div>
        ))}
      </div>

      <motion.button
        onClick={() => setShowMore(!showMore)}
        className="mt-12 px-6 py-3 rounded-full bg-purple-600 hover:bg-purple-700 transition-colors text-white font-semibold text-lg shadow-lg glow-btn"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {showMore ? "Hide Details" : "Learn More →"}
      </motion.button>

      <AnimatePresence>
        {showMore && (
          <motion.div
            className="mt-12 w-full max-w-5xl space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            <motion.div
              className="p-6 rounded-xl bg-white/5 border border-white/10"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
            >
              <h3 className="text-2xl font-bold text-purple-200 mb-2">👨‍💻 Our Team</h3>
              <p className="text-gray-300">
                Developers, designers, creators — we work together to create stunning results. We specialize in full-stack apps, 3D experiences, and voice-controlled systems.
              </p>
            </motion.div>

            <motion.div
              className="p-6 rounded-xl bg-white/5 border border-white/10"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
            >
              <h3 className="text-2xl font-bold text-purple-200 mb-2">🛠️ Technologies We Use</h3>
              <ul className="list-disc pl-6 text-gray-300 space-y-1">
                <li>Next.js, React, Tailwind CSS</li>
                <li>Three.js + React Three Fiber for 3D</li>
                <li>FastAPI, Python, Stripe integration</li>
                <li>AI Chatbots, Framer Motion</li>
              </ul>
            </motion.div>

            <motion.div
              className="p-6 rounded-xl bg-white/5 border border-white/10"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
            >
              <h3 className="text-2xl font-bold text-purple-200 mb-2">🎯 Our Goals</h3>
              <p className="text-gray-300">
                Build next-gen tools for learners and creators. Make tech engaging, educational, and easy to use.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .glowing-text {
          text-shadow: 0 0 10px #7c3aed, 0 0 20px #7c3aed, 0 0 30px #a78bfa;
        }
        .glow-btn {
          box-shadow: 0 0 10px #a78bfa, 0 0 20px #7c3aed, 0 0 30px #6d28d9;
        }
      `}</style>
    </motion.div>
  );
}