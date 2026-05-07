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
import { Bot, Leaf, Loader2 } from 'lucide-react';
import { identifyPlant, PlantIdentifierState } from './actions';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ImageUploadForm } from '@/components/image-upload-form';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n';

const initialState: PlantIdentifierState = {
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
          {t('Identifying...')}
        </>
      ) : (
        <>
          <Leaf className="mr-2 h-4 w-4" />
          {t('Identify Plant')}
        </>
      )}
    </Button>
  );
}

export default function PlantIdentifierPage() {
  const [state, formAction] = useActionState(identifyPlant, initialState);
  const { t } = useLanguage();

  return (
    <div className="mx-auto max-w-4xl space-y-8 content-to-read">
      <form action={formAction} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">{t('Herbal Plant Identifier')}</CardTitle>
            <CardDescription>
              {t('Take a photo of a plant to learn its name and traditional medicinal uses.')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ImageUploadForm
              inputName="photoDataUri"
              label={t("Upload Plant Photo")}
              description={t("Upload a clear photo of the plant, including leaves and flowers if possible.")}
            />
            {state.status === 'error' && state.error && (
              <p className="mt-2 text-sm text-destructive">{t(state.error)}</p>
            )}
          </CardContent>
          <CardFooter className="flex justify-end">
            <SubmitButton />
          </CardFooter>
        </Card>
      </form>

      {state.status === 'loading' && (
        <div className="flex items-center justify-center rounded-lg border bg-card p-8 shadow-sm">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="ml-4 text-muted-foreground">{t('Identifying plant...')}</p>
        </div>
      )}

      {state.status === 'success' && state.result && (
        <Card className="bg-card/80">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Bot className="h-7 w-7 text-primary" />
              <CardTitle className="font-headline">{t('Identification Results')}</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">{t('Common Name')}</p>
              <h3 className="text-xl font-semibold">{t(state.result.plantIdentification.commonName)}</h3>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{t('Latin Name')}</p>
              <h4 className="text-lg italic text-muted-foreground">{state.result.plantIdentification.latinName}</h4>
            </div>
            <div className="space-y-2 rounded-lg border bg-background p-4">
              <h4 className="font-semibold">{t('Medicinal Uses')}</h4>
              <p className="text-muted-foreground">
                {t(state.result.plantIdentification.medicinalUses)}
              </p>
            </div>
            <Button asChild variant="link" className="p-0">
                <Link href={state.result.plantIdentification.traditionalKnowledgeLink}>
                    {t('Learn more in Traditional Knowledge module')}
                </Link>
            </Button>
          </CardContent>
        </Card>
      )}

      {state.status === 'error' && state.error && (
         <Alert variant="destructive">
            <Leaf className="h-4 w-4" />
            <AlertTitle>{t('Identification Failed')}</AlertTitle>
            <AlertDescription>
                {t(state.error)}
            </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
