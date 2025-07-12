import type { Transaction, HistoricalDataPoint } from './types';
import { subDays, format } from 'date-fns';

export const dailyTransactions: Transaction[] = [
  { id: 1, date: '2025-07-12', amount: 5200000, source: 'עיריית תל אביב', time: '09:15', status: 'pending', daysToPayment: 28 },
  { id: 2, date: '2025-07-12', amount: 3400000, source: 'משרד החינוך', time: '11:30', status: 'invested', daysToPayment: 25 },
  { id: 3, date: '2025-07-11', amount: 1850000, source: 'רשות מקומית חיפה', time: '08:45', status: 'pending', daysToPayment: 29 },
  { id: 4, date: '2025-07-11', amount: 200000, source: 'משרד הבריאות', time: '14:20', status: 'invested', daysToPayment: 26 },
  { id: 5, date: '2025-07-10', amount: 750000, source: 'עיריית ירושלים', time: '10:10', status: 'pending', daysToPayment: 30 },
];

const generateHistoricalData = (): HistoricalDataPoint[] => {
  const data: HistoricalDataPoint[] = [];
  const today = new Date();
  const yearStart = new Date(today.getFullYear(), 0, 1);
  let currentDate = new Date(yearStart.getTime());

  while (currentDate <= today) {
    // Simulate savings for each day. Random value for demonstration.
    const dailySavings = Math.random() * 1500 + 200; // Random savings between 200 and 1700
    data.push({
      date: format(currentDate, 'yyyy-MM-dd'),
      savings: dailySavings,
    });
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return data;
};

export const historicalSavings: HistoricalDataPoint[] = generateHistoricalData();
