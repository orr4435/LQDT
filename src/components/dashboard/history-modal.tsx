'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { executedStrategiesHistory } from '@/lib/data';
import type { ExecutedStrategy } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';
import { format } from 'date-fns';

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HistoryModal({ isOpen, onClose }: HistoryModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full h-[80vh] flex flex-col p-0">
        <DialogHeader className="p-6 pb-4 border-b">
          <DialogTitle className="text-2xl font-bold text-primary flex justify-between items-center">
            היסטוריית אסטרטגיות
            <DialogClose asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                    <X className="h-5 w-5" />
                </Button>
            </DialogClose>
          </DialogTitle>
        </DialogHeader>
        <div className="flex-1 min-h-0">
            <ScrollArea className="h-full">
            <div className="p-6">
            <Table>
                <TableHeader className="sticky top-0 bg-card z-10">
                <TableRow>
                    <TableHead>תאריך קנייה</TableHead>
                    <TableHead>תאריך מכירה</TableHead>
                    <TableHead>שם אסטרטגיה</TableHead>
                    <TableHead className="text-right">סכום</TableHead>
                    <TableHead className="text-right">רווח מהאסטרטגיה</TableHead>
                    <TableHead className="text-right">בנצ'מרק (עו"ש)</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {executedStrategiesHistory.map((strategy) => (
                    <TableRow key={strategy.id}>
                    <TableCell>{format(new Date(strategy.purchaseDate), 'dd/MM/yyyy')}</TableCell>
                    <TableCell>{format(new Date(strategy.sellDate), 'dd/MM/yyyy')}</TableCell>
                    <TableCell>{strategy.strategyName}</TableCell>
                    <TableCell className="text-right font-mono">{formatCurrency(strategy.amount)}</TableCell>
                    <TableCell className="text-right font-mono text-green-400">{formatCurrency(strategy.profit)}</TableCell>
                    <TableCell className="text-right font-mono text-red-400">{formatCurrency(strategy.benchmarkProfit)}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </div>
            </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}
