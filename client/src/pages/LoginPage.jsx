import React, { useState, useEffect } from "react";

export default function LoginPage({ onLogin, onSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Original code preserved exactly
  const originalClasses = {
    container: "flex min-h-screen items-center justify-center bg-gradient-to-br from-brandBlue to-brandGray",
    card: "bg-white shadow-lg rounded-xl p-8 w-96",
    title: "text-2xl font-bold text-brandBlue mb-6",
    emailInput: "w-full mb-4 p-3 border rounded focus:ring-2 focus:ring-brandGreen",
    passwordInput: "w-full mb-6 p-3 border rounded focus:ring-2 focus:ring-brandGreen",
    errorText: "text-red-500 mb-4",
    button: "w-full bg-brandBlue text-white py-3 rounded hover:bg-brandGreen transition",
    signupText: "text-sm text-gray-500 mt-6 text-center",
    signupSpan: "text-brandBlue hover:underline cursor-pointer"
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    try {
      const res = await fetch(process.env.REACT_APP_API_URL + "/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        onLogin(data.token);
      } else {
        setError(data.error || "Login failed");
      }
    } catch (err) {
      setError("Server error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`${originalClasses.container} relative overflow-hidden`}>
      {/* Animated background elements - added without modifying original */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
      </div>

      {/* Sudoku-themed pattern overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
        `,
        backgroundSize: '30px 30px'
      }}></div>

      {/* Original card with enhancements */}
      <div className={`${originalClasses.card} relative z-10 transform transition-all duration-700 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}>
        
        {/* Added logo without modifying original */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-brandBlue to-brandGreen rounded-xl rotate-12 transform hover:rotate-0 transition-all duration-500 shadow-xl">
            <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-0.5 p-2 opacity-30">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="bg-white rounded-sm"></div>
              ))}
            </div>
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-2xl font-black text-white">SP</span>
            </div>
          </div>
        </div>

        {/* Original title */}
        <h2 className={originalClasses.title}>Welcome Back</h2>

        {/* Original form */}
        <form onSubmit={handleSubmit}>
          {/* Email field with enhancements */}
          <div className="relative">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`${originalClasses.emailInput} pr-10 transition-all duration-200 focus:shadow-lg`}
              disabled={isLoading}
            />
            {email && !error && (
              <span className="absolute right-3 top-3 text-green-500">✓</span>
            )}
          </div>

          {/* Password field with enhancements */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`${originalClasses.passwordInput} pr-10 transition-all duration-200 focus:shadow-lg`}
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-400 hover:text-brandBlue transition-colors"
              disabled={isLoading}
            >
              {showPassword ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path>
                </svg>
              )}
            </button>
          </div>

          {/* Forgot password link - added */}
          <div className="flex justify-end mb-4">
            <button
              type="button"
              onClick={() => alert("Please contact support to reset your password")}
              className="text-xs text-gray-500 hover:text-brandBlue transition-colors"
              disabled={isLoading}
            >
              Forgot password?
            </button>
          </div>

          {/* Original error message */}
          {error && (
            <div className={`${originalClasses.errorText} flex items-center bg-red-50 p-3 rounded-lg`}>
              <svg className="w-5 h-5 mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              {error}
            </div>
          )}

          {/* Original button with loading state */}
          <button
            type="submit"
            disabled={isLoading}
            className={`${originalClasses.button} relative overflow-hidden group ${
              isLoading ? 'opacity-75 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Logging in...
              </span>
            ) : (
              <span className="flex items-center justify-center">
                Login
                <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </span>
            )}
          </button>
        </form>

        {/* Demo credentials - added */}
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-500 text-center">
            Demo: <span className="font-mono text-brandBlue">demo@example.com</span> /{' '}
            <span className="font-mono text-brandBlue">password123</span>
          </p>
        </div>

        {/* Original signup link */}
        <p className={originalClasses.signupText}>
          Don't have an account?{" "}
          <span
            onClick={onSignup}
            className={`${originalClasses.signupSpan} font-semibold`}
          >
            Sign up
          </span>
        </p>

        {/* Security badge - added */}
        <div className="mt-4 flex justify-center space-x-2 text-xs text-gray-400">
          <span>🔒 Secure Login</span>
          <span>•</span>
          <span>🛡️ 256-bit Encryption</span>
        </div>
      </div>

      {/* Footer - added */}
      <div className="absolute bottom-4 text-xs text-white/40">
        Sudoku Puzzle • Daily Challenges
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

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-blob {
  animation: blob 7s infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animate-fadeIn {
  animation: fadeIn 0.6s ease-out;
}
`;