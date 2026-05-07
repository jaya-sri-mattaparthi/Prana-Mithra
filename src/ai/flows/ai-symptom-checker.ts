// This file is machine-generated - edit with care!
'use server';
/**
 * @fileOverview AI Symptom Checker flow for providing preliminary health guidance.
 *
 * - aiSymptomChecker - A function that accepts user-reported symptoms and provides potential conditions,
 *                       home care recommendations, or advice on seeking professional help.
 * - AISymptomCheckerInput - The input type for the aiSymptomChecker function.
 * - AISymptomCheckerOutput - The return type for the aiSymptomChecker function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AISymptomCheckerInputSchema = z.object({
  symptoms: z.string().describe('The symptoms described by the user, either via voice or text.'),
});
export type AISymptomCheckerInput = z.infer<typeof AISymptomCheckerInputSchema>;

const AISymptomCheckerOutputSchema = z.object({
  potentialConditions: z.string().describe('Potential medical conditions based on the symptoms.'),
  homeCareRecommendations: z.string().describe('Recommendations for home care or self-treatment.'),
  referralAdvice: z.string().describe('Advice on when to seek professional medical help.'),
});
export type AISymptomCheckerOutput = z.infer<typeof AISymptomCheckerOutputSchema>;

export async function aiSymptomChecker(input: AISymptomCheckerInput): Promise<AISymptomCheckerOutput> {
  return aiSymptomCheckerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiSymptomCheckerPrompt',
  input: {schema: AISymptomCheckerInputSchema},
  output: {schema: AISymptomCheckerOutputSchema},
  prompt: `You are an AI-powered symptom checker designed to provide preliminary health guidance.
  Based on the user's described symptoms, suggest potential conditions, offer home care recommendations,
  and advise when to seek professional medical help.  Provide clear and concise information.

  Symptoms: {{{symptoms}}}
  `,
});

const aiSymptomCheckerFlow = ai.defineFlow(
  {
    name: 'aiSymptomCheckerFlow',
    inputSchema: AISymptomCheckerInputSchema,
    outputSchema: AISymptomCheckerOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
