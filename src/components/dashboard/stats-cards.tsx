import { ArrowUp } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const stats = [
  { title: 'יתרה זמינה', value: '₪190M', change: '+2.3%', positive: true },
  { title: 'תשואה יומית', value: '₪485K', change: '+4.2%', positive: true },
  { title: 'ROI שנתי', value: '4.8%', change: '+0.5%', positive: true },
  { title: 'עסקאות היום', value: '5', subValue: '₪226M' },
  { title: 'סיכון תיק', value: 'נמוך עד חסר סיכון', subValue: '2.1/10' },
  { title: 'Alpha vs BM', value: '+0.8%', subValue: '₪32M' },
];

export function StatsCards() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="bg-card border-primary">
          <CardHeader className="p-4 pb-0">
            <CardTitle className="text-sm font-bold text-primary">{stat.title}</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-2">
            <div className="text-xl text-foreground font-mono">{stat.value}</div>
            {stat.change ? (
              <div className="text-sm flex items-center text-green-400">
                <ArrowUp className="h-3 w-3 ms-1" />
                {stat.change}
              </div>
            ) : (
              <div className="text-sm text-yellow-400">{stat.subValue}</div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
