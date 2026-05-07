'use server';

/**
 * @fileOverview Identifies a plant from an image and provides medicinal uses.
 *
 * - identifyHerbalPlant - A function that identifies a plant and provides its medicinal uses.
 * - IdentifyHerbalPlantInput - The input type for the identifyHerbalPlant function.
 * - IdentifyHerbalPlantOutput - The return type for the identifyHerbalPlant function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const IdentifyHerbalPlantInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a plant, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type IdentifyHerbalPlantInput = z.infer<typeof IdentifyHerbalPlantInputSchema>;

const IdentifyHerbalPlantOutputSchema = z.object({
  plantIdentification: z.object({
    commonName: z.string().describe('The common name of the identified plant.'),
    latinName: z.string().describe('The Latin name of the identified plant.'),
    medicinalUses: z.string().describe('Traditional medicinal uses of the plant.'),
    traditionalKnowledgeLink: z.string().describe('Link to the traditional knowledge module for the plant.'),
  }),
});
export type IdentifyHerbalPlantOutput = z.infer<typeof IdentifyHerbalPlantOutputSchema>;

export async function identifyHerbalPlant(input: IdentifyHerbalPlantInput): Promise<IdentifyHerbalPlantOutput> {
  return identifyHerbalPlantFlow(input);
}

const prompt = ai.definePrompt({
  name: 'identifyHerbalPlantPrompt',
  input: {schema: IdentifyHerbalPlantInputSchema},
  output: {schema: IdentifyHerbalPlantOutputSchema},
  prompt: `You are an expert botanist specializing in identifying plants and their traditional medicinal uses.

You will use this information and the photo to identify the plant, determine its medicinal uses, and provide a link to more information.

Photo: {{media url=photoDataUri}}

Consider the following JSON schema for the output when responding:
\n{{outputSchema}}
`,
});

const identifyHerbalPlantFlow = ai.defineFlow(
  {
    name: 'identifyHerbalPlantFlow',
    inputSchema: IdentifyHerbalPlantInputSchema,
    outputSchema: IdentifyHerbalPlantOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
