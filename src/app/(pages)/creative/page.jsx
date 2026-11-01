
'use client';

import React, { useState } from 'react';
import CoffeeMechine from '@/components/cofee';
import SolarSystem from '@/components/solar-system';
import EarthGlobe from '@/components/earth';
import SpaceComponent from '@/components/spacecomp';

const navigation = [
  { id: 'home', label: 'Home', icon: '🏠' },
  { id: 'space', label: 'Space', icon: '🚀' },
  { id: 'solarsystem', label: 'Solar System', icon: '🪐' },
  { id: 'earth', label: 'Earth', icon: '🌍' },
  { id: 'cofee', label: 'Coffee Machine', icon: '☕' },
];

function Page() {
  // STATE MUST BE INSIDE THE COMPONENT
  const [active, setActive] = useState('home');

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white font-mono overflow-x-hidden">

      {/* Desktop Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/70 backdrop-blur-xl border-b border-white/10 px-3 sm:px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">

          <button
            onClick={() => setActive('home')}
            className="flex items-center gap-2 shrink-0"
          >
            <span className="text-2xl">🐉</span>
            <span className="hidden sm:block font-bold text-lg">
              Creative World
            </span>
          </button>

          <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto">
            {navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => setActive(item.id)}
                className={`flex items-center gap-2 whitespace-nowrap px-3 sm:px-4 py-2 rounded-xl text-sm transition-all ${
                  active === item.id
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                <span>{item.icon}</span>
                <span className="hidden lg:inline">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className="pt-24 sm:pt-28 pb-24 sm:pb-12 px-4 sm:px-6 lg:px-12">

        {/* HOME PAGE */}
        {active === 'home' && (
          <div className="relative max-w-7xl mx-auto">

            {/* Ambient Background */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden -z-0">
              <div className="absolute top-20 left-[-150px] w-[350px] h-[350px] bg-purple-600/20 blur-[120px] rounded-full" />
              <div className="absolute top-[400px] right-[-150px] w-[350px] h-[350px] bg-blue-600/20 blur-[120px] rounded-full" />
            </div>

            {/* Hero */}
            <section className="relative min-h-[75vh] flex flex-col justify-center items-center text-center py-16 sm:py-24">

              <div className="relative z-10">

                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-400/30 bg-purple-500/10 text-purple-300 text-xs sm:text-sm mb-8">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  WELCOME TO A WORLD WITHOUT LIMITS
                </div>

                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-tight">
                  Explore
                  <br />
                  <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                    The Unknown.
                  </span>
                </h1>

                <p className="max-w-2xl mx-auto mt-7 text-gray-400 text-sm sm:text-lg leading-relaxed px-4">
                  Discover the beauty of our universe, travel through space,
                  explore the wonders of Earth, and experience creativity
                  through interactive digital experiences.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">

                  <button
                    onClick={() => setActive('space')}
                    className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 transition-all font-bold"
                  >
                    Explore Universe →
                  </button>

                  <button
                    onClick={() => setActive('solarsystem')}
                    className="w-full sm:w-auto px-8 py-4 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 transition-all font-bold"
                  >
                    Discover Solar System
                  </button>

                </div>

                <div className="grid grid-cols-3 max-w-xl mx-auto gap-4 mt-16 pt-8 border-t border-white/10">
                  <div>
                    <h3 className="text-3xl font-bold text-purple-400">01</h3>
                    <p className="text-sm text-gray-500 mt-2">Universe</p>
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-cyan-400">02</h3>
                    <p className="text-sm text-gray-500 mt-2">Exploration</p>
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-pink-400">∞</h3>
                    <p className="text-sm text-gray-500 mt-2">Possibilities</p>
                  </div>
                </div>

              </div>
            </section>

            {/* EXPERIENCES */}
            <section className="relative z-10 py-16">

              <div className="mb-10">
                <p className="text-purple-400 text-sm tracking-widest uppercase">
                  Discover
                </p>
                <h2 className="text-3xl sm:text-4xl font-bold mt-3">
                  Explore Experiences
                </h2>
                <p className="text-gray-400 mt-3">
                  Choose your next adventure.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

                {[
                  {
                    id: 'space',
                    icon: '🚀',
                    number: '01',
                    category: 'SPACE',
                    title: 'Deep Space',
                    description: 'Discover the mysterious beauty of the cosmos.',
                    color: 'purple',
                    gradient: 'from-indigo-950 via-purple-900 to-black',
                  },
                  {
                    id: 'solarsystem',
                    icon: '🪐',
                    number: '02',
                    category: 'PLANETS',
                    title: 'Solar System',
                    description: 'Travel across planets and explore our solar system.',
                    color: 'orange',
                    gradient: 'from-orange-950 via-indigo-950 to-black',
                  },
                  {
                    id: 'earth',
                    icon: '🌍',
                    number: '03',
                    category: 'EARTH',
                    title: 'Our Planet',
                    description: 'Explore our home planet and its fascinating features.',
                    color: 'cyan',
                    gradient: 'from-cyan-950 via-blue-950 to-black',
                  },
                  {
                    id: 'cofee',
                    icon: '☕',
                    number: '04',
                    category: 'CREATIVE',
                    title: 'Coffee Machine',
                    description: 'Experience a creative digital coffee machine.',
                    color: 'amber',
                    gradient: 'from-amber-950 via-stone-900 to-black',
                  },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActive(item.id)}
                    className="experience-card group text-left"
                  >
                    <div className={`experience-image bg-gradient-to-br ${item.gradient}`}>
                      <div className="text-7xl transition-transform duration-700 group-hover:scale-125 group-hover:rotate-12">
                        {item.icon}
                      </div>
                      <span className="absolute top-4 right-4 text-xs text-white/80 bg-black/40 px-3 py-1 rounded-full">
                        {item.number}
                      </span>
                    </div>

                    <div className="p-5">
                      <p className={`text-${item.color}-400 text-xs tracking-widest`}>
                        {item.number} / {item.category}
                      </p>
                      <h3 className="text-xl font-bold mt-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-400 text-sm mt-3 leading-relaxed">
                        {item.description}
                      </p>
                      <div className="mt-5 text-purple-400 text-sm font-bold transition-transform group-hover:translate-x-2">
                        Explore Now →
                      </div>
                    </div>
                  </button>
                ))}

              </div>
            </section>

            {/* BOTTOM BANNER */}
            <section className="my-12 rounded-3xl border border-purple-400/20 bg-gradient-to-r from-purple-950/80 via-indigo-950/80 to-blue-950/80 p-8 sm:p-12 text-center">
              <div className="text-4xl mb-5">✨</div>
              <h2 className="text-2xl sm:text-4xl font-bold">
                Imagination Has No Limits.
              </h2>
              <p className="text-gray-400 max-w-xl mx-auto mt-4">
                Every discovery begins with curiosity. Start exploring
                and experience something extraordinary.
              </p>
              <button
                onClick={() => setActive('space')}
                className="mt-8 px-8 py-3 rounded-xl bg-white text-black font-bold hover:bg-purple-200 transition-colors"
              >
                Start Exploring →
              </button>
            </section>

            {/* FOOTER */}
            <footer className="border-t border-white/10 py-8 text-center">
              <p className="text-gray-500 text-xs tracking-widest">
                CREATIVE WORLD
              </p>
              <p className="text-gray-600 text-xs mt-3">
                Explore • Discover • Create
              </p>
            </footer>

          </div>
        )}

        {/* SPACE */}
        {active === 'space' && (
          <div className="w-full overflow-hidden">
            <SpaceComponent />
          </div>
        )}

        {/* SOLAR SYSTEM */}
        {active === 'solarsystem' && (
          <div className="w-full h-[80vh] md:h-screen">
            <SolarSystem />
          </div>
        )}

        {/* EARTH */}
        {active === 'earth' && (
          <div className="w-full max-w-4xl mx-auto h-[300px] sm:h-[400px] md:h-[500px]">
            <EarthGlobe showMoon={true} showMarkers={true} />
          </div>
        )}

        {/* COFFEE */}
        {active === 'cofee' && (
          <div className="mt-10">
            <CoffeeMechine />
          </div>
        )}

      </main>

      {/* MOBILE NAVIGATION */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-xl border-t border-white/10 px-1 pt-2 pb-[max(8px,env(safe-area-inset-bottom))]">
        <div className="grid grid-cols-5 gap-1 max-w-lg mx-auto">
          {navigation.map((item) => (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              aria-label={item.label}
              className={`flex flex-col items-center justify-center gap-1 py-2 px-1 rounded-xl transition-all ${
                active === item.id
                  ? 'text-purple-400 bg-purple-500/15'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-[9px] font-medium truncate max-w-full">
                {item.label}
              </span>
              {active === item.id && (
                <span className="w-1 h-1 rounded-full bg-purple-400" />
              )}
            </button>
          ))}
        </div>
      </nav>

      {/* HOME CARD STYLES */}
      <style jsx>{`
        .experience-card {
          position: relative;
          overflow: hidden;
          border-radius: 20px;
          border: 1px solid rgba(255,255,255,0.09);
          background: rgba(255,255,255,0.035);
          transition: all 0.35s ease;
        }

        .experience-card:hover {
          transform: translateY(-8px);
          border-color: rgba(168,85,247,0.55);
          background: rgba(255,255,255,0.07);
          box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        }

        .experience-image {
          position: relative;
          height: 190px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .experience-image::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: radial-gradient(
            rgba(255,255,255,0.12) 1px,
            transparent 1px
          );
          background-size: 22px 22px;
          opacity: 0.4;
        }

        @media (prefers-reduced-motion: reduce) {
          .experience-card {
            transition: none;
          }
        }
      `}</style>

    </div>
  );
}

export default Page;
