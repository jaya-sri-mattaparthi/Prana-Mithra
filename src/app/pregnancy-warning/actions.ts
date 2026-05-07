'use server';

import {
  aiPoweredEarlyWarningPregnancies,
  AIPoweredEarlyWarningPregnancyOutput,
} from '@/ai/flows/ai-powered-early-warning-pregnancies';
import { z } from 'zod';

const schema = z.object({
  symptoms: z.string(),
  journalEntries: z.string(),
  historicalData: z.string(),
});

export type PregnancyWarningState = {
  form: {
    symptoms: string;
    journalEntries: string;
    historicalData: string;
  };
  result?: AIPoweredEarlyWarningPregnancyOutput;
  errors?: {
    symptoms?: string[];
    journalEntries?: string[];
    historicalData?: string[];
  };
  message?: string;
  status: 'idle' | 'loading' | 'success' | 'error';
};

export async function checkPregnancyRisk(
  prevState: PregnancyWarningState,
  formData: FormData
): Promise<PregnancyWarningState> {
  const symptoms = formData.get('symptoms') as string;
  const journalEntries = formData.get('journalEntries') as string;
  const historicalData = formData.get('historicalData') as string;

  const validatedFields = schema.safeParse({ symptoms, journalEntries, historicalData });

  if (!validatedFields.success) {
    return {
      ...prevState,
      form: { symptoms, journalEntries, historicalData },
      errors: validatedFields.error.flatten().fieldErrors,
      status: 'error',
      message: 'Please fill out all fields with sufficient detail.',
    };
  }

  if (
    !validatedFields.data.symptoms ||
    !validatedFields.data.journalEntries ||
    !validatedFields.data.historicalData
  ) {
     return {
      ...prevState,
      form: { symptoms, journalEntries, historicalData },
      status: 'error',
      message: 'Please fill out all fields.',
    };
  }

  try {
    const result = await aiPoweredEarlyWarningPregnancies(validatedFields.data);
    return {
      ...prevState,
      form: { symptoms, journalEntries, historicalData },
      result,
      errors: undefined,
      status: 'success',
    };
  } catch (e) {
    return {
      ...prevState,
      form: { symptoms, journalEntries, historicalData },
      message: 'An unexpected error occurred during analysis. Please try again.',
      status: 'error',
    };
  }
}
