import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar.jsx";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "bikram universe",
  description: "created by bikram",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Bikram's Universe</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Learn Japanese, English, Nepali; explore tech tools; and shop top-quality gadgets. Created by Bikram – content creator, language teacher, and tech enthusiast." />
        <meta name="keywords" content="Bikram, Japanese Learning, English Grammar, Nepali Language, Language Courses, Tech Tools, Typing Practice, Online Shop, Study Materials, Bikram Universe,bikram khadka,dhurba khadka,khadka bikram,khadka dhurba,dbk,bikram,カドカ ビクラム,どうルバ、" />
        <meta name="author" content="Bikram Khadka" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="en"  />
        <meta name="language" content="jp"  />
        <meta name="theme-color" content="#7c3aed" />

        {/* Open Graph for Facebook */}
        <meta property="og:title" content="Bikram's Universe | Study • Shop • Create" />
        <meta property="og:description" content="Explore Japanese, English, Nepali learning & shop amazing tech tools with Bikram." />
        <meta property="og:image" content="bikram.png" />
        <meta property="og:url" content="https://github.com/hackerbikram/tech.git" />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Bikram's Universe | Study • Shop • Create" />
        <meta name="twitter:description" content="Join Bikram in exploring language learning and amazing tech tools." />
        <meta name="twitter:image" content="/images/og-banner.jpg" />
        <title>Bikram's Study Hub - Learn Programming, Japanese & More</title>
        <meta name="description" content="Bikram's learning hub for programming, Japanese, hardware, and languages." />
        <meta name="keywords" content="Bikram, programming, Japanese learning, hardware, typing practice" />
        <meta property="og:title" content="Bikram's Study Hub" />
        <meta property="og:description" content="Learn programming, Japanese, hardware, and more with Bikram's Study Hub." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tech-two-kohl.vercel.app/" />
        <meta property="og:image" content="https://tech-two-kohl.vercel.app/-image.png" />

        <link rel="canonical" href="https://github.com/hackerbikram/tech.git" />
        <link rel="icon" href="/bikram.png" />

        {/* Structured Data JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Bikram Khadka",
              url: "https://github.com/hackerbikram/tech.git",
              sameAs: [
                "https://www.youtube.com/@jptjankar",
                "https://www.facebook.com/share/1HP7hMUzq2/?mibextid=wwXIfr",
                "https://www.tiktok.com/@dhurba..khadka?_t=ZS-8wqOS3DPNrj&_r=1"
              ],
              jobTitle: "YouTuber, Programmer, Language Instructor",
              description: "Bikram's Universe: Learn Japanese, English, Nepali and explore tech and tools."
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-black text-white`}
      >
        {/* Fixed Navbar */}
        <div className="fixed top-0 left-0 right-0 z-50">
          <Navbar />
        </div>

        {/* Page Content */}
        <main className="mt-20 p-5">{children}</main>
      </body>
    </html>
  );
}