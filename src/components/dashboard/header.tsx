'use client';

import { useState, useEffect, type ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { History, Wand2, Banknote } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface HeaderProps {
  onShowHistory: () => void;
  onShowQuotes: () => void;
  clients: string[];
  selectedClient: string;
  onClientChange: (value: string) => void;
}


export function Header({ onShowHistory, onShowQuotes, clients, selectedClient, onClientChange }: HeaderProps) {
  const [currentTime, setCurrentTime] = useState<Date | null>(null);

  useEffect(() => {
    // Set the initial time on the client to avoid hydration mismatch
    setCurrentTime(new Date()); 
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="mb-8 border-b border-primary pb-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4 space-x-reverse">
          <div className="bg-primary px-3 py-1 rounded text-primary-foreground font-bold">LQDT</div>
          <div>
            <h1 className="text-3xl font-bold text-primary">מערכת ניהול נזילות</h1>
            <p className="text-accent mt-1">Terminal v1 anna LQDT</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
           <div className="w-full max-w-[200px]">
             <Select value={selectedClient} onValueChange={onClientChange}>
                <SelectTrigger id="client-select" className="w-full h-9">
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
          <Button variant="outline" onClick={onShowQuotes}>
            <Banknote className="me-2 h-4 w-4" />
            רענון ציטוטים מבנקים
          </Button>
          <Button variant="outline" onClick={() => { /* Placeholder for future functionality */ }}>
            <Wand2 className="me-2 h-4 w-4" />
            בניית אסטרטגיות
          </Button>
          <Button variant="outline" onClick={onShowHistory}>
            <History className="me-2 h-4 w-4" />
            היסטוריית אסטרטגיות
          </Button>
          <div className="text-left font-mono">
            {currentTime ? (
              <>
                <div className="text-2xl text-primary">{currentTime.toLocaleTimeString('he-IL', { hour12: false })}</div>
                <div className="text-sm text-accent">{currentTime.toLocaleDateString('he-IL')}</div>
              </>
            ) : (
              <>
                <div className="text-2xl text-primary">--:--:--</div>
                <div className="text-sm text-accent">--/--/----</div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
