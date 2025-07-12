'use client';

import { useState, useMemo, useEffect } from 'react';
import { formatCurrency } from '@/lib/utils';
import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis, ResponsiveContainer, Legend } from 'recharts';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from '@/components/ui/chart';
import { TrendingUp } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { historicalSavings as generateHistoricalSavings } from '@/lib/data';
import type { HistoricalDataPoint } from '@/lib/types';
import { format } from 'date-fns';

const chartConfig = {
  savings: {
    label: 'חיסכון המערכת',
    color: 'hsl(var(--primary))',
  },
  traditional: {
    label: 'ניהול מסורתי',
    color: 'hsl(var(--chart-2))',
  },
  checking: {
    label: 'ריבית על עו"ש',
    color: 'hsl(var(--muted-foreground))',
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
        traditional: cumulativeSavings * 0.45, // 55% lower
        checking: cumulativeSavings * 0.10, // 90% lower
      };
    });
  }, [historicalData]);

  const totalSavings = chartData.length > 0 ? chartData[chartData.length - 1].savings : 0;
  
  if (historicalData.length === 0) {
    return (
      <Card className="bg-card border-primary h-full flex items-center justify-center">
        <p className="text-muted-foreground">טוען נתוני גרף...</p>
      </Card>
    );
  }

  return (
    <Card className="bg-card border-primary h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-primary flex items-center">
          <TrendingUp className="me-2 h-6 w-6" />
          חיסכון שנתי מצטבר מאסטרטגיות
        </CardTitle>
         <CardDescription>סה"כ חיסכון מתחילת השנה: <span className="text-green-400 font-bold">{formatCurrency(totalSavings)}</span></CardDescription>
      </CardHeader>
      <CardContent className="flex-1 -mt-4">
          <ChartContainer config={chartConfig} className="h-full w-full">
            <AreaChart accessibilityLayer data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 40 }}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" />
              <XAxis 
                dataKey="dateFormatted" 
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} 
                tickLine={false} 
                axisLine={false} 
                interval={chartData.length > 0 ? Math.floor(chartData.length / 10) : 0}
              />
              <YAxis 
                tickFormatter={(value) => `${formatCurrency(value as number).replace('₪', '')}`}
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                tickLine={false} 
                axisLine={false}
                domain={['dataMin', 'dataMax']}
                />
              <ChartTooltip
                cursor={{ stroke: 'hsl(var(--primary))' }}
                content={<ChartTooltipContent indicator="dot" />}
              />
               <defs>
                  <linearGradient id="fillSavings" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-savings)" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="var(--color-savings)" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="fillTraditional" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-traditional)" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="var(--color-traditional)" stopOpacity={0.1}/>
                  </linearGradient>
                   <linearGradient id="fillChecking" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-checking)" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="var(--color-checking)" stopOpacity={0.05}/>
                  </linearGradient>
                </defs>
              <Legend content={<ChartLegendContent />} />
              <Area 
                dataKey="savings"
                type="natural"
                fill="url(#fillSavings)"
                stroke="var(--color-savings)"
                strokeWidth={2}
                dot={false}
                name="חיסכון המערכת"
              />
              <Area 
                dataKey="traditional"
                type="natural"
                fill="url(#fillTraditional)"
                stroke="var(--color-traditional)"
                strokeWidth={2}
                dot={false}
                name="ניהול מסורתי"
              />
               <Area 
                dataKey="checking"
                type="natural"
                fill="url(#fillChecking)"
                stroke="var(--color-checking)"
                strokeWidth={2}
                strokeDasharray="3 4"
                dot={false}
                name='ריבית על עו"ש'
              />
            </AreaChart>
          </ChartContainer>
      </CardContent>
    </Card>
  );
}
