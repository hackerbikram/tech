'use client';
import { useState, useEffect } from 'react';

export default function ChatPage({ newMessage }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    if (newMessage) {
      setMessages(prev => [...prev, { sender: 'user', text: newMessage }]);
    }
  }, [newMessage]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();
    const botMessage = { sender: 'bot', text: data.reply };
    setMessages(prev => [...prev, botMessage]);
    setInput('');
  };

  return (
    <div className="fixed bottom-4 right-4 w-full max-w-md bg-white rounded-xl shadow-xl flex flex-col h-[500px] overflow-hidden border border-gray-300">
      <div className="bg-green-600 text-white p-3 font-semibold">Support Chat</div>

      <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-gray-50">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
              msg.sender === 'user'
                ? 'ml-auto bg-green-100 text-right'
                : 'mr-auto bg-gray-200 text-left'
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <form onSubmit={sendMessage} className="flex p-2 border-t bg-white">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-2 border rounded-l-md focus:outline-none"
          placeholder="Type your message..."
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 rounded-r-md hover:bg-green-700"
        >
          Send
        </button>
      </form>
    </div>
  );
}