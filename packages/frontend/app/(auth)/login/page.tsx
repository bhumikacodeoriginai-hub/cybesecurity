'use client';

import { useState } from 'react';
import Link from 'next/link';
import { authenticate, saveSession } from '@/lib/auth';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Small delay to simulate network
    await new Promise(resolve => setTimeout(resolve, 300));

    // Use hardcoded authentication
    const result = authenticate(email, password);

    if (!result.success || !result.user) {
      setError(result.error || 'Login failed');
      setLoading(false);
      return;
    }

    // Save session
    saveSession(result.user);

    // Redirect to dashboard
    window.location.href = '/dashboard';
  };

  // Quick login with demo credentials
  const quickLogin = (demoEmail: string, demoPassword: string) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-900 bg-grid-pattern bg-grid-pattern px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 bg-cyber-400 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-dark-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <span className="text-2xl font-bold">Cyber<span className="text-cyber-400">Sec</span></span>
          </Link>
          <h1 className="text-2xl font-bold mt-6">Welcome Back</h1>
          <p className="text-dark-400 mt-2">Sign in to continue your learning journey</p>
        </div>

        {/* Form */}
        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-dark-300 mb-1.5">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-dark-300 mb-1.5">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4 rounded border-dark-600 bg-dark-800 text-cyber-400 focus:ring-cyber-400" />
                <span className="text-sm text-dark-400">Remember me</span>
              </label>
              <a href="#" className="text-sm text-cyber-400 hover:text-cyber-300">Forgot password?</a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Demo credentials - Quick Login */}
          <div className="mt-6 space-y-2">
            <p className="text-xs text-dark-500 text-center">Quick Login (Demo Accounts)</p>
            <div className="grid gap-2">
              <button
                onClick={() => quickLogin('admin@cybersecacademy.com', 'Admin123!')}
                className="w-full p-2 bg-dark-700/50 hover:bg-dark-700 rounded-lg text-left transition-colors border border-dark-600/50"
              >
                <p className="text-xs text-dark-200 font-medium">Admin</p>
                <p className="text-[10px] text-dark-500 font-mono">admin@cybersecacademy.com / Admin123!</p>
              </button>
              <button
                onClick={() => quickLogin('instructor@cybersecacademy.com', 'Admin123!')}
                className="w-full p-2 bg-dark-700/50 hover:bg-dark-700 rounded-lg text-left transition-colors border border-dark-600/50"
              >
                <p className="text-xs text-dark-200 font-medium">Instructor</p>
                <p className="text-[10px] text-dark-500 font-mono">instructor@cybersecacademy.com / Admin123!</p>
              </button>
              <button
                onClick={() => quickLogin('student@cybersecacademy.com', 'Student123!')}
                className="w-full p-2 bg-dark-700/50 hover:bg-dark-700 rounded-lg text-left transition-colors border border-dark-600/50"
              >
                <p className="text-xs text-dark-200 font-medium">Student</p>
                <p className="text-[10px] text-dark-500 font-mono">student@cybersecacademy.com / Student123!</p>
              </button>
            </div>
          </div>

          <div className="mt-4 text-center">
            <p className="text-[10px] text-dark-600">Secured by JWT Authentication</p>
          </div>
        </div>

        <p className="text-center text-dark-400 text-sm mt-6">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="text-cyber-400 hover:text-cyber-300 font-medium">
            Create one free
          </Link>
        </p>
      </div>
    </div>
  );
}
