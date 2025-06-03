'use client'
import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';

const HtmlCssPractice = () => {
  const [activeTab, setActiveTab] = useState('html');
  const [difficulty, setDifficulty] = useState('beginner');
  const [currentExercise, setCurrentExercise] = useState(null);
  const [userCode, setUserCode] = useState('');
  const [output, setOutput] = useState('');
  const [showSolution, setShowSolution] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [completionTime, setCompletionTime] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const iframeRef = useRef(null);

  // Sample exercises
  const exercises = {
    html: {
      beginner: [
        {
          id: 1,
          title: 'Basic HTML Structure',
          description: 'Create a basic HTML5 document structure with doctype, html, head, and body tags.',
          instructions: 'Write the minimum required HTML code for a valid HTML5 document.',
          solution: `<!DOCTYPE html>
<html>
<head>
  <title>Document</title>
</head>
<body>
  
</body>
</html>`,
          test: (code) => {
            return code.includes('<!DOCTYPE html>') && 
                   code.includes('<html>') && 
                   code.includes('<head>') && 
                   code.includes('<body>');
          }
        },
        {
          id: 2,
          title: 'Heading Elements',
          description: 'Create a page with all six heading levels (h1 to h6).',
          instructions: 'Add h1 to h6 elements with any text content.',
          solution: `<h1>Main Heading</h1>
<h2>Subheading</h2>
<h3>Sub-subheading</h3>
<h4>Level 4 Heading</h4>
<h5>Level 5 Heading</h5>
<h6>Level 6 Heading</h6>`,
          test: (code) => {
            const headings = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
            return headings.every(tag => code.includes(`<${tag}>`));
          }
        }
      ],
      intermediate: [
        {
          id: 3,
          title: 'Form Creation',
          description: 'Create a contact form with name, email, and message fields.',
          instructions: 'Build a form with appropriate input fields and a submit button.',
          solution: `<form>
  <label for="name">Name:</label>
  <input type="text" id="name" name="name"><br>
  
  <label for="email">Email:</label>
  <input type="email" id="email" name="email"><br>
  
  <label for="message">Message:</label>
  <textarea id="message" name="message"></textarea><br>
  
  <button type="submit">Submit</button>
</form>`,
          test: (code) => {
            return code.includes('<form') && 
                   code.includes('<input') && 
                   code.includes('<textarea') && 
                   code.includes('<button');
          }
        }
      ],
      advanced: [
        {
          id: 4,
          title: 'Semantic Layout',
          description: 'Create a semantic HTML5 page layout with header, nav, main, article, aside, and footer.',
          instructions: 'Use semantic HTML5 elements to structure a webpage layout.',
          solution: `<header>
  <h1>Website Title</h1>
  <nav>
    <ul>
      <li><a href="#">Home</a></li>
      <li><a href="#">About</a></li>
    </ul>
  </nav>
</header>

<main>
  <article>
    <h2>Article Title</h2>
    <p>Article content...</p>
  </article>
  
  <aside>
    <h3>Sidebar</h3>
    <p>Additional information...</p>
  </aside>
</main>

<footer>
  <p>&copy; 2023 My Website</p>
</footer>`,
          test: (code) => {
            const elements = ['header', 'nav', 'main', 'article', 'aside', 'footer'];
            return elements.every(el => code.includes(`<${el}>`));
          }
        }
      ]
    },
    css: {
      beginner: [
        {
          id: 5,
          title: 'Basic Styling',
          description: 'Style a paragraph with specific font properties.',
          instructions: 'Create a CSS rule that makes paragraphs have blue text, 18px font size, and Arial font family.',
          html: `<p>This is a paragraph to style.</p>`,
          solution: `p {
  color: blue;
  font-size: 18px;
  font-family: Arial;
}`,
          test: (css) => {
            return css.includes('color: blue') && 
                   css.includes('font-size: 18px') && 
                   css.includes('font-family: Arial');
          }
        },
        {
          id: 6,
          title: 'Box Model',
          description: 'Apply box model properties to a div.',
          instructions: 'Style a div with 20px padding, 2px black border, and 10px margin.',
          html: `<div>Styled box</div>`,
          solution: `div {
  padding: 20px;
  border: 2px solid black;
  margin: 10px;
}`,
          test: (css) => {
            return css.includes('padding: 20px') && 
                   css.includes('border: 2px solid black') && 
                   css.includes('margin: 10px');
          }
        }
      ],
      intermediate: [
        {
          id: 7,
          title: 'Flexbox Layout',
          description: 'Create a flexbox layout with centered items.',
          instructions: 'Use flexbox to center a div both horizontally and vertically within its container.',
          html: `<div class="container">
  <div class="box">Centered Box</div>
</div>`,
          solution: `.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  border: 1px solid #ccc;
}

.box {
  width: 100px;
  height: 100px;
  background: lightblue;
}`,
          test: (css) => {
            return css.includes('display: flex') && 
                   css.includes('justify-content: center') && 
                   css.includes('align-items: center');
          }
        }
      ],
      advanced: [
        {
          id: 8,
          title: 'CSS Grid',
          description: 'Create a responsive grid layout.',
          instructions: 'Implement a 3-column grid that becomes 1 column on mobile devices.',
          html: `<div class="grid-container">
  <div class="item">1</div>
  <div class="item">2</div>
  <div class="item">3</div>
</div>`,
          solution: `.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

@media (max-width: 600px) {
  .grid-container {
    grid-template-columns: 1fr;
  }
}`,
          test: (css) => {
            return css.includes('display: grid') && 
                   css.includes('grid-template-columns: repeat(3, 1fr)') && 
                   css.includes('@media (max-width: 600px)');
          }
        }
      ]
    }
  };

  // Load a random exercise
  const loadExercise = () => {
    const availableExercises = exercises[activeTab][difficulty];
    const randomIndex = Math.floor(Math.random() * availableExercises.length);
    const exercise = availableExercises[randomIndex];
    
    setCurrentExercise(exercise);
    setUserCode('');
    setOutput('');
    setShowSolution(false);
    setIsCorrect(false);
    setTimer(0);
    setIsTimerRunning(true);
    
    if (activeTab === 'css' && exercise.html) {
      setOutput(exercise.html);
    }
  };

  // Run the code
  const runCode = () => {
    if (!currentExercise) return;
    
    if (activeTab === 'html') {
      // For HTML, just show the output
      setOutput(userCode);
      
      // Test if the code is correct
      if (currentExercise.test) {
        setIsCorrect(currentExercise.test(userCode));
      }
    } else if (activeTab === 'css') {
      // For CSS, combine with the HTML
      const html = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>${userCode}</style>
        </head>
        <body>${output}</body>
        </html>
      `;
      
      // Update the iframe
      if (iframeRef.current) {
        const iframeDoc = iframeRef.current.contentDocument || iframeRef.current.contentWindow.document;
        iframeDoc.open();
        iframeDoc.write(html);
        iframeDoc.close();
      }
      
      // Test if the code is correct
      if (currentExercise.test) {
        setIsCorrect(currentExercise.test(userCode));
      }
    }
  };

  // Show the solution
  const showSolutionHandler = () => {
    setShowSolution(true);
    setUserCode(currentExercise.solution);
    setIsTimerRunning(false);
    setCompletionTime(timer);
  };

  // Timer effect
  useEffect(() => {
    let interval;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  // Load initial exercise
  useEffect(() => {
    loadExercise();
  }, [activeTab, difficulty]);

  // Run code when userCode changes
  useEffect(() => {
    if (userCode) {
      runCode();
    }
  }, [userCode]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <Head>
        <title>HTML/CSS Practice | Coding Exercises</title>
        <meta name="description" content="Practice your HTML and CSS skills with interactive coding exercises" />
      </Head>

      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">
          HTML & CSS Practice
        </h1>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-gray-200 dark:border-gray-700">
            <button
              className={`px-6 py-3 font-medium ${activeTab === 'html' ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400' : 'text-gray-600 dark:text-gray-400'}`}
              onClick={() => setActiveTab('html')}
            >
              HTML Practice
            </button>
            <button
              className={`px-6 py-3 font-medium ${activeTab === 'css' ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400' : 'text-gray-600 dark:text-gray-400'}`}
              onClick={() => setActiveTab('css')}
            >
              CSS Practice
            </button>
          </div>

          {/* Difficulty Selector */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Difficulty:</span>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
              <button
                onClick={loadExercise}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white"
              >
                New Exercise
              </button>
            </div>
          </div>

          {currentExercise && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
              {/* Exercise Description */}
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">{currentExercise.title}</h2>
                <p className="text-gray-700 dark:text-gray-300">{currentExercise.description}</p>
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md">
                  <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Instructions:</h3>
                  <p className="text-gray-700 dark:text-gray-300">{currentExercise.instructions}</p>
                </div>

                {/* Timer */}
                <div className="flex items-center space-x-2">
                  <span className="text-gray-700 dark:text-gray-300">Time:</span>
                  <span className="font-mono text-lg font-bold text-blue-600 dark:text-blue-400">
                    {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
                  </span>
                </div>

                {/* Results */}
                {isCorrect && (
                  <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-md">
                    <div className="flex items-center space-x-2 text-green-700 dark:text-green-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Correct! Time: {completionTime || timer} seconds</span>
                    </div>
                  </div>
                )}

                {/* Solution Button */}
                {!isCorrect && (
                  <button
                    onClick={showSolutionHandler}
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
                  >
                    Show Solution
                  </button>
                )}
              </div>

              {/* Code Editor */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {activeTab === 'html' ? 'HTML Code' : 'CSS Code'}
                  </label>
                  <textarea
                    value={userCode}
                    onChange={(e) => setUserCode(e.target.value)}
                    className="w-full h-64 font-mono text-sm p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder={`Enter your ${activeTab.toUpperCase()} code here...`}
                    spellCheck="false"
                  />
                </div>

                {/* Output */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {activeTab === 'html' ? 'HTML Output' : 'CSS Preview'}
                  </label>
                  {activeTab === 'html' ? (
                    <div className="w-full h-64 p-4 border border-gray-300 rounded-md bg-white dark:bg-gray-900 overflow-auto">
                      {output ? (
                        <div dangerouslySetInnerHTML={{ __html: output }} />
                      ) : (
                        <div className="text-gray-500 dark:text-gray-400">Output will appear here...</div>
                      )}
                    </div>
                  ) : (
                    <>
                      <div className="mb-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          HTML (for styling)
                        </label>
                        <textarea
                          value={output}
                          onChange={(e) => setOutput(e.target.value)}
                          className="w-full h-20 font-mono text-sm p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          spellCheck="false"
                        />
                      </div>
                      <div className="w-full h-64 border border-gray-300 rounded-md bg-white dark:bg-gray-900 overflow-hidden">
                        <iframe
                          ref={iframeRef}
                          title="CSS Output"
                          className="w-full h-full"
                          sandbox="allow-same-origin"
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Learning Resources */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Learning Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">HTML</h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>• <a href="https://developer.mozilla.org/en-US/docs/Web/HTML" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline dark:text-blue-400">MDN HTML Documentation</a></li>
                <li>• <a href="https://html.spec.whatwg.org/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline dark:text-blue-400">HTML Living Standard</a></li>
                <li>• <a href="https://web.dev/learn/html/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline dark:text-blue-400">Web.dev HTML Guide</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">CSS</h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>• <a href="https://developer.mozilla.org/en-US/docs/Web/CSS" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline dark:text-blue-400">MDN CSS Documentation</a></li>
                <li>• <a href="https://css-tricks.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline dark:text-blue-400">CSS-Tricks</a></li>
                <li>• <a href="https://web.dev/learn/css/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline dark:text-blue-400">Web.dev CSS Guide</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HtmlCssPractice;