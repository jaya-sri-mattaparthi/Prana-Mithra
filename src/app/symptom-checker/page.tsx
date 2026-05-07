'use client';

import { useActionState, useState } from 'react';
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
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { AlertCircle, Bot, HeartPulse, Lightbulb, Loader2 } from 'lucide-react';
import { checkSymptoms, SymptomState } from './actions';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useLanguage } from '@/lib/i18n';
import { VoiceInput } from '@/components/voice-input';

const initialState: SymptomState = {
  form: { symptoms: '' },
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
          {t('Analyzing...')}
        </>
      ) : (
        t('Check Symptoms')
      )}
    </Button>
  );
}

export default function SymptomCheckerPage() {
  const [state, formAction] = useActionState(checkSymptoms, initialState);
  const { t, language } = useLanguage();
  const [symptoms, setSymptoms] = useState(state.form.symptoms);

  const handleTranscript = (transcript: string) => {
    setSymptoms(symptoms ? `${symptoms} ${transcript}` : transcript);
  };
  
  const getLangCode = () => {
    switch (language) {
      case 'te':
        return 'te-IN';
      case 'or':
        return 'or-IN';
      case 'hi':
        return 'hi-IN';
      case 'konda':
          return 'te-IN'
      case 'koya':
          return 'te-IN'
      default:
        return 'en-US';
    }
  }

  return (
    <div className="mx-auto max-w-4xl space-y-8 content-to-read">
      <Card>
        <form action={formAction}>
          <CardHeader>
            <CardTitle className="font-headline">{t('Your Symptoms')}</CardTitle>
            <CardDescription>
              {t('Please describe your symptoms in as much detail as possible. Include when they started, their severity, and any other relevant information.')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <div className="flex justify-between items-center">
                  <Label htmlFor="symptoms">{t('Symptoms Description')}</Label>
                  <VoiceInput onTranscript={handleTranscript} lang={getLangCode()} />
                </div>
                <Textarea
                  id="symptoms"
                  name="symptoms"
                  placeholder={t("e.g., I have a high fever, a sore throat, and a headache since yesterday...")}
                  className="min-h-[150px]"
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
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
            {t('Analyzing your symptoms...')}
          </p>
        </div>
      )}

      {state.status === 'success' && state.result && (
        <Card className="bg-card/80">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Bot className="h-7 w-7 text-primary" />
              <CardTitle className="font-headline">{t('AI Analysis')}</CardTitle>
            </div>
            <CardDescription>
              {t('Based on the symptoms you provided, here is some preliminary guidance. This is not a medical diagnosis. Please consult a healthcare professional.')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4 rounded-lg border bg-background p-4">
              <h3 className="flex items-center font-semibold text-lg">
                <HeartPulse className="mr-2 h-5 w-5 text-accent" />
                {t('Potential Conditions')}
              </h3>
              <p className="text-muted-foreground">
                {t(state.result.potentialConditions)}
              </p>
            </div>
            <div className="space-y-4 rounded-lg border bg-background p-4">
              <h3 className="flex items-center font-semibold text-lg">
                <Lightbulb className="mr-2 h-5 w-5 text-accent" />
                {t('Home Care Recommendations')}
              </h3>
              <p className="text-muted-foreground">
                {t(state.result.homeCareRecommendations)}
              </p>
            </div>
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>{t('When to Seek Help')}</AlertTitle>
              <AlertDescription>
                {t(state.result.referralAdvice)}
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      )}

      {state.status === 'error' && state.error &&(
        <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>{t('Analysis Failed')}</AlertTitle>            <AlertDescription>
                {t(state.error)}
            </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
