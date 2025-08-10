// components/HackingDocs.js
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-python';

const HackingDocs = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [codeVisible, setCodeVisible] = useState(false);
  const [terminalOutput, setTerminalOutput] = useState([]);
  
  useEffect(() => {
    Prism.highlightAll();
  }, [activeTab]);

  const simulateTerminal = () => {
    const messages = [
      "> Initializing Bikram Hacking Tool v4.2.7",
      "> Loading neural network subsystems...",
      "> Establishing encrypted connection...",
      "> Connection secured with AES-256",
      "> AI threat matrix online",
      "> Vulnerability database synced",
      "> Ready for commands"
    ];
    
    let i = 0;
    const interval = setInterval(() => {
      if (i < messages.length) {
        setTerminalOutput(prev => [...prev, messages[i]]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 300);
  };

  useEffect(() => {
    simulateTerminal();
  }, []);

  const features = [
    {
      title: "AI-Powered Exploitation",
      description: "Our neural networks analyze systems in real-time, identifying vulnerabilities with 98.7% accuracy and automatically generating optimized exploits.",
      icon: "🤖"
    },
    {
      title: "Zero-Day Deployment",
      description: "Access our proprietary database of undisclosed vulnerabilities with automated weaponization capabilities.",
      icon: "💣"
    },
    {
      title: "Stealth Operations",
      description: "Advanced TOR routing, traffic obfuscation, and forensic countermeasures ensure complete anonymity.",
      icon: "🕵️"
    },
    {
      title: "Cross-Platform",
      description: "Target Windows, Linux, macOS, IoT devices, and cloud infrastructure with unified tooling.",
      icon: "🔀"
    }
  ];

  const codeExample = `class AIPoweredHackTool:
  def __init__(self):
      self.ai_models = self.initialize_ai_models()
      self.session_id = self.generate_session_id()
      self.targets = []
      
  def initialize_ai_models(self):
      # Neural network for vulnerability prediction
      self.vuln_model = RandomForestClassifier(n_estimators=200)
      
      # Deep learning for password pattern recognition
      self.password_model = MLPClassifier(hidden_layer_sizes=(256, 128))
      
      # Anomaly detection for stealth operations
      self.stealth_model = IsolationForest(contamination=0.01)
      
      return {
          'vulnerability': self.vuln_model,
          'password': self.password_model,
          'stealth': self.stealth_model
      }
  
  def zero_day_exploit(self, target):
      # AI selects the best exploit based on target profile
      exploit = self.ai_select_exploit(target)
      
      # Deploy with forensic countermeasures
      success = self.deploy_payload(exploit, target)
      
      if success:
          self.establish_persistence(target)
          return "System compromised"
      return "Exploit failed"

# Initialize and attack
tool = AIPoweredHackTool()
tool.acquire_target("192.168.1.105")
result = tool.zero_day_exploit()
print(result)`;

  return (
    <div className="min-h-screen bg-gray-900 text-green-400 font-mono overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-green-500 opacity-20 text-xs"
            initial={{ y: -50, x: Math.random() * window.innerWidth }}
            animate={{ y: window.innerHeight }}
            transition={{
              duration: Math.random() * 10 + 5,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
          >
            {Math.random() > 0.5 ? '0' : '1'}
          </motion.div>
        ))}
      </div>
      
      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-block relative">
            <h1 className="text-5xl md:text-7xl font-bold text-green-400 mb-4 tracking-tighter">
              BIKRAM <span className="text-cyan-400">AI</span> HACKING SYSTEM
            </h1>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent"></div>
          </div>
          
          <p className="text-green-300 max-w-3xl mx-auto mt-6 text-lg">
            Next-generation penetration testing framework powered by machine learning and neural networks
          </p>
        </motion.div>
        
        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12 border-b border-green-800 pb-4">
          {['overview', 'features', 'documentation', 'examples', 'ethics'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-t-lg transition-all ${
                activeTab === tab
                  ? 'bg-green-900 text-cyan-300 border-b-2 border-cyan-400'
                  : 'text-green-500 hover:text-cyan-300'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
        
        {/* Content */}
        <div className="bg-black bg-opacity-70 backdrop-blur-lg rounded-xl border border-green-800 shadow-2xl shadow-green-900/30 overflow-hidden">
          {/* Terminal-style header */}
          <div className="bg-green-900 bg-opacity-30 px-6 py-3 border-b border-green-700 flex items-center">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <div className="ml-4 text-sm text-green-300">
              root@bikram:~/docs/{activeTab} 
              <span className="ml-2 inline-block w-2 h-4 bg-green-400 animate-pulse"></span>
            </div>
          </div>
          
          {/* Tab content */}
          <div className="p-6 md:p-8">
            {activeTab === 'overview' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h2 className="text-2xl font-bold text-cyan-300 mb-4">AI-Powered Penetration Testing</h2>
                    <p className="mb-4 text-green-300 leading-relaxed">
                      The Bikram Hacking System represents the cutting edge of cybersecurity tools, combining 
                      advanced artificial intelligence with military-grade exploitation techniques. Designed for 
                      professional security researchers and penetration testers.
                    </p>
                    <p className="mb-6 text-green-300 leading-relaxed">
                      Our neural networks continuously analyze threat landscapes, adapting attack vectors in real-time 
                      to bypass modern security systems. The framework evolves with each operation, learning from 
                      successful exploits and failed attempts to become more effective.
                    </p>
                    
                    <div className="bg-gray-800 rounded-lg p-4 border border-green-800 mb-6">
                      <div className="text-sm text-green-400 mb-2">SYSTEM STATUS</div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="flex items-center">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                            <span>AI Subsystems</span>
                          </div>
                          <div className="h-1 bg-gray-700 mt-1 rounded-full overflow-hidden">
                            <div className="h-full bg-green-500 w-4/5"></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center">
                            <div className="w-2 h-2 bg-cyan-500 rounded-full mr-2"></div>
                            <span>Threat Database</span>
                          </div>
                          <div className="h-1 bg-gray-700 mt-1 rounded-full overflow-hidden">
                            <div className="h-full bg-cyan-500 w-full"></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center">
                            <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                            <span>Stealth Protocols</span>
                          </div>
                          <div className="h-1 bg-gray-700 mt-1 rounded-full overflow-hidden">
                            <div className="h-full bg-yellow-500 w-3/4"></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center">
                            <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                            <span>Exploit Framework</span>
                          </div>
                          <div className="h-1 bg-gray-700 mt-1 rounded-full overflow-hidden">
                            <div className="h-full bg-purple-500 w-2/3"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-black rounded-xl border border-green-800 p-4">
                    <div className="text-green-400 text-sm mb-2">TERMINAL OUTPUT</div>
                    <div className="bg-gray-900 rounded-lg p-4 h-80 overflow-auto font-mono text-sm">
                      {terminalOutput.map((line, i) => (
                        <div key={i} className="mb-1">{line}</div>
                      ))}
                      <div className="flex items-center">
                        <span className="text-green-400">root@bikram:~#</span>
                        <span className="ml-2 w-2 h-4 bg-green-400 animate-pulse"></span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            
            {activeTab === 'features' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl font-bold text-cyan-300 mb-6">Advanced Capabilities</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-green-800 hover:border-cyan-500 transition-all"
                    >
                      <div className="text-3xl mb-4">{feature.icon}</div>
                      <h3 className="text-xl font-bold text-green-400 mb-2">{feature.title}</h3>
                      <p className="text-green-300">{feature.description}</p>
                    </motion.div>
                  ))}
                </div>
                
                <div className="mt-12">
                  <h3 className="text-xl font-bold text-cyan-300 mb-4">Technical Specifications</h3>
                  <div className="bg-gray-800 rounded-lg p-6 border border-green-800">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      <div>
                        <div className="text-sm text-green-400 mb-1">AI INFERENCE</div>
                        <div className="text-2xl font-bold">3.2ms</div>
                        <div className="text-xs text-green-500">per vulnerability</div>
                      </div>
                      <div>
                        <div className="text-sm text-green-400 mb-1">EXPLOIT DB</div>
                        <div className="text-2xl font-bold">12,487</div>
                        <div className="text-xs text-green-500">weaponized exploits</div>
                      </div>
                      <div>
                        <div className="text-sm text-green-400 mb-1">SUCCESS RATE</div>
                        <div className="text-2xl font-bold">94.7%</div>
                        <div className="text-xs text-green-500">against hardened systems</div>
                      </div>
                      <div>
                        <div className="text-sm text-green-400 mb-1">STEALTH</div>
                        <div className="text-2xl font-bold">0.01%</div>
                        <div className="text-xs text-green-500">detection probability</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            
            {activeTab === 'documentation' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl font-bold text-cyan-300 mb-6">Technical Documentation</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <h3 className="text-xl font-bold text-green-400 mb-4">Getting Started</h3>
                    
                    <div className="mb-8">
                      <h4 className="font-bold text-green-300 mb-2">Installation</h4>
                      <div className="bg-gray-900 rounded-lg p-4 border border-green-800 mb-4">
                        <pre className="text-green-300 overflow-x-auto">
                          <code className="language-bash">
                            {`# Install via pip
pip install bikram-ai-hacking

# Or clone from repository
git clone https://github.com/bikram-ai/hacking-system
cd hacking-system
python setup.py install`}
                          </code>
                        </pre>
                      </div>
                      <p className="text-green-400 text-sm">
                        Requires Python 3.10+ and 8GB+ RAM for AI subsystems
                      </p>
                    </div>
                    
                    <div className="mb-8">
                      <h4 className="font-bold text-green-300 mb-2">Basic Usage</h4>
                      <div className="bg-gray-900 rounded-lg p-4 border border-green-800 mb-4">
                        <pre className="text-green-300 overflow-x-auto">
                          <code className="language-python">
                            {`from bikram import AIPoweredHackTool

# Initialize the hacking system
tool = AIPoweredHackTool()

# Discover targets on the network
targets = tool.scan_network("192.168.1.0/24")

# Select a target
target = tool.select_target(targets[0])

# AI-powered vulnerability assessment
vulnerabilities = tool.ai_assess_vulnerabilities(target)

# Exploit the most critical vulnerability
exploit_result = tool.exploit(target, vulnerabilities[0])

# Maintain persistent access
tool.establish_persistence(target)`}
                          </code>
                        </pre>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-green-400 mb-4">Core Modules</h3>
                    
                    <div className="space-y-4">
                      {[
                        {name: "Network Recon", icon: "📡", color: "bg-cyan-600"},
                        {name: "AI Exploit Engine", icon: "🧠", color: "bg-purple-600"},
                        {name: "Stealth Protocols", icon: "👻", color: "bg-green-600"},
                        {name: "Post-Exploitation", icon: "🔓", color: "bg-yellow-600"},
                        {name: "Forensic Evasion", icon: "🧹", color: "bg-red-600"},
                        {name: "Reporting", icon: "📊", color: "bg-blue-600"},
                      ].map((module, i) => (
                        <div key={i} className="flex items-center p-3 bg-gray-800 rounded-lg border border-green-800">
                          <div className={`w-10 h-10 rounded-full ${module.color} flex items-center justify-center mr-4`}>
                            <span className="text-xl">{module.icon}</span>
                          </div>
                          <div>
                            <div className="font-bold text-green-300">{module.name}</div>
                            <div className="text-xs text-green-500">Documentation →</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            
            {activeTab === 'examples' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl font-bold text-cyan-300 mb-6">Practical Examples</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold text-green-400 mb-4">Zero-Day Exploitation</h3>
                    
                    <div className="mb-6">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-bold text-green-300">AI-Powered Exploit Selection</h4>
                        <button 
                          onClick={() => setCodeVisible(!codeVisible)}
                          className="text-sm px-3 py-1 bg-green-900 rounded hover:bg-green-800"
                        >
                          {codeVisible ? "Hide Code" : "Show Code"}
                        </button>
                      </div>
                      
                      {codeVisible && (
                        <div className="bg-gray-900 rounded-lg p-4 border border-green-800 mb-4">
                          <pre className="text-green-300 overflow-x-auto">
                            <code className="language-python">
                              {codeExample}
                            </code>
                          </pre>
                        </div>
                      )}
                      
                      <p className="text-green-300">
                        This example demonstrates how the AI system selects the optimal exploit based on target 
                        profiling. The neural network analyzes over 200 factors to choose the most effective 
                        attack vector with the lowest detection probability.
                      </p>
                    </div>
                    
                    <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-6 border border-cyan-500">
                      <h4 className="font-bold text-cyan-300 mb-3">Real-World Application</h4>
                      <p className="text-green-300 mb-4">
                        In a recent penetration test, this module successfully compromised a hardened financial 
                        network in 4.2 seconds, bypassing $2M worth of security infrastructure.
                      </p>
                      <div className="flex items-center text-green-400 text-sm">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        Verified in production environment
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-green-400 mb-4">Network Mapping Visualization</h3>
                    
                    <div className="bg-black rounded-xl border border-green-800 p-4 h-96 flex items-center justify-center">
                      <div className="relative">
                        {/* Network visualization */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full border-2 border-cyan-500 flex items-center justify-center">
                          <div className="text-cyan-300 font-bold">TARGET</div>
                        </div>
                        
                        {[...Array(6)].map((_, i) => {
                          const angle = (i / 6) * Math.PI * 2;
                          const radius = 150;
                          const x = Math.cos(angle) * radius;
                          const y = Math.sin(angle) * radius;
                          
                          return (
                            <motion.div
                              key={i}
                              className="absolute w-12 h-12 rounded-full bg-gradient-to-br from-green-800 to-green-700 border border-green-600 flex items-center justify-center"
                              style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)` }}
                              animate={{ 
                                boxShadow: [
                                  '0 0 5px rgba(72, 187, 120, 0.5)',
                                  '0 0 20px rgba(72, 187, 120, 0.8)',
                                  '0 0 5px rgba(72, 187, 120, 0.5)'
                                ]
                              }}
                              transition={{ 
                                duration: 2, 
                                repeat: Infinity,
                                delay: i * 0.2
                              }}
                            >
                              <div className="text-xs text-green-300">Node {i+1}</div>
                            </motion.div>
                          );
                        })}
                        
                        {/* Connection lines */}
                        {[...Array(6)].map((_, i) => {
                          const angle1 = (i / 6) * Math.PI * 2;
                          const angle2 = ((i + 2) % 6 / 6) * Math.PI * 2;
                          const radius = 150;
                          const x1 = Math.cos(angle1) * radius;
                          const y1 = Math.sin(angle1) * radius;
                          const x2 = Math.cos(angle2) * radius;
                          const y2 = Math.sin(angle2) * radius;
                          
                          return (
                            <motion.div
                              key={i}
                              className="absolute top-1/2 left-1/2"
                              style={{
                                width: Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)),
                                height: 2,
                                background: 'linear-gradient(to right, transparent, #48bb78, transparent)',
                                transform: `translate(-50%, -50%) rotate(${Math.atan2(y2 - y1, x2 - x1)}rad)`,
                                transformOrigin: '0% 0%',
                                left: `calc(50% + ${x1}px)`,
                                top: `calc(50% + ${y1}px)`
                              }}
                              animate={{ opacity: [0.3, 0.8, 0.3] }}
                              transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
                            />
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            
            {activeTab === 'ethics' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="max-w-3xl mx-auto"
              >
                <h2 className="text-2xl font-bold text-cyan-300 mb-6 text-center">Ethical Guidelines</h2>
                
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 border border-green-800">
                  <div className="text-center mb-8">
                    <div className="inline-block p-4 rounded-full bg-gray-700 mb-4">
                      <div className="text-4xl">⚖️</div>
                    </div>
                    <h3 className="text-xl font-bold text-green-400">Responsible Use Policy</h3>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-cyan-900 flex items-center justify-center mr-4">
                        <div className="text-lg">1</div>
                      </div>
                      <div>
                        <h4 className="font-bold text-green-300 mb-1">Legal Authorization</h4>
                        <p className="text-green-400">
                          Only use this tool on systems you own or have explicit written permission to test. 
                          Unauthorized access is illegal and unethical.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-cyan-900 flex items-center justify-center mr-4">
                        <div className="text-lg">2</div>
                      </div>
                      <div>
                        <h4 className="font-bold text-green-300 mb-1">Disclosure Policy</h4>
                        <p className="text-green-400">
                          Responsibly disclose vulnerabilities to vendors before public release. Allow adequate 
                          time for patches to be developed and deployed.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-cyan-900 flex items-center justify-center mr-4">
                        <div className="text-lg">3</div>
                      </div>
                      <div>
                        <h4 className="font-bold text-green-300 mb-1">Data Protection</h4>
                        <p className="text-green-400">
                          Never access, modify, or exfiltrate sensitive personal data during testing. 
                          Immediately report any accidental access to proper authorities.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-cyan-900 flex items-center justify-center mr-4">
                        <div className="text-lg">4</div>
                      </div>
                      <div>
                        <h4 className="font-bold text-green-300 mb-1">Educational Purpose</h4>
                        <p className="text-green-400">
                          This tool is intended for cybersecurity education, research, and authorized penetration 
                          testing. Misuse violates our license agreement.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-green-800">
                    <div className="bg-red-900 bg-opacity-30 p-4 rounded-lg border border-red-700">
                      <div className="flex items-center">
                        <div className="text-2xl mr-3">⚠️</div>
                        <div className="text-red-300 font-bold">
                          UNAUTHORIZED USE OF THIS TOOL MAY RESULT IN CRIMINAL PROSECUTION
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
        
        {/* Footer */}
        <div className="mt-12 text-center text-green-600 text-sm">
          <p>BIKRAM AI HACKING SYSTEM v4.2.7 | FOR EDUCATIONAL PURPOSES ONLY</p>
          <p className="mt-2">© 2023 Bikram Security Research | All Rights Reserved</p>
        </div>
      </div>
    </div>
  );
};

export default HackingDocs;