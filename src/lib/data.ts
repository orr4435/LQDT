import type { Transaction } from './types';

export const dailyTransactions: Transaction[] = [
  { id: 1, date: '2025-07-12', amount: 52000000, source: 'עיריית תל אביב', time: '09:15', status: 'pending', daysToPayment: 28 },
  { id: 2, date: '2025-07-12', amount: 34000000, source: 'משרד החינוך', time: '11:30', status: 'invested', daysToPayment: 25 },
  { id: 3, date: '2025-07-11', amount: 67000000, source: 'רשות מקומית חיפה', time: '08:45', status: 'pending', daysToPayment: 29 },
  { id: 4, date: '2025-07-11', amount: 28000000, source: 'משרד הבריאות', time: '14:20', status: 'invested', daysToPayment: 26 },
  { id: 5, date: '2025-07-10', amount: 45000000, source: 'עיריית ירושלים', time: '10:10', status: 'pending', daysToPayment: 30 },
];
