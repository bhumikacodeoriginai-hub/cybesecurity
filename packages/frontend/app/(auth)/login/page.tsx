'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.error || 'Login failed');
        return;
      }

      // Store tokens
      localStorage.setItem('accessToken', data.data.accessToken);
      localStorage.setItem('refreshToken', data.data.refreshToken);
      localStorage.setItem('user', JSON.stringify(data.data.user));

      // Redirect to dashboard
      window.location.href = '/dashboard';
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-900 bg-grid-pattern bg-grid-pattern px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <Image src="/logo.jpeg" alt="CodeOrigin.ai" width={40} height={40} className="rounded-lg object-contain" />
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

          {/* Demo credentials */}
          <div className="mt-6 p-3 bg-dark-700/50 rounded-lg">
            <p className="text-xs text-dark-400 text-center mb-2">Demo Credentials</p>
            <p className="text-xs text-dark-300 text-center font-mono">student@cybersecacademy.com / Student123!</p>
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
