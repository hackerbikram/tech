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

const studyTabs = ['Vocabulary', 'Grammar', 'Kanji', 'Listening', 'Speaking'];

export default function JapaneseLearning() {
  const [selectedLevel, setSelectedLevel] = useState('JLPT N5');
  const [selectedTab, setSelectedTab] = useState('Vocabulary');

  // Sample content placeholders for each tab & level
  const studyContent = {
    Vocabulary: `Learn essential vocabulary for ${selectedLevel}. Practice common words and phrases.`,
    Grammar: `Understand the grammar rules and sentence structures of ${selectedLevel}.`,
    Kanji: `Master kanji characters for ${selectedLevel}. Stroke order, meanings, and readings.`,
    Listening: `Practice listening comprehension with audio exercises tailored for ${selectedLevel}.`,
    Speaking: `Improve your pronunciation and speaking skills through exercises and dialogues.`,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-red-100 p-4 md:p-10 lg:p-16">
      <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-10 text-red-600 drop-shadow-lg">
        🌸 Japanese Language Learning - JLPT Guide
      </h1>

      {/* JLPT Level Selector */}
      <div className="flex justify-center flex-wrap gap-4 mb-8">
        {levels.map((level) => (
          <button
            key={level}
            onClick={() => setSelectedLevel(level)}
            className={`px-5 py-3 rounded-lg font-semibold shadow-md transition duration-300
              ${
                selectedLevel === level
                  ? 'bg-red-600 text-white shadow-lg'
                  : 'bg-white text-red-600 border border-red-300 hover:bg-red-100'
              }`}
          >
            {level}
          </button>
        ))}
      </div>

      {/* Study Tabs */}
      <div className="flex justify-center flex-wrap gap-3 mb-10">
        {studyTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedTab(tab)}
            className={`px-4 py-2 rounded-md font-medium transition duration-300
              ${
                selectedTab === tab
                  ? 'bg-red-500 text-white shadow'
                  : 'bg-white text-red-600 border border-red-300 hover:bg-red-100'
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-8 md:p-12">
        <h2 className="text-2xl font-bold text-red-700 mb-6">{selectedTab} for {selectedLevel}</h2>
        <p className="text-gray-700 leading-relaxed mb-8">{studyContent[selectedTab]}</p>

        {/* Show Lessons only for Vocabulary, Grammar, Kanji tabs */}
        {(selectedTab === 'Vocabulary' || selectedTab === 'Grammar' || selectedTab === 'Kanji') && (
          <>
            <h3 className="text-xl font-semibold mb-4">Lessons:</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {lessons[selectedLevel].map((lesson) => (
                <div
                  key={lesson}
                  className="border border-red-300 rounded-lg p-3 text-center font-semibold text-red-600 cursor-pointer hover:bg-red-50 hover:scale-105 transition-transform duration-300"
                >
                  {lesson}
                </div>
              ))}
            </div>
          </>
        )}

        {/* Listening and Speaking sections placeholder */}
        {(selectedTab === 'Listening' || selectedTab === 'Speaking') && (
          <div className="text-center text-gray-600 italic py-10">
            {/* Here you can later add audio players, recording features, dialogues, etc. */}
            <p>Interactive {selectedTab.toLowerCase()} exercises will be available soon.</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="text-center mt-16 mb-8 text-gray-500 text-sm select-none">
        &copy; {new Date().getFullYear()} Bikram's Japanese Learning Hub — All rights reserved.
      </footer>
    </div>
  );
}