'use server';

import {
  aiSymptomChecker,
  AISymptomCheckerOutput,
} from '@/ai/flows/ai-symptom-checker';
import { z } from 'zod';

const symptomSchema = z.object({
  symptoms: z.string(),
});

export type SymptomState = {
  form: {
    symptoms: string;
  };
  result?: AISymptomCheckerOutput;
  error?: string;
  status: 'idle' | 'loading' | 'success' | 'error';
};

export async function checkSymptoms(
  prevState: SymptomState,
  formData: FormData
): Promise<SymptomState> {
  const symptoms = formData.get('symptoms') as string;

  const validatedFields = symptomSchema.safeParse({ symptoms });

  if (!validatedFields.success || validatedFields.data.symptoms.length < 10) {
    return {
      ...prevState,
      form: { symptoms },
      error: 'Please describe your symptoms in more detail.',
      status: 'error',
    };
  }

  try {
    const result = await aiSymptomChecker({ symptoms: validatedFields.data.symptoms });
    return {
      ...prevState,
      form: { symptoms },
      result,
      error: undefined,
      status: 'success',
    };
  } catch (e) {
    return {
      ...prevState,
      form: { symptoms },
      error: 'An unexpected error occurred. Please try again.',
      status: 'error',
    };
  }
}
