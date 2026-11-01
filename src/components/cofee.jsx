
'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const coffeeOptions = [
  {
    id: 1,
    name: 'Espresso',
    japanese: 'エスプレッソ',
    description: 'Rich and concentrated coffee',
    price: 150,
    icon: '☕',
    color: 'from-amber-800 to-amber-950',
    volume: '30ml',
  },
  {
    id: 2,
    name: 'Cafe Latte',
    japanese: 'カフェラテ',
    description: 'Espresso with steamed milk',
    price: 200,
    icon: '🥛',
    color: 'from-orange-700 to-amber-950',
    volume: '240ml',
  },
  {
    id: 3,
    name: 'Cappuccino',
    japanese: 'カプチーノ',
    description: 'Coffee with creamy milk foam',
    price: 200,
    icon: '☕',
    color: 'from-yellow-800 to-stone-950',
    volume: '180ml',
  },
  {
    id: 4,
    name: 'Americano',
    japanese: 'アメリカーノ',
    description: 'Smooth espresso with hot water',
    price: 180,
    icon: '🖤',
    color: 'from-stone-700 to-neutral-950',
    volume: '200ml',
  },
];

const sizes = [
  { id: 'small', name: 'Small', japanese: 'S', extra: 0 },
  { id: 'regular', name: 'Regular', japanese: 'M', extra: 0 },
  { id: 'large', name: 'Large', japanese: 'L', extra: 50 },
];

const payments = [
  { id: 'ic', name: 'IC Card', japanese: '交通系IC', icon: '💳' },
  { id: 'mobile', name: 'Mobile Pay', japanese: 'モバイル決済', icon: '📱' },
  { id: 'cash', name: 'Cash', japanese: '現金', icon: '💴' },
];

