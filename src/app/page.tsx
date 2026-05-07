'use client';

import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  Baby,
  BookHeart,
  ClipboardList,
  HeartPulse,
  Leaf,
  Map,
  Scan,
  AlertTriangle,
  Siren,
  Hospital,
  ScrollText,
} from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { EmergencyAlertDialog } from '@/components/emergency-alert-dialog';
import { useLanguage } from '@/lib/i18n';

const primaryFeatures = [
  {
    title: 'AI Symptom Checker',
    description: 'Get preliminary health guidance based on your symptoms.',
    href: '/symptom-checker',
    icon: HeartPulse,
  },
  {
    title: 'Maternal & Child Health',
    description: 'Track pregnancy milestones and vaccination schedules.',
    href: '/maternal-health',
    icon: Baby,
  },
  {
    title: 'Herbal Plant Identifier',
    description: 'Identify local plants and their medicinal uses.',
    href: '/plant-identifier',
    icon: Leaf,
  },
  {
    title: 'Visual Symptom Scanner',
    description: 'Scan wounds, rashes, and get preliminary guidance.',
    href: '/visual-scanner',
    icon: Scan,
  },
];

const secondaryFeatures = [
  {
    title: 'Knowledge Co-Pilot',
    description: 'Traditional remedies alongside modern medical advice.',
    href: '/knowledge-copilot',
    icon: BookHeart,
  },
  {
    title: 'ASHA Dashboard',
    description: 'Manage cases, appointments, and offline data capture.',
    href: '/asha-dashboard',
    icon: ClipboardList,
  },
  {
    title: 'Early Warning for Pregnancies',
    description: 'Predict risks by analyzing symptoms & journal entries.',
    href: '/pregnancy-warning',
    icon: AlertTriangle,
  },
   {
    title: 'Community Health Heatmap',
    description: 'View hotspots for diseases and predict outbreaks before they happen.',
    href: '/outbreak-prediction',
    icon: Map,
  },
  {
    title: 'Facility Locator',
    description: 'Find hospitals and clinics near you.',
    href: '/facility-locator',
    icon: Hospital,
  },
    {
    title: 'Health Schemes',
    description: 'Learn about government health schemes.',
    href: '/schemes',
    icon: ScrollText,
  },
];

export default function DashboardPage() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'prana-mithra-logo');
  const { t } = useLanguage();

  return (
    <div className="space-y-12 content-to-read">
      <Card className="relative overflow-hidden border-0 shadow-none bg-transparent rounded-lg">
        <div className="absolute inset-0">
          {heroImage && (
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              data-ai-hint={heroImage.imageHint}
              fill
              className="object-cover"
              priority
            />
          )}
          <div className="absolute inset-0 bg-black/30" />
        </div>
        <div className="relative grid md:grid-cols-2 gap-8 p-8 md:p-12">
          <div className="text-white space-y-6">
            <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tight text-shadow-lg">
              {t('Prana Mithra')}
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/90 max-w-prose text-shadow">
              {t('Your community health companion, your friend in health and life.')}
            </p>
            <div className="flex gap-4">
              <Button size="lg" className="flex-shrink-0 text-lg py-6 px-8 bg-white text-primary hover:bg-white/90 shadow-xl">
                {t('Get Started')}
              </Button>
              <EmergencyAlertDialog>
                <Button size="lg" variant="destructive" className="flex-shrink-0 text-lg py-6 px-8 shadow-xl">
                  <Siren className="mr-2 h-6 w-6" />
                  {t('Emergency')}
                </Button>
              </EmergencyAlertDialog>
            </div>
          </div>
        </div>
      </Card>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {primaryFeatures.map((feature) => (
          <Card
            key={feature.title}
            className="group flex flex-col transition-all hover:shadow-xl hover:-translate-y-1 bg-card border-border/50"
          >
            <CardHeader className="flex-row items-center gap-4">
              <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-secondary">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
            </CardHeader>
            <CardContent className="flex-grow space-y-2">
              <CardTitle className="font-headline text-xl">{t(feature.title)}</CardTitle>
              <p className="text-sm text-muted-foreground">
                {t(feature.description)}
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="w-full justify-start p-0 text-primary" asChild>
                <Link href={feature.href}>
                  {t('Go to Feature')} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

       <div>
        <h2 className="text-2xl font-bold font-headline mb-4">{t('More Tools & Resources')}</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {secondaryFeatures.map((feature) => (
                <Link href={feature.href} key={feature.title} className="group">
                    <Card className="flex items-center gap-4 p-4 transition-all hover:shadow-md hover:bg-muted/50 border-border/50">
                        <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-secondary">
                             <feature.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                        <div>
                            <h3 className="font-semibold">{t(feature.title)}</h3>
                            <p className="text-sm text-muted-foreground">{t(feature.description)}</p>
                        </div>
                    </Card>
                </Link>
            ))}
        </div>
       </div>

    </div>
  );
}
