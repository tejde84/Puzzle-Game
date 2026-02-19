import React, { useState, useEffect } from "react";

export default function SignupPage({ onSignupSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Calculate password strength
  useEffect(() => {
    let strength = 0;
    if (password.length >= 6) strength += 1;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    setPasswordStrength(Math.min(strength, 4));
  }, [password]);

  // Original code preserved exactly
  const originalClasses = {
    container: "flex min-h-screen items-center justify-center bg-gradient-to-br from-brandBlue to-brandGray",
    card: "bg-white shadow-lg rounded-xl p-8 w-96",
    title: "text-2xl font-bold text-brandBlue mb-6",
    emailInput: "w-full mb-4 p-3 border rounded focus:ring-2 focus:ring-brandGreen",
    passwordInput: "w-full mb-4 p-3 border rounded focus:ring-2 focus:ring-brandGreen",
    confirmInput: "w-full mb-6 p-3 border rounded focus:ring-2 focus:ring-brandGreen",
    errorText: "text-red-500 mb-4",
    successText: "text-green-600 mb-4",
    button: "w-full bg-brandBlue text-white py-3 rounded hover:bg-brandGreen transition",
    loginText: "text-sm text-gray-500 mt-4 text-center",
    loginSpan: "text-brandBlue hover:underline cursor-pointer"
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    // Basic client-side validation
    if (!email || !password) {
      setError("Email and password are required.");
      setIsLoading(false);
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      setIsLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch(process.env.REACT_APP_API_URL + "/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess("Signup successful! Please log in.");
        setError("");
        setTimeout(() => {
          onSignupSuccess(); // move to login stage
        }, 2000);
      } else {
        setError(data.error || "Signup failed");
      }
    } catch (err) {
      setError("Server error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`${originalClasses.container} relative overflow-hidden`}>
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-green-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 right-40 w-64 h-64 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Sudoku grid pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
        `,
        backgroundSize: '30px 30px'
      }}></div>

      {/* Main card */}
      <div className={`${originalClasses.card} relative z-10 transform transition-all duration-700 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}>
        
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-brandGreen rounded-xl rotate-12 transform hover:rotate-0 transition-all duration-500 shadow-xl">
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

        {/* Title */}
        <h2 className={originalClasses.title}>Create Account</h2>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Email field */}
          <div className="relative">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`${originalClasses.emailInput} pr-10 transition-all duration-200 focus:shadow-lg`}
              disabled={isLoading}
            />
            {email && (
              <span className="absolute right-3 top-3 text-green-500">✓</span>
            )}
          </div>

          {/* Password field with strength meter */}
          <div className="relative mb-2">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password (min 6 chars)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`${originalClasses.passwordInput} pr-10 transition-all duration-200 focus:shadow-lg ${
                password && password.length < 6 ? 'border-red-300' : ''
              }`}
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-400 hover:text-brandGreen transition-colors"
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

          {/* Password strength indicator */}
          {password && (
            <div className="mb-4">
              <div className="flex space-x-1 h-1 mb-1">
                {[1, 2, 3, 4].map((level) => (
                  <div
                    key={level}
                    className={`flex-1 h-full rounded-full transition-all duration-300 ${
                      passwordStrength >= level
                        ? level === 1
                          ? 'bg-red-400'
                          : level === 2
                          ? 'bg-orange-400'
                          : level === 3
                          ? 'bg-yellow-400'
                          : 'bg-green-400'
                        : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
              <p className="text-xs text-gray-500">
                {passwordStrength === 0 && 'Too weak'}
                {passwordStrength === 1 && 'Weak'}
                {passwordStrength === 2 && 'Fair'}
                {passwordStrength === 3 && 'Good'}
                {passwordStrength === 4 && 'Strong'}
              </p>
            </div>
          )}

          {/* Confirm password field */}
          <div className="relative mb-6">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`${originalClasses.confirmInput} pr-10 transition-all duration-200 focus:shadow-lg ${
                confirmPassword && password !== confirmPassword ? 'border-red-300' : ''
              }`}
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-3 text-gray-400 hover:text-brandGreen transition-colors"
              disabled={isLoading}
            >
              {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
            </button>
            {confirmPassword && password === confirmPassword && password.length >= 6 && (
              <span className="absolute right-10 top-3 text-green-500">✓</span>
            )}
          </div>

          {/* Password requirements */}
          {password && (
            <div className="mb-4 text-xs space-y-1">
              <p className={`flex items-center ${password.length >= 6 ? 'text-green-600' : 'text-gray-400'}`}>
                <span className="mr-2">{password.length >= 6 ? '✓' : '○'}</span>
                At least 6 characters
              </p>
              <p className={`flex items-center ${/[A-Z]/.test(password) ? 'text-green-600' : 'text-gray-400'}`}>
                <span className="mr-2">{/[A-Z]/.test(password) ? '✓' : '○'}</span>
                One uppercase letter
              </p>
              <p className={`flex items-center ${/[0-9]/.test(password) ? 'text-green-600' : 'text-gray-400'}`}>
                <span className="mr-2">{/[0-9]/.test(password) ? '✓' : '○'}</span>
                One number
              </p>
            </div>
          )}

          {/* Original error message */}
          {error && (
            <div className={`${originalClasses.errorText} flex items-center bg-red-50 p-3 rounded-lg`}>
              <svg className="w-5 h-5 mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              {error}
            </div>
          )}

          {/* Original success message */}
          {success && (
            <div className={`${originalClasses.successText} flex items-center bg-green-50 p-3 rounded-lg`}>
              <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              {success}
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
                Creating Account...
              </span>
            ) : (
              <span className="flex items-center justify-center">
                Sign Up
                <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                </svg>
              </span>
            )}
          </button>
        </form>

        {/* Password tips */}
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-xs text-blue-700 flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            Use a strong password to keep your account secure
          </p>
        </div>

        {/* Original login link */}
        <p className={originalClasses.loginText}>
          Already have an account?{" "}
          <span
            onClick={onSignupSuccess}
            className={`${originalClasses.loginSpan} font-semibold`}
          >
            Login
          </span>
        </p>

        {/* Terms and privacy */}
        <div className="mt-4 text-center text-xs text-gray-400">
          By signing up, you agree to our{' '}
          <button className="text-brandBlue hover:underline">Terms</button>
          {' '}and{' '}
          <button className="text-brandBlue hover:underline">Privacy Policy</button>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-4 text-xs text-white/40">
        Sudoku Puzzle • Join 50k+ Players
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

.animation-delay-4000 {
  animation-delay: 4s;
}
`;