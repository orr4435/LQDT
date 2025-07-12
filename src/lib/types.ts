export interface Transaction {
  id: number;
  date: string;
  amount: number;
  source: string;
  time: string;
  status: 'pending' | 'invested' | 'matured';
  daysToPayment: number;
}

export interface InvestmentStrategy {
  name: string;
  description: string;
  expectedReturn: number;
  annualRate: number;
  risk: string;
  allocation: {
    instrument: string;
    percentage: number;
    rate: number;
  }[];
  dailyReturn: number;
  color: string;
}

export interface HistoricalDataPoint {
  date: string;
  savings: number;
}
