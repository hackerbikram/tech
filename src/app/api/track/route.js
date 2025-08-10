// pages/api/track.js
export default async function handler(req, res) {
  const { url, userAgent, ip } = req.headers;

  const logData = {
    path: req.body?.path || '',
    userAgent: userAgent,
    ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
    time: new Date().toISOString(),
  };

  // Save this data to DB (MongoDB, Supabase, etc.)
  console.log("Visitor Data:", logData); // replace with DB insert

  res.status(200).json({ status: "ok" });
}