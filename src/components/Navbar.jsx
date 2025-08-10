'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TerminalSquare,
  BookOpen,
  Cpu,
  Brush,
  Phone,
  Info,
  ShoppingCart,
  Menu,
  X,
  Video,
} from 'lucide-react';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: 'Home', path: '/', icon: <TerminalSquare size={18} /> },
    { name: 'Study', path: '/study', icon: <BookOpen size={18} /> },
    { name: 'Tech', path: '/tech', icon: <Cpu size={18} /> },
    { name: 'Creative', path: '/creative', icon: <Brush size={18} /> },
    { name: 'Contact', path: '/contact', icon: <Phone size={18} /> },
    { name: 'About', path: '/about', icon: <Info size={18} /> },
    { name: 'Product', path: '/product', icon: <ShoppingCart size={18} /> },
    { name: 'Video', path: '/video', icon: <Video size={18} /> },
    {name: 'Dashboard' ,path: '/dashboard',icon:""}
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 60 }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md shadow-md border-b border-cyan-500/20"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <TerminalSquare
            className="text-cyan-400 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300"
            size={26}
          />
          <h1 className="text-xl sm:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-cyan-500 glowing-title tracking-wide">
            Bikram Universe
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-3 items-center overflow-x-auto whitespace-nowrap max-w-[70%]">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center gap-1 px-2 py-1 rounded-md text-sm transition duration-200 ${
                pathname === item.path
                  ? 'text-cyan-300 font-bold bg-cyan-500/10 border border-cyan-400/50'
                  : 'text-gray-300 hover:text-cyan-300 hover:bg-cyan-500/5'
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-cyan-300 text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-black px-4 pt-2 pb-4 border-t border-cyan-400/20 space-y-2"
          >
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center gap-2 py-2 px-3 rounded text-sm transition ${
                  pathname === item.path
                    ? 'text-cyan-300 font-bold bg-cyan-600/10'
                    : 'text-gray-300 hover:text-cyan-300 hover:bg-cyan-500/10'
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>

      <style jsx>{`
        .glowing-title {
          text-shadow: 0 0 6px #06b6d4, 0 0 10px #22d3ee, 0 0 14px #67e8f9;
        }
      `}</style>
    </motion.header>
  );
}