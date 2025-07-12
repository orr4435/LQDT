import type { Transaction, HistoricalDataPoint } from './types';
import { format } from 'date-fns';

export const clients: string[] = [
    'אופקים', 'אור יהודה', 'אור עקיבא', 'אילת', 'אלעד', 'אריאל', 'אשדוד', 'אשקלון',
    'באקה אל-גרביה', 'באר יעקב', 'באר שבע', 'בית שאן', 'בית שמש', 'ביתר עילית',
    'בני ברק', 'בת ים', 'גבעת שמואל', 'גבעתיים', 'דימונה', 'הוד השרון', 'הרצלייה',
    'חדרה', 'חולון', 'חיפה', 'חריש', 'טבריה', 'טייבה', 'טירה', 'טירת כרמל', 'טמרה',
    'יבנה', 'יהוד-מונוסון', 'יקנעם עילית', 'ירושלים', 'כפר יונה', 'כפר סבא',
    'כפר קאסם', 'כרמיאל', 'לוד', 'מגאר', 'מגדל העמק', 'מודיעין-מכבים-רעות',
    'מודיעין עילית', 'מעלה אדומים', 'מעלות-תרשיחא', 'נהרייה', 'נוף הגליל', 'נס ציונה',
    'נצרת', 'נשר', 'נתיבות', 'נתניה', 'סח\'נין', 'עכו', 'עיריית תל אביב', 'משרד החינוך',
    'רשות מקומית חיפה', 'משרד הבריאות', 'עיריית ירושלים'
];

const clientPaymentDays: { [key: string]: number } = {
    'עיריית תל אביב': 28, 'משרד החינוך': 25, 'רשות מקומית חיפה': 35, 'משרד הבריאות': 22,
    'עיריית ירושלים': 32, 'חיפה': 40, 'אשדוד': 33, 'נתניה': 29, 'באר שבע': 38, 'חולון': 27,
    'הרצלייה': 26, 'פתח תקווה': 31, 'ראשון לציון': 30
};


export const dailyTransactions: Transaction[] = [
  { id: 1, date: '2025-07-12', amount: 5200000, source: 'עיריית תל אביב', time: '09:15', status: 'pending', daysToPayment: clientPaymentDays['עיריית תל אביב'] || 30 },
  { id: 2, date: '2025-07-12', amount: 3400000, source: 'משרד החינוך', time: '11:30', status: 'invested', daysToPayment: clientPaymentDays['משרד החינוך'] || 30 },
  { id: 3, date: '2025-07-11', amount: 1850000, source: 'רשות מקומית חיפה', time: '08:45', status: 'pending', daysToPayment: clientPaymentDays['רשות מקומית חיפה'] || 30 },
  { id: 4, date: '2025-07-11', amount: 200000, source: 'משרד הבריאות', time: '14:20', status: 'invested', daysToPayment: clientPaymentDays['משרד הבריאות'] || 30 },
  { id: 5, date: '2025-07-10', amount: 750000, source: 'עיריית ירושלים', time: '10:10', status: 'pending', daysToPayment: clientPaymentDays['עיריית ירושלים'] || 30 },
  { id: 6, date: '2025-07-12', amount: 4800000, source: 'חיפה', time: '10:00', status: 'pending', daysToPayment: clientPaymentDays['חיפה'] || 30 },
  { id: 7, date: '2025-07-11', amount: 950000, source: 'אשדוד', time: '13:00', status: 'invested', daysToPayment: clientPaymentDays['אשדוד'] || 30 },
  { id: 8, date: '2025-07-10', amount: 3100000, source: 'נתניה', time: '15:00', status: 'pending', daysToPayment: clientPaymentDays['נתניה'] || 30 },
];

const generateHistoricalData = (): HistoricalDataPoint[] => {
  const data: HistoricalDataPoint[] = [];
  const today = new Date();
  const yearStart = new Date(today.getFullYear(), 0, 1);
  let currentDate = new Date(yearStart.getTime());

  while (currentDate <= today) {
    const dailySavings = Math.random() * 1500 + 200;
    data.push({
      date: format(currentDate, 'yyyy-MM-dd'),
      savings: dailySavings,
    });
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return data;
};

export const historicalSavings: HistoricalDataPoint[] = generateHistoricalData();
