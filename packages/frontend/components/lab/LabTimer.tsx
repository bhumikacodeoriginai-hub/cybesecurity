'use client';

import { useState, useEffect } from 'react';

interface LabTimerProps {
  expiresAt: Date;
  onExpired?: () => void;
}

export default function LabTimer({ expiresAt, onExpired }: LabTimerProps) {
  const [timeRemaining, setTimeRemaining] = useState<number>(0);

  useEffect(() => {
    const calculateTime = () => {
      const remaining = Math.max(0, Math.floor((expiresAt.getTime() - Date.now()) / 1000));
      setTimeRemaining(remaining);

      if (remaining <= 0) {
        onExpired?.();
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);

    return () => clearInterval(interval);
  }, [expiresAt, onExpired]);

  const hours = Math.floor(timeRemaining / 3600);
  const minutes = Math.floor((timeRemaining % 3600) / 60);
  const seconds = timeRemaining % 60;

  const isWarning = timeRemaining < 300; // Less than 5 minutes
  const isCritical = timeRemaining < 60;  // Less than 1 minute

  const formatNum = (n: number) => n.toString().padStart(2, '0');

  return (
    <div className={`flex items-center gap-2 font-mono text-sm ${
      isCritical ? 'text-red-400 animate-pulse' : 
      isWarning ? 'text-yellow-400' : 
      'text-dark-300'
    }`}>
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>
        {hours > 0 ? `${formatNum(hours)}:` : ''}{formatNum(minutes)}:{formatNum(seconds)}
      </span>
      {isWarning && (
        <span className="text-xs">
          {isCritical ? '⚠ Expiring!' : 'Low time'}
        </span>
      )}
    </div>
  );
}
