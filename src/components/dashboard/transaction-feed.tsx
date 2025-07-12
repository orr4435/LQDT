'use client';

import type { Transaction } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';
import { Clock, Activity } from 'lucide-react';

interface TransactionFeedProps {
  transactions: Transaction[];
  onSelectTransaction: (transaction: Transaction) => void;
}

const getStatusClasses = (status: Transaction['status']) => {
  switch (status) {
    case 'pending': return 'bg-orange-500 text-black';
    case 'invested': return 'bg-green-500 text-black';
    case 'matured': return 'bg-blue-500 text-white';
    default: return 'bg-gray-500 text-white';
  }
};

const getStatusText = (status: Transaction['status']) => {
  switch (status) {
    case 'pending': return 'ממתין להשקעה';
    case 'invested': return 'מושקע';
    case 'matured': return 'מומש';
    default: return 'לא ידוע';
  }
};

export function TransactionFeed({ transactions, onSelectTransaction }: TransactionFeedProps) {
  return (
    <div className="bg-card border border-primary rounded-lg p-6">
      <h2 className="text-xl font-bold text-primary mb-4 flex items-center">
        <Activity className="h-5 w-5 me-2" />
        זרימת עסקאות יומית
      </h2>
      <div className="space-y-3 max-h-[450px] overflow-y-auto">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="p-4 bg-background border border-muted rounded-lg cursor-pointer hover:border-primary transition-colors duration-300"
            onClick={() => onSelectTransaction(transaction)}
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <div className="font-mono text-primary text-lg">
                  {formatCurrency(transaction.amount)}
                </div>
                <div className="text-sm text-muted-foreground">{transaction.source}</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-muted-foreground">{transaction.time}</div>
                <div className={`mt-1 px-2 py-1 rounded text-xs font-bold ${getStatusClasses(transaction.status)}`}>
                  {getStatusText(transaction.status)}
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center text-muted-foreground">
                <Clock className="h-4 w-4 me-1" />
                {transaction.daysToPayment} ימים לתשלום
              </div>
              <div className="text-primary font-semibold">
                לחץ לאסטרטגיות ←
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
