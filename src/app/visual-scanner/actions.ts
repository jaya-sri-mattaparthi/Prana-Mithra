'use server';

import {
  visualSymptomScanner,
  VisualSymptomScannerOutput,
} from '@/ai/flows/ai-powered-visual-symptom-scanner';
import { z } from 'zod';

const schema = z.object({
  photoDataUri: z.string(),
  additionalDetails: z.string().optional(),
});

export type VisualSymptomState = {
  form: {
    additionalDetails: string;
  };
  result?: VisualSymptomScannerOutput;
  error?: string;
  status: 'idle' | 'loading' | 'success' | 'error';
};

export async function scanVisualSymptom(
  prevState: VisualSymptomState,
  formData: FormData
): Promise<VisualSymptomState> {
  const photoDataUri = formData.get('photoDataUri') as string;
  const additionalDetails = formData.get('additionalDetails') as string;

  const validatedFields = schema.safeParse({ photoDataUri, additionalDetails });

  if (!validatedFields.success || !validatedFields.data.photoDataUri) {
    return {
      ...prevState,
      form: { additionalDetails },
      error: 'Please upload an image.',
      status: 'error',
    };
  }

  try {
    const result = await visualSymptomScanner(validatedFields.data);
    return {
      ...prevState,
      form: { additionalDetails },
      result,
      error: undefined,
      status: 'success',
    };
  } catch (e) {
    return {
      ...prevState,
      form: { additionalDetails },
      error: 'An unexpected error occurred during analysis. Please try again.',
      status: 'error',
    };
  }
}
