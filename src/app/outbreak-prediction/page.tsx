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
import { AlertCircle, Bot, Loader2, Map, ShieldAlert, ShieldCheck } from 'lucide-react';
import { predictCommunityOutbreak, OutbreakState } from './actions';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/lib/i18n';

const initialState: OutbreakState = {
  form: { healthData: '' },
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
          {t('Predicting...')}
        </>
      ) : (
        <>
          <Map className="mr-2 h-4 w-4" />
          {t('Predict Outbreaks')}
        </>
      )}
    </Button>
  );
}

export default function OutbreakPredictionPage() {
  const [state, formAction] = useActionState(predictCommunityOutbreak, initialState);
  const { t } = useLanguage();

  const getRiskBadgeVariant = (risk: string): 'destructive' | 'secondary' | 'default' => {
      switch (risk) {
          case t('high'): return 'destructive';
          case t('medium'): return 'secondary';
          default: return 'default';
      }
  }

  return (
    <div className="mx-auto max-w-4xl space-y-8 content-to-read">
        <Card>
            <form action={formAction}>
                <CardHeader>
                    <CardTitle className="font-headline">{t('Community Health Heatmap')}</CardTitle>
                    <CardDescription>
                    {t('Input anonymized community health data to predict potential disease outbreaks and identify hotspots.')}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                     <Label htmlFor="healthData">{t('Anonymized Community Health Data')}</Label>
                    <Textarea
                        id="healthData"
                        name="healthData"
                        placeholder={t("e.g., Village A: 5 cases of fever, 2 cases of diarrhea. Village B: 10 cases of persistent cough...")}
                        className="min-h-[150px]"
                        defaultValue={state.form.healthData}
                        required
                    />
                    {state.error && <p className="mt-2 text-sm text-destructive">{t(state.error)}</p>}
                </CardContent>
                <CardFooter className="flex justify-end">
                    <SubmitButton />
                </CardFooter>
            </form>
        </Card>

      {state.status === 'loading' && (
        <div className="flex items-center justify-center rounded-lg border bg-card p-8 shadow-sm">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="ml-4 text-muted-foreground">{t('Analyzing data and generating heatmap...')}</p>
        </div>
      )}

      {state.status === 'success' && state.result && (
        <Card className="bg-card/80">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Bot className="h-7 w-7 text-primary" />
              <CardTitle className="font-headline">{t('Outbreak Prediction Results')}</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {state.result.hotspots && state.result.hotspots.length > 0 ? (
                state.result.hotspots.map((hotspot, index) => (
                    <div key={index} className="space-y-4 rounded-lg border bg-background p-4">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm text-muted-foreground">{t('Location')}</p>
                                <h3 className="text-xl font-semibold">{t(hotspot.location)}</h3>
                            </div>
                            <Badge variant={getRiskBadgeVariant(hotspot.riskLevel)}>{t(hotspot.riskLevel)}</Badge>
                        </div>

                        <div>
                            <p className="font-semibold">{t('Predicted Disease')}</p>
                            <p className="text-muted-foreground">{t(hotspot.disease)}</p>
                        </div>
                        <div>
                            <p className="font-semibold">{t('Contributing Factors')}</p>
                            <p className="text-muted-foreground">{t(hotspot.factors)}</p>
                        </div>
                         <Alert>
                            <ShieldCheck className="h-4 w-4" />
                            <AlertTitle>{t('Recommendations')}</AlertTitle>
                            <AlertDescription>
                                {t(hotspot.recommendations)}
                            </AlertDescription>
                        </Alert>
                    </div>
                ))
            ) : (
                <Alert>
                    <ShieldCheck className="h-4 w-4" />
                    <AlertTitle>{t('No Outbreaks Predicted')}</AlertTitle>
                    <AlertDescription>
                        {t('Based on the provided data, no immediate outbreak hotspots were identified. Continue monitoring the situation.')}
                    </AlertDescription>
                </Alert>
            )}
          </CardContent>
        </Card>
      )}

      {state.status === 'error' && state.error && (
         <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>{t('Prediction Failed')}</AlertTitle>
            <AlertDescription>
                {t(state.error)}
            </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
