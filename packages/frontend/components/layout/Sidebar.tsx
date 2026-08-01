'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/courses', label: 'Courses', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
  { href: '/labs', label: 'Labs', icon: 'M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-dark-950/95 backdrop-blur-xl border-b border-white/[0.06] z-50 flex items-center justify-between px-4">
        <Link href="/courses" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-cyber-400 to-cyan-300 rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-dark-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <span className="font-bold text-base">Cyber<span className="text-cyber-400">Sec</span></span>
        </Link>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-white/5 transition-colors"
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-dark-950/98 backdrop-blur-xl pt-14">
          <nav className="p-6 space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-4 px-5 py-4 rounded-2xl text-base font-medium transition-all ${
                    isActive ? 'text-cyber-400 bg-cyber-400/[0.08] border border-cyber-400/10' : 'text-dark-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                  </svg>
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="absolute bottom-8 left-6 right-6">
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.04]">
              <p className="text-[10px] text-dark-500 uppercase tracking-wider">Developed by</p>
              <p className="text-xs text-dark-300 mt-1 font-medium">Raghavendra N</p>
              <p className="text-[10px] text-dark-500 mt-0.5">Code Origin.AI Private Limited</p>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-full w-64 bg-dark-950 border-r border-white/[0.04] z-40 flex-col">
        {/* Logo */}
        <div className="h-16 flex items-center px-6">
          <Link href="/courses" className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-gradient-to-br from-cyber-400 to-cyan-300 rounded-xl flex items-center justify-center shadow-lg shadow-cyber-400/20">
              <svg className="w-5 h-5 text-dark-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight">Cyber<span className="text-cyber-400">Sec</span></span>
              <p className="text-[9px] text-dark-500 -mt-0.5 tracking-[0.2em] uppercase">Academy</p>
            </div>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 pt-6 space-y-1">
          <p className="px-4 mb-3 text-[9px] font-semibold text-dark-500 uppercase tracking-[0.2em]">Learn</p>
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
            return (
              <Link key={item.href} href={item.href} className={isActive ? 'nav-link-active' : 'nav-link'}>
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                </svg>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-white/[0.04]">
          <div className="px-3 py-3">
            <p className="text-[9px] text-dark-600 uppercase tracking-[0.15em]">Developed by</p>
            <p className="text-xs text-dark-400 mt-1 font-medium">Raghavendra N</p>
            <p className="text-[9px] text-dark-600 mt-0.5">Code Origin.AI Pvt Ltd</p>
          </div>
        </div>
      </aside>
    </>
  );
}
