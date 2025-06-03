"use client";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";

const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 99.99,
    image: "/public/headphones.jpeg", // ✅ correct usage
    description: "Crystal-clear sound and long battery life.",
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 149.99,
    image: "/public/smartwatch.jpeg",
    description: "Track your health and notifications in style.",
  },
  {
    id: 3,
    name: "Gaming Mouse",
    price: 59.99,
    image: "/public/mouse.jpeg",
    description: "Precision and speed for competitive gaming.",
  },
  {
    id: 4,
    name: "Bluetooth Speaker",
    price: 79.99,
    image: "/public/speaker.jpeg",
    description: "Portable sound with deep bass.",
  },
];

export default function ProductPage() {
  const [cart, setCart] = useState([]);

  const addToCart = (id) => {
    if (!cart.includes(id)) {
      setCart([...cart, id]);
    }
  };

  let cartItems = products.filter((product) => cart.includes(product.id));
  let total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="p-6 bg-gradient-to-br from-purple-200 to-indigo-100 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-8 text-indigo-800">🛍️ Product Showcase</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: product.id * 0.1 }}
            className="bg-white rounded-2xl shadow-xl p-4 hover:scale-105 transition-transform duration-300 border border-gray-200"
          >
            <Image
              src={product.image}
              alt={product.name}
              width={400}
              height={400}
              className="rounded-xl object-cover w-full h-64"
            />
            <h2 className="text-xl font-semibold mt-4 text-indigo-700">{product.name}</h2>
            <p className="text-sm text-gray-600">{product.description}</p>
            <div className="mt-3 text-lg font-bold text-indigo-900">${product.price.toFixed(2)}</div>
            <button
              className="mt-4 bg-indigo-500 text-white py-2 px-4 rounded-full hover:bg-indigo-600 transition-all"
              onClick={() => addToCart(product.id)}
            >
              {cart.includes(product.id) ? "Added ✅" : "Add to Cart"}
            </button>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 bg-white p-6 rounded-2xl shadow-2xl max-w-2xl mx-auto border-t-4 border-indigo-400">
        <h2 className="text-2xl font-bold text-indigo-800 mb-4">🛒 Cart Summary</h2>
        {cartItems.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          <>
            <ul className="space-y-2">
              {cartItems.map((item) => (
                <li key={item.id} className="flex justify-between text-gray-800">
                  <span>{item.name}</span>
                  <span>${item.price.toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 font-bold text-indigo-900">
              Total: ${total.toFixed(2)}
            </div>
          </>
        )}
      </div>
    </div>
  );
}