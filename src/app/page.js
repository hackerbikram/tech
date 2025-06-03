"use client";
import Image from "next/image";
import Link from "next/link";
import { FaYoutube, FaFacebookF, FaTiktok } from "react-icons/fa";
export default function Page() {
  return (
    <>
      <main className="bg-gradient-to-br from-purple-50 to-blue-100 min-h-screen text-gray-800 px-4 md:px-10">
        {/* HERO */}
        <section className="text-center py-20 relative overflow-hidden">
          <div className="absolute animate-pulse bg-purple-200 rounded-full w-96 h-96 -top-40 -left-40 blur-3xl opacity-30"></div>
          <div className="absolute animate-ping bg-blue-200 rounded-full w-96 h-96 -bottom-40 -right-40 blur-3xl opacity-20"></div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-purple-800 drop-shadow-xl mb-4">
            Welcome to <span className="text-pink-600">Bikram's Universe</span> 🌐
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Learn languages, explore tech, and shop quality products — all in one place.
          </p>

          <div className="mt-8 flex justify-center gap-6 flex-wrap">
            <Link href="/study" className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full shadow-lg hover:scale-105 transition-transform">
              🚀 Start Learning
            </Link>
            <Link href="/product" className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-full shadow-lg hover:scale-105 transition-transform">
              🛒 Visit Shop
            </Link>
          </div>
        </section>

        {/* STUDY SECTION */}
        <section className="py-16">
          <h2 className="text-4xl font-bold text-center text-indigo-700 mb-12">📚 Study with Bikram</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Japanese Learning", color: "text-purple-700", desc: "Master Kanji, Grammar, Vocabulary from N5 to N1 with practice exercises." },
              { title: "English Courses", color: "text-blue-700", desc: "Improve Reading, Writing, Speaking skills for daily and professional use." },
              { title: "Nepali Basics", color: "text-green-700", desc: "Learn Nepali for travel or communication. Audio, video and quizzes included!" },
            ].map((item, i) => (
              <div key={i} className="bg-white/80 backdrop-blur-md border border-white/30 p-6 rounded-2xl shadow-lg hover:shadow-xl transition hover:-translate-y-1">
                <h3 className={`text-xl font-bold ${item.color}`}>{item.title}</h3>
                <p className="mt-2 text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SOCIAL MEDIA */}
        <section className="text-center py-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">🌍 Follow Bikram Online</h2>
          <div className="flex justify-center gap-8 text-4xl text-white">
            <a
              href="https://www.youtube.com/@jptjankar"
              target="_blank"
              className="bg-red-600 p-4 rounded-full shadow hover:scale-110 transition"
              aria-label="YouTube"
            >
              <FaYoutube />
            </a>
            <a
              href="https://www.facebook.com/share/1HP7hMUzq2/?mibextid=wwXIfr"
              target="_blank"
              className="bg-blue-700 p-4 rounded-full shadow hover:scale-110 transition"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://www.tiktok.com/@dhurba..khadka?_t=ZS-8wqOS3DPNrj&_r=1"
              target="_blank"
              className="bg-black p-4 rounded-full shadow hover:scale-110 transition"
              aria-label="TikTok"
            >
              <FaTiktok />
            </a>
          </div>
        </section>
          
        {/* FOOTER */}
        <footer className="text-center mt-16 text-sm text-gray-500 py-4">
          &copy; {new Date().getFullYear()} Bikram Khadka. All rights reserved.
        </footer>
      </main>
    </>
  );
}