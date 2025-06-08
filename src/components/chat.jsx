'use client';
import { useState } from 'react';

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();
    const botMessage = { sender: 'bot', text: data.reply };
    setMessages((prev) => [...prev, botMessage]);

    setInput('');
  };

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <div className="max-w-xl mx-auto bg-white rounded shadow-md p-4 space-y-4">
        <div className="h-96 overflow-y-auto border p-2 bg-gray-50 rounded">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`p-2 my-1 rounded ${
                msg.sender === 'user' ? 'bg-blue-100 text-right' : 'bg-gray-200 text-left'
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>
        <form onSubmit={sendMessage} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 border p-2 rounded"
            placeholder="Type your message..."
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}