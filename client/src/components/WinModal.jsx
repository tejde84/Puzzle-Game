import React, { useEffect } from "react";
import Confetti from "react-confetti";

export default function WinModal({ onClose, onNewGame, timeTaken = "12m 30s", score = 95 }) {
  // Confetti runs when modal mounts
  useEffect(() => {
    // You can add sound effects or analytics logging here if needed
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 animate-fadeIn">
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        recycle={false}
        numberOfPieces={300}
      />
      <div className="bg-white rounded-xl shadow-2xl p-8 w-96 text-center">
        <h2 className="text-3xl font-extrabold text-brandBlue mb-4">🎉 You Won!</h2>
        <p className="text-lg text-gray-700 mb-2">Time Taken: <span className="font-semibold">{timeTaken}</span></p>
        <p className="text-lg text-gray-700 mb-6">Score: <span className="font-semibold">{score}</span></p>

        <div className="flex flex-col space-y-3">
          <button
            onClick={onNewGame}
            className="w-full bg-brandGreen text-white py-3 rounded-lg font-semibold hover:bg-brandBlue transition"
          >
            New Puzzle
          </button>
          <button
            onClick={onClose}
            className="w-full bg-gray-300 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-400 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}