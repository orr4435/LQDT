'use client';

import { useState, useEffect } from 'react';

export function Header() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="mb-8 border-b border-primary pb-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4 space-x-reverse">
          <div className="bg-primary px-3 py-1 rounded text-primary-foreground font-bold">LQDT</div>
          <div>
            <h1 className="text-3xl font-bold text-primary">מערכת ניהול נזילות</h1>
            <p className="text-accent mt-1">טרמינל השקעות | חברה 8B ₪</p>
          </div>
        </div>
        <div className="text-left font-mono">
          <div className="text-2xl text-primary">{currentTime.toLocaleTimeString('he-IL', { hour12: false })}</div>
          <div className="text-sm text-accent">{currentTime.toLocaleDateString('he-IL')}</div>
        </div>
      </div>
    </header>
  );
}
