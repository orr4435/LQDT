'use client';

import { useState, useEffect } from 'react';
import type { InvestmentStrategy } from '@/lib/types';
import { CheckCircle, Loader2, Zap, FileText, Send, BellRing } from 'lucide-react';

interface ExecutionFlowProps {
  isOpen: boolean;
  strategy: InvestmentStrategy;
  onClose: () => void;
}

const steps = [
  { text: 'יצירת פקודת קנייה בבורסה', icon: FileText },
  { text: 'העברת כסף לפיקדון קצוב', icon: Send },
  { text: 'הכנת התראה מתוזמנת', icon: BellRing },
];

export function ExecutionFlow({ isOpen, strategy, onClose }: ExecutionFlowProps) {
  const [currentStep, setCurrentStep] = useState(-1);

  useEffect(() => {
    if (!isOpen) {
        setCurrentStep(-1);
        return;
    };

    const timeouts: NodeJS.Timeout[] = [];

    // Start animation
    timeouts.push(setTimeout(() => setCurrentStep(0), 100));

    // Animate through steps
    steps.forEach((_, index) => {
      timeouts.push(setTimeout(() => {
        setCurrentStep(index + 1);
      }, (index + 1) * 1200));
    });

    // Close after animation
    timeouts.push(setTimeout(() => {
        onClose();
    }, (steps.length + 1) * 1200));

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-card border border-primary p-8 rounded-lg shadow-2xl w-full max-w-md">
        <div className="flex items-center justify-center mb-4">
          <Zap className="h-8 w-8 text-primary me-3 animate-pulse" />
          <h2 className="text-2xl font-bold text-primary">שידור אסטרטגיה...</h2>
        </div>
        <p className="text-center text-muted-foreground mb-8">
            משדר את אסטרטגיית "{strategy.name}"
        </p>
        <div className="space-y-4">
          {steps.map((step, index) => {
            const isActive = index < currentStep;
            const isCurrent = index === currentStep;
            const Icon = step.icon;
            
            return (
              <div key={index} className="flex items-center p-3 bg-background rounded-md transition-all duration-500 animate-slide-in" style={{ animationDelay: `${index * 200}ms`}}>
                <div className="flex-shrink-0 w-8 h-8 me-4">
                    {isActive ? (
                        <CheckCircle className="w-8 h-8 text-green-500 animate-zoom-in" />
                    ) : isCurrent ? (
                        <Loader2 className="w-8 h-8 text-primary animate-spin" />
                    ) : (
                        <Icon className="w-8 h-8 text-muted-foreground" />
                    )}
                </div>
                <div className={`text-lg font-medium transition-colors duration-300 ${isActive ? 'text-green-400' : 'text-foreground'}`}>
                    {step.text}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
