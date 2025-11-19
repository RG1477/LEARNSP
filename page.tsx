"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff, Sparkles } from 'lucide-react';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    // Simulate login check
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem("ls_users") || "[]");
      const user = users.find((u: any) => u.email === email && u.pass === password);

      if (!user) {
        setError("Invalid email or password.");
        setLoading(false);
        return;
      }

      localStorage.setItem("ls_user", JSON.stringify(user));
      router.push("/dashboard");
    }, 800);
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900 text-white flex items-center justify-center min-h-screen font-sans relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />

      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <Link href="/" className="flex gap-3 items-center hover:scale-105 transition-transform">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center font-bold text-slate-900">
              L
            </div>
            <div className="text-2xl font-bold gradient-text">LearnSphere</div>
          </Link>
          <Link href="/signup" className="text-amber-400 hover:text-amber-300 font-semibold text-sm">
            Create Account
          </Link>
        </div>
      </header>

      <div className="mt-20 max-w-md w-full mx-4 relative z-10">
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl p-8 border border-slate-700/50 backdrop-blur-sm">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="w-6 h-6 text-amber-400" />
              <h2 className="text-3xl font-bold gradient-text">Welcome Back</h2>
            </div>
            <p className="text-gray-400">Continue your learning journey</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 rounded-lg bg-red-500/20 border border-red-500/50 text-red-300 text-sm animate-in fade-in">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-sm text-gray-300 font-semibold flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400" />
                Email Address
              </label>
              <input
                type="email"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition backdrop-blur-sm"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2 relative">
              <label className="text-sm text-gray-300 font-semibold flex items-center gap-2">
                <Lock className="w-4 h-4 text-amber-400" />
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition backdrop-blur-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3.5 text-gray-400 hover:text-amber-400 transition"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-400 hover:text-gray-300 cursor-pointer transition">
                <input type="checkbox" className="accent-amber-400 rounded" />
                Remember me
              </label>
              <Link href="/forgot" className="text-amber-400 hover:text-amber-300 transition font-semibold">
                Forgot Password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 font-bold text-slate-900 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Logging in..." : "Log In"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center justify-center my-6 gap-4">
            <hr className="w-1/3 border-slate-600" />
            <span className="text-sm text-gray-400">or</span>
            <hr className="w-1/3 border-slate-600" />
          </div>

          {/* Social Login */}
          <div className="space-y-3">
            <button className="w-full py-3 rounded-lg bg-blue-600/80 hover:bg-blue-600 font-semibold text-white shadow-md transition backdrop-blur-sm border border-blue-500/50 flex items-center justify-center gap-3">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              </svg>
              Google
            </button>
            <button className="w-full py-3 rounded-lg bg-slate-700/50 hover:bg-slate-700 font-semibold text-white shadow-md transition backdrop-blur-sm border border-slate-600 flex items-center justify-center gap-3">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </button>
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-sm text-gray-400 mt-8">
            Don't have an account?{' '}
            <Link href="/signup" className="text-amber-400 hover:text-amber-300 font-semibold transition">
              Sign up
            </Link>
          </p>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-slate-700/30 rounded-lg border border-slate-600/50 backdrop-blur-sm text-xs text-gray-400">
            <p className="font-semibold text-gray-300 mb-2">Demo Credentials:</p>
            <p>Email: test@email.com</p>
            <p>Password: 1234</p>
          </div>
        </div>
      </div>
    </div>
  );
}
