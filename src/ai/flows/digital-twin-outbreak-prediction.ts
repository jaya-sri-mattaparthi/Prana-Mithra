'use server';
/**
 * @fileOverview An AI flow to predict disease outbreaks based on community health data.
 *
 * - predictOutbreak - A function that takes anonymized community health data and predicts potential disease outbreaks.
 * - PredictOutbreakInput - The input type for the predictOutbreak function.
 * - PredictOutbreakOutput - The return type for the predictOutbreak function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PredictOutbreakInputSchema = z.object({
  healthData: z.string().describe('Anonymized community health data, including symptoms, recent diagnoses, and environmental factors.'),
});
export type PredictOutbreakInput = z.infer<typeof PredictOutbreakInputSchema>;

const PredictOutbreakOutputSchema = z.object({
  hotspots: z.array(
    z.object({
      location: z.string().describe('The geographical location of the potential outbreak.'),
      disease: z.string().describe('The predicted disease.'),
      riskLevel: z.enum(['low', 'medium', 'high']).describe('The risk level of the outbreak.'),
      factors: z.string().describe('Factors contributing to the potential outbreak.'),
      recommendations: z.string().describe('Recommendations for proactive intervention.'),
    })
  ).describe('A list of potential disease outbreak hotspots and their associated information.'),
});
export type PredictOutbreakOutput = z.infer<typeof PredictOutbreakOutputSchema>;

export async function predictOutbreak(input: PredictOutbreakInput): Promise<PredictOutbreakOutput> {
  return predictOutbreakFlow(input);
}

const prompt = ai.definePrompt({
  name: 'predictOutbreakPrompt',
  input: {schema: PredictOutbreakInputSchema},
  output: {schema: PredictOutbreakOutputSchema},
  prompt: `You are an expert in public health and epidemiology. Analyze the following anonymized community health data to identify potential disease outbreak hotspots. Provide a list of locations with potential outbreaks, the predicted disease, risk level, contributing factors, and recommendations for intervention.

Health Data: {{{healthData}}}

Format your response as a JSON object conforming to the PredictOutbreakOutputSchema schema. Focus on accuracy and actionable insights for healthcare providers and ASHA workers.  The location should be a specific area within the village or community.
`,
});

const predictOutbreakFlow = ai.defineFlow(
  {
    name: 'predictOutbreakFlow',
    inputSchema: PredictOutbreakInputSchema,
    outputSchema: PredictOutbreakOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
