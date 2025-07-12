'use client';

import { useState, useMemo, useEffect } from 'react';
import { formatCurrency } from '@/lib/utils';
import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { ChartConfig } from '@/components/ui/chart';
import { TrendingUp } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { historicalSavings as generateHistoricalSavings } from '@/lib/data';
import type { HistoricalDataPoint } from '@/lib/types';
import { format } from 'date-fns';

const chartConfig = {
  total: {
    label: 'חיסכון מצטבר',
    color: 'hsl(var(--primary))',
  },
} satisfies ChartConfig;

export function ProjectionChart() {
  const [historicalData, setHistoricalData] = useState<HistoricalDataPoint[]>([]);

  useEffect(() => {
    // Generate data on the client side to avoid hydration mismatch
    setHistoricalData(generateHistoricalSavings);
  }, []);

  const chartData = useMemo(() => {
    if (historicalData.length === 0) return [];
    let cumulativeSavings = 0;
    return historicalData.map(day => {
      cumulativeSavings += day.savings;
      return {
        date: day.date,
        dateFormatted: format(new Date(day.date), "MMM d"),
        savings: cumulativeSavings,
      };
    });
  }, [historicalData]);

  const totalSavings = chartData.length > 0 ? chartData[chartData.length - 1].savings : 0;

  return (
    <Card className="bg-card border-primary h-full">
      <CardHeader className="flex flex-row justify-between items-center">
        <div>
          <CardTitle className="text-xl font-bold text-primary flex items-center">
            <TrendingUp className="me-2 h-6 w-6" />
            חיסכון שנתי מצטבר מאסטרטגיות
          </CardTitle>
           <p className="text-muted-foreground mt-1 text-sm">סה"כ חיסכון מתחילת השנה: <span className="text-green-400 font-bold">{formatCurrency(totalSavings)}</span></p>
        </div>
      </CardHeader>
      <CardContent className="h-[400px] p-0">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                  <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
              <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" />
              <XAxis 
                dataKey="dateFormatted" 
                tick={{ fill: 'hsl(var(--muted-foreground))' }} 
                tickLine={false} 
                axisLine={false} 
                interval={chartData.length > 0 ? Math.floor(chartData.length / 10) : 0}
              />
              <YAxis 
                tickFormatter={(value) => `${formatCurrency(value as number).replace('₪', '')}K`} 
                tick={{ fill: 'hsl(var(--muted-foreground))' }} 
                tickLine={false} 
                axisLine={false}
                domain={['dataMin', 'dataMax']}
                scale="sqrt"
                />
              <Tooltip
                cursor={{ stroke: 'hsl(var(--primary))' }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="p-2 rounded-lg border bg-card text-sm shadow-lg">
                        <p className="font-bold">{data.dateFormatted}</p>
                        <p className="text-primary">{`חיסכון: ${formatCurrency(data.savings)}`}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area 
                dataKey="savings" 
                type="monotone" 
                stroke="hsl(var(--primary))"
                fill="url(#colorTotal)"
                strokeWidth={2}
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
