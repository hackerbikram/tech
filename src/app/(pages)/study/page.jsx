'use client'
import React, { useState } from 'react'
import { Menu, X } from 'lucide-react'
import TypingPractice from '@/components/typo'
import HtmlCssPractice from '@/components/htmlcss'
import ProgrammingPractice from '@/components/programing'
import HardwareLearningLab from '@/components/hardwarestudy.jsx'
import JapaneseLearning from '@/components/jlpt.jsx'

const categories = {
  Technologies: ['Hardware', 'Software', 'Web Development', 'Programming', 'Typing'],
  Languages: ['Japanese', 'English', 'Nepali'],
}

const courseComponents = {
  Typing: <TypingPractice />,
  Programming: (
    <div>
      <h1 className="text-center text-red-400 font-semibold p-4">Let's learn programming from zero to hero!</h1>
      <ProgrammingPractice />
    </div>
  ),
  'Web Development': <HtmlCssPractice />,
  Hardware: (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-green-400">Computer Hardware Components</h2>
      <p className="text-gray-300">Explore internal and external computer components with interactive 3D models.</p>
      <HardwareLearningLab />
    </div>
  ),
  Software: (
    <div>
      <h2 className="text-xl text-blue-400 font-semibold mb-2">Software Types</h2>
      <ul className="list-disc list-inside text-gray-300">
        <li>System Software: Operating Systems, Utilities</li>
        <li>Application Software: Browsers, Editors, Games</li>
        <li>Development Tools: IDEs, Compilers</li>
      </ul>
    </div>
  ),
  Japanese: (
    <div>
      <h2 className="text-xl text-yellow-400 mb-4">Japanese Course</h2>
      <JapaneseLearning />
    </div>
  ),
  English: <div><h2 className="text-xl text-yellow-400">English Course (Coming Soon)</h2></div>,
  Nepali: <div><h2 className="text-xl text-yellow-400">Nepali Course (Coming Soon)</h2></div>,
}

export default function StudyPage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedCourse, setSelectedCourse] = useState(null)

  const handleCategoryClick = (category) => {
    setSelectedCategory(category === selectedCategory ? null : category)
    setSelectedCourse(null)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 to-black text-white mt-7">
      <header className="flex items-center justify-between p-4 bg-blue-900 shadow-xl sticky top-0 z-50">
        <h1 className="text-3xl font-bold animate-pulse text-blue-200">📚 Study Hub</h1>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          className="md:hidden"
        >
          {menuOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </header>

      <div className="flex flex-1 flex-col md:flex-row">
        {/* Sidebar */}
        <aside
          className={`
            bg-blue-800 p-4 space-y-4
            transition-all duration-300
            ${menuOpen ? 'block' : 'hidden'}
            md:block md:w-64 md:min-h-[calc(100vh-64px)] 
          `}
        >
          {Object.keys(categories).map((cat, idx) => (
            <button
              key={idx}
              onClick={() => handleCategoryClick(cat)}
              className={`w-full py-3 rounded-xl font-bold text-lg transition-colors duration-200 shadow-lg ${
                selectedCategory === cat
                  ? 'bg-green-400 text-black'
                  : 'bg-green-700 text-white hover:bg-green-500'
              }`}
            >
              {cat}
            </button>
          ))}

          {selectedCategory && (
            <div className="pt-4 max-h-[60vh] overflow-y-auto">
              {categories[selectedCategory].map((course, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedCourse(course)}
                  className={`block w-full text-left px-4 py-2 rounded-lg mt-1 text-white hover:bg-blue-600 transition-all ${
                    selectedCourse === course ? 'bg-blue-600' : 'bg-blue-700'
                  }`}
                >
                  {course}
                </button>
              ))}
            </div>
          )}
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6 md:p-10 overflow-auto">
          {selectedCourse ? (
            <div className="animate-fade-in-up rounded-xl bg-slate-800 p-6 shadow-2xl min-h-[60vh]">
              {courseComponents[selectedCourse] || (
                <div className="text-red-400">Course not found.</div>
              )}
            </div>
          ) : (
            <div className="text-center text-gray-400 text-lg mt-10 md:mt-20">
              Select a category and a course to start learning.
            </div>
          )}
        </main>
      </div>

      <style jsx>{`
        .animate-fade-in-up {
          animation: fadeInUp 0.5s ease-out;
        }
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}