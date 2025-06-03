'use client';
import React, { useState } from 'react';
import CoffeeMechine from '@/components/cofee';
import SolarSystem from "@/components/solar-system";
import EarthGlobe from '@/components/earth'
import SpaceComponent from '@/components/spacecomp'

function Page() {
  const [showMenu, setShowMenu] = useState(false);
  const [active, setActive] = useState(null);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white font-mono overflow-x-hidden">
      {/* Top Right Menu Button */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="p-2 bg-white/90 rounded-full shadow-lg hover:bg-yellow-300 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-6 h-6 text-gray-800"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Slide-out Menu */}
      {showMenu && (
        <div className="fixed top-20 right-4 bg-black/80 backdrop-blur-md rounded-xl shadow-lg p-4 space-y-2 z-40 border border-white/10 w-48">
          <button onClick={() => setActive(null)} className="menu-btn">🏠 Home</button>
          <button onClick={() => setActive('space')} className="menu-btn">📚 Space</button>
          <button onClick={() => setActive('solarsystem')} className="menu-btn">🪐 Solar System</button>
          <button onClick={() => setActive('earth')} className="menu-btn">🌍 Earth</button>
          <button onClick={() => setActive('cofee')} className="menu-btn">☕ Coffee Machine</button>
        </div>
      )}

      {/* Main Content */}
      <div className="mt-24 px-4 sm:px-6 lg:px-12 pb-12">
        {active === null && (
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-purple-400 animate-pulse">
              Welcome to the Creative World
            </h1>
            <div className="mt-8 bg-purple-900/60 p-6 sm:p-8 rounded-2xl shadow-lg">
              <p className="text-lg sm:text-xl mb-4">Here we explore endless creativity!</p>
              <div className="text-6xl sm:text-8xl md:text-9xl animate-bounce">🐉</div>
            </div>
          </div>
        )}

        {active === 'space' && (
          <div className="max-w-screen overflow-hidden">
            <SpaceComponent />
          </div>
        )}

        {active === 'solarsystem' && (
          <div className="w-full h-[80vh] md:h-screen">
            <SolarSystem />
          </div>
        )}

        {active === 'earth' && (
          <div className="w-full max-w-4xl mx-auto h-[300px] sm:h-[400px] md:h-[500px]">
            <EarthGlobe showMoon={true} showMarkers={true} />
          </div>
        )}

        {active === 'cofee' && (
          <div className="mt-10">
            <CoffeeMechine />
          </div>
        )}
      </div>

      {/* Tailwind CSS custom style for menu buttons */}
      <style jsx>{`
        .menu-btn {
          display: block;
          width: 100%;
          text-align: left;
          padding: 10px 12px;
          background: transparent;
          border-radius: 8px;
          transition: background 0.2s ease;
        }
        .menu-btn:hover {
          background: #fde68a;
          color: #000;
        }
      `}</style>
    </div>
  );
}

export default Page;