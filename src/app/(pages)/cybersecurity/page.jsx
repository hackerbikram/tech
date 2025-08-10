// pages/cybersecurity.js
'client use'
import { useEffect, useState } from 'react';

export default function Page() {
  const [dotCount, setDotCount] = useState(0);
  const [selectedTool, setSelectedTool] = useState(null);
  const [isHackingDocs,setishackingDocs] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setDotCount((prev) => (prev >= 3 ? 0 : prev + 1));
    }, 600);
    return () => clearInterval(interval);
  }, []);

  const tools = [
    {
      id: 1,
      name: "Nmap",
      description: "Network exploration and security auditing tool.",
      url: "https://nmap.org/",
      github: "https://github.com/nmap/nmap",
      details: "Nmap (Network Mapper) is an open-source tool for network discovery and security auditing. It helps to map networks and detect open ports, services, and vulnerabilities.",
    },
    {
      id: 2,
      name: "Wireshark",
      description: "Network protocol analyzer for network troubleshooting.",
      url: "https://www.wireshark.org/",
      github: "https://github.com/wireshark/wireshark",
      details: "Wireshark captures and analyzes network traffic in real time. It is widely used for troubleshooting network problems, analysis, software and communications protocol development.",
    },
    {
      id: 3,
      name: "Metasploit Framework",
      description: "Penetration testing framework to find vulnerabilities.",
      url: "https://www.metasploit.com/",
      github: "https://github.com/rapid7/metasploit-framework",
      details: "Metasploit is a powerful framework for developing and executing exploit code against target machines. It supports automation and integration with many other tools.",
    },
    {
      id: 4,
      name: "John the Ripper",
      description: "Password cracking tool for security auditing.",
      url: "https://www.openwall.com/john/",
      github: "https://github.com/openwall/john",
      details: "John the Ripper is a fast password cracker used to detect weak passwords. It supports multiple cryptographic hash types and has various modes for cracking.",
    },
    {
      id: 5,
      name: "Burp Suite",
      description: "Web vulnerability scanner for penetration testing.",
      url: "https://portswigger.net/burp",
      github: null,
      details: "Burp Suite provides a set of tools for testing web application security. It includes a proxy server, scanner, spider, and repeater to analyze and manipulate HTTP traffic.",
    },
  ];

  const hackingDocs = [
    {
      title: "What is Ethical Hacking?",
      content:
        "Ethical hacking is the practice of penetrating systems or networks to identify security vulnerabilities before malicious hackers can exploit them.",
    },
    {
      title: "Common Attack Types",
      content:
        "Includes phishing, SQL injection, cross-site scripting (XSS), denial-of-service (DoS), and man-in-the-middle attacks.",
    },
    {
      title: "Tools for Penetration Testing",
      content:
        "Popular tools include Nmap, Metasploit, Wireshark, and Burp Suite to test system security.",
    },
    {
      title: "Basic Cybersecurity Principles",
      content:
        "Confidentiality, Integrity, and Availability (CIA triad) are core to protecting information systems.",
    },
  ];

  return (
    <>
    <button
      onClick={()=>setishackingDocs(true)}
      className="
        relative
        inline-flex
        items-center
        gap-2
        px-6
        py-3
        text-lg
        font-extrabold
        font-mono
        text-lime-400
        bg-gradient-to-br
        from-green-900
        via-green-800
        to-green-900
        border-4
        border-lime-500
        rounded-lg
        shadow-[0_0_10px_#84cc16,0_0_20px_#a3e635,inset_0_0_25px_#14532d]
        hover:text-lime-300
        hover:border-lime-300
        hover:shadow-[0_0_15px_#bef264,0_0_30px_#d9f99d,inset_0_0_30px_#14532d]
        transition
        duration-300
        ease-in-out
        select-none
        cursor-pointer
        focus:outline-none
        focus:ring-4
        focus:ring-lime-400
        focus:ring-opacity-50
      "
      aria-label="Hacker style button"
    >
      <span role="img" aria-label="hacker with hat">
        🕵️‍♂️
      </span>
      {children}
    </button>
     {isHackingDocs && (
        <div className="fixed inset-0 w-full h-full bg-black z-50 flex flex-col overflow-auto">
          <HackingDocs />
        </div>
      )}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap');
import HackingDocs from '../../../components/hackingDocs';
import HackingDocs from '../../../components/hackingDocs';
import { React } from 'react';

        .container {
          min-height: 100vh;
          background: #0d1117;
          color: #58d68d;
          font-family: 'Share Tech Mono', monospace;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
        }

        h1 {
          font-size: 3rem;
          text-shadow:
            0 0 5px #58d68d,
            0 0 10px #58d68d,
            0 0 20px #58d68d;
        }

        .tools, .docs {
          background: #161b22;
          border: 1px solid #58d68d;
          border-radius: 10px;
          padding: 1.5rem;
          width: 90%;
          max-width: 900px;
          box-shadow:
            0 0 10px #58d68d,
            inset 0 0 20px #58d68d;
        }

        .tools h2, .docs h2 {
          margin-bottom: 1rem;
          text-align: center;
          text-shadow: 0 0 5px #58d68d;
        }

        /* TOOL CARDS GRID */
        .tool-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.2rem;
        }

        .tool-card {
          background: #0f161f;
          border: 2px solid #2ecc71;
          border-radius: 12px;
          padding: 1rem 1.2rem;
          box-shadow: 0 0 10px #27ae60;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 180px;
          position: relative;
        }

        .tool-card:hover {
          background: #1e2a2f;
          box-shadow: 0 0 15px #58d68d;
          transform: translateY(-5px);
        }

        .tool-name {
          font-size: 1.5rem;
          font-weight: bold;
          color: #a3e4d7;
          margin-bottom: 0.6rem;
          text-shadow: 0 0 6px #58d68d;
        }

        .tool-description {
          flex-grow: 1;
          color: #7dcea0;
          font-size: 1rem;
          margin-bottom: 0.8rem;
          line-height: 1.3;
        }

        .tool-links {
          display: flex;
          gap: 0.8rem;
          justify-content: flex-start;
          align-items: center;
        }

        a.tool-link-button {
          padding: 0.3rem 0.8rem;
          background: #27ae60;
          border-radius: 6px;
          font-size: 0.9rem;
          color: #0d1117;
          font-weight: 600;
          text-decoration: none;
          box-shadow: 0 0 8px #2ecc71;
          transition: background-color 0.25s ease;
        }

        a.tool-link-button:hover {
          background: #58d68d;
          color: #0d1117;
          box-shadow: 0 0 15px #58d68d;
        }

        /* Selected tool detail box */
        .tool-detail {
          margin-top: 1.5rem;
          background: #121c1b;
          border: 2px solid #4caf50;
          padding: 1.4rem;
          border-radius: 10px;
          max-width: 900px;
          box-shadow: 0 0 15px #58d68d inset;
        }

        .tool-detail h3 {
          color: #7bed9f;
          margin-bottom: 0.8rem;
          text-shadow: 0 0 7px #4caf50;
        }

        .tool-detail p {
          color: #a9dfbf;
          line-height: 1.5;
          font-size: 1.05rem;
        }

        .tool-detail-close {
          margin-top: 1rem;
          cursor: pointer;
          color: #58d68d;
          font-weight: bold;
          text-align: right;
          user-select: none;
          text-shadow: 0 0 5px #58d68d;
        }
        .tool-detail-close:hover {
          color: #a3e4d7;
        }

        .docs .doc-item {
          margin-bottom: 1.5rem;
        }

        .docs .doc-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: #82e0aa;
          margin-bottom: 0.5rem;
          text-shadow: 0 0 4px #58d68d;
        }

        .docs .doc-content {
          font-size: 1rem;
          line-height: 1.5;
          color: #a9dfbf;
        }

        /* Glowing thinking animation */
        .thinking-container {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-top: 1rem;
          color: #58d68d;
          font-size: 1.1rem;
        }

        .dots span {
          display: inline-block;
          width: 10px;
          height: 10px;
          margin: 0 3px;
          background: #58d68d;
          border-radius: 50%;
          opacity: 0.3;
          animation: glow 1.2s infinite;
        }

        .dots span:nth-child(1) {
          animation-delay: 0s;
          opacity: ${dotCount >= 1 ? 1 : 0.3};
        }
        .dots span:nth-child(2) {
          animation-delay: 0.3s;
          opacity: ${dotCount >= 2 ? 1 : 0.3};
        }
        .dots span:nth-child(3) {
          animation-delay: 0.6s;
          opacity: ${dotCount >= 3 ? 1 : 0.3};
        }

        @keyframes glow {
          0%, 100% {
            box-shadow: 0 0 5px #58d68d;
            opacity: 1;
          }
          50% {
            opacity: 0.3;
          }
        }

        /* Brain SVG */
        .brain-svg {
          width: 40px;
          height: 40px;
          filter: drop-shadow(0 0 5px #58d68d);
          animation: pulse 2s infinite ease-in-out;
        }
        @keyframes pulse {
          0%, 100% {
            filter: drop-shadow(0 0 5px #58d68d);
          }
          50% {
            filter: drop-shadow(0 0 15px #82e0aa);
          }
        }
      `}</style>

      <div className="container">
        <h1>🛡️ Cybersecurity Tools & Study Hub</h1>

        <section className="tools">
          <h2>🔧 Popular Cybersecurity Tools</h2>
          <div className="tool-grid">
            {tools.map(({ id, name, description, url, github }) => (
              <div
                key={id}
                className="tool-card"
                onClick={() => setSelectedTool(selectedTool?.id === id ? null : tools.find(t => t.id === id))}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setSelectedTool(selectedTool?.id === id ? null : tools.find(t => t.id === id));
                  }
                }}
                aria-pressed={selectedTool?.id === id}
                aria-label={`Show details about ${name}`}
              >
                <div className="tool-name">{name}</div>
                <div className="tool-description">{description}</div>
                <div className="tool-links">
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tool-link-button"
                    onClick={e => e.stopPropagation()}
                    title={`Official website of ${name}`}
                  >
                    Website
                  </a>
                  {github && (
                    <a
                      href={github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="tool-link-button"
                      onClick={e => e.stopPropagation()}
                      title={`${name} GitHub repository`}
                    >
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          {selectedTool && (
            <div className="tool-detail" aria-live="polite" aria-atomic="true">
              <h3>{selectedTool.name} - Details</h3>
              <p>{selectedTool.details}</p>
              <div
                className="tool-detail-close"
                onClick={() => setSelectedTool(null)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setSelectedTool(null);
                  }
                }}
                aria-label="Close tool details"
              >
                ✖ Close
              </div>
            </div>
          )}
        </section>

        <section className="docs">
          <h2>📚 Cybersecurity & Ethical Hacking Docs</h2>
          {hackingDocs.map(({ title, content }) => (
            <div key={title} className="doc-item">
              <div className="doc-title">{title}</div>
              <div className="doc-content">{content}</div>
            </div>
          ))}
        </section>

        <div className="thinking-container" aria-label="ChatGPT thinking animation">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="brain-svg"
            viewBox="0 0 64 64"
            fill="none"
            stroke="#58d68d"
            strokeWidth="2"
          >
            <path d="M32 2C21 2 12 10 12 21c0 7 4 13 9 17 1 1 2 4 2 4s0-2 1-3c5-4 9-10 9-18 0-11-9-19-20-19z" />
            <circle cx="20" cy="25" r="2" fill="#58d68d" />
            <circle cx="44" cy="25" r="2" fill="#58d68d" />
            <path d="M20 40c0 4 12 4 12 0" strokeLinecap="round" />
          </svg>
          <div>ChatGPT is thinking<span className="dots"><span></span><span></span><span></span></span></div>
        </div>
      </div>
    </>
  );
}