export default function CoffeeMachine() {
  const [selectedCoffee, setSelectedCoffee] = useState(coffeeOptions[0]);
  const [selectedSize, setSelectedSize] = useState('regular');
  const [strength, setStrength] = useState(2);
  const [milk, setMilk] = useState(true);
  const [stage, setStage] = useState('select');
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState('Please select your coffee');
  const [orderNumber, setOrderNumber] = useState(null);

  const currentSize = sizes.find((s) => s.id === selectedSize);
  const totalPrice =
    selectedCoffee.price + (currentSize?.extra || 0);

  useEffect(() => {
    if (stage !== 'payment') return;

    const timer = setTimeout(() => {
      setStage('brewing');
      setMessage('Preparing your coffee...');
    }, 1800);

    return () => clearTimeout(timer);
  }, [stage]);

  useEffect(() => {
    if (stage !== 'brewing') return;

    setProgress(0);

    const interval = setInterval(() => {
      setProgress((previous) => {
        const next = Math.min(previous + 1, 100);

        if (next === 100) {
          clearInterval(interval);
          setTimeout(() => {
            setStage('ready');
            setMessage('Your coffee is ready!');
          }, 400);
        }

        return next;
      });
    }, 90);

    return () => clearInterval(interval);
  }, [stage]);

  const selectCoffee = (coffee) => {
    if (stage !== 'select') return;

    setSelectedCoffee(coffee);
    setMessage(`${coffee.name} selected`);
  };

  const startPayment = (method) => {
    setPaymentMethod(method);
    setOrderNumber(Math.floor(1000 + Math.random() * 9000));
    setStage('payment');
    setMessage('Processing payment...');
  };

  const resetMachine = () => {
    setStage('select');
    setPaymentMethod(null);
    setProgress(0);
    setOrderNumber(null);
    setSelectedCoffee(coffeeOptions[0]);
    setSelectedSize('regular');
    setStrength(2);
    setMilk(true);
    setMessage('Please select your coffee');
  };

  const getBrewMessage = () => {
    if (progress < 15) return 'Grinding fresh coffee beans...';
    if (progress < 35) return 'Heating water...';
    if (progress < 65) return 'Extracting espresso...';
    if (progress < 85) return 'Preparing your drink...';
    return 'Finishing your coffee...';
  };

  const isBusy = ['payment', 'brewing', 'ready'].includes(stage);

  return (
    <div className="min-h-screen bg-[#101113] text-white p-3 sm:p-6 flex items-center justify-center">
      <div className="w-full max-w-6xl">

        {/* Machine header */}
        <div className="flex items-center justify-between mb-5 px-2">
          <div>
            <p className="text-xs tracking-[0.35em] text-amber-500">
              PREMIUM COFFEE SYSTEM
            </p>
            <h1 className="text-xl sm:text-2xl font-bold tracking-wider">
              LAWSON COFFEE MACHINE
            </h1>
          </div>

          <div className="flex items-center gap-2 text-xs text-green-400">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            MACHINE ONLINE
          </div>
        </div>

        {/* Machine body */}
        <div className="rounded-[28px] border border-white/10 bg-gradient-to-br from-[#55585b] via-[#222528] to-[#111315] p-3 sm:p-6 shadow-[0_30px_100px_rgba(0,0,0,0.7)]">

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-5">

            {/* Main touchscreen */}
            <div className="rounded-2xl bg-[#101719] border border-white/10 overflow-hidden">

              {/* Screen top bar */}
              <div className="bg-[#192326] px-5 py-3 flex justify-between items-center border-b border-white/10">
                <div>
                  <span className="text-amber-400 font-bold tracking-widest text-sm">
                    COFFEE SELECT
                  </span>
                  <p className="text-[10px] text-gray-500">
                    コーヒーをお選びください
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-xs text-green-400">● READY</p>
                  <p className="text-[10px] text-gray-500">SYSTEM 01</p>
                </div>
              </div>

              <div className="p-4 sm:p-6">

                {/* Status message */}
                <div className="mb-5 rounded-xl bg-black/40 border border-white/5 p-3 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500">MACHINE MESSAGE</p>
                    <p className="text-sm text-amber-300 mt-1">
                      {message}
                    </p>
                  </div>
                  <span className="text-2xl">☕</span>
                </div>

                {/* Coffee selection */}
                <div className="flex items-center justify-between mb-3">
                  <h2 className="font-semibold text-sm">
                    Select your drink
                  </h2>
                  <span className="text-xs text-gray-500">
                    お好きなコーヒー
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {coffeeOptions.map((coffee) => (
                    <motion.button
                      key={coffee.id}
                      whileHover={!isBusy ? { y: -4 } : {}}
                      whileTap={!isBusy ? { scale: 0.96 } : {}}
                      disabled={isBusy}
                      onClick={() => selectCoffee(coffee)}
                      className={`relative rounded-xl overflow-hidden border p-3 text-left transition-all ${
                        selectedCoffee.id === coffee.id
                          ? 'border-amber-400 bg-amber-400/10'
                          : 'border-white/10 bg-white/[0.03] hover:bg-white/[0.07]'
                      } ${isBusy ? 'opacity-60 cursor-not-allowed' : ''}`}
                    >
                      <div className={`h-20 rounded-lg bg-gradient-to-br ${coffee.color} flex items-center justify-center text-4xl mb-3`}>
                        {coffee.icon}
                      </div>

                      <p className="font-semibold text-sm">
                        {coffee.name}
                      </p>
                      <p className="text-[10px] text-gray-400">
                        {coffee.japanese}
                      </p>
                      <p className="text-amber-400 font-bold mt-2">
                        ¥{coffee.price}
                      </p>

                      {selectedCoffee.id === coffee.id && (
                        <span className="absolute top-2 right-2 text-amber-400">
                          ✓
                        </span>
                      )}
                    </motion.button>
                  ))}
                </div>

                {/* Customization */}
                <div className="grid sm:grid-cols-2 gap-4 mt-6">

                  <div className="rounded-xl bg-white/[0.04] border border-white/10 p-4">
                    <p className="text-xs text-gray-400 mb-3">
                      CUP SIZE / サイズ
                    </p>

                    <div className="flex gap-2">
                      {sizes.map((size) => (
                        <button
                          key={size.id}
                          disabled={isBusy}
                          onClick={() => setSelectedSize(size.id)}
                          className={`flex-1 rounded-lg py-2 text-xs border transition ${
                            selectedSize === size.id
                              ? 'border-amber-400 bg-amber-400/10 text-amber-300'
                              : 'border-white/10 text-gray-400'
                          }`}
                        >
                          <span className="block font-bold text-base">
                            {size.japanese}
                          </span>
                          {size.name}
                          {size.extra > 0 && (
                            <span className="block text-[10px]">
                              +¥{size.extra}
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-xl bg-white/[0.04] border border-white/10 p-4">
                    <p className="text-xs text-gray-400 mb-3">
                      COFFEE STRENGTH / 濃さ
                    </p>

                    <div className="flex gap-2 items-center h-12">
                      {[1, 2, 3].map((level) => (
                        <button
                          key={level}
                          disabled={isBusy}
                          onClick={() => setStrength(level)}
                          className={`flex-1 h-9 rounded-lg border text-xs transition ${
                            strength === level
                              ? 'bg-amber-500 border-amber-400 text-black font-bold'
                              : 'bg-black/20 border-white/10 text-gray-400'
                          }`}
                        >
                          {['Mild', 'Normal', 'Strong'][level - 1]}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Milk option */}
                <button
                  disabled={isBusy}
                  onClick={() => setMilk(!milk)}
                  className="w-full mt-4 rounded-xl bg-white/[0.04] border border-white/10 p-3 flex justify-between items-center"
                >
                  <span className="text-sm">🥛 Add milk</span>
                  <span className={`text-xs px-3 py-1 rounded-full ${
                    milk
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-white/10 text-gray-400'
                  }`}>
                    {milk ? 'ON' : 'OFF'}
                  </span>
                </button>

                {/* Order summary */}
                <div className="mt-5 p-4 rounded-xl bg-[#1d292b] border border-amber-500/20">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs text-gray-400">
                        YOUR ORDER
                      </p>
                      <p className="font-bold text-lg">
                        {selectedCoffee.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {currentSize?.name} · Strength {strength}
                        {' · '}
                        {milk ? 'Milk' : 'No milk'}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-xs text-gray-400">TOTAL</p>
                      <p className="text-2xl font-bold text-amber-400">
                        ¥{totalPrice}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Payment area */}
                {stage === 'select' && (
                  <div className="mt-5">
                    <p className="text-xs text-gray-400 mb-3">
                      SELECT PAYMENT METHOD / お支払い方法
                    </p>

                    <div className="grid grid-cols-3 gap-2">
                      {payments.map((payment) => (
                        <motion.button
                          key={payment.id}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => startPayment(payment)}
                          className="rounded-xl bg-gradient-to-b from-amber-400 to-amber-600 text-black p-3 font-bold hover:brightness-110"
                        >
                          <span className="block text-2xl mb-1">
                            {payment.icon}
                          </span>
                          <span className="block text-xs">
                            {payment.name}
                          </span>
                          <span className="block text-[9px] opacity-70">
                            {payment.japanese}
                          </span>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Payment processing */}
                <AnimatePresence>
                  {stage === 'payment' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mt-5 rounded-xl border border-blue-400/30 bg-blue-400/10 p-5 text-center"
                    >
                      <div className="text-4xl mb-3">
                        {paymentMethod?.icon}
                      </div>
                      <p className="font-bold text-blue-300">
                        Processing Payment
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {paymentMethod?.name} · ¥{totalPrice}
                      </p>
                      <div className="w-full h-1.5 bg-black/40 rounded-full mt-4 overflow-hidden">
                        <motion.div
                          initial={{ width: '0%' }}
                          animate={{ width: '100%' }}
                          transition={{ duration: 1.8 }}
                          className="h-full bg-blue-400"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Brewing */}
                {stage === 'brewing' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-5 rounded-xl border border-amber-400/30 bg-amber-400/5 p-5"
                  >
                    <div className="flex items-center gap-3">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: 'linear',
                        }}
                        className="text-3xl"
                      >
                        ⚙️
                      </motion.div>
                      <div>
                        <p className="font-bold text-amber-300">
                          Preparing {selectedCoffee.name}
                        </p>
                        <p className="text-xs text-gray-400">
                          {getBrewMessage()}
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 flex justify-between text-xs text-gray-400">
                      <span>BREWING PROGRESS</span>
                      <span>{progress}%</span>
                    </div>

                    <div className="h-2 bg-black/50 rounded-full overflow-hidden mt-2">
                      <motion.div
                        className="h-full bg-gradient-to-r from-amber-700 to-amber-300"
                        animate={{ width: `${progress}%` }}
                      />
                    </div>
                  </motion.div>
                )}

                {/* Ready */}
                {stage === 'ready' && (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="mt-5 rounded-xl border border-green-400/30 bg-green-400/10 p-5 text-center"
                  >
                    <div className="text-5xl mb-3">☕</div>
                    <h2 className="text-2xl font-bold text-green-400">
                      Coffee Ready!
                    </h2>
                    <p className="text-sm text-gray-300 mt-1">
                      {selectedCoffee.name} is ready. Please take your cup.
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      Order No. #{orderNumber}
                    </p>

                    <button
                      onClick={resetMachine}
                      className="mt-5 bg-green-500 hover:bg-green-400 text-black font-bold px-8 py-3 rounded-xl"
                    >
                      New Order ↻
                    </button>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Physical machine side panel */}
            <div className="flex flex-col gap-4">

              {/* Machine display */}
              <div className="rounded-2xl bg-gradient-to-b from-[#25292b] to-[#111416] border border-white/10 p-5">
                <div className="flex justify-between items-center mb-4">
                  <p className="text-xs tracking-widest text-gray-400">
                    MACHINE STATUS
                  </p>
                  <span className="text-green-400 text-xs">● ACTIVE</span>
                </div>

                {/* Digital display */}
                <div className="bg-[#07110e] border border-green-900 rounded-lg p-4 font-mono shadow-inner">
                  <p className="text-[10px] text-green-700">
                    LAWSON COFFEE SYSTEM
                  </p>
                  <p className="text-green-400 text-2xl mt-2">
                    {stage === 'brewing'
                      ? `${progress}%`
                      : stage === 'ready'
                      ? 'READY'
                      : 'STANDBY'}
                  </p>
                  <p className="text-[10px] text-green-700 mt-1">
                    {stage === 'brewing'
                      ? 'BREWING IN PROGRESS'
                      : 'SYSTEM OPERATIONAL'}
                  </p>
                </div>

                {/* Cup chamber */}
                <div className="mt-5 rounded-xl bg-black/50 border border-white/10 p-4">
                  <p className="text-[10px] text-gray-500 tracking-widest mb-3">
                    COFFEE DISPENSER
                  </p>

                  <div className="h-44 rounded-lg bg-gradient-to-b from-[#171a1c] to-black border border-white/10 relative overflow-hidden flex items-end justify-center">

                    {/* Nozzle */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-8 bg-gradient-to-b from-gray-400 to-gray-700 rounded-b-lg border-x border-gray-500" />
                    <div className="absolute top-8 left-1/2 -translate-x-1/2 w-2 h-5 bg-gray-400 rounded-b" />

                    {/* Coffee stream */}
                    {stage === 'brewing' && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 75 }}
                        transition={{ duration: 2 }}
                        className="absolute top-12 left-1/2 -translate-x-1/2 w-1 bg-amber-700 rounded-full"
                      />
                    )}

                    {/* Cup */}
                    <div className="relative z-10 mb-3 w-20 h-20">
                      <div className="absolute right-0 top-4 w-5 h-7 border-4 border-gray-300 rounded-r-full" />
                      <div className="absolute inset-0 bg-gradient-to-b from-gray-100 to-gray-400 rounded-b-2xl rounded-t-md border-2 border-gray-300 overflow-hidden shadow-xl">
                        <motion.div
                          className="absolute bottom-0 w-full bg-gradient-to-t from-amber-950 to-amber-600"
                          animate={{
                            height:
                              stage === 'brewing'
                                ? `${Math.max(5, progress * 0.65)}%`
                                : stage === 'ready'
                                ? '65%'
                                : '0%',
                          }}
                          transition={{ duration: 0.4 }}
                        />
                        <div className="absolute top-3 w-full text-center text-[8px] text-gray-700 font-bold">
                          COFFEE
                        </div>
                      </div>
                    </div>

                    {stage === 'ready' && (
                      <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 0.8, y: -10 }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          repeatType: 'reverse',
                        }}
                        className="absolute top-12 text-white/50 text-xl"
                      >
                        ♨
                      </motion.span>
                    )}
                  </div>

                  <p className="text-center text-[10px] text-gray-500 mt-3">
                    AUTOMATIC CUP DISPENSER
                  </p>
                </div>
              </div>

              {/* Machine information */}
              <div className="rounded-2xl bg-[#202426] border border-white/10 p-5">
                <p className="text-xs tracking-widest text-gray-400 mb-4">
                  MACHINE INFORMATION
                </p>

                {[
                  ['Water temperature', '92°C'],
                  ['Coffee beans', '100% Arabica'],
                  ['Milk system', 'Automatic'],
                  ['Cleaning system', 'Active'],
                  ['Machine ID', 'LWS-001'],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex justify-between py-2 border-b border-white/5 last:border-0"
                  >
                    <span className="text-xs text-gray-500">{label}</span>
                    <span className="text-xs text-gray-200">{value}</span>
                  </div>
                ))}
              </div>

              {/* Cancel button */}
              {stage !== 'select' && stage !== 'ready' && (
                <button
                  onClick={resetMachine}
                  className="w-full rounded-xl border border-red-500/30 bg-red-500/10 text-red-400 py-3 text-sm hover:bg-red-500/20"
                >
                  Cancel Simulation
                </button>
              )}
            </div>
          </div>

          {/* Bottom machine footer */}
          <div className="mt-5 pt-4 border-t border-white/10 flex flex-wrap justify-between gap-2 text-[10px] text-gray-500">
            <span>LAWSON AUTOMATIC COFFEE SYSTEM</span>
            <span>DESIGNED FOR INTERACTIVE SIMULATION</span>
            <span>VERSION 2.0</span>
          </div>
        </div>
      </div>
    </div>
  );
}
