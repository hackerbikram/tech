'use client'
import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation'; // Not used in the current logic, can be removed if not needed
import Head from 'next/head';

// Define quotes and wordLists outside the component for stability
const quotes = {
  easy: [
    { text: 'The quick brown fox jumps over the lazy dog.', author: 'Unknown' },
    { text: 'To be or not to be, that is the question.', author: 'William Shakespeare' },
    { text: 'I have a dream that one day this nation will rise up.', author: 'Martin Luther King Jr.' },
    {text: 'heare bikram to teach typing in esy way , you all are able to lern typing.', author: 'bikram.'},
    {text: 'typing is not hard in real just people are think more hard.heare bikram help to lern more fast.',author:'bikram'}
  ],
  medium: [
    { text: 'The only way to do great work is to love what you do.', author: 'Steve Jobs' },
    { text: 'In the middle of difficulty lies opportunity.', author: 'Albert Einstein' },
    { text: 'Success is not final, failure is not fatal: It is the courage to continue that counts.', author: 'Winston Churchill' },
  ],
  hard: [
    { text: 'The greatest glory in living lies not in never falling, but in rising every time we fall.', author: 'Nelson Mandela' },
    { text: 'Life is what happens when you\'re busy making other plans.', author: 'John Lennon' },
    { text: 'The future belongs to those who believe in the beauty of their dreams.', author: 'Eleanor Roosevelt' },
  ],
};

const wordLists = {
  easy: [
    'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'I',
    'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at'
  ],
  medium: [
    'about', 'all', 'also', 'and', 'as', 'at', 'be', 'because', 'but', 'by',
    'can', 'come', 'could', 'day', 'do', 'even', 'find', 'first', 'for', 'from'
  ],
  hard: [
    'however', 'important', 'information', 'knowledge', 'language', 'learning',
    'mathematics', 'necessary', 'opportunity', 'organization', 'particular',
    'percentage', 'position', 'possible', 'practice', 'process', 'program',
    'question', 'research', 'science'
  ]
};

// Keyboard layout can also be outside
const keyboardRows = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\''],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/'],
  [' '] // Spacebar row
];

