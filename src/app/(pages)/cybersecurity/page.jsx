'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Shield, Terminal, PlusCircle } from 'lucide-react';
import HackingDocs from '@/components/HackingDocs';

export default function CyberSecurityPage() {
  const [isHackingDocs, setIsHackingDocs] = useState(false);

  const tools = [
    {
      name: 'Nmap',
      description: 'Network discovery and security auditing tool.',
      link: 'https://nmap.org/',
    },
    {
      name: 'Wireshark',
      description: 'Network protocol analyzer for deep inspection.',
      link: 'https://www.wireshark.org/',
    },
    {
      name: 'Metasploit',
      description: 'Penetration testing framework for exploit development.',
      link: 'https://www.metasploit.com/',
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white px-4 py-8 md:px-12">
      {/* Fullscreen Docs */}
      <AnimatePresence>
        {isHackingDocs && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-50 flex flex-col"
          >
            <HackingDocs />
            <button
              onClick={() => setIsHackingDocs(false)}
              className="absolute top-4 right-4 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md font-bold"
            >
              Close
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold text-green-400 flex items-center gap-2">
          <Shield size={32} />
          Cyber Security Hub
        </h1>
        <Link
          href="https://github.com/"
          target="_blank"
          className="flex items-center gap-2 text-gray-300 hover:text-white border border-gray-500 px-3 py-1 rounded-md hover:border-white transition"
        >
          <Github size={20} /> GitHub
        </Link>
      </header>

      {/* Tool Cards */}
      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
        {tools.map((tool, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.03 }}
            className="bg-gray-900 border border-green-400 rounded-lg p-4 flex flex-col justify-between shadow-lg"
          >
            <div>
              <h2 className="text-xl font-bold text-green-300">{tool.name}</h2>
              <p className="text-gray-400 mt-2">{tool.description}</p>
            </div>
            <a
              href={tool.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block px-3 py-2 text-sm bg-green-500 hover:bg-green-400 text-black rounded-md font-semibold text-center"
            >
              Learn More
            </a>
          </motion.div>
        ))}

        {/* Add New Tool Button */}
        <div className="flex items-center justify-center">
          <button
            onClick={() => alert('Add Tool Functionality')}
            className="flex items-center gap-2 px-4 py-3 bg-green-600 hover:bg-green-500 text-black font-bold rounded-md"
          >
            <PlusCircle size={20} /> Add My Tool
          </button>
        </div>
      </section>

      {/* Hacker-Style Fullscreen Button */}
      <div className="flex justify-center">
        <button
          onClick={() => setIsHackingDocs(true)}
          className="relative inline-flex items-center justify-center px-6 py-3 text-lg font-mono font-bold text-green-400 border-2 border-green-400 rounded-lg shadow-lg transition-all duration-300 hover:text-black hover:bg-green-400 hover:shadow-green-500/50"
        >
          <Terminal size={20} className="mr-2" />
          Enter Hacking Mode
        </button>
      </div>
    </div>
  );
}