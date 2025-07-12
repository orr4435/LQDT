// This is an example Genkit flow definition.
'use server';
/**
 * @fileOverview An AI agent that suggests investment strategies based on transaction details.
 *
 * - suggestInvestmentStrategies - A function that suggests investment strategies.
 * - SuggestInvestmentStrategiesInput - The input type for the suggestInvestmentStrategies function.
 * - SuggestInvestmentStrategiesOutput - The return type for the suggestInvestmentStrategies function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestInvestmentStrategiesInputSchema = z.object({
  amount: z.number().describe('The amount of the transaction in ILS.'),
  daysToPayment: z.number().describe('The number of days until the payment is due.'),
});
export type SuggestInvestmentStrategiesInput = z.infer<typeof SuggestInvestmentStrategiesInputSchema>;

const InvestmentStrategySchema = z.object({
  name: z.string().describe('The name of the investment strategy.'),
  description: z.string().describe('A brief description of the strategy.'),
  expectedReturn: z.number().describe('The expected return on investment in ILS for the given number of days.'),
  annualRate: z.number().describe('The annual interest rate of the strategy.'),
  risk: z.string().describe('The risk level associated with the strategy (e.g., low, medium, high).'),
  allocation: z.array(
    z.object({
      instrument: z.string().describe('The name of the investment instrument (e.g., deposit, bond).'),
      percentage: z.number().describe('The percentage of the total amount allocated to this instrument.'),
      rate: z.number().describe('The interest rate for this instrument.'),
    })
  ).describe('The asset allocation breakdown for this strategy.'),
  dailyReturn: z.number().describe('The expected daily return on investment in ILS.'),
  color: z.string().describe('The color associated with the strategy, represented as a hex code.'),
});

const SuggestInvestmentStrategiesOutputSchema = z.array(InvestmentStrategySchema);
export type SuggestInvestmentStrategiesOutput = z.infer<typeof SuggestInvestmentStrategiesOutputSchema>;

export async function suggestInvestmentStrategies(input: SuggestInvestmentStrategiesInput): Promise<SuggestInvestmentStrategiesOutput> {
  return suggestInvestmentStrategiesFlow(input);
}

const suggestInvestmentStrategiesPrompt = ai.definePrompt({
  name: 'suggestInvestmentStrategiesPrompt',
  input: {schema: SuggestInvestmentStrategiesInputSchema},
  output: {schema: SuggestInvestmentStrategiesOutputSchema},
  prompt: `You are an expert financial advisor specializing in liquidity management. Based on the transaction amount and the number of days until payment, suggest five investment strategies: a conservative strategy, a balanced strategy, an aggressive strategy, and two distinct currency hedging strategies (for USD and EUR). For each strategy provide a breakdown of the asset allocation, including the investment instrument, the percentage of the total amount allocated to the instrument, and the interest rate for that instrument.

Transaction Amount: {{amount}}
Days to Payment: {{daysToPayment}}

IMPORTANT: The 'expectedReturn' field must be calculated ONLY for the specified 'daysToPayment', not an annual return. It should be the total profit for the period.
The 'dailyReturn' should be the 'expectedReturn' divided by 'daysToPayment'.

Suggest five distinct investment strategies with varying risk levels.

Here is the format that must be followed, in JSON:
{{$output}}`,
});

const suggestInvestmentStrategiesFlow = ai.defineFlow(
  {
    name: 'suggestInvestmentStrategiesFlow',
    inputSchema: SuggestInvestmentStrategiesInputSchema,
    outputSchema: SuggestInvestmentStrategiesOutputSchema,
  },
  async input => {
    const {output} = await suggestInvestmentStrategiesPrompt(input);
    return output!;
  }
);
