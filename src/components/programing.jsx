'use client'
import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';

const ProgrammingPractice = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [difficulty, setDifficulty] = useState('beginner');
  const [currentExercise, setCurrentExercise] = useState(null);
  const [userCode, setUserCode] = useState('');
  const [output, setOutput] = useState('');
  const [showSolution, setShowSolution] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [completionTime, setCompletionTime] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [activeTab, setActiveTab] = useState('exercise');
  const [showConsole, setShowConsole] = useState(false);
  const consoleEndRef = useRef(null);

  // Supported programming languages
  const languages = [
    { id: 'javascript', name: 'JavaScript', icon: '🟨' },
    { id: 'python', name: 'Python', icon: '🐍' },
    { id: 'java', name: 'Java', icon: '☕' },
    { id: 'cpp', name: 'C++', icon: '🔷' },
    { id: 'ruby', name: 'Ruby', icon: '💎' },
  ];

  // Sample exercises for each language
  const exercises = {
    javascript: {
      beginner: [
        {
          id: 1,
          title: 'Hello World',
          description: 'Write a program that prints "Hello, World!" to the console.',
          instructions: 'Use console.log() to print the message.',
          solution: 'console.log("Hello, World!");',
          test: (code) => {
            try {
              const logs = [];
              const originalLog = console.log;
              console.log = (...args) => logs.push(args.join(' '));
              eval(code);
              console.log = originalLog;
              return logs.some(log => log.includes('Hello, World!'));
            } catch {
              return false;
            }
          }
        },
        {
          id: 2,
          title: 'Sum Two Numbers',
          description: 'Write a function that takes two numbers and returns their sum.',
          instructions: 'Create a function called sum that takes two parameters and returns their sum.',
          solution: 'function sum(a, b) {\n  return a + b;\n}',
          test: (code) => {
            try {
              eval(code);
              return typeof sum === 'function' && sum(2, 3) === 5 && sum(-1, 1) === 0;
            } catch {
              return false;
            }
          }
        }
      ],
      intermediate: [
        {
          id: 3,
          title: 'Array Manipulation',
          description: 'Write a function that filters out odd numbers from an array.',
          instructions: 'Create a function called filterOdds that takes an array and returns a new array with only even numbers.',
          solution: 'function filterOdds(arr) {\n  return arr.filter(num => num % 2 === 0);\n}',
          test: (code) => {
            try {
              eval(code);
              const testArr = [1, 2, 3, 4, 5];
              const result = filterOdds(testArr);
              return Array.isArray(result) && result.length === 2 && result.includes(2) && result.includes(4);
            } catch {
              return false;
            }
          }
        }
      ],
      advanced: [
        {
          id: 4,
          title: 'Promise Handling',
          description: 'Create a function that fetches data from an API and returns the JSON response.',
          instructions: 'Use fetch() to get data from "https://jsonplaceholder.typicode.com/todos/1" and return the parsed JSON.',
          solution: 'async function fetchTodo() {\n  const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");\n  return await response.json();\n}',
          test: (code) => {
            try {
              eval(code);
              // We can't actually test the fetch in this environment, so we'll check the structure
              return code.includes('fetch(') && 
                     code.includes('await') && 
                     code.includes('.json()');
            } catch {
              return false;
            }
          }
        }
      ]
    },
    python: {
      beginner: [
        {
          id: 1,
          title: 'Hello World',
          description: 'Write a program that prints "Hello, World!" to the console.',
          instructions: 'Use print() to output the message.',
          solution: 'print("Hello, World!")',
          test: (code) => {
            return code.includes('print("Hello, World!")') || 
                   code.includes("print('Hello, World!')");
          }
        },
        {
          id: 2,
          title: 'List Sum',
          description: 'Write a function that calculates the sum of numbers in a list.',
          instructions: 'Create a function called sum_list that takes a list and returns the sum of its elements.',
          solution: 'def sum_list(numbers):\n    return sum(numbers)',
          test: (code) => {
            return code.includes('def sum_list') && 
                   (code.includes('sum(numbers)') || 
                    code.includes('return sum('));
          }
        }
      ],
      intermediate: [
        {
          id: 3,
          title: 'Dictionary Manipulation',
          description: 'Create a function that merges two dictionaries.',
          instructions: 'Write a function called merge_dicts that takes two dictionaries and returns a new merged dictionary.',
          solution: 'def merge_dicts(dict1, dict2):\n    return {**dict1, **dict2}',
          test: (code) => {
            return code.includes('def merge_dicts') && 
                   code.includes('{**dict1, **dict2}');
          }
        }
      ],
      advanced: [
        {
          id: 4,
          title: 'List Comprehension',
          description: 'Create a list comprehension that squares even numbers and cubes odd numbers.',
          instructions: 'Given a list of numbers, create a new list where even numbers are squared and odd numbers are cubed.',
          solution: 'numbers = [1, 2, 3, 4, 5]\nresult = [num**2 if num % 2 == 0 else num**3 for num in numbers]',
          test: (code) => {
            return code.includes('[') && 
                   code.includes('for num in numbers') && 
                   code.includes('if num % 2 == 0');
          }
        }
      ]
    },
    java: {
      beginner: [
        {
          id: 1,
          title: 'Hello World',
          description: 'Write a program that prints "Hello, World!" to the console.',
          instructions: 'Create a main method in a class and use System.out.println().',
          solution: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}',
          test: (code) => {
            return code.includes('public class') && 
                   code.includes('main(String[] args)') && 
                   code.includes('System.out.println("Hello, World!");');
          }
        }
      ],
      intermediate: [
        {
          id: 2,
          title: 'Class Creation',
          description: 'Create a simple Person class with name and age fields.',
          instructions: 'Implement a Person class with private fields, constructor, and getter methods.',
          solution: 'public class Person {\n    private String name;\n    private int age;\n\n    public Person(String name, int age) {\n        this.name = name;\n        this.age = age;\n    }\n\n    public String getName() { return name; }\n    public int getAge() { return age; }\n}',
          test: (code) => {
            return code.includes('public class Person') && 
                   code.includes('private String name') && 
                   code.includes('public Person(') && 
                   code.includes('getName()');
          }
        }
      ],
      advanced: [
        {
          id: 3,
          title: 'Interface Implementation',
          description: 'Create an interface and a class that implements it.',
          instructions: 'Define a Shape interface with getArea() method, then create a Circle class that implements it.',
          solution: 'interface Shape {\n    double getArea();\n}\n\nclass Circle implements Shape {\n    private double radius;\n\n    public Circle(double radius) {\n        this.radius = radius;\n    }\n\n    @Override\n    public double getArea() {\n        return Math.PI * radius * radius;\n    }\n}',
          test: (code) => {
            return code.includes('interface Shape') && 
                   code.includes('class Circle implements Shape') && 
                   code.includes('@Override') && 
                   code.includes('getArea()');
          }
        }
      ]
    },
    cpp: {
      beginner: [
        {
          id: 1,
          title: 'Hello World',
          description: 'Write a program that prints "Hello, World!" to the console.',
          instructions: 'Include iostream and use std::cout.',
          solution: '#include <iostream>\n\nint main() {\n    std::cout << "Hello, World!" << std::endl;\n    return 0;\n}',
          test: (code) => {
            return code.includes('#include <iostream>') && 
                   code.includes('std::cout << "Hello, World!"');
          }
        }
      ],
      intermediate: [
        {
          id: 2,
          title: 'Function Overloading',
          description: 'Create overloaded functions to calculate area of different shapes.',
          instructions: 'Implement three area() functions: one for circle (radius), one for rectangle (length, width), and one for triangle (base, height).',
          solution: '#include <cmath>\n\nfloat area(float radius) {\n    return M_PI * radius * radius;\n}\n\nfloat area(float length, float width) {\n    return length * width;\n}\n\nfloat area(float base, float height, bool isTriangle) {\n    return 0.5 * base * height;\n}',
          test: (code) => {
            return code.includes('float area(float radius)') && 
                   code.includes('float area(float length, float width)') && 
                   code.includes('M_PI') || code.includes('3.14159');
          }
        }
      ],
      advanced: [
        {
          id: 3,
          title: 'Class Template',
          description: 'Create a template class for a simple Stack data structure.',
          instructions: 'Implement a Stack class with push(), pop(), and isEmpty() methods using templates.',
          solution: 'template <typename T>\nclass Stack {\nprivate:\n    std::vector<T> elements;\n\npublic:\n    void push(T const& elem) {\n        elements.push_back(elem);\n    }\n\n    void pop() {\n        if (!elements.empty()) {\n            elements.pop_back();\n        }\n    }\n\n    bool isEmpty() const {\n        return elements.empty();\n    }\n};',
          test: (code) => {
            return code.includes('template <typename T>') && 
                   code.includes('class Stack') && 
                   code.includes('push(') && 
                   code.includes('pop(');
          }
        }
      ]
    },
    ruby: {
      beginner: [
        {
          id: 1,
          title: 'Hello World',
          description: 'Write a program that prints "Hello, World!" to the console.',
          instructions: 'Use puts to output the message.',
          solution: 'puts "Hello, World!"',
          test: (code) => {
            return code.includes('puts "Hello, World!"') || 
                   code.includes('puts \'Hello, World!\'');
          }
        }
      ],
      intermediate: [
        {
          id: 2,
          title: 'Method Creation',
          description: 'Create a method that calculates the factorial of a number.',
          instructions: 'Implement a factorial method that takes an integer and returns its factorial.',
          solution: 'def factorial(n)\n  return 1 if n <= 1\n  n * factorial(n - 1)\nend',
          test: (code) => {
            return code.includes('def factorial') && 
                   code.includes('n * factorial(n - 1)');
          }
        }
      ],
      advanced: [
        {
          id: 3,
          title: 'Class with Mixin',
          description: 'Create a class that includes a module (mixin).',
          instructions: 'Define a Greeter module with a greet method, then create a Person class that includes it.',
          solution: 'module Greeter\n  def greet(name)\n    "Hello, #{name}!"\n  end\nend\n\nclass Person\n  include Greeter\nend',
          test: (code) => {
            return code.includes('module Greeter') && 
                   code.includes('class Person') && 
                   code.includes('include Greeter');
          }
        }
      ]
    }
  };

  // Console messages
  const [consoleMessages, setConsoleMessages] = useState([]);

  // Load a random exercise
  const loadExercise = () => {
    const availableExercises = exercises[selectedLanguage][difficulty];
    const randomIndex = Math.floor(Math.random() * availableExercises.length);
    const exercise = availableExercises[randomIndex];
    
    setCurrentExercise(exercise);
    setUserCode('');
    setOutput('');
    setConsoleMessages([]);
    setShowSolution(false);
    setIsCorrect(false);
    setTimer(0);
    setIsTimerRunning(true);
    setActiveTab('exercise');
  };

  // Run the code
  const runCode = () => {
    if (!currentExercise) return;
    
    try {
      // Capture console.log output
      const logs = [];
      const originalLog = console.log;
      console.log = (...args) => {
        logs.push(args.join(' '));
        originalLog(...args);
      };

      // Execute the code
      let result;
      if (selectedLanguage === 'javascript') {
        result = eval(userCode);
      } else {
        // For other languages, we can't actually execute them, so we'll just show the code
        result = "Execution simulated - this would run in a real environment";
      }

      // Restore original console.log
      console.log = originalLog;

      // Update output and console
      setOutput(result !== undefined ? String(result) : 'undefined');
      setConsoleMessages(logs);
      setShowConsole(logs.length > 0);

      // Test if the code is correct
      if (currentExercise.test) {
        setIsCorrect(currentExercise.test(userCode));
      }
    } catch (error) {
      setOutput(`Error: ${error.message}`);
      setConsoleMessages([...consoleMessages, `Error: ${error.message}`]);
      setShowConsole(true);
      setIsCorrect(false);
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

  // Scroll console to bottom when new messages arrive
  useEffect(() => {
    if (consoleEndRef.current) {
      consoleEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [consoleMessages]);

  // Language selection screen
  if (!selectedLanguage) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <Head>
          <title>Programming Practice | Learn to Code</title>
          <meta name="description" content="Learn and practice programming with interactive exercises" />
        </Head>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">
            Learn & Practice Programming
          </h1>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-center text-gray-800 dark:text-white mb-6">
              Select a Programming Language
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {languages.map((language) => (
                <button
                  key={language.id}
                  onClick={() => setSelectedLanguage(language.id)}
                  className="flex items-center justify-center p-6 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <span className="text-2xl mr-3">{language.icon}</span>
                  <span className="text-lg font-medium">{language.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <Head>
        <title>{`${selectedLanguage.toUpperCase()} Practice | Learn to Code`}</title>
        <meta name="description" content={`Learn and practice ${selectedLanguage} programming with interactive exercises`} />
      </Head>

      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            {languages.find(l => l.id === selectedLanguage).name} Practice
          </h1>
          <button
            onClick={() => setSelectedLanguage(null)}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
          >
            Change Language
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          {/* Difficulty Selector */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex flex-wrap items-center gap-4">
              <div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">Difficulty:</span>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>

              <button
                onClick={loadExercise}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white"
              >
                New Exercise
              </button>

              <div className="flex items-center ml-auto">
                <span className="text-gray-700 dark:text-gray-300 mr-2">Time:</span>
                <span className="font-mono text-lg font-bold text-blue-600 dark:text-blue-400">
                  {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
                </span>
              </div>
            </div>
          </div>

          {currentExercise ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
              {/* Exercise Description */}
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white">{currentExercise.title}</h2>
                    <p className="text-gray-700 dark:text-gray-300 mt-1">{currentExercise.description}</p>
                  </div>
                  {isCorrect && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      Completed!
                    </span>
                  )}
                </div>

                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md">
                  <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Instructions:</h3>
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{currentExercise.instructions}</p>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-gray-200 dark:border-gray-700">
                  <button
                    className={`px-4 py-2 font-medium ${activeTab === 'exercise' ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400' : 'text-gray-600 dark:text-gray-400'}`}
                    onClick={() => setActiveTab('exercise')}
                  >
                    Exercise
                  </button>
                  <button
                    className={`px-4 py-2 font-medium ${activeTab === 'resources' ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400' : 'text-gray-600 dark:text-gray-400'}`}
                    onClick={() => setActiveTab('resources')}
                  >
                    Learning Resources
                  </button>
                </div>

                {/* Content based on active tab */}
                {activeTab === 'exercise' ? (
                  <>
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
                  </>
                ) : (
                  <div className="space-y-4">
                    <h3 className="font-medium text-gray-800 dark:text-gray-200">{selectedLanguage.toUpperCase()} Resources</h3>
                    <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                      <li>• <a href={`https://developer.mozilla.org/en-US/docs/Web/${selectedLanguage.toUpperCase()}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline dark:text-blue-400">MDN Documentation</a></li>
                      <li>• <a href={`https://www.w3schools.com/${selectedLanguage.toLowerCase()}/`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline dark:text-blue-400">W3Schools Tutorial</a></li>
                      <li>• <a href={`https://www.learn-${selectedLanguage.toLowerCase()}.org/`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline dark:text-blue-400">Interactive Tutorial</a></li>
                    </ul>
                  </div>
                )}
              </div>

              {/* Code Editor */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {selectedLanguage.toUpperCase()} Code Editor
                  </label>
                  <textarea
                    value={userCode}
                    onChange={(e) => setUserCode(e.target.value)}
                    className="w-full h-64 font-mono text-sm p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder={`Enter your ${selectedLanguage.toUpperCase()} code here...`}
                    spellCheck="false"
                  />
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={runCode}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-md text-white"
                  >
                    Run Code
                  </button>
                  <button
                    onClick={() => setShowConsole(!showConsole)}
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
                  >
                    {showConsole ? 'Hide Console' : 'Show Console'}
                  </button>
                </div>

                {/* Output */}
                {output && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Output
                    </label>
                    <div className="w-full p-4 border border-gray-300 rounded-md bg-white dark:bg-gray-900 dark:text-white font-mono whitespace-pre-wrap">
                      {output}
                    </div>
                  </div>
                )}

                {/* Console */}
                {showConsole && (
                  <div className="mt-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Console
                    </label>
                    <div className="w-full h-40 p-4 border border-gray-300 rounded-md bg-black text-green-400 font-mono overflow-auto">
                      {consoleMessages.length > 0 ? (
                        consoleMessages.map((msg, i) => (
                          <div key={i} className="mb-1 last:mb-0">&gt; {msg}</div>
                        ))
                      ) : (
                        <div className="text-gray-500">No console messages yet</div>
                      )}
                      <div ref={consoleEndRef} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="p-6 text-center">
              <p className="text-gray-700 dark:text-gray-300">Loading exercise...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgrammingPractice;