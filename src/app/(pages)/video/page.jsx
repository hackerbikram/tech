'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import ReactPlayer from 'react-player/lazy';

const videoData = {
  youtube: [
    'https://youtu.be/HBlRL5h948c?si=6lsv17xg82plnJIH',
    'https://youtu.be/kJLEK8G2v5I?si=KYxDdMUUhZz0Z9sR',
    'https://youtu.be/AAhSGTXykmA?si=4qNUZB0HvhscT-Jo',
    'https://youtu.be/PAJnkUYLlOg?si=zZmJnfPP0Xo-Sc2i',
    'https://youtu.be/keq_D5CZBEw?si=j5cFUhVvHwDD3_tu',
    'https://youtu.be/k5CN6foHeZU?si=NT7Cv7v_5XfkZJcC',
    'https://youtu.be/T063ogs7p28?si=DDHNwBaAEfVi1ae8',
    'https://youtu.be/T063ogs7p28?si=DDHNwBaAEfVi1ae8'
  ],
  tiktok: [
    // TikTok embed iframe example
    `<iframe src="https://www.tiktok.com/embed/7248597032099794178" width="100%" height="500" frameBorder="0" allowFullScreen></iframe>`,
  ],
  instagram: [
    // Instagram embed iframe (must be public post)
    `<iframe src="https://www.instagram.com/reel/Cs8bOjAp5AD/embed" width="100%" height="500" frameBorder="0" allowtransparency="true" allowfullscreen></iframe>`,
  ],
  facebook: [
    `<iframe src="https://www.facebook.com/plugins/video.php?href=https://www.facebook.com/facebook/videos/10153231379946729/" width="100%" height="500" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true"></iframe>`,
  ],
  line: [
    `<iframe src="https://www.linecommunity.me/embed/linevoom/post/1234567890" width="100%" height="500" frameBorder="0" allowFullScreen></iframe>`,
  ],
};

export default function MultiPlatformPlayer() {
  const [platform, setPlatform] = useState('youtube');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const currentVideos = videoData[platform];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col md:flex-row">
      {/* Sidebar Menu */}
      <div className="md:w-64 sticky top-0 z-10 bg-black border-r border-cyan-500/20 p-4 space-y-4">
        <h2 className="text-xl font-bold text-cyan-400 mb-2">Platforms</h2>
        {Object.keys(videoData).map((key) => (
          <button
            key={key}
            onClick={() => {
              setPlatform(key);
              setSelectedIndex(0);
            }}
            className={`w-full text-left px-4 py-2 rounded transition duration-300 ${
              platform === key
                ? 'bg-cyan-600/20 text-cyan-300 font-bold'
                : 'hover:bg-cyan-500/10 hover:text-cyan-200'
            }`}
          >
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </button>
        ))}
      </div>

      {/* Video Viewer and Thumbnails */}
      <motion.div
        className="flex-1 p-6 flex flex-col gap-6 overflow-y-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-2xl font-bold text-cyan-400">
          {platform.toUpperCase()} Player
        </h1>

        {/* Video Player */}
        <div className="w-full max-w-4xl aspect-video mx-auto rounded-lg overflow-hidden shadow-lg">
          {platform === 'youtube' ? (
            <ReactPlayer
              url={currentVideos[selectedIndex]}
              controls
              width="100%"
              height="100%"
              playing
            />
          ) : (
            <div
              className="w-full h-[500px]"
              dangerouslySetInnerHTML={{ __html: currentVideos[selectedIndex] }}
            />
          )}
        </div>

        {/* Video List for Scroll */}
        {currentVideos.length > 1 && (
          <div className="flex flex-wrap gap-4 mt-6">
            {currentVideos.map((vid, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedIndex(idx)}
                className={`px-4 py-2 text-sm border rounded ${
                  idx === selectedIndex
                    ? 'border-cyan-400 text-cyan-300 bg-cyan-500/10'
                    : 'border-gray-600 text-gray-300 hover:border-cyan-300 hover:text-cyan-200'
                }`}
              >
                Video {idx + 1}
              </button>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}