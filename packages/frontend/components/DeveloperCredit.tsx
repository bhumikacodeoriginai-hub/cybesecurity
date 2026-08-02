'use client';

export default function DeveloperCredit() {
  return (
    <div className="relative overflow-hidden rounded-xl border border-neon/10 bg-gradient-to-r from-neon/[0.03] via-dark-900 to-neon/[0.03] p-5 sm:p-6 group hover:border-neon/25 transition-all duration-500">
      {/* Animated scan line */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-neon/40 to-transparent animate-[scan_3s_linear_infinite]" style={{ animation: 'scan 3s linear infinite' }} />
      </div>

      <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Developer info */}
        <div className="text-center sm:text-left">
          <div className="flex items-center gap-2 justify-center sm:justify-start mb-1">
            <div className="w-1.5 h-1.5 rounded-full bg-neon animate-glow-pulse" />
            <span className="text-[9px] font-mono text-dark-400 tracking-[0.3em] uppercase">Developed By</span>
          </div>
          <h3 className="text-base sm:text-lg font-black tracking-tight">
            <span className="glow-text">RAGHAVENDRA N</span>
          </h3>
          <div className="flex items-center gap-2 mt-1.5 justify-center sm:justify-start">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-amber-500 to-amber-700 border border-amber-500/30 flex items-center justify-center shadow-sm shadow-amber-500/20">
              <span className="text-[7px] font-black text-dark-950">CO</span>
            </div>
            <span className="text-xs font-bold text-amber-400 tracking-wide">CodeOrigin.ai</span>
            <span className="text-[9px] text-dark-400 font-mono">Pvt Ltd</span>
          </div>
        </div>

        {/* Decorative badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-neon/15 bg-neon/5">
          <svg className="w-3.5 h-3.5 text-neon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <span className="text-[9px] font-mono font-bold text-neon tracking-wider">PRODUCTION READY</span>
        </div>
      </div>
    </div>
  );
}
