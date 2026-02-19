import React, { useState, useEffect } from "react";
import PuzzleMatrix from "../components/PuzzleMatrix";
import HeatmapContainer from "../components/HeatmapContainer";
import WinModal from "../components/WinModal";

export default function GameLayout({ puzzle, onWin, onLogout }) {
  const [win, setWin] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedDifficulty] = useState("Medium");
  const [stats, setStats] = useState({
    correct: 32,
    mistakes: 2,
    remaining: 15,
    score: 1250
  });

  useEffect(() => {
    setIsVisible(true);
    
    // Timer
    const timer = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Original classes preserved
  const originalClasses = {
    container: "min-h-screen bg-gradient-to-br from-brandGray to-white flex flex-col items-center p-6",
    topBar: "w-full flex justify-between items-center mb-6",
    title: "text-3xl font-extrabold text-brandBlue",
    streakBadge: "px-4 py-2 bg-brandBlue text-white rounded-lg shadow",
    logoutButton: "px-4 py-2 bg-brandGreen text-white rounded-lg hover:bg-brandBlue transition",
    puzzleContainer: "",
    heatmapContainer: "mt-8 w-full"
  };

  return (
    <div className={`${originalClasses.container} relative overflow-x-hidden`}>
      {/* Enhanced animated background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100 via-transparent to-transparent opacity-30"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-green-100 via-transparent to-transparent opacity-30"></div>
        
        {/* Sudoku grid pattern overlay - very subtle */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `
            linear-gradient(to right, #6366f1 1px, transparent 1px),
            linear-gradient(to bottom, #6366f1 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Main content */}
      <div className={`relative z-10 w-full max-w-7xl transition-all duration-700 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}>
        {/* Enhanced Top Bar */}
        <div className={originalClasses.topBar}>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3">
              {/* Game logo/brand */}
              <div className="w-10 h-10 bg-gradient-to-br from-brandBlue to-brandGreen rounded-lg shadow-lg flex items-center justify-center transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <span className="text-white font-bold text-lg">SP</span>
              </div>
              <h1 className={originalClasses.title}>Sudoku Puzzle</h1>
            </div>
            
            {/* Difficulty selector */}
            <div className="flex items-center space-x-2 bg-white px-3 py-1.5 rounded-full shadow-sm border border-gray-200">
              <span className="text-sm text-gray-500">Difficulty:</span>
              <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                selectedDifficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                selectedDifficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                'bg-red-100 text-red-700'
              }`}>
                {selectedDifficulty}
              </span>
            </div>

            {/* Timer with better styling */}
            <div className="flex items-center space-x-2 bg-gradient-to-r from-gray-50 to-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
              <svg className="w-5 h-5 text-brandBlue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span className="font-mono text-xl font-bold text-brandBlue">{formatTime(timeElapsed)}</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Enhanced streak badge */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-400 to-red-400 rounded-lg blur opacity-30 group-hover:opacity-50 transition"></div>
              <span className={`${originalClasses.streakBadge} relative flex items-center space-x-2`}>
                <span className="text-xl">🔥</span>
                <span className="font-bold text-xl">5</span>
                <span className="text-sm opacity-90">day streak</span>
              </span>
            </div>
            
            {/* Enhanced logout button */}
            <button
              onClick={onLogout}
              className={`${originalClasses.logoutButton} flex items-center space-x-2 group relative overflow-hidden`}
            >
              <span className="relative z-10 flex items-center space-x-2">
                <svg className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                </svg>
                <span>Logout</span>
              </span>
            </button>
          </div>
        </div>

        {/* Game Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Progress</p>
                <p className="text-2xl font-bold text-brandBlue">78%</p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-brandBlue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Correct</p>
                <p className="text-2xl font-bold text-green-600">{stats.correct}</p>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Mistakes</p>
                <p className="text-2xl font-bold text-red-600">{stats.mistakes}/3</p>
              </div>
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Score</p>
                <p className="text-2xl font-bold text-purple-600">{stats.score}</p>
              </div>
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Main Puzzle Area - Preserved exactly with original styling */}
        <div className="flex flex-col items-center">
          {/* Original PuzzleMatrix with its exact styling and borders */}
          <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-200">
            <PuzzleMatrix puzzle={puzzle} onWin={() => setWin(true)} />
          </div>

          {/* Game Controls - Enhanced but separate from puzzle */}
          <div className="flex justify-center space-x-4 mt-6">
            <button className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-200 flex items-center space-x-2 group">
              <svg className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
              <span>Reset</span>
            </button>
            
            <button className="px-5 py-2.5 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition-all duration-200 flex items-center space-x-2 group">
              <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z"></path>
              </svg>
              <span>Hint (2 left)</span>
            </button>
            
            <button className="px-5 py-2.5 bg-gradient-to-r from-brandBlue to-brandGreen text-white rounded-lg hover:shadow-lg transition-all duration-200 flex items-center space-x-2 group">
              <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span>Check Solution</span>
            </button>
          </div>
        </div>

        {/* Enhanced Heatmap Section */}
        <div className={originalClasses.heatmapContainer}>
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-brandBlue to-brandGreen rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-brandBlue">Activity Heatmap</h2>
              </div>
              <div className="flex space-x-3">
                <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-semibold flex items-center">
                  🔥 5 day streak
                </span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                  Total: 127 games
                </span>
              </div>
            </div>
            <HeatmapContainer />
            
            {/* Heatmap legend */}
            <div className="flex items-center justify-end space-x-4 mt-4 text-xs text-gray-500">
              <span className="flex items-center"><span className="w-3 h-3 bg-gray-200 rounded mr-1"></span> Less</span>
              <span className="flex items-center"><span className="w-3 h-3 bg-green-200 rounded mr-1"></span> Medium</span>
              <span className="flex items-center"><span className="w-3 h-3 bg-green-500 rounded mr-1"></span> More</span>
            </div>
          </div>
        </div>

        {/* Original WinModal */}
        {win && <WinModal onClose={() => setWin(false)} />}

        {/* Footer with game tips */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-400">
            💡 Tip: Use the hint button if you get stuck • Complete the puzzle to maintain your streak
          </p>
        </div>
      </div>
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

.animate-blob {
  animation: blob 7s infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-5px);
  }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}
`;