'use client';

import { useState, useEffect, useMemo } from 'react';
import { Header } from '@/components/dashboard/header';
import { StatsCards } from '@/components/dashboard/stats-cards';
import { TransactionFeed } from '@/components/dashboard/transaction-feed';
import { ProjectionChart } from '@/components/dashboard/projection-chart';
import { StrategyModal } from '@/components/dashboard/strategy-modal';
import { dailyTransactions as allTransactions, clients } from '@/lib/data';
import type { Transaction, InvestmentStrategy } from '@/lib/types';
import { CheckCircle } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"


export default function Home() {
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStrategyForChart, setSelectedStrategyForChart] = useState<InvestmentStrategy | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);
  const [selectedClient, setSelectedClient] = useState<string>('all');

  useEffect(() => {
    if (selectedTransaction) {
      setIsModalOpen(true);
    } else {
      setIsModalOpen(false);
    }
  }, [selectedTransaction]);

  const handleSelectTransaction = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
  };

  const handleCloseModal = () => {
    setSelectedTransaction(null);
  };

  const handleExecuteStrategy = (strategy: InvestmentStrategy) => {
    setIsExecuting(true);
    setTimeout(() => {
      setIsExecuting(false);
      setSelectedTransaction(null);
    }, 2500);
  };

  const filteredTransactions = useMemo(() => {
    if (selectedClient === 'all') {
      return allTransactions;
    }
    return allTransactions.filter(t => t.source === selectedClient);
  }, [selectedClient]);
  
  return (
    <div className="min-h-screen bg-background text-foreground p-6 font-body">
      <Header />
      <StatsCards />

      <main className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-8">
        <div className="space-y-6">
            <div className="flex flex-col gap-2">
                 <label htmlFor="client-select" className="text-sm text-muted-foreground">סינון לפי לקוח</label>
                <Select value={selectedClient} onValueChange={setSelectedClient}>
                    <SelectTrigger id="client-select" className="w-full">
                        <SelectValue placeholder="בחר לקוח..." />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">כל הלקוחות</SelectItem>
                        {clients.map(client => (
                            <SelectItem key={client} value={client}>{client}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <TransactionFeed 
              transactions={filteredTransactions}
              onSelectTransaction={handleSelectTransaction}
            />
        </div>
        <div className="xl:col-span-2">
          <ProjectionChart />
        </div>
      </main>

      {selectedTransaction && (
        <StrategyModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          transaction={selectedTransaction}
          onExecute={handleExecuteStrategy}
          onSelectStrategyForChart={setSelectedStrategyForChart}
        />
      )}

      {isExecuting && (
        <div className="fixed top-4 right-4 bg-primary text-primary-foreground px-6 py-4 rounded-lg shadow-lg z-50 animate-pulse">
          <div className="flex items-center">
            <CheckCircle className="h-5 w-5 me-2" />
            <div>
              <div className="font-bold">אסטרטגיה בביצוע</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
