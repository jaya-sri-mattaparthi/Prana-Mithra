// Implemented by Gemini.

'use server';

/**
 * @fileOverview An AI-powered visual symptom scanner for wounds, rashes, and swellings.
 *
 * - visualSymptomScanner - A function that analyzes an image and provides preliminary guidance.
 * - VisualSymptomScannerInput - The input type for the visualSymptomScanner function.
 * - VisualSymptomScannerOutput - The return type for the visualSymptomScanner function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const VisualSymptomScannerInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a wound, rash, or swelling, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  additionalDetails: z
    .string()
    .optional()
    .describe('Any additional details about the symptom.'),
});
export type VisualSymptomScannerInput = z.infer<typeof VisualSymptomScannerInputSchema>;

const VisualSymptomScannerOutputSchema = z.object({
  preliminaryGuidance: z.string().describe('AI-powered preliminary guidance on whether the condition is safe to manage at home or requires urgent referral.'),
  confidenceLevel: z.number().describe('A number between 0 and 1 indicating the confidence level of the guidance.'),
});
export type VisualSymptomScannerOutput = z.infer<typeof VisualSymptomScannerOutputSchema>;

export async function visualSymptomScanner(input: VisualSymptomScannerInput): Promise<VisualSymptomScannerOutput> {
  return visualSymptomScannerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'visualSymptomScannerPrompt',
  input: {schema: VisualSymptomScannerInputSchema},
  output: {schema: VisualSymptomScannerOutputSchema},
  prompt: `You are an AI assistant that analyzes images of wounds, rashes, and swellings and provides preliminary guidance on whether the condition is safe to manage at home or requires urgent referral to a healthcare facility.

  Analyze the following image and provide guidance:

  Image: {{media url=photoDataUri}}

  Additional Details: {{additionalDetails}}

  Respond with a preliminaryGuidance and a confidenceLevel.

  The preliminaryGuidance should include:
    * A brief description of the possible condition.
    * Whether the condition appears safe to manage at home or requires urgent referral.
    * Basic first aid or home care recommendations, if applicable.

  The confidenceLevel should be a number between 0 and 1, representing the confidence level of the AI's assessment.
`,
});

const visualSymptomScannerFlow = ai.defineFlow(
  {
    name: 'visualSymptomScannerFlow',
    inputSchema: VisualSymptomScannerInputSchema,
    outputSchema: VisualSymptomScannerOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
