'use client';

import { useState, useMemo } from 'react';
import type { Transaction, InvestmentStrategy } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';
import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltipContent, ChartConfig } from '@/components/ui/chart';
import { Activity } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ProjectionChartProps {
  transaction: Transaction | null;
  strategy: InvestmentStrategy | null;
}

const chartConfig = {
  total: {
    label: 'Total',
    color: 'hsl(var(--primary))',
  },
} satisfies ChartConfig;

export function ProjectionChart({ transaction, strategy }: ProjectionChartProps) {
  const [timeframe, setTimeframe] = useState('30');

  const timelineData = useMemo(() => {
    if (!transaction || !strategy) return [];
    
    const data = [];
    const amount = transaction.amount;
    const dailyReturn = strategy.dailyReturn;
    const days = parseInt(timeframe, 10);

    for (let i = 0; i <= days; i++) {
      data.push({
        day: i,
        total: amount + (dailyReturn * i)
      });
    }
    return data;
  }, [transaction, strategy, timeframe]);

  return (
    <Card className="bg-card border border-primary h-full">
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle className="text-xl font-bold text-primary">זרימת תשואות חזויה</CardTitle>
        <div className="flex space-x-2 space-x-reverse">
          {['7', '14', '30', '60', '90'].map((days) => (
            <Button
              key={days}
              size="sm"
              variant={timeframe === days ? 'default' : 'secondary'}
              onClick={() => setTimeframe(days)}
              className={`px-3 py-1 rounded text-sm ${
                timeframe === days ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground hover:bg-muted/80'
              }`}
            >
              {days}D
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent className="h-[400px] p-0">
        {transaction && strategy ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={timelineData}>
              <defs>
                  <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-total)" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="var(--color-total)" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
              <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" />
              <XAxis dataKey="day" tick={{ fill: 'hsl(var(--muted-foreground))' }} tickLine={false} axisLine={false} />
              <YAxis tickFormatter={(value) => formatCurrency(value as number).replace('₪', '')} tick={{ fill: 'hsl(var(--muted-foreground))' }} tickLine={false} axisLine={false} />
              <Tooltip
                cursor={{ stroke: 'hsl(var(--primary))' }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="p-2 rounded-lg border bg-card text-sm shadow-lg">
                        <p className="font-bold">{`Day ${payload[0].payload.day}`}</p>
                        <p>{`Total: ${formatCurrency(payload[0].value as number)}`}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area 
                dataKey="total" 
                type="monotone" 
                stroke="hsl(var(--primary))"
                fill="url(#colorTotal)"
                strokeWidth={2}
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <Activity className="h-16 w-16 mx-auto mb-4 text-primary" />
              <p className="text-lg">בחר עסקה ואסטרטגיה לצפייה בתחזית</p>
              <p className="text-sm mt-2">לחץ על כרטיסייה בצד ימין ובחר אסטרטגיה בחלון שיופיע</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
