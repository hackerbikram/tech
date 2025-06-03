'use client'
import { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCode, FaShieldAlt, FaBrain, FaNetworkWired, FaCloud, FaMicrochip, FaSearch, FaArrowLeft, FaBook, FaVideo, FaLaptopCode, FaCertificate } from 'react-icons/fa';

const TechUniverse = () => {
  const [activeDomain, setActiveDomain] = useState('overview');
  const [selectedTech, setSelectedTech] = useState(null);
  const [isExploring, setIsExploring] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Technology domains data
  const techDomains = [
    {
      id: 'software',
      title: 'Software Engineering',
      icon: <FaCode className="text-blue-500 text-3xl" />,
      color: 'from-blue-500 to-indigo-600',
      description: 'The art and science of building digital solutions',
      technologies: [
        {
          id: 'react',
          name: 'React',
          logo: <div className="bg-blue-100 p-3 rounded-lg"><FaCode className="text-blue-600 text-2xl" /></div>,
          description: 'JavaScript library for building UI components',
          details: 'React uses a virtual DOM for efficient updates and supports server-side rendering with frameworks like Next.js. It follows a component-based architecture that promotes reusable UI components.',
          learningPath: [
            { level: 'Beginner', topics: ['JSX Basics', 'Components & Props', 'State & Lifecycle'] },
            { level: 'Intermediate', topics: ['Hooks', 'Context API', 'React Router'] },
            { level: 'Advanced', topics: ['State Management', 'Performance Optimization', 'Testing'] }
          ],
          resources: [
            { type: 'course', title: 'React Official Docs', url: 'https://reactjs.org/docs/getting-started.html' },
            { type: 'video', title: 'React Crash Course', url: 'https://youtube.com/reactcrashcourse' },
            { type: 'project', title: 'Build a Todo App', url: 'https://example.com/react-todo' }
          ]
        },
        {
          id: 'nodejs',
          name: 'Node.js',
          logo: <div className="bg-green-100 p-3 rounded-lg"><FaCode className="text-green-600 text-2xl" /></div>,
          description: 'JavaScript runtime built on Chrome\'s V8 engine',
          details: 'Node.js enables JavaScript to run on the server side, perfect for building scalable network applications. It uses an event-driven, non-blocking I/O model that makes it lightweight and efficient.',
          learningPath: [
            { level: 'Beginner', topics: ['Node Fundamentals', 'NPM Ecosystem', 'Core Modules'] },
            { level: 'Intermediate', topics: ['Express Framework', 'RESTful APIs', 'Middleware'] },
            { level: 'Advanced', topics: ['Authentication', 'Performance Tuning', 'Deployment'] }
          ],
          resources: [
            { type: 'course', title: 'Node.js Documentation', url: 'https://nodejs.org/en/docs/' },
            { type: 'book', title: 'Node.js Design Patterns', url: 'https://example.com/node-book' }
          ]
        }
      ]
    },
    {
      id: 'hardware',
      title: 'Hardware & Systems',
      icon: <FaMicrochip className="text-green-500 text-3xl" />,
      color: 'from-green-500 to-teal-600',
      description: 'Understanding the physical components of computing',
      technologies: [
        {
          id: 'cpu',
          name: 'CPU Architecture',
          logo: <div className="bg-green-100 p-3 rounded-lg"><FaMicrochip className="text-green-600 text-2xl" /></div>,
          description: 'Central Processing Unit - The brain of the computer',
          details: 'Modern CPUs use multiple cores, pipelining, and cache hierarchies to optimize performance. They execute instructions through a cycle of fetch, decode, execute, and writeback stages. Clock speed, measured in GHz, determines how many cycles a CPU can perform per second.',
          learningPath: [
            { level: 'Beginner', topics: ['CPU Components', 'Instruction Cycle', 'Clock Speeds'] },
            { level: 'Intermediate', topics: ['Pipelining', 'Cache Memory', 'Multicore Processing'] },
            { level: 'Advanced', topics: ['Superscalar Architecture', 'Branch Prediction', 'Thermal Design'] }
          ],
          resources: [
            { type: 'article', title: 'How CPUs Work', url: 'https://example.com/cpu-architecture' },
            { type: 'video', title: 'CPU Architecture Explained', url: 'https://youtube.com/cpu-architecture' }
          ]
        }
      ]
    },
    {
      id: 'cybersecurity',
      title: 'Cybersecurity',
      icon: <FaShieldAlt className="text-red-500 text-3xl" />,
      color: 'from-red-500 to-orange-600',
      description: 'Protecting systems and data from digital attacks',
      technologies: [
        {
          id: 'pentesting',
          name: 'Penetration Testing',
          logo: <div className="bg-red-100 p-3 rounded-lg"><FaShieldAlt className="text-red-600 text-2xl" /></div>,
          description: 'Ethical hacking to identify vulnerabilities',
          details: 'Penetration testing involves simulating cyber attacks to identify security weaknesses. Testers use tools like Metasploit, Nmap, and Wireshark to discover vulnerabilities before malicious hackers can exploit them.',
          learningPath: [
            { level: 'Beginner', topics: ['Networking Fundamentals', 'Linux Basics', 'Security Concepts'] },
            { level: 'Intermediate', topics: ['Vulnerability Scanning', 'Exploitation Techniques', 'Web App Security'] },
            { level: 'Advanced', topics: ['Advanced Persistence', 'Social Engineering', 'Reporting & Remediation'] }
          ],
          resources: [
            { type: 'course', title: 'Ethical Hacking Course', url: 'https://example.com/ethical-hacking' },
            { type: 'certification', title: 'CEH Certification Path', url: 'https://example.com/ceh' }
          ]
        }
      ]
    },
    {
      id: 'ai-ml',
      title: 'AI & Machine Learning',
      icon: <FaBrain className="text-purple-500 text-3xl" />,
      color: 'from-purple-500 to-pink-600',
      description: 'Creating intelligent systems that learn from data',
      technologies: [
        {
          id: 'tensorflow',
          name: 'TensorFlow',
          logo: <div className="bg-purple-100 p-3 rounded-lg"><FaBrain className="text-purple-600 text-2xl" /></div>,
          description: 'Open-source library for machine learning',
          details: 'Developed by Google, TensorFlow provides tools for building and deploying ML models across different platforms. It supports deep learning and neural networks with high-level APIs like Keras.',
          learningPath: [
            { level: 'Beginner', topics: ['ML Concepts', 'TensorFlow Basics', 'Linear Regression'] },
            { level: 'Intermediate', topics: ['Neural Networks', 'CNN for Images', 'RNN for Sequences'] },
            { level: 'Advanced', topics: ['Transfer Learning', 'Generative Models', 'Model Deployment'] }
          ],
          resources: [
            { type: 'course', title: 'TensorFlow Tutorials', url: 'https://www.tensorflow.org/learn' },
            { type: 'project', title: 'Image Classification Project', url: 'https://example.com/tensorflow-project' }
          ]
        }
      ]
    },
    {
      id: 'networking',
      title: 'Networking',
      icon: <FaNetworkWired className="text-yellow-500 text-3xl" />,
      color: 'from-yellow-500 to-amber-600',
      description: 'Communication between computers and devices',
      technologies: [
        {
          id: 'tcpip',
          name: 'TCP/IP Model',
          logo: <div className="bg-yellow-100 p-3 rounded-lg"><FaNetworkWired className="text-yellow-600 text-2xl" /></div>,
          description: 'Fundamental communication protocol of the internet',
          details: 'The TCP/IP model consists of four layers: Application, Transport, Internet, and Network Access. It governs how data is packaged, addressed, transmitted, routed, and received on networks.',
          learningPath: [
            { level: 'Beginner', topics: ['OSI Model', 'IP Addressing', 'Basic Protocols'] },
            { level: 'Intermediate', topics: ['Subnetting', 'Routing Protocols', 'Network Security'] },
            { level: 'Advanced', topics: ['Quality of Service', 'MPLS', 'Network Automation'] }
          ],
          resources: [
            { type: 'book', title: 'TCP/IP Illustrated', url: 'https://example.com/tcp-ip-book' },
            { type: 'course', title: 'Network+ Certification', url: 'https://example.com/network-plus' }
          ]
        }
      ]
    },
    {
      id: 'cloud',
      title: 'Cloud Computing',
      icon: <FaCloud className="text-indigo-500 text-3xl" />,
      color: 'from-indigo-500 to-blue-600',
      description: 'On-demand availability of computer system resources',
      technologies: [
        {
          id: 'aws',
          name: 'Amazon Web Services',
          logo: <div className="bg-indigo-100 p-3 rounded-lg"><FaCloud className="text-indigo-600 text-2xl" /></div>,
          description: 'Comprehensive cloud computing platform',
          details: 'AWS offers over 200 services including computing power, storage, and databases. It provides a global infrastructure with regions and availability zones for high availability and fault tolerance.',
          learningPath: [
            { level: 'Beginner', topics: ['Cloud Concepts', 'EC2 Basics', 'S3 Storage'] },
            { level: 'Intermediate', topics: ['VPC Networking', 'IAM Security', 'Database Services'] },
            { level: 'Advanced', topics: ['Serverless Architecture', 'Auto Scaling', 'Cloud Migration'] }
          ],
          resources: [
            { type: 'course', title: 'AWS Certification Path', url: 'https://aws.amazon.com/certification/' },
            { type: 'project', title: 'Deploy a Web App on AWS', url: 'https://example.com/aws-project' }
          ]
        }
      ]
    }
  ];

  // Computer components deep dive
  const computerComponents = [
    {
      id: 'motherboard',
      name: 'Motherboard',
      description: 'The main circuit board connecting all components',
      image: <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />,
      details: {
        function: 'Provides electrical connections between components',
        keyParts: ['Chipset', 'BIOS/UEFI', 'Expansion slots', 'Connectors'],
        importance: 'Critical - All components communicate through the motherboard'
      }
    },
    {
      id: 'cpu',
      name: 'CPU',
      description: 'Central Processing Unit - The brain of the computer',
      image: <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />,
      details: {
        function: 'Executes instructions from computer programs',
        keyParts: ['ALU', 'Control Unit', 'Cache', 'Registers'],
        importance: 'Determines overall system performance'
      }
    },
    {
      id: 'gpu',
      name: 'GPU',
      description: 'Graphics Processing Unit',
      image: <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />,
      details: {
        function: 'Renders images, animations and video for display',
        keyParts: ['CUDA Cores', 'VRAM', 'Cooling System'],
        importance: 'Essential for graphics-intensive tasks and parallel computing'
      }
    }
  ];

  // Filter technologies based on search
  const filteredDomains = techDomains.map(domain => ({
    ...domain,
    technologies: domain.technologies.filter(tech => 
      tech.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tech.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(domain => domain.technologies.length > 0);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  // Simulate loading
  useEffect(() => {
    if (activeDomain !== 'overview') {
      setIsLoading(true);
      const timer = setTimeout(() => setIsLoading(false), 500);
      return () => clearTimeout(timer);
    }
  }, [activeDomain]);

  return (
    <div className="tech-universe min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <Head>
        <title>Tech Universe | Complete Tech Knowledge</title>
        <meta name="description" content="Explore all technology domains from software to hardware" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Head>
     
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden z-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10"
            style={{
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 10 + Math.random() * 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <header className="text-center mb-12">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Technology Universe
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Explore the complete spectrum of computing knowledge from hardware to AI
          </motion.p>
        </header>

        {/* Search Bar */}
        <motion.div 
          className="max-w-2xl mx-auto mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <div className="relative">
            <input
              type="text"
              placeholder="Search technologies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-3 px-5 pl-12 rounded-xl bg-gray-800 border border-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 text-white"
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              <FaSearch />
            </div>
          </div>
        </motion.div>

        {/* Main Navigation */}
        <nav className="mb-10 overflow-x-auto pb-2">
          <motion.ul
            className="flex space-x-2 justify-center min-w-max"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.li 
              variants={itemVariants}
              className={`px-4 py-2 rounded-lg cursor-pointer transition-all ${
                activeDomain === 'overview' 
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/30' 
                  : 'bg-gray-800 hover:bg-gray-700'
              }`}
              onClick={() => setActiveDomain('overview')}
            >
              <span className="flex items-center space-x-2">
                <span>🌟</span>
                <span>Overview</span>
              </span>
            </motion.li>
            
            {techDomains.map(domain => (
              <motion.li
                key={domain.id}
                variants={itemVariants}
                className={`px-4 py-2 rounded-lg cursor-pointer transition-all ${
                  activeDomain === domain.id 
                    ? `bg-gradient-to-r ${domain.color} shadow-lg shadow-blue-500/30` 
                    : 'bg-gray-800 hover:bg-gray-700'
                }`}
                onClick={() => setActiveDomain(domain.id)}
              >
                <span className="flex items-center space-x-2">
                  {domain.icon}
                  <span>{domain.title}</span>
                </span>
              </motion.li>
            ))}
            
            <motion.li 
              variants={itemVariants}
              className={`px-4 py-2 rounded-lg cursor-pointer transition-all ${
                activeDomain === 'hardware-deepdive' 
                  ? 'bg-gradient-to-r from-green-500 to-teal-600 shadow-lg shadow-green-500/30' 
                  : 'bg-gray-800 hover:bg-gray-700'
              }`}
              onClick={() => setActiveDomain('hardware-deepdive')}
            >
              <span className="flex items-center space-x-2">
                <span>🔧</span>
                <span>Hardware Deep Dive</span>
              </span>
            </motion.li>
          </motion.ul>
        </nav>

        {/* Main Content Area */}
        <main className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700 shadow-xl min-h-[500px]">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex justify-center items-center h-64"
              >
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </motion.div>
            ) : activeDomain === 'overview' ? (
              <motion.div
                key="overview"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overview-container"
              >
                <h2 className="text-3xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                  Welcome to the Technology Universe
                </h2>
                <p className="text-gray-300 text-center max-w-2xl mx-auto mb-12">
                  This interactive portal gives you complete access to all aspects of modern computing technology with structured learning paths from beginner to expert.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                  {techDomains.map(domain => (
                    <motion.div 
                      key={domain.id}
                      whileHover={{ y: -10, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`p-6 rounded-2xl cursor-pointer bg-gradient-to-br ${domain.color} shadow-lg`}
                      onClick={() => setActiveDomain(domain.id)}
                    >
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="text-2xl">
                          {domain.icon}
                        </div>
                        <h3 className="text-xl font-bold">{domain.title}</h3>
                      </div>
                      <p className="text-gray-200 mb-4">{domain.description}</p>
                      <div className="text-sm font-medium bg-black/20 px-3 py-1 rounded-full inline-block">
                        {domain.technologies.length}+ Technologies
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="bg-gray-900/50 p-6 rounded-2xl">
                  <h3 className="text-2xl font-bold mb-4">Recommended Learning Path</h3>
                  <ol className="space-y-4">
                    {[
                      "Computer Fundamentals & Hardware Basics",
                      "Programming Concepts (Algorithms, Data Structures)",
                      "Software Development (Frontend & Backend)",
                      "Networking & Security Fundamentals",
                      "Cloud Computing & DevOps",
                      "Specialization (AI, Cybersecurity, etc.)"
                    ].map((step, index) => (
                      <li key={index} className="flex items-start">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center mr-3 mt-1">
                          {index + 1}
                        </div>
                        <span className="text-lg">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </motion.div>
            ) : activeDomain !== 'hardware-deepdive' ? (
              <motion.div
                key={activeDomain}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="domain-container"
              >
                {filteredDomains.filter(d => d.id === activeDomain).map(domain => (
                  <div key={domain.id}>
                    <div className="domain-header text-center mb-10">
                      <h2 className="text-3xl font-bold mb-2">{domain.title}</h2>
                      <p className="text-gray-300 max-w-2xl mx-auto">{domain.description}</p>
                    </div>

                    {isExploring ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="exploration-mode"
                      >
                        <button 
                          className="flex items-center text-blue-400 mb-6 hover:text-blue-300 transition-colors"
                          onClick={() => setIsExploring(false)}
                        >
                          <FaArrowLeft className="mr-2" /> 
                          Back to {domain.title}
                        </button>

                        {selectedTech && (
                          <div className="tech-deepdive max-w-4xl mx-auto">
                            <div className="flex items-center space-x-4 mb-6">
                              {selectedTech.logo}
                              <div>
                                <h3 className="text-2xl font-bold">{selectedTech.name}</h3>
                                <p className="text-gray-400">{selectedTech.description}</p>
                              </div>
                            </div>
                            
                            <div className="bg-gray-900/50 rounded-xl p-6 mb-8">
                              <h4 className="text-xl font-bold mb-3">Detailed Explanation</h4>
                              <p className="text-gray-300 leading-relaxed">{selectedTech.details}</p>
                            </div>

                            <div className="mb-8">
                              <h4 className="text-xl font-bold mb-4">Learning Path</h4>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {selectedTech.learningPath.map((path, index) => (
                                  <div key={index} className="bg-gray-900/50 rounded-xl p-5">
                                    <div className="font-bold text-blue-400 mb-2">{path.level}</div>
                                    <ul className="space-y-2">
                                      {path.topics.map((topic, i) => (
                                        <li key={i} className="flex items-start">
                                          <span className="text-green-400 mr-2">✓</span>
                                          <span>{topic}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {selectedTech.resources && (
                              <div>
                                <h4 className="text-xl font-bold mb-4">Learning Resources</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  {selectedTech.resources.map((resource, index) => (
                                    <a 
                                      key={index} 
                                      href={resource.url} 
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      className="resource-card bg-gray-900/50 hover:bg-gray-800 transition-all rounded-xl p-5 flex items-start"
                                    >
                                      <div className="mr-4 mt-1">
                                        {resource.type === 'course' && <FaBook className="text-blue-500 text-xl" />}
                                        {resource.type === 'video' && <FaVideo className="text-red-500 text-xl" />}
                                        {resource.type === 'project' && <FaLaptopCode className="text-green-500 text-xl" />}
                                        {resource.type === 'certification' && <FaCertificate className="text-yellow-500 text-xl" />}
                                      </div>
                                      <div>
                                        <div className="font-medium">{resource.title}</div>
                                        <div className="text-sm text-gray-400 capitalize">{resource.type}</div>
                                      </div>
                                    </a>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </motion.div>
                    ) : (
                      <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="tech-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                      >
                        {domain.technologies.map(tech => (
                          <motion.div
                            key={tech.id}
                            variants={itemVariants}
                            whileHover={{ y: -10, scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="tech-card bg-gray-900/50 hover:bg-gray-800 transition-all rounded-2xl p-6 cursor-pointer border border-gray-700 shadow-lg"
                            onClick={() => {
                              setSelectedTech(tech);
                              setIsExploring(true);
                            }}
                          >
                            <div className="flex items-start space-x-4 mb-4">
                              {tech.logo}
                              <h3 className="text-xl font-bold">{tech.name}</h3>
                            </div>
                            <p className="text-gray-400 mb-6">{tech.description}</p>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-500">Click to explore</span>
                              <span className="text-blue-400">→</span>
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="hardware-deepdive"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="hardware-container"
              >
                <h2 className="text-3xl font-bold text-center mb-2">Computer Hardware Deep Dive</h2>
                <p className="text-gray-300 text-center mb-10 max-w-2xl mx-auto">
                  Understand the physical components that make up modern computing systems
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                  {computerComponents.map(component => (
                    <motion.div 
                      key={component.id}
                      whileHover={{ y: -10 }}
                      className="component-card bg-gray-900/50 rounded-2xl p-6 border border-gray-700 shadow-lg"
                    >
                      <div className="flex justify-center mb-4">
                        {component.image}
                      </div>
                      <h3 className="text-xl font-bold text-center mb-2">{component.name}</h3>
                      <p className="text-gray-400 text-center mb-6">{component.description}</p>
                      
                      <div className="component-details bg-gray-800/50 rounded-xl p-4">
                        <div className="detail-item mb-3">
                          <span className="detail-label font-medium text-gray-300">Function:</span>
                          <span className="text-gray-400">{component.details.function}</span>
                        </div>
                        <div className="detail-item mb-3">
                          <span className="detail-label font-medium text-gray-300">Key Parts:</span>
                          <span className="text-gray-400">{component.details.keyParts.join(', ')}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label font-medium text-gray-300">Importance:</span>
                          <span className="text-gray-400">{component.details.importance}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="hardware-knowledge bg-gray-900/50 rounded-2xl p-6">
                  <h3 className="text-2xl font-bold mb-6 text-center">How Computer Hardware Works Together</h3>
                  <div className="workflow max-w-2xl mx-auto">
                    <div className="workflow-step mb-8">
                      <div className="flex items-center">
                        <div className="step-number w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold mr-4">
                          1
                        </div>
                        <div className="step-content bg-gray-800/50 rounded-xl p-4 flex-1">
                          <h4 className="text-lg font-bold text-blue-400 mb-2">Input</h4>
                          <p className="text-gray-400">Devices like keyboards and mice send data to the CPU via the motherboard</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-center mb-8">
                      <div className="h-8 w-0.5 bg-blue-500"></div>
                    </div>
                    
                    <div className="workflow-step mb-8">
                      <div className="flex items-center">
                        <div className="step-number w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-bold mr-4">
                          2
                        </div>
                        <div className="step-content bg-gray-800/50 rounded-xl p-4 flex-1">
                          <h4 className="text-lg font-bold text-green-400 mb-2">Processing</h4>
                          <p className="text-gray-400">CPU executes instructions, using RAM for temporary storage and cache for speed</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-center mb-8">
                      <div className="h-8 w-0.5 bg-green-500"></div>
                    </div>
                    
                    <div className="workflow-step">
                      <div className="flex items-center">
                        <div className="step-number w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold mr-4">
                          3
                        </div>
                        <div className="step-content bg-gray-800/50 rounded-xl p-4 flex-1">
                          <h4 className="text-lg font-bold text-purple-400 mb-2">Output</h4>
                          <p className="text-gray-400">Processed data is sent to output devices like monitors via the GPU</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default TechUniverse;