// pages/api/chat.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message } = req.body;

  // Example: Echo message with a prefix (or connect to OpenAI/GPT here)
  const reply = `You said: ${message}`;

  res.status(200).json({ reply });
}