'use client';

import { useState, useEffect } from 'react';
import type { Transaction, InvestmentStrategy } from '@/lib/types';
import { getInvestmentStrategies } from '@/app/actions';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { formatCurrency, cn } from '@/lib/utils';
import { Zap, X, Loader2 } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface StrategyModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: Transaction;
  onExecute: (strategy: InvestmentStrategy) => void;
  onSelectStrategyForChart: (strategy: InvestmentStrategy | null) => void;
}

export function StrategyModal({ isOpen, onClose, transaction, onExecute, onSelectStrategyForChart }: StrategyModalProps) {
  const [strategies, setStrategies] = useState<InvestmentStrategy[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedStrategy, setSelectedStrategy] = useState<InvestmentStrategy | null>(null);
  
  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      setError(null);
      setStrategies([]);
      setSelectedStrategy(null);
      onSelectStrategyForChart(null);
      
      getInvestmentStrategies({ amount: transaction.amount, daysToPayment: transaction.daysToPayment })
        .then(result => {
          if (result.error) {
            setError(result.error);
          } else if (result.strategies) {
            setStrategies(result.strategies);
            // Select balanced strategy by default for chart
             const balanced = result.strategies.find(s => s.risk.toLowerCase().includes('medium') || s.risk.toLowerCase().includes('מאוזנת'));
            if (balanced) {
                setSelectedStrategy(balanced);
                onSelectStrategyForChart(balanced);
            }
          }
        })
        .finally(() => setIsLoading(false));
    }
  }, [isOpen, transaction, onSelectStrategyForChart]);
  
  const handleStrategyClick = (strategy: InvestmentStrategy) => {
    setSelectedStrategy(strategy);
    onSelectStrategyForChart(strategy);
  }

  const handleClose = () => {
    onSelectStrategyForChart(null);
    onClose();
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-card border-primary max-w-4xl w-full max-h-[90vh] p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-2xl font-bold text-primary flex justify-between items-center">
            אסטרטגיות השקעה
            <Button variant="ghost" size="icon" onClick={handleClose} className="h-8 w-8">
              <X className="h-5 w-5" />
            </Button>
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[calc(90vh-160px)]">
          <div className="p-6">
            <div className="mb-6 p-4 bg-background border border-muted rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <div className="text-muted-foreground text-sm">סכום</div>
                  <div className="text-primary text-xl font-mono">{formatCurrency(transaction.amount)}</div>
                </div>
                <div>
                  <div className="text-muted-foreground text-sm">ימים להשקעה</div>
                  <div className="text-foreground text-xl">{transaction.daysToPayment}</div>
                </div>
                <div>
                  <div className="text-muted-foreground text-sm">מקור</div>
                  <div className="text-foreground text-xl">{transaction.source}</div>
                </div>
              </div>
            </div>

            {isLoading && (
              <div className="flex justify-center items-center h-64">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
              </div>
            )}
            {error && <div className="text-destructive text-center">{error}</div>}

            {!isLoading && !error && (
              <div className="space-y-4">
                {strategies.map((strategy) => (
                  <div
                    key={strategy.name}
                    className={cn(
                      'p-4 bg-background border rounded-lg cursor-pointer transition-all',
                      selectedStrategy?.name === strategy.name
                        ? 'border-primary ring-2 ring-primary bg-primary/10'
                        : 'border-muted hover:border-primary/50'
                    )}
                    onClick={() => handleStrategyClick(strategy)}
                  >
                    <div className="flex flex-col md:flex-row justify-between items-start mb-3">
                      <div>
                        <h4 className="font-bold text-foreground text-lg">{strategy.name}</h4>
                        <p className="text-muted-foreground text-sm">{strategy.description}</p>
                      </div>
                      <div className="text-right mt-2 md:mt-0">
                        <div className="text-2xl font-bold" style={{ color: strategy.color }}>
                          {formatCurrency(strategy.expectedReturn)}
                        </div>
                        <div className="text-sm text-muted-foreground">תשואה צפויה</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4 text-sm">
                      <div>
                        <div className="text-muted-foreground">תשואה שנתית</div>
                        <div className="text-foreground font-mono">{strategy.annualRate.toFixed(2)}%</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">רמת סיכון</div>
                        <div className="text-foreground">{strategy.risk}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">תשואה יומית</div>
                        <div className="text-foreground font-mono">{formatCurrency(strategy.dailyReturn)}</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="text-muted-foreground text-sm font-bold">פיזור השקעה:</div>
                      {strategy.allocation.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center text-sm">
                          <span className="text-foreground">{item.instrument}</span>
                          <div className="flex items-center">
                            <span className="text-muted-foreground me-2">{item.percentage}%</span>
                            <span className="text-green-400 font-mono">{item.rate.toFixed(2)}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </ScrollArea>
        <div className="flex gap-4 p-6 pt-0 mt-2">
            <Button
              onClick={() => selectedStrategy && onExecute(selectedStrategy)}
              disabled={!selectedStrategy || isLoading}
              className="flex-1 py-3 h-auto text-base"
            >
              <Zap className="h-5 w-5 me-2" />
              שדר אסטרטגיה
            </Button>
            <Button
              variant="outline"
              onClick={handleClose}
              className="px-6 py-3 h-auto text-base"
            >
              ביטול
            </Button>
          </div>
      </DialogContent>
    </Dialog>
  );
}
