import React, { useState, useEffect } from "react";

export default function LandingPage({ onStart, onSignup }) {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Original structure preserved with enhanced colors
  const originalClasses = {
    container: "min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900 text-white",
    heroSection: "text-center max-w-2xl animate-fadeIn",
    title: "text-5xl font-extrabold mb-6",
    description: "text-lg mb-8",
    span: "font-semibold",
    buttonContainer: "flex justify-center space-x-4",
    loginButton: "px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg font-bold hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105",
    signupButton: "px-8 py-4 bg-white text-indigo-900 rounded-lg font-bold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105",
    featuresGrid: "grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 w-full max-w-4xl",
    featureCard: "bg-white/95 backdrop-blur-sm text-gray-800 rounded-xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300",
    featureTitle: "text-xl font-bold mb-2",
    featureText: ""
  };

  return (
    <div className={`${originalClasses.container} relative overflow-hidden`}>
      {/* Animated background elements with sudoku-inspired pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Hero Section */}
      <div className={`${originalClasses.heroSection} relative z-10 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        {/* Sudoku-inspired logo */}
        <div className="flex justify-center mb-8">
          <div className="relative group">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-400 via-indigo-400 to-purple-400 rounded-2xl rotate-12 transform group-hover:rotate-0 transition-all duration-700 shadow-2xl">
              <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-0.5 p-2">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="bg-white/20 rounded-sm"></div>
                ))}
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-black text-white drop-shadow-lg">SP</span>
              </div>
            </div>
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
          </div>
        </div>

        {/* Title with sudoku-inspired design */}
        <h1 className={`${originalClasses.title} relative inline-block`}>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-200">
            Sudoku Puzzle
          </span>
          <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 rounded-full"></span>
        </h1>
        
        {/* Enhanced description */}
        <p className={originalClasses.description}>
          Not just another Sudoku. <br />
          Experience a{" "}
          <span className={`${originalClasses.span} relative inline-block`}>
            <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-300">
              daily puzzle challenge
            </span>
            <span className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-blue-400/30 to-purple-400/30 -skew-x-12"></span>
          </span>{" "}
          with streaks, heatmaps, and achievements — designed to keep you coming back.
        </p>

        {/* Enhanced buttons */}
        <div className={originalClasses.buttonContainer}>
          <button
            onClick={onStart}
            className={`${originalClasses.loginButton} group relative overflow-hidden`}
          >
            <span className="relative z-10 flex items-center">
              <svg className="w-5 h-5 mr-2 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
              </svg>
              Login
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
          <button
            onClick={onSignup}
            className={`${originalClasses.signupButton} group relative overflow-hidden`}
          >
            <span className="relative z-10 flex items-center text-indigo-900">
              <svg className="w-5 h-5 mr-2 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
              </svg>
              Sign Up
            </span>
          </button>
        </div>

        {/* Enhanced stats with better colors */}
        <div className="mt-8 flex justify-center space-x-8 text-sm">
          <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
            <span className="text-blue-300 font-bold mr-2">50k+</span>
            <span className="text-gray-200">Daily Players</span>
          </div>
          <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
            <span className="text-indigo-300 font-bold mr-2">4.9★</span>
            <span className="text-gray-200">Rating</span>
          </div>
          <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
            <span className="text-purple-300 font-bold mr-2">Free</span>
            <span className="text-gray-200">To Play</span>
          </div>
        </div>

        {/* Daily challenge badge */}
        <div className="mt-6 inline-flex items-center bg-gradient-to-r from-amber-400 to-orange-400 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
          </svg>
          Daily Challenge Available Now!
        </div>
      </div>

      {/* Enhanced Feature Cards */}
      <div className={originalClasses.featuresGrid}>
        {[
          {
            icon: "🧩",
            title: "Smart Puzzles",
            desc: "Track your streaks and daily playtime with a GitHub‑style heatmap.",
            color: "from-blue-400 to-indigo-400"
          },
          {
            icon: "⚡",
            title: "Daily Challenges",
            desc: "Fresh puzzles every day, with score validation and activity logging.",
            color: "from-indigo-400 to-purple-400"
          },
          {
            icon: "🌍",
            title: "Global Leaderboards",
            desc: "Offline‑first architecture with backend sync for millions of users.",
            color: "from-purple-400 to-pink-400"
          }
        ].map((feature, index) => (
          <div
            key={index}
            className={`${originalClasses.featureCard} relative group cursor-pointer transform transition-all duration-300 hover:-translate-y-2`}
            onMouseEnter={() => setHoveredCard(index)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            {/* Card content */}
            <div className="relative z-10">
              <div className="text-4xl mb-4 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className={`${originalClasses.featureTitle} text-indigo-900`}>{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
            
            {/* Gradient overlay */}
            <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300`}></div>
            
            {/* Animated border */}
            <div className={`absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r ${feature.color} group-hover:w-full transition-all duration-300 rounded-b-xl`}></div>
            
            {/* Corner accent */}
            <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden">
              <div className={`absolute top-0 right-0 w-12 h-12 bg-gradient-to-br ${feature.color} opacity-20 transform rotate-12 translate-x-6 -translate-y-6 group-hover:opacity-30 transition-opacity`}></div>
            </div>
          </div>
        ))}
      </div>

      {/* Enhanced footer */}
      <footer className="absolute bottom-4 text-xs text-white/40 flex space-x-4">
        <span>© 2024 Sudoku Puzzle</span>
        <span>•</span>
        <span>Daily Challenges</span>
        <span>•</span>
        <span>Global Rankings</span>
      </footer>
    </div>
  );
}

// Add these animations to your global CSS
const styles = `
@keyframes blob {
  0%, 100% {
    transform: translate(0px, 0px) scale(1);
  }
  33% {
    transform: translate(30px, -30px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.animate-fadeIn {
  animation: fadeIn 1s ease-out;
}

.animate-blob {
  animation: blob 7s infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}
`;