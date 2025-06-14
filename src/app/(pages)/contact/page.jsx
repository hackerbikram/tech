'use client';
import ChatPage from '@/components/chat';
import { useState } from "react";
import { motion } from "framer-motion";

export default function ContactPage() {
  const [copied, setCopied] = useState(false);
  const [msgVisible, setMsgVisible] = useState(false);
  const [formMessage, setFormMessage] = useState(null);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const message = form.message.value;
    setFormMessage(message);
    setMsgVisible(true); // Auto-open chat on form submit
    form.reset();
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-[#141E30] to-[#243B55] text-white p-8 flex flex-col items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.h1
        className="text-4xl sm:text-6xl font-bold glowing-text text-center mb-6"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
      >
        Get in Touch
      </motion.h1>

      <motion.button
        className="mb-4 px-6 py-2 bg-purple-600 hover:bg-purple-700 transition rounded-lg font-semibold text-white shadow-md glow-btn"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setMsgVisible(prev => !prev)}
      >
        {msgVisible ? 'Close Chat' : 'Chat'}
      </motion.button>

      <p className="text-gray-300 max-w-xl text-center mb-10">
        We'd love to hear from you! Whether it's a project idea, feedback, or collaboration — just drop us a message.
      </p>

      <motion.form
        onSubmit={handleFormSubmit}
        className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 w-full max-w-xl shadow-xl space-y-5"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
      >
        <div className="flex flex-col">
          <label className="text-sm mb-1">Name</label>
          <input type="text" required className="px-4 py-2 rounded-lg bg-white/20 border border-white/10 text-white" />
        </div>

        <div className="flex flex-col">
          <label className="text-sm mb-1">Email</label>
          <input type="email" required className="px-4 py-2 rounded-lg bg-white/20 border border-white/10 text-white" />
        </div>

        <div className="flex flex-col">
          <label className="text-sm mb-1">Message</label>
          <textarea name="message" rows={5} required className="px-4 py-2 rounded-lg bg-white/20 border border-white/10 text-white" />
        </div>

        <motion.button
          type="submit"
          className="w-full py-3 px-6 bg-purple-600 hover:bg-purple-700 transition rounded-lg font-semibold text-white shadow-md glow-btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Send Message
        </motion.button>
      </motion.form>

      <div className="mt-10 space-y-4 text-center text-gray-300">
        <p>
          📧 Email:{" "}
          <span className="underline cursor-pointer hover:text-purple-300" onClick={() => handleCopy("your@email.com")}>
            dhurbakhadka85@gmail.com
          </span>{" "}
          {copied && <span className="text-sm text-green-300">[Copied!]</span>}
        </p>
        <p>
          📱 Phone:{" "}
          <span className="underline cursor-pointer hover:text-purple-300" onClick={() => handleCopy("+1234567890")}>
            japaan: 07093181181<br />nepal: 9866210583
          </span>{" "}
          {copied && <span className="text-sm text-green-300">[Copied!]</span>}
        </p>
      </div>

      {msgVisible && <ChatPage newMessage={formMessage} />}

      <style jsx>{`
        .glowing-text {
          text-shadow: 0 0 8px #8b5cf6, 0 0 20px #7c3aed;
        }
        .glow-btn {
          box-shadow: 0 0 10px #a78bfa, 0 0 20px #7c3aed;
        }
      `}</style>
    </motion.div>
  );
}