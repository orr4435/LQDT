// @/components/dashboard/data-ticker.tsx
'use client';

import { TrendingUp } from 'lucide-react';

const tickerData = [
  { label: 'דולר', value: '3.31', change: '-0.05%' },
  { label: 'אירו', value: '3.98', change: '+0.02%' },
  { label: 'מק"מ לשבוע', value: '4.15%', change: '+0.01%' },
  { label: 'מק"מ לחודש', value: '4.20%', change: '+0.01%' },
  { label: 'מק"מ 3 חודשים', value: '4.25%', change: '+0.01%' },
  { label: 'מק"מ 6 חודשים', value: '4.40%', change: '+0.02%' },
  { label: 'מק"מ 12 חודשים', value: '4.60%', change: '-0.01%' },
  { label: 'פיקדון בנקאי (3 חודשים)', value: '3.9%', change: '+0.05%' },
  { label: 'פיקדון בנקאי (6 חודשים)', value: '4.1%', change: '+0.03%' },
  { label: 'ריבית בנק ישראל', value: '4.50%', change: '0.00%' },
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
