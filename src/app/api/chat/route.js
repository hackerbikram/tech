// pages/api/chat.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST requests allowed' });
  }

  const { message } = req.body;

  if (!message || message.trim() === '') {
    return res.status(400).json({ error: 'Message is required' });
  }

  // Optionally save the message to a DB here

  // Fake bot reply for now
  const botReply = `Hi! 👋 You said: "${message}"`;

  res.status(200).json({ reply: botReply });
}