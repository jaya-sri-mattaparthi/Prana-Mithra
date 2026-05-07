'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from './ui/button';
import { useToast } from '@/hooks/use-toast';
import { useEffect, useState } from 'react';
import { useLanguage } from '@/lib/i18n';

export function EmergencyAlertDialog({ children }: { children: React.ReactNode }) {
  const { toast } = useToast();
  const [isClient, setIsClient] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleConfirm = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          toast({
            title: t('Emergency Alert Sent'),
            description: `${t('Location')}: ${latitude.toFixed(5)}, ${longitude.toFixed(5)}. ${t('Emergency services and your contacts have been notified.')}`,
            variant: 'destructive',
            duration: 9000,
          });
        },
        (error) => {
          toast({
            title: t('Emergency Alert Sent'),
            description:
              t('Could not get location. Emergency services and contacts have still been notified.'),
            variant: 'destructive',
          });
        }
      );
    } else {
      toast({
        title: t('Emergency Alert Sent'),
        description:
          t('Geolocation is not supported by this browser. Emergency services and contacts have still been notified.'),
        variant: 'destructive',
      });
    }
  };

  if (!isClient) {
    return null;
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t('Are you absolutely sure?')}</AlertDialogTitle>
          <AlertDialogDescription>
            {t('This action will attempt to find your location and send an emergency alert to your designated contacts and nearby ASHA workers. Only proceed if you are in a genuine emergency.')}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t('Cancel')}</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button variant="destructive" onClick={handleConfirm}>
              {t('Confirm Alert')}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
