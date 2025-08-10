export default function Resume() {
  return (
    <div className="min-h-screen bg-gray-50 p-8 md:p-16 font-sans">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8">
        {/* Header */}
        <div className="text-center border-b pb-6">
          <h1 className="text-4xl font-bold text-gray-900">Dhurba Bikram Khadka</h1>
          <p className="text-lg text-blue-600 mt-1">DX Consultant & Software Developer</p>
          <p className="text-sm text-gray-500 mt-2">
            🇯🇵 Kobe, Japan | 📧 dhurba@example.com | 📞 +81-90-xxxx-xxxx
          </p>
        </div>

        {/* Skills */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2 mb-4">Skills</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-gray-700 text-sm">
            <ul className="list-disc list-inside">
              <li>Java, Spring Boot</li>
              <li>Python, FastAPI, Pandas</li>
              <li>JavaFX, Swing</li>
            </ul>
            <ul className="list-disc list-inside">
              <li>Next.js, React.js</li>
              <li>Tailwind CSS, HTML/CSS</li>
              <li>MySQL, SQLAlchemy</li>
            </ul>
            <ul className="list-disc list-inside">
              <li>Git, GitHub Actions</li>
              <li>DX Business, Japanese N2</li>
              <li>OOP, Clean Architecture</li>
            </ul>
          </div>
        </div>

        {/* Experience */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2 mb-4">Experience</h2>
          <div className="space-y-4 text-sm text-gray-700">
            <div>
              <h3 className="font-semibold text-base">Part-time Staff – Lawson, KFC, Sushi Restaurant</h3>
              <p className="text-xs text-gray-500">2019 – 2023 | Japan</p>
              <p>Gained experience in Japanese work culture, teamwork, communication, and customer service while studying IT.</p>
            </div>
            <div>
              <h3 className="font-semibold text-base">Freelance Software Projects</h3>
              <p className="text-xs text-gray-500">2023 – Present</p>
              <p>Built inventory systems, dashboards, and web apps using JavaFX, Next.js, Spring Boot, and FastAPI for personal and client use.</p>
            </div>
          </div>
        </div>

        {/* Education */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2 mb-4">Education</h2>
          <div className="text-sm text-gray-700">
            <p><strong>Art College Kobe (専門学校)</strong> — DX Business Course (2023–2025)</p>
            <p className="text-xs text-gray-500">Completed Japanese language course from Yonago International Business College (2021–2023)</p>
            <p className="text-xs text-gray-500">Passed JLPT N3, preparing for N2</p>
          </div>
        </div>

        {/* Projects */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2 mb-4">Projects</h2>
          <div className="space-y-3 text-sm text-gray-700">
            <div>
              <h3 className="font-semibold">Techura – Inventory System</h3>
              <p>Modern JavaFX-based inventory system with barcode, POS, admin dashboard, and local CSV/JSON data storage.</p>
              <p className="text-blue-600 text-xs">🔗 https://tech-two-kohl.vercel.app</p>
            </div>
            <div>
              <h3 className="font-semibold">Bikram Universe</h3>
              <p>Multi-page Next.js website for showcasing all projects and IT experiments.</p>
            </div>
          </div>
        </div>

        {/* Footer / Download Button */}
        <div className="mt-10 text-center">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-full shadow hover:bg-blue-700 transition">
            📄 Download PDF Resume
          </button>
        </div>
      </div>
    </div>
  );
}