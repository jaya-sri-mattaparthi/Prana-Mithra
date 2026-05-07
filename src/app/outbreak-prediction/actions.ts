'use server';

import {
  predictOutbreak,
  PredictOutbreakOutput,
} from '@/ai/flows/digital-twin-outbreak-prediction';
import { z } from 'zod';

const schema = z.object({
  healthData: z.string(),
});

export type OutbreakState = {
  form: {
    healthData: string;
  };
  result?: PredictOutbreakOutput;
  error?: string;
  status: 'idle' | 'loading' | 'success' | 'error';
};

export async function predictCommunityOutbreak(
  prevState: OutbreakState,
  formData: FormData
): Promise<OutbreakState> {
  const healthData = formData.get('healthData') as string;

  const validatedFields = schema.safeParse({ healthData });

  if (!validatedFields.success || validatedFields.data.healthData.length < 20) {
    return {
      ...prevState,
      form: { healthData },
      error: 'Please provide more detailed community health data.',
      status: 'error',
    };
  }

  try {
    const result = await predictOutbreak(validatedFields.data);
    return {
      ...prevState,
      form: { healthData },
      result,
      error: undefined,
      status: 'success',
    };
  } catch (e) {
    return {
      ...prevState,
      form: { healthData },
      error: 'An unexpected error occurred during prediction. Please try again.',
      status: 'error',
    };
  }
}
