// app/components/JapaneseLearning.jsx
'use client';

import React, { useState } from 'react';

const levels = ['JLPT N5', 'JLPT N4', 'JLPT N3', 'JLPT N2', 'JLPT N1'];

const lessons = {
  'JLPT N5': Array.from({ length: 20 }, (_, i) => `Lesson ${i + 1}`),
  'JLPT N4': Array.from({ length: 20 }, (_, i) => `Lesson ${i + 21}`),
  'JLPT N3': Array.from({ length: 20 }, (_, i) => `Lesson ${i + 41}`),
  'JLPT N2': Array.from({ length: 20 }, (_, i) => `Lesson ${i + 61}`),
  'JLPT N1': Array.from({ length: 20 }, (_, i) => `Lesson ${i + 81}`),
};

export default function JapaneseLearning() {
  const [selectedLevel, setSelectedLevel] = useState('JLPT N5');

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-red-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">🌸 Learn Japanese - JLPT Guide</h1>

      <div className="flex justify-center gap-4 mb-6 flex-wrap">
        {levels.map((level) => (
          <button
            key={level}
            onClick={() => setSelectedLevel(level)}
            className={`px-4 py-2 rounded-lg shadow transition duration-300 ${
              selectedLevel === level
                ? 'bg-red-500 text-white'
                : 'bg-white text-gray-800 border border-gray-300'
            }`}
          >
            {level}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {lessons[selectedLevel].map((lesson) => (
          <div
            key={lesson}
            className="bg-white shadow rounded-lg p-4 text-center hover:scale-105 hover:bg-yellow-100 transition transform duration-300"
          >
            {lesson}
          </div>
        ))}
      </div>
    </div>
  );
}