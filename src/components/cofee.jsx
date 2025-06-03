'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const coffeeOptions = [
  { id: 1, name: 'Espresso', image: '/images/espresso.png', price: 150 },
  { id: 2, name: 'Latte', image: '/images/latte.png', price: 200 },
  { id: 3, name: 'Cappuccino', image: '/images/cappuccino.png', price: 200 },
  { id: 4, name: 'Americano', image: '/images/americano.png', price: 180 },
];

export default function CoffeeMachine() {
  const [selectedCoffee, setSelectedCoffee] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [isBrewing, setIsBrewing] = useState(false);
  const [ready, setReady] = useState(false);

  const handleSelection = (coffee) => {
    setSelectedCoffee(coffee);
    setPaymentMethod(null);
    setIsBrewing(false);
    setReady(false);
  };

  const handlePayment = (method) => {
    setPaymentMethod(method);
    setTimeout(() => {
      setIsBrewing(true);
      setTimeout(() => {
        setReady(true);
        setIsBrewing(false);
      }, 3000);
    }, 1000);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-gradient-to-br from-neutral-900 to-zinc-800 text-white rounded-2xl shadow-2xl p-6 border-4 border-neutral-700">
      <h1 className="text-3xl font-bold text-center mb-6">Lawson コーヒーマシン</h1>

      <div className="grid grid-cols-2 gap-6">
        {coffeeOptions.map((coffee) => (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            key={coffee.id}
            onClick={() => handleSelection(coffee)}
            className={`rounded-xl p-3 bg-zinc-700 hover:bg-zinc-600 transition-colors flex flex-col items-center border-4 ${selectedCoffee?.id === coffee.id ? 'border-blue-400' : 'border-transparent'}`}
          >
            <Image src={coffee.image} alt={coffee.name} width={100} height={100} className="rounded" />
            <div className="mt-2 text-lg font-medium">{coffee.name}</div>
            <div className="text-sm text-gray-300">¥{coffee.price}</div>
          </motion.button>
        ))}
      </div>

      {selectedCoffee && !paymentMethod && (
        <div className="mt-8 text-center">
          <h2 className="text-xl font-semibold mb-3">支払い方法を選択してください</h2>
          <div className="flex justify-center gap-4">
            <button onClick={() => handlePayment('ICカード')} className="bg-green-500 px-4 py-2 rounded-lg hover:bg-green-600">ICカード</button>
            <button onClick={() => handlePayment('モバイル')} className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600">モバイル</button>
            <button onClick={() => handlePayment('現金')} className="bg-yellow-500 px-4 py-2 rounded-lg hover:bg-yellow-600">現金</button>
          </div>
        </div>
      )}

      {isBrewing && (
        <div className="mt-8 text-center animate-pulse">
          <h2 className="text-xl font-semibold">☕ {selectedCoffee.name} を淹れています...</h2>
          <p className="text-gray-400">しばらくお待ちください</p>
        </div>
      )}

      {ready && (
        <div className="mt-8 text-center">
          <h2 className="text-2xl font-bold text-green-400">✅ {selectedCoffee.name} ができました！</h2>
          <p className="text-sm text-gray-300">カップをお取りください。</p>
        </div>
      )}
    </div>
  );
}