const TypingPractice = () => {
  const [input, setInput] = useState('');
  const [text, setText] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [correctChars, setCorrectChars] = useState(0);
  const [incorrectChars, setIncorrectChars] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState('time'); // Default mode
  const [timeLimit, setTimeLimit] = useState(60); // Default time limit
  const [wordLimit, setWordLimit] = useState(50); // Default word limit
  const [difficulty, setDifficulty] = useState('medium'); // Default difficulty
  const [quote, setQuote] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [countdown, setCountdown] = useState(timeLimit); // Initialized with timeLimit's default
  const [cursorPosition, setCursorPosition] = useState(0);
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [activeKey, setActiveKey] = useState(null); // For virtual keyboard key highlighting
  const [completedTexts, setCompletedTexts] = useState([]);

  const inputRef = useRef(null);
  const textRef = useRef(null); // For the text display area if needed for measurements
  // const router = useRouter(); // Remove if not used

  const generateText = useCallback(() => {
    if (mode === 'quote') {
      const difficultyQuotes = quotes[difficulty] || quotes.medium; // Fallback
      const quotesList = difficultyQuotes.filter(q => !completedTexts.includes(q.text));
      let randomQuote;
      if (quotesList.length === 0) {
        setCompletedTexts([]); // Reset if all quotes of this difficulty are done
        randomQuote = difficultyQuotes[Math.floor(Math.random() * difficultyQuotes.length)];
      } else {
        randomQuote = quotesList[Math.floor(Math.random() * quotesList.length)];
      }
      if (randomQuote) {
        setQuote(randomQuote);
        setText(randomQuote.text);
      } else { // Fallback if something goes wrong
        setText("Could not load a quote. Please try changing difficulty or mode.");
      }
    } else {
      const difficultyWordList = wordLists[difficulty] || wordLists.medium; // Fallback
      let generatedText = '';
      // For 'time' mode, generate a longer text. For 'words' mode, text related to wordLimit.
      const targetLength = mode === 'time' ? 200 : (wordLimit * 5); // Approx 5 chars per word

      if (difficultyWordList.length > 0) {
        while (generatedText.length < targetLength) {
          const randomWord = difficultyWordList[Math.floor(Math.random() * difficultyWordList.length)];
          generatedText += (generatedText ? ' ' : '') + randomWord;
        }
      } else {
        generatedText = "Could not load words. Please try again.";
      }
      setText(generatedText.trim().slice(0, mode === 'time' ? 400 : targetLength + 20)); // Trim and cap length
      setQuote(null); // Clear any previous quote object
    }
    setInput('');
    setCursorPosition(0);
  }, [mode, difficulty, wordLimit, completedTexts, setCompletedTexts, setQuote, setText, setInput, setCursorPosition]);


  const calculateMetrics = useCallback(() => {
    if (!startTime || correctChars === 0) { // Ensure startTime is set and some typing happened
        // Optionally set WPM to 0 if no correct characters or time
        if (correctChars === 0) setWpm(0);
        return;
    }
    
    const now = Date.now();
    const timeElapsed = (now - startTime) / 60000; // Time in minutes

    if (timeElapsed <= 0) { // Prevent division by zero or negative WPM
        setWpm(0);
    } else {
        const wordsTyped = correctChars / 5; // Average word length of 5 chars
        const currentWpm = Math.round(wordsTyped / timeElapsed);
        setWpm(currentWpm);
    }

    const totalCharsAttempted = correctChars + incorrectChars;
    const currentAccuracy = totalCharsAttempted > 0 ? Math.round((correctChars / totalCharsAttempted) * 100) : 100;
    setAccuracy(currentAccuracy);
  }, [startTime, correctChars, incorrectChars, setWpm, setAccuracy]);


  const handleTestEnd = useCallback(() => {
    setIsActive(false);
    setEndTime(Date.now()); // Set end time
    calculateMetrics(); // Perform final calculation
    setShowResults(true);
  }, [calculateMetrics, setIsActive, setEndTime, setShowResults]);


  const resetTest = useCallback(() => {
    setIsActive(false);
    setShowResults(false);
    setStartTime(null);
    setEndTime(null);
    setWpm(0);
    setAccuracy(100);
    setCorrectChars(0);
    setIncorrectChars(0);
    setInput('');
    setCursorPosition(0);
    setCountdown(timeLimit);
    generateText();
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [timeLimit, generateText, setIsActive, setShowResults, setStartTime, setEndTime, setWpm, setAccuracy, setCorrectChars, setIncorrectChars, setInput, setCursorPosition, setCountdown]);

  useEffect(() => {
    resetTest();
  }, [mode, timeLimit, wordLimit, difficulty, resetTest]); // Removed resetTest from its own deps if it's stable

   // Countdown timer effect
  useEffect(() => {
    let interval = null;
    if (isActive && mode === 'time' && startTime) {
      setCountdown(prevCountdown => { // Ensure countdown starts from current timeLimit if it was just reset
          const newStartTime = Date.now(); // Reference point for this timer interval
          // If countdown isn't aligned with timeLimit (e.g. after a settings change), re-align
          if (prevCountdown > timeLimit || prevCountdown === 0 && timeLimit > 0) {
              return timeLimit;
          }
          return prevCountdown;
      });

      interval = setInterval(() => {
        setCountdown((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(interval);
            handleTestEnd();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else if (!isActive && interval) {
      clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, mode, startTime, timeLimit, handleTestEnd]);


  const handleInputChange = useCallback((e) => {
    const value = e.target.value;

    if (showResults) return; // Don't process input if results are shown

    if (!isActive && value.length > 0) {
      setIsActive(true);
      setStartTime(Date.now());
      if (mode === 'time') {
        setCountdown(timeLimit); // Start countdown from current timeLimit
      }
    }

    if (!text) return; // Don't process if there's no text to type against

    // Allow typing up to the length of the text to be typed
    // Or slightly more if you want to allow overtyping and mark as error (not implemented here)
    if (value.length <= text.length) {
        setInput(value);
        setCursorPosition(value.length);

        let currentCorrectChars = 0;
        let currentIncorrectChars = 0;
        for (let i = 0; i < value.length; i++) {
            if (value[i] === text[i]) {
            currentCorrectChars++;
            } else {
            currentIncorrectChars++;
            }
        }
        setCorrectChars(currentCorrectChars);
        setIncorrectChars(currentIncorrectChars);

        if (isActive) {
            calculateMetrics();
        }
        
        // Check for test completion
        if (value.length === text.length && value === text) {
            if (mode === 'quote') {
                setCompletedTexts(prev => [...prev, text]); // Mark quote as completed
                generateText(); // Generate new quote
            } else if (mode === 'words') {
                handleTestEnd(); // For word mode, completing the passage ends the test
            } else if (mode === 'time') {
                // In time mode, if text is completed and time is still left, generate new text
                if (countdown > 0) {
                    generateText();
                } else {
                    // Time might have run out exactly upon completion
                    handleTestEnd();
                }
            }
        }
    } else if (value.length > text.length) {
        // Handling for typing beyond the text length (optional)
        // For now, we effectively stop input here by not calling setInput for the longer string.
        // Or, you could slice: setInput(value.slice(0, text.length));
    }
  }, [
    isActive, text, mode, timeLimit, completedTexts, showResults, countdown,
    calculateMetrics, handleTestEnd, generateText,
    setIsActive, setStartTime, setInput, setCursorPosition,
    setCorrectChars, setIncorrectChars, setCompletedTexts, setCountdown
  ]);

  const handleKeyPress = useCallback((key) => {
    if (showResults || !inputRef.current) return;

    setActiveKey(key);
    setTimeout(() => setActiveKey(null), 150);

    // Construct the new value based on the key press
    // This logic should ideally operate on the `input` state for consistency
    // rather than `inputRef.current.value` if possible, to keep it fully controlled.
    // However, using inputRef.current.value is often done for immediate response before re-render.
    // Let's try with `input` state for cleaner controlled component pattern.
    
    let newValue = "";
    if (key === 'Backspace') {
      newValue = input.slice(0, -1);
    } else if (key === ' ') {
      newValue = input + ' ';
    } else if (key.length === 1) { // For letters, numbers, symbols
      newValue = input + key;
    } else {
      return; // Ignore other keys like 'Shift', 'Control', etc. for text input
    }

    // Manually create an event-like object to pass to handleInputChange
    // This ensures handleInputChange logic (which expects an event) is reused
    const syntheticEvent = { target: { value: newValue } };
    handleInputChange(syntheticEvent);

  }, [input, handleInputChange, showResults, setActiveKey]);


  useEffect(() => {
    const onKeyDown = (e) => {
      if (showResults) return;
      if (document.activeElement !== inputRef.current &&
          (document.activeElement instanceof HTMLInputElement ||
           document.activeElement instanceof HTMLSelectElement ||
           document.activeElement instanceof HTMLTextAreaElement)) {
        return;
      }
      if (e.key === 'Tab') return;

      if (e.key === ' ' || e.key === 'Backspace' || (e.key.length === 1 && !e.ctrlKey && !e.metaKey)) {
        e.preventDefault();
        handleKeyPress(e.key);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleKeyPress, showResults]);


  useEffect(() => {
    if (inputRef.current && !showResults && isActive) { // Only focus if active and not showing results
      inputRef.current.focus();
    } else if (inputRef.current && !isActive && !showResults) { // Focus on initial load/reset
        inputRef.current.focus();
    }
  }, [showResults, isActive, text]); // `text` changing implies a new test segment, good time to focus.


  // Render the text with highlighting (from your original component)
  const renderText = () => {
    if (!text) return null; // Don't render if text isn't loaded
    return (
      <div className="relative">
        <div
          ref={textRef} // textRef might be used for cursor positioning calculations not shown here
          className="text-xl md:text-2xl leading-relaxed select-none text-gray-700 dark:text-gray-300 mb-8 font-mono whitespace-pre-wrap tracking-wider"
        >
          {text.split('').map((char, index) => {
            let charClass = 'inline-block min-w-[0.6rem]'; // Ensure consistent char width for cursor
            if (index < input.length) {
              charClass += input[index] === char ? ' text-green-500' : ' text-red-500 bg-red-100 dark:bg-red-900';
            }
            // Add placeholder for characters not yet typed to maintain layout
            else if (isActive || showResults) { // Or always if you prefer
                 charClass += ' text-gray-400 dark:text-gray-600'; // Untyped characters
            }

            return (
              <span key={index} className={charClass}>
                {char === ' ' && index >= input.length ? '\u00A0' : (char === ' ' ? '\u00A0' : char)}
              </span>
            );
          })}
        </div>
        {/* Cursor Implementation */}
        {isActive && !showResults && (
          <div
            className="absolute top-0 h-full w-0.5 bg-blue-500 animate-pulse transition-all duration-75"
            style={{
              // This cursor positioning needs to be accurate.
              // `cursorPosition * 0.6`rem is an approximation.
              // For precise positioning, you might need to measure character widths or use a more robust method.
              // Assuming each character span effectively takes up 0.6rem due to min-w-[0.6rem]
              left: `${cursorPosition * 0.6}rem`,
              // Adjust height based on line-height of your text for better visual.
              // e.g., if line height is 2rem (from leading-relaxed and text-2xl), h-8 might be too small or large.
              // Setting h-full on the cursor and ensuring parent div.relative has appropriate height for one line.
              // For multi-line text, this cursor becomes more complex. The current one is for a single line.
              height: '1.75rem', // Example: md:text-2xl is 1.5rem, leading-relaxed is 1.625. Adjust.
              top: '0.125rem' // Adjust to align with text baseline
            }}
          />
        )}
      </div>
    );
  };

  // Render virtual keyboard (from your original component)
  const renderKeyboard = () => {
    return (
      <div className="mt-6 bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
        <div className="flex flex-col items-center gap-2">
          {keyboardRows.map((row, rowIndex) => (
            <div key={rowIndex} className="flex flex-wrap justify-center gap-1">
              {row.map((key) => {
                const isSpace = key === ' ';
                const keyClass = `flex items-center justify-center h-10 md:h-12 ${
                  isSpace ? 'w-48 md:w-64' : 'w-8 md:w-10' // Adjusted width for responsiveness
                } rounded-md text-sm md:text-base ${
                  activeKey === key
                    ? 'bg-blue-500 text-white transform scale-110'
                    : 'bg-white dark:bg-gray-600 text-gray-800 dark:text-white shadow-sm dark:shadow-md'
                } ${
                  isSpace ? '' : 'shadow-md'
                } cursor-pointer select-none transition-all duration-150 ease-in-out hover:bg-blue-300 dark:hover:bg-blue-700`;

                return (
                  <div
                    key={key}
                    className={keyClass}
                    onClick={() => handleKeyPress(key)}
                  >
                    {isSpace ? 'Space' : key.toUpperCase()}
                  </div>
                );
              })}
              {/* Backspace key for the last row (assuming it's the symbol row based on common layouts) */}
              {/* This adds Backspace to the end of each row, which is not typical.
                  Let's put it at the end of the last letter row or as a separate button.
                  For simplicity, adding it after the last row if it's the last defined row.
              */}
            </div>
          ))}
           {/* Dedicated Backspace Button - better placed */}
           <div className="flex justify-center mt-1">
                <div
                    className="flex items-center justify-center h-10 md:h-12 w-20 md:w-24 rounded-md bg-red-500 hover:bg-red-600 text-white shadow-md cursor-pointer select-none transition-colors duration-150 text-sm md:text-base"
                    onClick={() => handleKeyPress('Backspace')}
                >
                    ⌫ Back
                </div>
            </div>
        </div>
      </div>
    );
  };

  // JSX Return (matches the structure you provided)
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <Head>
        <title>Typing Practice | Speed Test</title>
        <meta name="description" content="Improve your typing speed and accuracy with our typing practice system" />
      </Head>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">
          Typing Speed Test
        </h1>

        {!showResults ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            {/* Settings Bar */}
            <div className="flex flex-wrap gap-4 mb-6 justify-between items-center">
              <div className="flex flex-wrap gap-4">
                {/* Mode Select */}
                <div>
                  <label htmlFor="mode" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Test Mode
                  </label>
                  <select
                    id="mode"
                    value={mode}
                    onChange={(e) => setMode(e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    disabled={isActive}
                  >
                    <option value="time">Time Trial</option>
                    <option value="words">Word Count</option>
                    <option value="quote">Quote</option>
                  </select>
                </div>

                {/* Time Limit Select */}
                {mode === 'time' && (
                  <div>
                    <label htmlFor="timeLimit" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Duration (sec)
                    </label>
                    <select
                      id="timeLimit"
                      value={timeLimit}
                      onChange={(e) => setTimeLimit(Number(e.target.value))}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      disabled={isActive}
                    >
                      <option value="30">30</option>
                      <option value="60">60</option>
                      <option value="120">120</option>
                      <option value="180">180</option>
                    </select>
                  </div>
                )}

                {/* Word Limit Select */}
                {mode === 'words' && (
                  <div>
                    <label htmlFor="wordLimit" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Word Count
                    </label>
                    <select
                      id="wordLimit"
                      value={wordLimit}
                      onChange={(e) => setWordLimit(Number(e.target.value))}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      disabled={isActive}
                    >
                      <option value="25">25</option>
                      <option value="50">50</option>
                      <option value="100">100</option>
                      <option value="200">200</option>
                    </select>
                  </div>
                )}

                {/* Difficulty Select */}
                <div>
                  <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Difficulty
                  </label>
                  <select
                    id="difficulty"
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    disabled={isActive}
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={() => setShowKeyboard(!showKeyboard)}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
                >
                  {showKeyboard ? 'Hide Keyboard' : 'Show Keyboard'}
                </button>
                <button
                  onClick={resetTest}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
                >
                  Restart
                </button>
              </div>
            </div>

            {/* Countdown Timer */}
            {mode === 'time' && isActive && (
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                  {countdown}s
                </div>
              </div>
            )}

            {/* Stats Display */}
            <div className="flex flex-wrap justify-between mb-6 gap-4">
              <div className="text-center bg-gray-100 dark:bg-gray-700 p-3 rounded-lg flex-1 min-w-[120px]">
                <div className="text-sm text-gray-600 dark:text-gray-300">WPM</div>
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{wpm}</div>
              </div>
              <div className="text-center bg-gray-100 dark:bg-gray-700 p-3 rounded-lg flex-1 min-w-[120px]">
                <div className="text-sm text-gray-600 dark:text-gray-300">Accuracy</div>
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">{accuracy}%</div>
              </div>
              <div className="text-center bg-gray-100 dark:bg-gray-700 p-3 rounded-lg flex-1 min-w-[120px]">
                <div className="text-sm text-gray-600 dark:text-gray-300">Characters</div>
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {correctChars}/{correctChars + incorrectChars}
                </div>
              </div>
            </div>

            {/* Text Display Area */}
            <div className="mb-6">
              {renderText()}
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={handleInputChange}
                className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white opacity-100 h-auto" // Ensure it's not hidden by accident
                placeholder={isActive ? "" : "Start typing here..."}
                autoFocus
                disabled={showResults || !text || !isActive && text.length === 0}
              />
            </div>

            {showKeyboard && renderKeyboard()}
          </div>
        ) : (
          // Results Screen
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
              Test Results
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-blue-50 dark:bg-blue-900/30 p-6 rounded-lg text-center">
                <div className="text-sm text-blue-600 dark:text-blue-300 mb-1">Words Per Minute</div>
                <div className="text-4xl font-bold text-blue-700 dark:text-blue-200">{wpm}</div>
                <div className="text-xs text-blue-500 dark:text-blue-400 mt-2">{(wpm >= 60 ? 'Excellent!' : wpm >= 40 ? 'Good!' : 'Keep practicing!')}</div>
              </div>
              <div className="bg-green-50 dark:bg-green-900/30 p-6 rounded-lg text-center">
                <div className="text-sm text-green-600 dark:text-green-300 mb-1">Accuracy</div>
                <div className="text-4xl font-bold text-green-700 dark:text-green-200">{accuracy}%</div>
                <div className="text-xs text-green-500 dark:text-green-400 mt-2">
                  {accuracy >= 98 ? 'Perfect!' : accuracy >= 95 ? 'Great!' : 'Needs improvement'}
                </div>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/30 p-6 rounded-lg text-center">
                <div className="text-sm text-purple-600 dark:text-purple-300 mb-1">Characters</div>
                <div className="text-4xl font-bold text-purple-700 dark:text-purple-200">
                  {correctChars}/{correctChars + incorrectChars}
                </div>
                <div className="text-xs text-purple-500 dark:text-purple-400 mt-2">
                  {incorrectChars === 0 ? 'Flawless!' : incorrectChars <= 3 ? 'Almost perfect!' : 'Watch those typos!'}
                </div>
              </div>
            </div>
            {quote && (mode === 'quote' || (mode !== 'time' && mode !== 'words')) && (
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mb-6">
                <blockquote className="text-lg italic text-gray-800 dark:text-gray-200 mb-2">
                  "{quote.text}"
                </blockquote>
                <p className="text-right text-gray-600 dark:text-gray-400">— {quote.author}</p>
              </div>
            )}
            <div className="flex justify-center">
              <button
                onClick={resetTest}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-medium"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Typing Tips</h2>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li>• Keep your fingers on the home row keys (ASDF JKL;)</li>
            <li>• Maintain good posture with your back straight</li>
            <li>• Practice regularly for at least 10-15 minutes daily</li>
            <li>• Focus on accuracy first, speed will come with time</li>
            <li>• Avoid looking at the keyboard (use touch typing)</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TypingPractice;
