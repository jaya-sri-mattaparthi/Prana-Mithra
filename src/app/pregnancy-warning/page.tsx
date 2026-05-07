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
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { AlertCircle, Bot, Clipboard, HeartPulse, History, Loader2, ShieldAlert, ShieldCheck } from 'lucide-react';
import { checkPregnancyRisk, PregnancyWarningState } from './actions';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useLanguage } from '@/lib/i18n';

const initialState: PregnancyWarningState = {
  form: { symptoms: '', journalEntries: '', historicalData: '' },
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
          {t('Analyzing Data...')}
        </>
      ) : (
        t('Assess Risk')
      )}
    </Button>
  );
}

export default function PregnancyWarningPage() {
  const [state, formAction] = useActionState(checkPregnancyRisk, initialState);
  const { t } = useLanguage();

  return (
    <div className="mx-auto max-w-4xl space-y-8 content-to-read">
      <Card>
        <form action={formAction}>
          <CardHeader>
            <CardTitle className="font-headline">{t('Early Warning for High-Risk Pregnancies')}</CardTitle>
            <CardDescription>
              {t('Enter patient data to predict if a pregnancy is high-risk and get recommendations.')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="symptoms">{t('Current Symptoms')}</Label>
              <Textarea id="symptoms" name="symptoms" placeholder={t("e.g., High blood pressure, swelling in hands and feet...")} defaultValue={state.form.symptoms} />
              {state.errors?.symptoms && <p className="text-sm text-destructive">{t(state.errors.symptoms[0])}</p>}
            </div>
            <div>
              <Label htmlFor="journalEntries">{t('Patient Journal Entries')}</Label>
              <Textarea id="journalEntries" name="journalEntries" placeholder={t("e.g., Feeling very tired, occasional dizziness...")} defaultValue={state.form.journalEntries} />
              {state.errors?.journalEntries && <p className="text-sm text-destructive">{t(state.errors.journalEntries[0])}</p>}
            </div>
            <div>
              <Label htmlFor="historicalData">{t('Historical Medical Data')}</Label>
              <Textarea id="historicalData" name="historicalData" placeholder={t("e.g., Previous pregnancy complications, history of diabetes...")} defaultValue={state.form.historicalData} />
              {state.errors?.historicalData && <p className="text-sm text-destructive">{t(state.errors.historicalData[0])}</p>}
            </div>
          </CardContent>
          <CardFooter className="flex-col items-end gap-4">
            {state.status === 'error' && state.message && (
                <p className="text-sm text-destructive">{t(state.message)}</p>
            )}
            <SubmitButton />
          </CardFooter>
        </form>
      </Card>

      {state.status === 'loading' && (
        <div className="flex items-center justify-center rounded-lg border bg-card p-8 shadow-sm">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="ml-4 text-muted-foreground">{t('Assessing pregnancy risk...')}</p>
        </div>
      )}

      {state.status === 'success' && state.result && (
        <Card className="bg-card/80">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Bot className="h-7 w-7 text-primary" />
              <CardTitle className="font-headline">{t('Risk Assessment')}</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert variant={state.result.isHighRisk ? "destructive" : "default"}>
              {state.result.isHighRisk ? <ShieldAlert className="h-4 w-4" /> : <ShieldCheck className="h-4 w-4" />}
              <AlertTitle>{state.result.isHighRisk ? t('High-Risk Pregnancy Detected') : t('Low-Risk Pregnancy')}</AlertTitle>
              <AlertDescription>
                {t(state.result.isHighRisk 
                    ? 'This pregnancy is showing signs that indicate a high risk. Immediate attention is recommended.'
                    : 'This pregnancy appears to be progressing normally with no immediate high-risk factors detected.'
                )}
              </AlertDescription>
            </Alert>
            
            {state.result.isHighRisk && (
                <div className="space-y-4 rounded-lg border bg-background p-4">
                    <h3 className="flex items-center font-semibold text-lg">
                        <History className="mr-2 h-5 w-5 text-accent" />
                        {t('Identified Risk Factors')}
                    </h3>
                    <p className="text-muted-foreground">
                        {t(state.result.riskFactors)}
                    </p>
                </div>
            )}

            <div className="space-y-4 rounded-lg border bg-background p-4">
                <h3 className="flex items-center font-semibold text-lg">
                    <Clipboard className="mr-2 h-5 w-5 text-accent" />
                    {t('Recommendations for ASHA/Doctors')}
                </h3>
                <p className="text-muted-foreground">
                    {t(state.result.recommendations)}
                </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
