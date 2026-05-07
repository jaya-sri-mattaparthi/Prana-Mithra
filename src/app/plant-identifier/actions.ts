'use server';

import {
  identifyHerbalPlant,
  IdentifyHerbalPlantOutput,
} from '@/ai/flows/herbal-plant-identifier';
import { z } from 'zod';

const schema = z.object({
  photoDataUri: z.string(),
});

export type PlantIdentifierState = {
  result?: IdentifyHerbalPlantOutput;
  error?: string;
  status: 'idle' | 'loading' | 'success' | 'error';
};

export async function identifyPlant(
  prevState: PlantIdentifierState,
  formData: FormData
): Promise<PlantIdentifierState> {
  const photoDataUri = formData.get('photoDataUri') as string;

  const validatedFields = schema.safeParse({ photoDataUri });

  if (!validatedFields.success || !validatedFields.data.photoDataUri) {
    return {
      ...prevState,
      error: 'Please upload an image of the plant.',
      status: 'error',
    };
  }

  try {
    const result = await identifyHerbalPlant(validatedFields.data);
    return {
      ...prevState,
      result,
      error: undefined,
      status: 'success',
    };
  } catch (e) {
    return {
      ...prevState,
      error: 'An unexpected error occurred during identification. Please try again.',
      status: 'error',
    };
  }
}
