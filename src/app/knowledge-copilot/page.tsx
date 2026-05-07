'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertCircle, Bot, BookHeart, Loader2, Microscope, Sparkles } from 'lucide-react';
import { findRemedies, KnowledgeState } from './actions';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { useLanguage } from '@/lib/i18n';

const initialState: KnowledgeState = {
  form: { healthIssue: '' },
  status: 'idle',
};

function SubmitButton() {
  const { pending } = useFormStatus();
  const { t } = useLanguage();
  return (
    <Button type="submit" disabled={pending} size="lg">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {t('Searching...')}
        </>
      ) : (
        t('Find Advice')
      )}
    </Button>
  );
}

export default function KnowledgeCopilotPage() {
  const [state, formAction] = useActionState(findRemedies, initialState);
  const { t } = useLanguage();

  return (
    <div className="mx-auto max-w-4xl space-y-8 content-to-read">
      <Card>
        <form action={formAction}>
          <CardHeader>
            <CardTitle className="font-headline">{t('Knowledge Co-Pilot')}</CardTitle>
            <CardDescription>
              {t('Enter a health issue to see traditional remedies alongside modern medical advice.')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="healthIssue">{t('Health Issue')}</Label>
                <Input
                  id="healthIssue"
                  name="healthIssue"
                  placeholder={t('e.g., Stomach pain, cough, etc.')}
                  defaultValue={state.form.healthIssue}
                  required
                />
                {state.error && (
                  <p className="text-sm text-destructive">{t(state.error)}</p>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <SubmitButton />
          </CardFooter>
        </form>
      </Card>

      {state.status === 'loading' && (
        <div className="flex items-center justify-center rounded-lg border bg-card p-8 shadow-sm">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="ml-4 text-muted-foreground">
            {t('Consulting knowledge base...')}
          </p>
        </div>
      )}

      {state.status === 'success' && state.result && (
        <Card className="bg-card/80">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Bot className="h-7 w-7 text-primary" />
              <CardTitle className="font-headline">{t('Co-Pilot Results for "{healthIssue}"', { healthIssue: state.form.healthIssue })}</CardTitle>
            </div>
            <CardDescription>
              {t('This information is for educational purposes. Always consult a healthcare professional for medical advice.')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4 rounded-lg border bg-background p-4">
                    <h3 className="flex items-center font-semibold text-lg">
                        <Sparkles className="mr-2 h-5 w-5 text-accent" />
                        {t('Traditional Remedies')}
                    </h3>
                    <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
                        {state.result.traditionalRemedies.map((remedy, index) => (
                            <li key={index}>{t(remedy)}</li>
                        ))}
                    </ul>
                </div>
                <div className="space-y-4 rounded-lg border bg-background p-4">
                    <h3 className="flex items-center font-semibold text-lg">
                        <Microscope className="mr-2 h-5 w-5 text-accent" />
                        {t('Modern Medical Advice')}
                    </h3>
                    <p className="text-muted-foreground">
                        {t(state.result.modernAdvice)}
                    </p>
                </div>
            </div>
          </CardContent>
        </Card>
      )}

      {state.status === 'error' && state.error && (
         <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>{t('Search Failed')}</AlertTitle>
            <AlertDescription>
                {t(state.error)}
            </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
