'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import React from 'react';

interface BankQuotesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const initialBankQuotes = [
  { name: 'בנק מרכנתיל', daily: 1.05, weekly: 1.42, monthly: 1.88 },
  { name: 'בנק דיסקונט', daily: 1.02, weekly: 1.38, monthly: 1.82 },
  { name: 'בנק הפועלים', daily: 1.10, weekly: 1.45, monthly: 1.90 },
  { name: 'בנק לאומי', daily: 1.08, weekly: 1.41, monthly: 1.86 },
  { name: 'בנק מזרחי', daily: 1.06, weekly: 1.40, monthly: 1.84 },
  { name: 'בנק יהב', daily: 1.00, weekly: 1.35, monthly: 1.80 },
  { name: 'בנק ONE ZERO', daily: 1.15, weekly: 1.50, monthly: 1.95 },
];

// Helper to store the last change direction for each quote
const changeDirections = new Map<string, { daily: boolean; weekly: boolean; monthly: boolean }>();

initialBankQuotes.forEach(q => {
    changeDirections.set(q.name, {
        daily: true,
        weekly: true,
        monthly: true,
    });
});


export function BankQuotesModal({ isOpen, onClose }: BankQuotesModalProps) {
    const [bankQuotes, setBankQuotes] = React.useState(initialBankQuotes);
    // Use a state to force re-render and trigger animations
    const [tick, setTick] = React.useState(0);

    React.useEffect(() => {
        if (!isOpen) return;

        const interval = setInterval(() => {
            setBankQuotes(quotes => 
                quotes.map(q => {
                    const directions = changeDirections.get(q.name)!;
                    
                    const dailyChange = (Math.random() - 0.5) * 0.02;
                    const weeklyChange = (Math.random() - 0.5) * 0.02;
                    const monthlyChange = (Math.random() - 0.5) * 0.02;

                    directions.daily = dailyChange >= 0;
                    directions.weekly = weeklyChange >= 0;
                    directions.monthly = monthlyChange >= 0;
                    changeDirections.set(q.name, directions);

                    return {
                        ...q,
                        daily: q.daily + dailyChange,
                        weekly: q.weekly + weeklyChange,
                        monthly: q.monthly + monthlyChange,
                    };
                })
            );
            setTick(prev => prev + 1); // Trigger re-render
        }, 2000); // Update every 2 seconds

        return () => clearInterval(interval);
    }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl w-full bg-card border-primary">
        <DialogHeader className="p-6 pb-4 border-b border-border">
          <DialogTitle className="text-2xl font-bold text-primary flex justify-between items-center">
            ציטוטי ריבית עדכניים מהבנקים
            <DialogClose asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                    <X className="h-5 w-5" />
                </Button>
            </DialogClose>
          </DialogTitle>
        </DialogHeader>
        <div className="p-6">
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead>שם הבנק</TableHead>
                    <TableHead className="text-center">ריבית יומית</TableHead>
                    <TableHead className="text-center">ריבית שבועית</TableHead>
                    <TableHead className="text-center">ריבית חודשית</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {bankQuotes.map((quote) => {
                    const directions = changeDirections.get(quote.name)!;
                    return (
                        <TableRow key={quote.name} className="bg-card">
                            <TableCell className="font-medium">{quote.name}</TableCell>
                            <TableCell className="text-center font-mono">
                                <span key={`${tick}-daily`} className={cn("transition-colors duration-200 animate-quote-flash-text", directions.daily ? 'text-green-400' : 'text-red-400')}>{quote.daily.toFixed(2)}%</span>
                            </TableCell>
                            <TableCell className="text-center font-mono">
                                <span key={`${tick}-weekly`} className={cn("transition-colors duration-200 animate-quote-flash-text", directions.weekly ? 'text-green-400' : 'text-red-400')} style={{animationDelay: '0.1s'}}>{quote.weekly.toFixed(2)}%</span>
                            </TableCell>
                            <TableCell className="text-center font-mono">
                                <span key={`${tick}-monthly`} className={cn("transition-colors duration-200 animate-quote-flash-text", directions.monthly ? 'text-green-400' : 'text-red-400')} style={{animationDelay: '0.2s'}}>{quote.monthly.toFixed(2)}%</span>
                            </TableCell>
                        </TableRow>
                    )
                })}
                </TableBody>
            </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
}
