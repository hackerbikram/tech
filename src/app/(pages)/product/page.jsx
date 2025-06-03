'use client';

import Image from "next/image";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";

// Categories
const categories = ["Tech", "Fashion", "Hardware", "Science", "Daily Use"];

// 200+ Products
const products = Array.from({ length: 200 }, (_, i) => {
  const category = categories[i % categories.length];
  return {
    id: i + 1,
    name: `${category} Product ${i + 1}`,
    price: (Math.random() * 500 + 10).toFixed(2),
    category,
    image: `/products/${category.toLowerCase()}${(i % 5) + 1}.jpeg`,
    description: `High-quality ${category.toLowerCase()} item number ${i + 1}.`,
  };
});

export default function ProductPage() {
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, selectedCategory]);

  const addToCart = (id) => {
    if (!cart.includes(id)) {
      setCart([...cart, id]);
    }
  };

  const cartItems = products.filter(product => cart.includes(product.id));
  const total = cartItems.reduce((sum, item) => sum + parseFloat(item.price), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 to-indigo-100 p-4">
      <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-6 text-indigo-900 tracking-wide">🛍️ Ultimate Product Showcase</h1>

      {/* Cart Summary (on mobile shown first) */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="block md:hidden mb-6 bg-white rounded-3xl shadow-xl p-5 border-t-4 border-indigo-500"
      >
        <h2 className="text-xl font-bold text-indigo-900 mb-3 flex items-center gap-3">
          🛒 Cart
          <span className="bg-indigo-500 text-white rounded-full px-3 py-1 text-sm font-semibold">
            {cart.length}
          </span>
        </h2>
        {cartItems.length === 0 ? (
          <p className="text-gray-500 text-center">Your cart is empty.</p>
        ) : (
          <>
            <ul className="divide-y divide-gray-200 max-h-56 overflow-y-auto mb-3">
              {cartItems.map(item => (
                <li key={item.id} className="flex justify-between py-2 text-sm text-gray-800 font-medium">
                  <span>{item.name}</span>
                  <span>${parseFloat(item.price).toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <div className="text-right text-lg font-bold text-indigo-900">
              Total: ${total.toFixed(2)}
            </div>
          </>
        )}
      </motion.div>

      {/* Search and Category Filter */}
      <div className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto mb-6 gap-3">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full md:w-1/2 p-3 rounded-lg shadow-md border border-purple-500 focus:outline-none focus:ring-2 focus:ring-indigo-300"
        />
        <select
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
          className="w-full md:w-1/4 p-3 rounded-lg shadow-md border border-purple-500 focus:outline-none focus:ring-2 focus:ring-indigo-300"
        >
          <option value="All">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 max-w-7xl mx-auto">
        {filteredProducts.length === 0 ? (
          <p className="text-center text-gray-600 col-span-full">No products found.</p>
        ) : (
          filteredProducts.map(product => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: (product.id % 10) * 0.05 }}
              className="bg-white rounded-xl shadow-md p-3 hover:scale-[1.02] hover:shadow-lg transition-transform border"
            >
              <div className="relative w-full h-36 sm:h-40 md:h-44 mb-3 rounded-lg overflow-hidden bg-gray-100">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  priority={product.id <= 10}
                />
              </div>
              <h3 className="text-sm font-semibold text-indigo-800 mb-1 truncate" title={product.name}>{product.name}</h3>
              <p className="text-xs text-gray-600 flex-grow line-clamp-2">{product.description}</p>
              <div className="mt-2 font-bold text-indigo-900 text-base">${product.price}</div>
              <button
                className={`mt-3 py-1.5 text-sm rounded-full text-white font-medium transition-colors w-full ${
                  cart.includes(product.id)
                    ? "bg-green-500 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700"
                }`}
                onClick={() => addToCart(product.id)}
                disabled={cart.includes(product.id)}
              >
                {cart.includes(product.id) ? "Added ✅" : "Add to Cart"}
              </button>
            </motion.div>
          ))
        )}
      </div>

      {/* Cart Summary for desktop */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="hidden md:block mt-12 max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl p-6 border-t-4 border-indigo-500"
      >
        <h2 className="text-2xl font-bold text-indigo-900 mb-4 flex items-center gap-3">
          🛒 Cart Summary
          <span className="bg-indigo-500 text-white rounded-full px-3 py-1 text-sm font-semibold">
            {cart.length}
          </span>
        </h2>
        {cartItems.length === 0 ? (
          <p className="text-gray-500 text-center">Your cart is empty.</p>
        ) : (
          <>
            <ul className="divide-y divide-gray-200 max-h-72 overflow-y-auto mb-4">
              {cartItems.map(item => (
                <li key={item.id} className="flex justify-between py-3 text-gray-800 font-medium">
                  <span>{item.name}</span>
                  <span>${parseFloat(item.price).toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <div className="text-right text-xl font-extrabold text-indigo-900">
              Total: ${total.toFixed(2)}
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}