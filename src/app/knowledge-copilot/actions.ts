'use server';

import {
  traditionalKnowledgeAICopilot,
  TraditionalKnowledgeAICopilotOutput,
} from '@/ai/flows/traditional-knowledge-ai-copilot';
import { z } from 'zod';

const schema = z.object({
  healthIssue: z.string(),
});

export type KnowledgeState = {
  form: {
    healthIssue: string;
  };
  result?: TraditionalKnowledgeAICopilotOutput;
  error?: string;
  status: 'idle' | 'loading' | 'success' | 'error';
};

export async function findRemedies(
  prevState: KnowledgeState,
  formData: FormData
): Promise<KnowledgeState> {
  const healthIssue = formData.get('healthIssue') as string;

  const validatedFields = schema.safeParse({ healthIssue });

  if (!validatedFields.success) {
    return {
      ...prevState,
      form: { healthIssue },
      error: 'Please describe the health issue.',
      status: 'error',
    };
  }

  try {
    const result = await traditionalKnowledgeAICopilot(validatedFields.data);
    return {
      ...prevState,
      form: { healthIssue },
      result,
      error: undefined,
      status: 'success',
    };
  } catch (e) {
    return {
      ...prevState,
      form: { healthIssue },
      error: 'An unexpected error occurred. Please try again.',
      status: 'error',
    };
  }
}
