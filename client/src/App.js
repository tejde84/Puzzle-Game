import React, { useState } from "react";
import LandingPage from "./pages/LandingPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import GameLayout from "./pages/GameLayout";
import WinModal from "./components/WinModal";
import { usePuzzleGenerator } from "./hooks/usePuzzleGenerator";

export default function App() {
  const { generatePuzzle } = usePuzzleGenerator();
  const [puzzle, setPuzzle] = useState(generatePuzzle());
  const [stage, setStage] = useState("landing"); // landing → signup → login → game
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [win, setWin] = useState(false);

  // Handle login success
  const handleLogin = (t) => {
    setToken(t);
    setStage("game");
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setStage("login");
  };

  // Handle puzzle win
  const handleWin = () => setWin(true);

  // Start a new puzzle
  const handleNewGame = () => {
    setPuzzle(generatePuzzle());
    setWin(false);
  };

  return (
    <>
      {stage === "landing" && (
        <LandingPage
          onStart={() => setStage("login")}
          onSignup={() => setStage("signup")}
        />
      )}

      {stage === "login" && (
  <LoginPage onLogin={handleLogin} onSignup={() => setStage("signup")} />
)}
{stage === "signup" && (
  <SignupPage onSignupSuccess={() => setStage("login")} />
)}

     {stage === "game" && token && (
  <>
    <GameLayout puzzle={puzzle} onWin={handleWin} onLogout={handleLogout} />
    {win && (
      <WinModal onClose={() => setWin(false)} onNewGame={handleNewGame} />
    )}
  </>
)}
    </>
  );
}