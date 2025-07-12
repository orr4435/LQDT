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
  { name: 'בנק מרכנתיל', daily: 3.85, weekly: 3.90, monthly: 4.05 },
  { name: 'בנק דיסקונט', daily: 3.82, weekly: 3.88, monthly: 4.02 },
  { name: 'בנק הפועלים', daily: 3.90, weekly: 3.95, monthly: 4.10 },
  { name: 'בנק לאומי', daily: 3.88, weekly: 3.92, monthly: 4.08 },
  { name: 'בנק מזרחי', daily: 3.86, weekly: 3.91, monthly: 4.06 },
  { name: 'בנק יהב', daily: 3.80, weekly: 3.85, monthly: 4.00 },
  { name: 'בנק ONE ZERO', daily: 4.00, weekly: 4.05, monthly: 4.20 },
];

export function BankQuotesModal({ isOpen, onClose }: BankQuotesModalProps) {
    const [bankQuotes, setBankQuotes] = React.useState(initialBankQuotes);

    React.useEffect(() => {
        if (!isOpen) return;

        const interval = setInterval(() => {
            setBankQuotes(quotes => 
                quotes.map(q => ({
                    ...q,
                    daily: q.daily + (Math.random() - 0.5) * 0.02,
                    weekly: q.weekly + (Math.random() - 0.5) * 0.02,
                    monthly: q.monthly + (Math.random() - 0.5) * 0.02,
                }))
            );
        }, 2000); // Update every 2 seconds

        return () => clearInterval(interval);
    }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl w-full">
        <DialogHeader className="p-6 pb-4 border-b">
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
                    const changeDirection = Math.random() > 0.5;
                    return (
                        <TableRow key={quote.name}>
                            <TableCell className="font-medium">{quote.name}</TableCell>
                            <TableCell className={cn("text-center font-mono transition-colors duration-200 animate-quote-flash", changeDirection ? 'text-green-400' : 'text-red-400')}>{quote.daily.toFixed(2)}%</TableCell>
                            <TableCell className={cn("text-center font-mono transition-colors duration-200 animate-quote-flash", !changeDirection ? 'text-green-400' : 'text-red-400')} style={{animationDelay: '0.2s'}}>{quote.weekly.toFixed(2)}%</TableCell>
                            <TableCell className={cn("text-center font-mono transition-colors duration-200 animate-quote-flash", changeDirection ? 'text-green-400' : 'text-red-400')} style={{animationDelay: '0.4s'}}>{quote.monthly.toFixed(2)}%</TableCell>
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
