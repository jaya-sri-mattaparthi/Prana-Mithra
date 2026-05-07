'use server';
/**
 * @fileOverview An AI co-pilot that provides traditional remedies alongside modern medical advice.
 *
 * - traditionalKnowledgeAICopilot - A function that retrieves traditional remedies and modern advice for a given health issue.
 * - TraditionalKnowledgeAICopilotInput - The input type for the traditionalKnowledgeAICopilot function.
 * - TraditionalKnowledgeAICopilotOutput - The return type for the traditionalKnowledgeAICopilot function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TraditionalKnowledgeAICopilotInputSchema = z.object({
  healthIssue: z.string().describe('The health issue the user is seeking remedies for.'),
});
export type TraditionalKnowledgeAICopilotInput = z.infer<typeof TraditionalKnowledgeAICopilotInputSchema>;

const TraditionalKnowledgeAICopilotOutputSchema = z.object({
  traditionalRemedies: z.array(z.string()).describe('Traditional remedies for the health issue.'),
  modernAdvice: z.string().describe('Modern medical advice for the health issue.'),
});
export type TraditionalKnowledgeAICopilotOutput = z.infer<typeof TraditionalKnowledgeAICopilotOutputSchema>;

export async function traditionalKnowledgeAICopilot(input: TraditionalKnowledgeAICopilotInput): Promise<TraditionalKnowledgeAICopilotOutput> {
  return traditionalKnowledgeAICopilotFlow(input);
}

const prompt = ai.definePrompt({
  name: 'traditionalKnowledgeAICopilotPrompt',
  input: {schema: TraditionalKnowledgeAICopilotInputSchema},
  output: {schema: TraditionalKnowledgeAICopilotOutputSchema},
  prompt: `You are an AI assistant that provides both traditional remedies and modern medical advice for a given health issue.

  Health Issue: {{{healthIssue}}}

  Provide a list of traditional remedies and modern medical advice for the health issue. Format the output as a JSON object with \"traditionalRemedies\" and \"modernAdvice\" fields.
  The traditional remedies should be an array of strings.
  The modern advice should be a string.
  `,
});

const traditionalKnowledgeAICopilotFlow = ai.defineFlow(
  {
    name: 'traditionalKnowledgeAICopilotFlow',
    inputSchema: TraditionalKnowledgeAICopilotInputSchema,
    outputSchema: TraditionalKnowledgeAICopilotOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
