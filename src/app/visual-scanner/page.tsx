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
import { AlertCircle, Bot, Loader2, Scan } from 'lucide-react';
import { scanVisualSymptom, VisualSymptomState } from './actions';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ImageUploadForm } from '@/components/image-upload-form';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/lib/i18n';

const initialState: VisualSymptomState = {
  form: { additionalDetails: '' },
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
          {t('Scanning Image...')}
        </>
      ) : (
        <>
          <Scan className="mr-2 h-4 w-4" />
          {t('Start Scan')}
        </>
      )}
    </Button>
  );
}

export default function VisualScannerPage() {
  const [state, formAction] = useActionState(scanVisualSymptom, initialState);
  const { t } = useLanguage();

  return (
    <div className="mx-auto max-w-4xl space-y-8 content-to-read">
      <form action={formAction} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">{t('Visual Symptom Scanner')}</CardTitle>
            <CardDescription>
              {t('Take a photo of a wound, rash, or swelling. The AI will provide preliminary guidance.')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <ImageUploadForm
              inputName="photoDataUri"
              label={t("Upload Photo")}
              description={t("Click to upload a clear photo of the symptom.")}
            />
             {state.error?.includes('upload') && (
                <p className="text-sm text-destructive">{t(state.error)}</p>
            )}
            <div>
              <Label htmlFor="additionalDetails">{t('Additional Details (Optional)')}</Label>
              <Textarea
                id="additionalDetails"
                name="additionalDetails"
                placeholder={t("e.g., It started 2 days ago and feels itchy.")}
                defaultValue={state.form.additionalDetails}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <SubmitButton />
          </CardFooter>
        </Card>
      </form>

      {state.status === 'loading' && (
        <div className="flex items-center justify-center rounded-lg border bg-card p-8 shadow-sm">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="ml-4 text-muted-foreground">{t('Scanning image...')}</p>
        </div>
      )}

      {state.status === 'success' && state.result && (
        <Card className="bg-card/80">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Bot className="h-7 w-7 text-primary" />
              <CardTitle className="font-headline">{t('Scan Results')}</CardTitle>
            </div>
            <CardDescription>
              {t('This is not a medical diagnosis. Please consult a healthcare professional.')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert variant={state.result.preliminaryGuidance.includes("urgent") ? "destructive" : "default"}>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>{t('Preliminary Guidance')}</AlertTitle>
              <AlertDescription>
                {t(state.result.preliminaryGuidance)}
              </AlertDescription>
            </Alert>
            <div>
              <Label>{t('Confidence Level')}: {Math.round(state.result.confidenceLevel * 100)}%</Label>
              <Progress value={state.result.confidenceLevel * 100} className="mt-2" />
            </div>
          </CardContent>
        </Card>
      )}

      {state.status === 'error' && !state.error?.includes('upload') && state.error && (
         <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>{t('Scan Failed')}</AlertTitle>
            <AlertDescription>
                {t(state.error)}
            </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
