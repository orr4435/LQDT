// This is an example Genkit flow definition.
'use server';
/**
 * @fileOverview An AI agent that suggests investment strategies based on transaction details.
 *
 * - suggestInvestmentStrategies - A function that suggests investment strategies.
 * - SuggestInvestmentStrategiesInput - The input type for the suggestInvestmentStrategies function.
 * - SuggestInvestmentStrategiesOutput - The return type for the suggestInvestmentStrategiesOutput function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestInvestmentStrategiesInputSchema = z.object({
  amount: z.number().describe('The amount of the transaction in ILS.'),
  daysToPayment: z.number().describe('The number of days until the payment is due.'),
});
export type SuggestInvestmentStrategiesInput = z.infer<typeof SuggestInvestmentStrategiesInputSchema>;

const InvestmentStrategySchema = z.object({
  name: z.string().describe('שם אסטרטגיית ההשקעה בעברית.'),
  description: z.string().describe('תיאור קצר של האסטרטגיה בעברית.'),
  expectedReturn: z.number().describe('התשואה הצפויה בש"ח עבור מספר הימים שצוין.'),
  annualRate: z.number().describe('שיעור הריבית השנתי של האסטרטגיה.'),
  risk: z.string().describe('רמת הסיכון של האסטרטגיה (למשל, נמוכה, בינונית, גבוהה).'),
  allocation: z
    .array(
      z.object({
        instrument: z.string().describe('שם מכשיר ההשקעה בעברית (למשל, פיקדון, אג"ח).'),
        percentage: z.number().describe('האחוז מסך הסכום המוקצה למכשיר זה.'),
        rate: z.number().describe('שיעור הריבית עבור מכשיר זה.'),
      })
    )
    .describe('פירוט הקצאת הנכסים לאסטרטגיה זו.'),
  dailyReturn: z.number().describe('התשואה היומית הצפויה בש"ח.'),
  color: z.string().describe('הצבע המשויך לאסטרטגיה, בפורמט hex code.'),
});

const SuggestInvestmentStrategiesOutputSchema = z.array(InvestmentStrategySchema);
export type SuggestInvestmentStrategiesOutput = z.infer<typeof SuggestInvestmentStrategiesOutputSchema>;

export async function suggestInvestmentStrategies(
  input: SuggestInvestmentStrategiesInput
): Promise<SuggestInvestmentStrategiesOutput> {
  return suggestInvestmentStrategiesFlow(input);
}

const suggestInvestmentStrategiesPrompt = ai.definePrompt({
  name: 'suggestInvestmentStrategiesPrompt',
  input: {schema: SuggestInvestmentStrategiesInputSchema},
  output: {schema: SuggestInvestmentStrategiesOutputSchema},
  prompt: `אתה יועץ פיננסי מומחה המתמחה בניהול נזילות. בהתבסס על סכום העסקה ומספר הימים עד לתשלום, הצע שש אסטרטגיות השקעה. כל הפלט חייב להיות בעברית בכיווניות מימין לשמאל (RTL).

סכום העסקה: {{amount}}
ימים לתשלום: {{daysToPayment}}

חשוב: יש לחשב את השדה 'expectedReturn' אך ורק עבור מספר הימים שצוין ב-'daysToPayment', ולא כתשואה שנתית. זה צריך להיות הרווח הכולל לתקופה.
השדה 'dailyReturn' צריך להיות 'expectedReturn' חלקי 'daysToPayment'.

הצע שש אסטרטגיות השקעה שונות עם רמות סיכון משתנות, עם תיאורים בעברית:
1.  **אסטרטגיית המערכת (חובה)**: זו חייבת להיות האסטרטגיה הראשונה ברשימה. היא תמהיל של מק"מ, פיקדון קצר מועד, וניתן להוסיף אג"ח כאופציה. על האסטרטגיה להיות מותאמת לשימור הון עם תשואה יציבה. קבע לה צבע אפור כהה (#5A5A5A).
2.  **אסטרטגיה שמרנית**: התמקדות בהשקעות נזילות ובטוחות מאוד כדי לשמר את ההון תוך יצירת תשואה קטנה.
3.  **אסטרטגיה מאוזנת**: שילוב של שימור הון וצמיחה מתונה, תוך איזון בין מכשירים בסיכון נמוך לכאלה עם פוטנציאל תשואה גבוה יותר.
4.  **אסטרטגיה אגרסיבית**: מקסום התשואה על ידי נטילת סיכון גבוה יותר, תוך התמקדות במכשירים בעלי פוטנציאל צמיחה גבוה.
5.  **גידור מט"ח (דולר אמריקאי)**: הגנה על ערך הסכום מפני תנודות בשער החליפין של הדולר.
6.  **גידור מט"ח (אירו)**: הגנה על ערך הסכום מפני תנודות בשער החליפין של האירו.

הפורמט חייב להיות JSON, כפי שמצוין כאן:
{{$output}}`,
});

const suggestInvestmentStrategiesFlow = ai.defineFlow(
  {
    name: 'suggestInvestmentStrategiesFlow',
    inputSchema: SuggestInvestmentStrategiesInputSchema,
    outputSchema: SuggestInvestmentStrategiesOutputSchema,
  },
  async (input) => {
    const {output} = await suggestInvestmentStrategiesPrompt(input);
    return output!;
  }
);
