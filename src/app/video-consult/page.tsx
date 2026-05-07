'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Languages, Video, PhoneOff } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const doctorsData = [
  {
    id: 1,
    name: 'Dr. Priya Sharma',
    specialty: 'General Physician',
    status: 'Online',
    avatar: '/placeholder-user.jpg',
  },
  {
    id: 2,
    name: 'Dr. Rahul Gupta',
    specialty: 'Pediatrician',
    status: 'Online',
    avatar: '/placeholder-user.jpg',
  },
  {
    id: 3,
    name: 'Dr. Anjali Desai',
    specialty: 'Gynecologist',
    status: 'Offline',
    avatar: '/placeholder-user.jpg',
  },
   {
    id: 4,
    name: 'Dr. Sameer Singh',
    specialty: 'General Physician',
    status: 'Busy',
    avatar: '/placeholder-user.jpg',
  },
];

type Doctor = typeof doctorsData[0];

function ScheduleAppointmentDialog({ doctor }: { doctor: Doctor }) {
    const { t, language } = useLanguage();
    const { toast } = useToast();
    const [open, setOpen] = useState(false);

    const handleSchedule = () => {
        toast({
            title: t('Appointment Scheduled!'),
            description: `${t("A notification with the Google Meet/Zoom link has been sent to your device for your appointment with")} ${doctor.name}.`,
        });
        setOpen(false);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="w-full" disabled={doctor.status !== t('Online')}>
                    <Calendar className="mr-2 h-4 w-4" />
                    {t('Schedule Appointment')}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{t('Schedule Appointment with')} {doctor.name}</DialogTitle>
                    <DialogDescription>
                        {t('Select a date, time, and your preferred language for the consultation.')}
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="date" className="text-right">
                            {t('Date & Time')}
                        </Label>
                        <Input id="date" type="datetime-local" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="language" className="text-right">
                            {t('Language')}
                        </Label>
                         <Select defaultValue={language}>
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder={t('Select a language')} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="en">English</SelectItem>
                                <SelectItem value="hi">हिन्दी</SelectItem>
                                <SelectItem value="te">తెలుగు</SelectItem>
                                <SelectItem value="or">ଓଡ଼ିଆ</SelectItem>
                                <SelectItem value="konda">కొండ</SelectItem>
                                <SelectItem value="koya">కోయ</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={handleSchedule}>{t('Confirm Appointment')}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default function VideoConsultPage() {
  const { t } = useLanguage();
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [callStatus, setCallStatus] = useState<'idle' | 'calling' | 'active'>('idle');
  const heroImage = PlaceHolderImages.find((img) => img.id === 'video-consult-banner');

  const doctors = doctorsData.map((doc) => ({
    ...doc,
    name: t(doc.name),
    specialty: t(doc.specialty),
    status: t(doc.status),
  }));

  const handleStartCall = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setCallStatus('calling');
    setTimeout(() => setCallStatus('active'), 3000); // Simulate call connection
  };

  const handleEndCall = () => {
    setCallStatus('idle');
    setSelectedDoctor(null);
  };
  
  if (callStatus === 'calling' || callStatus === 'active') {
    return (
      <div className="h-full w-full flex flex-col items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md">
            <CardHeader className="text-center">
                 <Avatar className="w-24 h-24 mx-auto border-4 border-primary">
                    <AvatarImage src={selectedDoctor?.avatar} alt={selectedDoctor?.name} />
                    <AvatarFallback>{selectedDoctor?.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <CardTitle className="mt-4">{t('Connecting to')} {selectedDoctor?.name}...</CardTitle>
                <CardDescription>{selectedDoctor?.specialty}</CardDescription>
            </CardHeader>
             <CardContent className="flex items-center justify-center p-6">
                {callStatus === 'calling' ? (
                     <p className="text-muted-foreground animate-pulse">{t('Calling...')}</p>
                ) : (
                    <div className="text-green-500 font-semibold">{t('Connected')}</div>
                )}
            </CardContent>
            <CardFooter className="flex justify-center">
                 <Button variant="destructive" size="lg" onClick={handleEndCall}>
                    <PhoneOff className="mr-2 h-5 w-5"/>
                    {t('End Call')}
                </Button>
            </CardFooter>
        </Card>
      </div>
    );
  }


  return (
    <div className="space-y-8">
       {heroImage && (
        <div className="relative h-48 w-full overflow-hidden rounded-lg md:h-64">
          <Image
            src={heroImage.imageUrl}
            alt={t(heroImage.description)}
            data-ai-hint={heroImage.imageHint}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6">
            <h1 className="font-headline text-3xl font-bold text-white md:text-4xl">
              {t('Video Consultation')}
            </h1>
            <p className="mt-2 text-white/90 max-w-prose">
              {t('Connect with doctors and specialists from the comfort of your home.')}
            </p>
          </div>
        </div>
      )}
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {doctors.map((doctor) => (
          <Card key={doctor.id} className="flex flex-col">
            <CardHeader className="items-center text-center">
              <Avatar className="w-24 h-24 border-4 border-primary/20">
                <AvatarImage src={doctor.avatar} alt={doctor.name} />
                <AvatarFallback>{doctor.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <CardTitle>{doctor.name}</CardTitle>
              <CardDescription>{doctor.specialty}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex items-center justify-center">
               <Badge
                variant={
                  doctor.status === t('Online')
                    ? 'default'
                    : doctor.status === t('Busy')
                    ? 'secondary'
                    : 'outline'
                }
                className={doctor.status === t('Online') ? 'bg-green-100 text-green-800' : ''}
              >
                {doctor.status}
              </Badge>
            </CardContent>
            <CardFooter>
              <ScheduleAppointmentDialog doctor={doctor} />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
