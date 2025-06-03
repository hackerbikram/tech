'use client'
import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';

const HardwareLearningLab = () => {
  // State management
  const [activeTab, setActiveTab] = useState('explorer');
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [pcBuild, setPcBuild] = useState([]);
  const [benchmarkResults, setBenchmarkResults] = useState(null);
  const [overclockSettings, setOverclockSettings] = useState({
    cpu: { clock: 0, voltage: 0 },
    gpu: { coreClock: 0, memoryClock: 0, powerLimit: 100 },
  });
  const [temperature, setTemperature] = useState({ cpu: 40, gpu: 35 });
  const [troubleshootingScenario, setTroubleshootingScenario] = useState(null);
  const [diagnosis, setDiagnosis] = useState('');

  // 3D viewer ref
  const viewerRef = useRef(null);

  // Hardware database
  const hardwareDB = {
    cpus: [
      { id: 'ryzen9-7950x', name: 'AMD Ryzen 9 7950X', cores: 16, threads: 32, baseClock: 4.5, boostClock: 5.7, cache: '80MB', tdp: 170 },
      { id: 'i9-13900k', name: 'Intel Core i9-13900K', cores: 24, threads: 32, baseClock: 3.0, boostClock: 5.8, cache: '36MB', tdp: 125 },
    ],
    gpus: [
      { id: 'rtx4090', name: 'NVIDIA RTX 4090', cudaCores: 16384, boostClock: 2520, memory: '24GB GDDR6X', busWidth: '384-bit', tdp: 450 },
      { id: 'rx7900xtx', name: 'AMD RX 7900 XTX', streamProcessors: 6144, boostClock: 2500, memory: '24GB GDDR6', busWidth: '384-bit', tdp: 355 },
    ],
    ram: [
      { id: 'ddr5-6000', name: 'DDR5 6000MHz', capacity: '32GB (16x2)', timings: 'CL30-36-36-76', voltage: 1.35 },
      { id: 'ddr4-3600', name: 'DDR4 3600MHz', capacity: '32GB (16x2)', timings: 'CL16-19-19-39', voltage: 1.35 },
    ],
    motherboards: [
      { id: 'x670e', name: 'ASUS ROG Crosshair X670E', socket: 'AM5', chipset: 'X670', memorySlots: 4, maxMemory: 128, pcieSlots: 'PCIe 5.0 x16' },
      { id: 'z790', name: 'MSI MPG Z790', socket: 'LGA1700', chipset: 'Z790', memorySlots: 4, maxMemory: 128, pcieSlots: 'PCIe 5.0 x16' },
    ],
  };

  // Benchmark tests
  const runBenchmark = (component) => {
    let results = {};
    
    if (component.type === 'cpu') {
      const score = Math.floor(Math.random() * 40000) + 20000;
      results = {
        cinebenchR23: score,
        singleCore: Math.floor(score / 10),
        powerDraw: Math.floor(Math.random() * 100) + 100,
      };
    } else if (component.type === 'gpu') {
      results = {
        timespy: Math.floor(Math.random() * 20000) + 10000,
        portRoyal: Math.floor(Math.random() * 15000) + 8000,
        temp: Math.floor(Math.random() * 20) + 60,
      };
    }
    
    setBenchmarkResults(results);
    return results;
  };

  // Overclocking simulation
  const applyOverclock = () => {
    const newTemps = {
      cpu: 40 + (overclockSettings.cpu.clock / 100) * 30,
      gpu: 35 + (overclockSettings.gpu.coreClock / 100) * 25,
    };
    setTemperature(newTemps);
    
    if (newTemps.cpu > 95 || newTemps.gpu > 90) {
      alert('Thermal throttling detected! Reduce overclock or improve cooling.');
    }
  };

  // PC Builder functions
  const addToBuild = (component) => {
    if (!pcBuild.some(item => item.type === component.type)) {
      setPcBuild([...pcBuild, component]);
    }
  };

  const checkCompatibility = () => {
    const issues = [];
    
    // Check CPU and motherboard socket
    const cpu = pcBuild.find(item => item.type === 'cpu');
    const mobo = pcBuild.find(item => item.type === 'motherboard');
    
    if (cpu && mobo) {
      if (cpu.id.includes('ryzen') && !mobo.id.includes('x670')) {
        issues.push('CPU and motherboard socket mismatch (AM5 required for Ryzen)');
      }
      if (cpu.id.includes('i9') && !mobo.id.includes('z790')) {
        issues.push('CPU and motherboard socket mismatch (LGA1700 required for Intel)');
      }
    }
    
    return issues.length ? issues : ['All components are compatible!'];
  };

  // Troubleshooting scenarios
  const troubleshootingScenarios = [
    {
      id: 1,
      description: 'PC powers on but no display output',
      possibleCauses: [
        'GPU not properly seated',
        'Faulty display cable',
        'Dead GPU',
        'Incorrect BIOS settings'
      ],
      solution: 'Reseat GPU, try different cable/port, test with integrated graphics'
    },
    {
      id: 2,
      description: 'System randomly crashes under load',
      possibleCauses: [
        'Insufficient power supply',
        'Overheating CPU/GPU',
        'Unstable RAM overclock',
        'Faulty power delivery'
      ],
      solution: 'Check temperatures, test with stock settings, verify PSU capacity'
    }
  ];

  // Load a random troubleshooting scenario
  const loadTroubleshootingScenario = () => {
    const randomIndex = Math.floor(Math.random() * troubleshootingScenarios.length);
    setTroubleshootingScenario(troubleshootingScenarios[randomIndex]);
    setDiagnosis('');
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Head>
        <title>Computer Hardware Learning Lab</title>
        <meta name="description" content="Interactive computer hardware learning platform" />
      </Head>

      <header className="bg-white dark:bg-gray-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Computer Hardware Learning Lab
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Explore, build, benchmark, and troubleshoot PC components
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Navigation Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-700 mb-8">
          {['explorer', 'builder', 'benchmark', 'overclock', 'troubleshoot'].map((tab) => (
            <button
              key={tab}
              className={`px-6 py-3 font-medium ${activeTab === tab ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400' : 'text-gray-600 dark:text-gray-400'}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* 3D Hardware Explorer */}
        {activeTab === 'explorer' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">3D Hardware Explorer</h2>
              <div 
                ref={viewerRef}
                className="w-full h-96 bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center"
              >
                {selectedComponent ? (
                  <div className="text-center">
                    <p className="text-lg font-medium">{selectedComponent.name}</p>
                    <p className="text-gray-600 dark:text-gray-300">Interactive 3D model would render here</p>
                  </div>
                ) : (
                  <p className="text-gray-600 dark:text-gray-300">Select a component to explore</p>
                )}
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Component Library</h2>
              <div className="space-y-4">
                {Object.entries(hardwareDB).map(([category, items]) => (
                  <div key={category}>
                    <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">
                      {category.toUpperCase()}
                    </h3>
                    <div className="space-y-2">
                      {items.map((item) => (
                        <button
                          key={item.id}
                          className={`w-full text-left p-3 rounded-md ${selectedComponent?.id === item.id ? 'bg-blue-100 dark:bg-blue-900' : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600'}`}
                          onClick={() => setSelectedComponent({ ...item, type: category.slice(0, -1) })}
                        >
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {category === 'cpus' && `${item.cores}C/${item.threads}T ${item.baseClock}GHz`}
                            {category === 'gpus' && `${item.cudaCores || item.streamProcessors} cores`}
                            {category === 'ram' && `${item.capacity} ${item.timings}`}
                            {category === 'motherboards' && `${item.socket} ${item.chipset}`}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* PC Builder */}
        {activeTab === 'builder' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Your PC Build</h2>
              
              {pcBuild.length === 0 ? (
                <div className="bg-gray-100 dark:bg-gray-700 rounded-md p-8 text-center">
                  <p className="text-gray-600 dark:text-gray-300">No components added yet</p>
                  <p className="text-sm mt-2">Select components from the library to build your dream PC</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {pcBuild.map((component) => (
                    <div key={`${component.type}-${component.id}`} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md flex justify-between items-center">
                      <div>
                        <p className="font-medium">{component.name}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{component.type.toUpperCase()}</p>
                      </div>
                      <button 
                        className="text-red-500 hover:text-red-700 dark:hover:text-red-400"
                        onClick={() => setPcBuild(pcBuild.filter(item => item.id !== component.id))}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  
                  <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-md">
                    <h3 className="font-medium text-blue-800 dark:text-blue-200 mb-2">Compatibility Check</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {checkCompatibility().map((issue, i) => (
                        <li key={i} className={issue.startsWith('All') ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                          {issue}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Component Library</h2>
              <div className="space-y-4">
                {Object.entries(hardwareDB).map(([category, items]) => (
                  <div key={category}>
                    <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">
                      {category.toUpperCase()}
                    </h3>
                    <div className="space-y-2">
                      {items.map((item) => (
                        <button
                          key={item.id}
                          className="w-full text-left p-3 rounded-md bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
                          onClick={() => addToBuild({ ...item, type: category.slice(0, -1) })}
                        >
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {category === 'cpus' && `${item.cores}C/${item.threads}T ${item.baseClock}GHz`}
                            {category === 'gpus' && `${item.cudaCores || item.streamProcessors} cores`}
                            {category === 'ram' && `${item.capacity} ${item.timings}`}
                            {category === 'motherboards' && `${item.socket} ${item.chipset}`}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Benchmarking */}
        {activeTab === 'benchmark' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Run Benchmarks</h2>
              
              <div className="space-y-6">
                {pcBuild.filter(item => ['cpu', 'gpu'].includes(item.type)).map((component) => (
                  <div key={`bench-${component.id}`} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
                    <div className="flex justify-between items-center mb-3">
                      <div>
                        <p className="font-medium">{component.name}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{component.type.toUpperCase()}</p>
                      </div>
                      <button 
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white"
                        onClick={() => runBenchmark(component)}
                      >
                        Benchmark
                      </button>
                    </div>
                    
                    {benchmarkResults && selectedComponent?.id === component.id && (
                      <div className="mt-4 space-y-2">
                        {component.type === 'cpu' && (
                          <>
                            <div className="flex justify-between">
                              <span>Cinebench R23:</span>
                              <span className="font-mono">{benchmarkResults.cinebenchR23.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Single Core:</span>
                              <span className="font-mono">{benchmarkResults.singleCore.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Power Draw:</span>
                              <span className="font-mono">{benchmarkResults.powerDraw}W</span>
                            </div>
                          </>
                        )}
                        {component.type === 'gpu' && (
                          <>
                            <div className="flex justify-between">
                              <span>3DMark Time Spy:</span>
                              <span className="font-mono">{benchmarkResults.timespy.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Port Royal:</span>
                              <span className="font-mono">{benchmarkResults.portRoyal.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Temperature:</span>
                              <span className="font-mono">{benchmarkResults.temp}°C</span>
                            </div>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                ))}
                
                {pcBuild.filter(item => ['cpu', 'gpu'].includes(item.type)).length === 0 && (
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-md p-8 text-center">
                    <p className="text-gray-600 dark:text-gray-300">No CPU or GPU in your build</p>
                    <p className="text-sm mt-2">Add components to your build from the Builder tab</p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Performance Comparison</h2>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
                <p className="text-gray-600 dark:text-gray-300">Performance charts would appear here comparing different hardware configurations</p>
                <div className="mt-4 h-64 bg-gray-200 dark:bg-gray-600 rounded-md flex items-center justify-center">
                  <p className="text-gray-500 dark:text-gray-400">Performance Graph Visualization</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Overclocking */}
        {activeTab === 'overclock' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Overclocking Lab</h2>
              
              <div className="space-y-6">
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
                  <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-3">CPU Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Clock Speed (+MHz)</label>
                      <input
                        type="range"
                        min="0"
                        max="1000"
                        value={overclockSettings.cpu.clock}
                        onChange={(e) => setOverclockSettings({
                          ...overclockSettings,
                          cpu: { ...overclockSettings.cpu, clock: parseInt(e.target.value) }
                        })}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                        <span>0</span>
                        <span>+{overclockSettings.cpu.clock}MHz</span>
                        <span>+1000</span>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Voltage (V)</label>
                      <input
                        type="range"
                        min="0"
                        max="300"
                        value={overclockSettings.cpu.voltage}
                        onChange={(e) => setOverclockSettings({
                          ...overclockSettings,
                          cpu: { ...overclockSettings.cpu, voltage: parseInt(e.target.value) }
                        })}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                        <span>0</span>
                        <span>+{overclockSettings.cpu.voltage / 100}V</span>
                        <span>+0.3V</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
                  <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-3">GPU Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Core Clock (+MHz)</label>
                      <input
                        type="range"
                        min="0"
                        max="300"
                        value={overclockSettings.gpu.coreClock}
                        onChange={(e) => setOverclockSettings({
                          ...overclockSettings,
                          gpu: { ...overclockSettings.gpu, coreClock: parseInt(e.target.value) }
                        })}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                        <span>0</span>
                        <span>+{overclockSettings.gpu.coreClock}MHz</span>
                        <span>+300</span>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Memory Clock (+MHz)</label>
                      <input
                        type="range"
                        min="0"
                        max="1000"
                        value={overclockSettings.gpu.memoryClock}
                        onChange={(e) => setOverclockSettings({
                          ...overclockSettings,
                          gpu: { ...overclockSettings.gpu, memoryClock: parseInt(e.target.value) }
                        })}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                        <span>0</span>
                        <span>+{overclockSettings.gpu.memoryClock}MHz</span>
                        <span>+1000</span>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Power Limit (%)</label>
                      <input
                        type="range"
                        min="100"
                        max="133"
                        value={overclockSettings.gpu.powerLimit}
                        onChange={(e) => setOverclockSettings({
                          ...overclockSettings,
                          gpu: { ...overclockSettings.gpu, powerLimit: parseInt(e.target.value) }
                        })}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                        <span>100</span>
                        <span>{overclockSettings.gpu.powerLimit}%</span>
                        <span>133</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <button
                  className="w-full px-4 py-3 bg-green-600 hover:bg-green-700 rounded-md text-white font-medium"
                  onClick={applyOverclock}
                >
                  Apply Overclock
                </button>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">System Monitoring</h2>
              
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">CPU Temperature</span>
                    <span className={`font-mono ${temperature.cpu > 85 ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
                      {temperature.cpu}°C
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                    <div 
                      className={`h-2.5 rounded-full ${temperature.cpu > 85 ? 'bg-red-500' : 'bg-blue-500'}`}
                      style={{ width: `${Math.min(temperature.cpu, 100)}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">GPU Temperature</span>
                    <span className={`font-mono ${temperature.gpu > 85 ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
                      {temperature.gpu}°C
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                    <div 
                      className={`h-2.5 rounded-full ${temperature.gpu > 85 ? 'bg-red-500' : 'bg-blue-500'}`}
                      style={{ width: `${Math.min(temperature.gpu, 100)}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Stability Test</h3>
                  <div className="h-32 bg-gray-200 dark:bg-gray-600 rounded-md flex items-center justify-center">
                    <p className="text-gray-500 dark:text-gray-400">System stability visualization would appear here</p>
                  </div>
                </div>
                
                {temperature.cpu > 95 || temperature.gpu > 90 ? (
                  <div className="mt-4 p-3 bg-red-100 dark:bg-red-900/30 rounded-md text-red-800 dark:text-red-200">
                    ⚠️ Thermal throttling detected! Reduce overclock or improve cooling.
                  </div>
                ) : (
                  <div className="mt-4 p-3 bg-green-100 dark:bg-green-900/30 rounded-md text-green-800 dark:text-green-200">
                    ✔️ System running within safe temperature limits
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Troubleshooting */}
        {activeTab === 'troubleshoot' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Troubleshooting Challenges</h2>
              
              <div className="space-y-6">
                {troubleshootingScenario ? (
                  <>
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
                      <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Scenario</h3>
                      <p className="text-gray-700 dark:text-gray-300">{troubleshootingScenario.description}</p>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
                      <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Possible Causes</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        {troubleshootingScenario.possibleCauses.map((cause, i) => (
                          <li key={i} className="text-gray-700 dark:text-gray-300">{cause}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
                      <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Your Diagnosis</h3>
                      <textarea
                        value={diagnosis}
                        onChange={(e) => setDiagnosis(e.target.value)}
                        className="w-full h-32 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                        placeholder="Explain what you think is causing the issue and how you would fix it..."
                      />
                    </div>
                    
                    <div className="flex space-x-3">
                      <button
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white"
                        onClick={() => {
                          alert(`Your solution: ${diagnosis}\n\nRecommended solution: ${troubleshootingScenario.solution}`);
                        }}
                      >
                        Check Solution
                      </button>
                      <button
                        className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
                        onClick={loadTroubleshootingScenario}
                      >
                        New Scenario
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-md p-8 text-center">
                    <p className="text-gray-600 dark:text-gray-300">No active troubleshooting scenario</p>
                    <button
                      className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white"
                      onClick={loadTroubleshootingScenario}
                    >
                      Load Scenario
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Diagnostic Tools</h2>
              
              <div className="space-y-4">
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
                  <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">System Information</h3>
                  <div className="font-mono text-sm space-y-1">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">CPU:</span>
                      <span>{pcBuild.find(c => c.type === 'cpu')?.name || 'Not selected'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">GPU:</span>
                      <span>{pcBuild.find(c => c.type === 'gpu')?.name || 'Not selected'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">RAM:</span>
                      <span>{pcBuild.find(c => c.type === 'ram')?.name || 'Not selected'}</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
                  <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Hardware Diagnostics</h3>
                  <div className="space-y-3">
                    <button className="w-full px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-gray-800 dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white text-left">
                      Run Memory Test (MemTest86)
                    </button>
                    <button className="w-full px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-gray-800 dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white text-left">
                      Check Disk Health (SMART)
                    </button>
                    <button className="w-full px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-gray-800 dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white text-left">
                      Stress Test CPU (Prime95)
                    </button>
                    <button className="w-full px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-gray-800 dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white text-left">
                      Stress Test GPU (FurMark)
                    </button>
                  </div>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
                  <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Common Fixes</h3>
                  <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                    <li>Reseat all power cables and components</li>
                    <li>Update BIOS/UEFI firmware</li>
                    <li>Reset CMOS to default settings</li>
                    <li>Test with minimal hardware configuration</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="bg-white dark:bg-gray-800 mt-12 py-6 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600 dark:text-gray-300">
          <p>Computer Hardware Learning Lab - Interactive education platform</p>
          <p className="mt-2 text-sm">Note: This is a simulation. Actual hardware performance may vary.</p>
        </div>
      </footer>
    </div>
  );
};

export default HardwareLearningLab;