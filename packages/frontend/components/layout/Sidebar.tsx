'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/courses', label: 'COURSES', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
  { href: '/labs', label: 'LABS', icon: 'M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile Top Bar */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-dark-950/95 backdrop-blur-md border-b border-neon/5 z-50 flex items-center justify-between px-4">
        <Link href="/courses" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-amber-700 border border-amber-500/30 flex items-center justify-center shadow-lg shadow-amber-500/15">
            <span className="text-[9px] font-black text-dark-950">CO</span>
          </div>
          <div className="leading-tight">
            <span className="font-bold text-xs text-white">CYBERSEC</span>
            <span className="text-[7px] text-dark-400 block font-mono tracking-[0.2em]">by CodeOrigin.ai</span>
          </div>
        </Link>
        <button onClick={() => setOpen(!open)} className="w-8 h-8 flex items-center justify-center rounded border border-dark-600 hover:border-neon/30 transition-colors" aria-label="Menu">
          {open ? (
            <svg className="w-4 h-4 text-neon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          ) : (
            <svg className="w-4 h-4 text-dark-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          )}
        </button>
      </header>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-40 bg-dark-950/98 backdrop-blur-xl pt-14 animate-in">
          <nav className="p-6 space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
              return (
                <Link key={item.href} href={item.href} onClick={() => setOpen(false)}
                  className={`flex items-center gap-4 px-5 py-4 rounded-md text-sm font-mono font-bold tracking-wider transition-all ${isActive ? 'text-neon bg-neon/10 border border-neon/20' : 'text-dark-200 hover:text-neon hover:bg-neon/5 border border-transparent'}`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} /></svg>
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="absolute bottom-6 left-6 right-6 p-4 rounded-md border border-neon/10 bg-neon/5">
            <p className="text-[9px] font-mono text-dark-300 tracking-wider">DEVELOPED BY</p>
            <p className="text-[11px] font-mono text-neon/80 mt-1">RAGHAVENDRA N</p>
            <p className="text-[9px] font-mono text-amber-400/70 mt-0.5">CodeOrigin.ai Pvt Ltd</p>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-full w-64 bg-dark-950 border-r border-neon/5 z-40 flex-col">
        <div className="h-16 flex items-center px-6 border-b border-neon/5">
          <Link href="/courses" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-500 to-amber-700 border border-amber-500/30 flex items-center justify-center shadow-lg shadow-amber-500/15 animate-glow-pulse" style={{ '--tw-shadow-color': 'rgba(245,158,11,0.15)' } as any}>
              <span className="text-[10px] font-black text-dark-950">CO</span>
            </div>
            <div>
              <span className="font-bold text-sm tracking-tight text-white block">CYBERSEC</span>
              <span className="text-[7px] text-dark-400 font-mono tracking-[0.2em]">by CodeOrigin.ai</span>
            </div>
          </Link>
        </div>

        <nav className="flex-1 px-3 pt-8 space-y-1">
          <p className="px-3.5 mb-3 text-[8px] font-mono text-dark-400 tracking-[0.3em]">NAVIGATION</p>
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
            return (
              <Link key={item.href} href={item.href} className={isActive ? 'nav-link-active' : 'nav-link'}>
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                </svg>
                <span className="text-xs font-mono font-bold tracking-wider">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-neon/5">
          <div className="px-3 py-3">
            <p className="text-[8px] font-mono text-dark-400 tracking-[0.2em]">DEVELOPED BY</p>
            <p className="text-[10px] font-mono text-neon/70 mt-1.5">RAGHAVENDRA N</p>
            <p className="text-[8px] font-mono text-amber-400/60 mt-0.5">CodeOrigin.ai Pvt Ltd</p>
          </div>
        </div>
      </aside>
    </>
  );
}
