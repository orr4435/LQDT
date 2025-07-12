'use server';

import { suggestInvestmentStrategies } from '@/ai/flows/suggest-investment-strategy';
import type { SuggestInvestmentStrategiesInput } from '@/ai/flows/suggest-investment-strategy';

export async function getInvestmentStrategies(input: SuggestInvestmentStrategiesInput) {
  try {
    const strategies = await suggestInvestmentStrategies(input);
    return { strategies };
  } catch (error) {
    console.error('Error fetching investment strategies:', error);
    return { error: 'Failed to fetch strategies.' };
  }
}
