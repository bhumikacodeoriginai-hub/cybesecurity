'use client';

import { useState } from 'react';
import Link from 'next/link';
import { registerUser, saveSession } from '@/lib/auth';

export default function RegisterPage() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (form.password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    setLoading(true);

    // Small delay to simulate
    await new Promise(resolve => setTimeout(resolve, 300));

    // Use hardcoded registration
    const result = registerUser({
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      password: form.password,
    });

    if (!result.success || !result.user) {
      setError(result.error || 'Registration failed');
      setLoading(false);
      return;
    }

    // Save session and redirect
    saveSession(result.user);
    window.location.href = '/dashboard';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-900 bg-grid-pattern bg-grid-pattern px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 bg-cyber-400 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-dark-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <span className="text-2xl font-bold">Cyber<span className="text-cyber-400">Sec</span></span>
          </Link>
          <h1 className="text-2xl font-bold mt-6">Create Your Account</h1>
          <p className="text-dark-400 mt-2">Begin your cybersecurity learning journey</p>
        </div>

        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                {error}
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-dark-300 mb-1.5">First Name</label>
                <input id="firstName" name="firstName" type="text" value={form.firstName} onChange={handleChange} className="input-field" placeholder="John" required />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-dark-300 mb-1.5">Last Name</label>
                <input id="lastName" name="lastName" type="text" value={form.lastName} onChange={handleChange} className="input-field" placeholder="Doe" required />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-dark-300 mb-1.5">Email Address</label>
              <input id="email" name="email" type="email" value={form.email} onChange={handleChange} className="input-field" placeholder="you@example.com" required />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-dark-300 mb-1.5">Password</label>
              <input id="password" name="password" type="password" value={form.password} onChange={handleChange} className="input-field" placeholder="Min 8 characters" required minLength={8} />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-dark-300 mb-1.5">Confirm Password</label>
              <input id="confirmPassword" name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} className="input-field" placeholder="Repeat password" required />
            </div>

            <div className="flex items-start gap-2">
              <input type="checkbox" required className="w-4 h-4 mt-0.5 rounded border-dark-600 bg-dark-800 text-cyber-400" />
              <span className="text-sm text-dark-400">
                I agree to the <a href="#" className="text-cyber-400">Terms of Service</a> and understand all practical activities are for authorized environments only.
              </span>
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50">
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          {/* Demo info */}
          <div className="mt-4 p-3 bg-dark-700/50 rounded-lg">
            <p className="text-xs text-dark-400 text-center">Or use a demo account to explore:</p>
            <p className="text-xs text-dark-300 text-center font-mono mt-1">admin@cybersecacademy.com / Admin123!</p>
          </div>
        </div>

        <p className="text-center text-dark-400 text-sm mt-6">
          Already have an account?{' '}
          <Link href="/login" className="text-cyber-400 hover:text-cyber-300 font-medium">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
