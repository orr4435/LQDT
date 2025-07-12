'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/dashboard/header';
import { StatsCards } from '@/components/dashboard/stats-cards';
import { TransactionFeed } from '@/components/dashboard/transaction-feed';
import { ProjectionChart } from '@/components/dashboard/projection-chart';
import { StrategyModal } from '@/components/dashboard/strategy-modal';
import { dailyTransactions } from '@/lib/data';
import type { Transaction, InvestmentStrategy } from '@/lib/types';
import { CheckCircle } from 'lucide-react';

export default function Home() {
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStrategyForChart, setSelectedStrategyForChart] = useState<InvestmentStrategy | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);

  useEffect(() => {
    if (selectedTransaction) {
      setIsModalOpen(true);
    } else {
      setIsModalOpen(false);
      setSelectedStrategyForChart(null);
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
    // Simulate strategy execution
    setTimeout(() => {
      setIsExecuting(false);
      setSelectedTransaction(null);
    }, 2500);
  };
  
  return (
    <div className="min-h-screen bg-background text-foreground p-6 font-body">
      <Header />
      <StatsCards />

      <main className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-8">
        <TransactionFeed 
          transactions={dailyTransactions}
          onSelectTransaction={handleSelectTransaction}
        />
        <div className="xl:col-span-2">
          <ProjectionChart 
            transaction={selectedTransaction} 
            strategy={selectedStrategyForChart}
          />
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
