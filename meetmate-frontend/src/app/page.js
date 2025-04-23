import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white px-6 sm:px-16 py-20 font-sans">
      <header className="flex justify-between items-center mb-20">
        <h1 className="text-3xl sm:text-4xl font-bold">MeetMate</h1>
        <nav className="flex gap-6 text-sm sm:text-base">
          <Link href="#features" className="hover:underline">Features</Link>
          <Link href="#demo" className="hover:underline">Demo</Link>
          <Link href="#contact" className="hover:underline">Contact</Link>
        </nav>
      </header>

      <main className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
        <div className="flex-1 text-center lg:text-left">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
            Your AI-Powered Meeting Assistant
          </h2>
          <p className="text-lg sm:text-xl mb-8 max-w-xl">
            MeetMate joins meetings for you, transcribes everything in real time, and even generates summaries, action items, and intelligent replies on the fly.
          </p>
          <Link
            href="#demo"
            className="inline-block bg-white text-black font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-200 transition"
          >
            Try the Demo
          </Link>
        </div>

        <div className="flex-1">
          <Image
            src="/meetmate-hero.png"
            alt="MeetMate AI Assistant Screenshot"
            width={600}
            height={400}
            className="rounded-2xl shadow-xl"
          />
        </div>
      </main>

      <section id="features" className="mt-32">
        <h3 className="text-3xl font-bold mb-10 text-center">Core Features</h3>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "Local Speech-to-Text", desc: "Real-time transcription entirely on your Mac." },
            { title: "Meeting Analysis", desc: "Highlights key points, questions, and action items." },
            { title: "'Save Me' Replies", desc: "Generate smart responses when caught off guard." },
            { title: "Auto Summaries", desc: "Instant summaries once the call ends." },
            { title: "Real-time Translation", desc: "Understand any language or accent." },
            { title: "Custom LLM Support", desc: "Choose the AI engine that powers your experience." }
          ].map((f, i) => (
            <div key={i} className="bg-white/5 p-6 rounded-xl shadow-lg">
              <h4 className="text-xl font-semibold mb-2">{f.title}</h4>
              <p className="text-sm text-gray-300">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="mt-32 text-center">
        <h3 className="text-3xl font-bold mb-4">Ready to Supercharge Your Meetings?</h3>
        <p className="text-lg mb-6">Get early access or reach out to learn more.</p>
        <Link
          href="mailto:contact@meetmate.ai"
          className="inline-block bg-blue-500 hover:bg-blue-600 transition text-white font-semibold px-6 py-3 rounded-lg"
        >
          Contact Us
        </Link>
      </section>

      <footer className="mt-32 text-sm text-center text-gray-400">
        © {new Date().getFullYear()} MeetMate. All rights reserved.
      </footer>
    </div>
  );
}