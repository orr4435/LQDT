// @/components/dashboard/data-ticker.tsx
'use client';

import { TrendingUp } from 'lucide-react';

const tickerData = [
  { label: 'דולר', value: '3.72', change: '+0.25%' },
  { label: 'אירו', value: '4.01', change: '-0.15%' },
  { label: 'מק"מ 3 חודשים', value: '4.21%', change: '+0.02%' },
  { label: 'מק"מ 6 חודשים', value: '4.35%', change: '+0.01%' },
  { label: 'מק"מ 12 חודשים', value: '4.52%', change: '+0.03%' },
  { label: 'פיקדון בנקאי 3 חודשים', value: '3.8%', change: '0.00%' },
  { label: 'פיקדון בנקאי 6 חודשים', value: '4.0%', change: '0.00%' },
  { label: 'ריבית בנק ישראל', value: '4.75%', change: '0.00%' },
];

export function DataTicker() {
  const extendedTickerData = [...tickerData, ...tickerData]; // Duplicate for seamless loop

  return (
    <div className="bg-muted text-muted-foreground w-full overflow-hidden my-4 border-y border-border">
      <div className="flex animate-ticker">
        {extendedTickerData.map((item, index) => (
          <div key={index} className="flex-shrink-0 flex items-center p-2 whitespace-nowrap">
            <span className="font-bold text-foreground me-2">{item.label}:</span>
            <span className="font-mono me-2">{item.value}</span>
            <span
              className={`font-mono text-xs flex items-center ${
                item.change.startsWith('+') ? 'text-green-400' : item.change.startsWith('-') ? 'text-red-400' : 'text-muted-foreground'
              }`}
            >
              {item.change !== '0.00%' && <TrendingUp className={`h-3 w-3 me-1 ${item.change.startsWith('-') ? 'transform rotate-180' : ''}`} />}
              {item.change}
            </span>
            <span className="mx-4 text-border">|</span>
          </div>
        ))}
      </div>
    </div>
  );
}
