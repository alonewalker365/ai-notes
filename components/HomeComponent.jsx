"use client"
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function HomeComponent() {
  const [started, setStarted] = useState(false);
  const router=useRouter();
  const handleGetStarted=()=>{
    router.push("/streamlit")
  }

  function FeatureCard({ title, description }) {
    return (
      <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="mt-2 text-gray-300">{description}</p>
      </div>
    );
}

  return (
    <div className="min-h-screen bg-gray-900 text-white">
    {/* Navbar */}
    <nav className="fixed w-full bg-gray-800 shadow-lg">
      <div className="container mx-auto flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold">🎥 AI Notes Generator</h1>
        <div>
          <a href="#features" className="px-4 hover:text-blue-400">Features</a>
          <a href="#contact" className="px-4 hover:text-blue-400">Contact</a>
        </div>
      </div>
    </nav>

    {/* Hero Section */}
    <div className="flex items-center justify-center h-screen text-center bg-gradient-to-br from-blue-600 to-purple-700">
      <div>
        <h1 className="text-5xl font-bold">📹 AI-Generated Notes from YouTube Videos</h1>
        <p className="text-lg mt-4">Turn any YouTube video into structured, readable notes instantly!</p>
        <button
          className="mt-6 px-6 py-3 bg-white text-blue-600 font-semibold rounded-full shadow-lg hover:bg-blue-600 hover:text-white transition"
          onClick={handleGetStarted}
        >
          Get Started
        </button>
      </div>
    </div>

    {/* Features Section */}
    <section id="features" className="py-20 px-6 text-center bg-gray-800">
      <h2 className="text-4xl font-bold">🚀 Features</h2>
      <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <FeatureCard title="📄 YouTube to Notes" description="Extracts key points from any video automatically." />
        <FeatureCard title="📝 AI-Powered Summarization" description="Converts long videos into short, easy-to-read notes." />
        <FeatureCard title="📂 Export & Save" description="Download notes in multiple formats (PDF, TXT)." />
        <FeatureCard title="🌍 Multi-Language Support" description="Summarize content in different languages." />
        <FeatureCard title="📊 Topic Categorization" description="Organizes notes into categories for easy navigation." />
        <FeatureCard title="🚀 Instant Processing" description="Get AI-generated notes in seconds." />
      </div>
    </section>

    {/* Contact Section */}
    <section id="contact" className="py-20 px-6 text-center bg-gray-900">
      <h2 className="text-4xl font-bold">📞 Contact Us</h2>
      <p className="mt-4">Have questions? Reach out at <span className="text-blue-400">support@ainotes.com</span></p>
    </section>
  </div>


  );
}
