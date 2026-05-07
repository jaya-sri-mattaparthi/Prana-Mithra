'use client';

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Bell, Syringe, Calendar, CheckCircle, Clock } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';

const timelineEventsData = [
  {
    type: 'Pregnancy',
    time: 'Week 12',
    title: 'First Trimester Screening',
    description: "Appointment with Dr. Priya Sharma for ultrasound and blood tests.",
    status: 'completed',
    icon: <Calendar className="h-5 w-5 text-white" />,
    color: 'bg-blue-500',
  },
  {
    type: 'Pregnancy',
    time: 'Week 20',
    title: 'Anomaly Scan',
    description: "Detailed ultrasound to check baby's development.",
    status: 'completed',
    icon: <Calendar className="h-5 w-5 text-white" />,
    color: 'bg-blue-500',
  },
  {
    type: 'Pregnancy',
    time: 'Week 28',
    title: 'Glucose Challenge Test',
    description: 'Scheduled for next Tuesday at the community health center.',
    status: 'upcoming',
    icon: <Clock className="h-5 w-5 text-white" />,
    color: 'bg-orange-500',
  },
  {
    type: 'Child',
    time: 'Birth',
    title: 'BCG, OPV 0, Hep-B 1',
    description: 'Vaccinations administered at birth.',
    status: 'completed',
    icon: <Syringe className="h-5 w-5 text-white" />,
    color: 'bg-green-500',
  },
   {
    type: 'Child',
    time: '6 Weeks',
    title: 'DTwP 1, IPV 1, Hib 1, Rota 1',
    description: 'First round of infant vaccinations.',
    status: 'completed',
    icon: <Syringe className="h-5 w-5 text-white" />,
    color: 'bg-green-500',
  },
  {
    type: 'Child',
    time: '10 Weeks',
    title: 'DTwP 2, IPV 2, Hib 2, Rota 2',
    description: 'Reminder sent to the mother for the upcoming appointment.',
    status: 'upcoming',
    icon: <Bell className="h-5 w-5 text-white" />,
    color: 'bg-orange-500',
  },
  {
    type: 'Child',
    time: '14 Weeks',
    title: 'DTwP 3, IPV 3, Hib 3, Rota 3',
    description: 'Scheduled in 4 weeks.',
    status: 'pending',
    icon: <Syringe className="h-5 w-5 text-white" />,
    color: 'bg-gray-400',
  },
];


export default function MaternalHealthPage() {
    const bannerImage = PlaceHolderImages.find(img => img.id === 'maternal-health-banner');
    const { t } = useLanguage();

    const timelineEvents = timelineEventsData.map(event => ({
        ...event,
        title: t(event.title),
        description: t(event.description),
        time: t(event.time),
    }));

  return (
    <div className="space-y-8 content-to-read">
      {bannerImage && (
        <div className="relative h-48 w-full overflow-hidden rounded-lg md:h-64">
          <Image
            src={bannerImage.imageUrl}
            alt={bannerImage.description}
            data-ai-hint={bannerImage.imageHint}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6">
            <h1 className="font-headline text-3xl font-bold text-white md:text-4xl">
              {t('Maternal & Child Health')}
            </h1>
            <p className="mt-2 text-white/90">{t('A timeline of care for mother and child.')}</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">{t('Pregnancy Timeline')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative pl-6">
              <div className="absolute left-0 top-0 h-full w-0.5 bg-border -translate-x-1/2 ml-3" />
              {timelineEvents.filter(e => e.type === 'Pregnancy').map((event, index) => (
                <div key={index} className="relative mb-8 flex items-start">
                  <div className={`z-10 flex h-6 w-6 items-center justify-center rounded-full ${event.color}`}>
                    {event.status === 'completed' ? <CheckCircle className="h-4 w-4 text-white" /> : event.icon}
                  </div>
                  <div className="ml-6">
                    <p className="font-semibold">{event.title} <span className="ml-2 text-sm font-normal text-muted-foreground">{event.time}</span></p>
                    <p className="text-sm text-muted-foreground">{event.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">{t('Child Vaccination Schedule')}</CardTitle>
          </CardHeader>
          <CardContent>
             <div className="relative pl-6">
              <div className="absolute left-0 top-0 h-full w-0.5 bg-border -translate-x-1/2 ml-3" />
              {timelineEvents.filter(e => e.type === 'Child').map((event, index) => (
                <div key={index} className="relative mb-8 flex items-start">
                  <div className={`z-10 flex h-6 w-6 items-center justify-center rounded-full ${event.color}`}>
                     {event.status === 'completed' ? <CheckCircle className="h-4 w-4 text-white" /> : event.icon}
                  </div>
                  <div className="ml-6">
                    <p className="font-semibold">{event.title} <span className="ml-2 text-sm font-normal text-muted-foreground">{event.time}</span></p>
                    <p className="text-sm text-muted-foreground">{event.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
