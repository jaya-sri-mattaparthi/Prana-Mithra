'use server';

/**
 * @fileOverview An AI-powered early warning system for high-risk pregnancies.
 *
 * - aiPoweredEarlyWarningPregnancies - A function that predicts high-risk pregnancies and sends alerts.
 * - AIPoweredEarlyWarningPregnanciesInput - The input type for the aiPoweredEarlyWarningPregnancies function.
 * - AIPoweredEarlyWarningPregnancyOutput - The return type for the aiPoweredEarlyWarningPregnancies function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIPoweredEarlyWarningPregnanciesInputSchema = z.object({
  symptoms: z.string().describe('The symptoms experienced by the pregnant patient.'),
  journalEntries: z.string().describe('The journal entries of the pregnant patient.'),
  historicalData: z.string().describe('The historical medical data of the pregnant patient.'),
});
export type AIPoweredEarlyWarningPregnanciesInput = z.infer<
  typeof AIPoweredEarlyWarningPregnanciesInputSchema
>;

const AIPoweredEarlyWarningPregnancyOutputSchema = z.object({
  isHighRisk: z.boolean().describe('Whether the pregnancy is predicted to be high risk.'),
  riskFactors: z
    .string()
    .describe('The risk factors contributing to the high-risk prediction.'),
  recommendations: z
    .string()
    .describe('The recommendations for the ASHA worker and doctors.'),
});
export type AIPoweredEarlyWarningPregnancyOutput = z.infer<
  typeof AIPoweredEarlyWarningPregnancyOutputSchema
>;

export async function aiPoweredEarlyWarningPregnancies(
  input: AIPoweredEarlyWarningPregnanciesInput
): Promise<AIPoweredEarlyWarningPregnancyOutput> {
  return aiPoweredEarlyWarningPregnanciesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiPoweredEarlyWarningPregnanciesPrompt',
  input: {schema: AIPoweredEarlyWarningPregnanciesInputSchema},
  output: {schema: AIPoweredEarlyWarningPregnancyOutputSchema},
  prompt: `You are an expert healthcare provider specializing in identifying high-risk pregnancies.

You will analyze the patient's symptoms, journal entries, and historical data to predict if the pregnancy is high risk. If it is, you will identify the risk factors and provide recommendations for the ASHA worker and doctors.

Symptoms: {{{symptoms}}}
Journal Entries: {{{journalEntries}}}
Historical Data: {{{historicalData}}}`,
});

const aiPoweredEarlyWarningPregnanciesFlow = ai.defineFlow(
  {
    name: 'aiPoweredEarlyWarningPregnanciesFlow',
    inputSchema: AIPoweredEarlyWarningPregnanciesInputSchema,
    outputSchema: AIPoweredEarlyWarningPregnancyOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
