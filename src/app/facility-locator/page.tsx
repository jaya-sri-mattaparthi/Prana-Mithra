'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Hospital, Stethoscope, Bed, Phone, MapPin, ExternalLink } from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n";
import { facilitiesData } from "@/lib/facilities";

const resourcesData = [
    { name: "Alluri Sitarama Raju District", link: "https://allurisitharamaraju.ap.gov.in/health-department/" },
    { name: "MedIndia", link: "https://www.medindia.net/" },
    { name: "Street Hospitals", link: "https://streethospitals.com/"},
]

export default function FacilityLocatorPage() {
  const { t } = useLanguage();
  const facilities = facilitiesData.map(f => ({
      ...f,
      name: t(f.name),
      type: t(f.type),
      location: t(f.location),
      bedAvailability: t(f.bedAvailability),
      specialists: f.specialists.map(s => t(s)),
      details: t(f.details),
  }));

  const resources = resourcesData.map(r => ({ ...r, name: t(r.name) }));

  return (
    <div className="space-y-8 content-to-read">
      <div>
        <h1 className="text-3xl font-bold font-headline">{t('Healthcare Facility Locator')}</h1>
        <p className="text-muted-foreground">{t('Find hospitals and clinics in Alluri Sitarama Raju district.')}</p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input placeholder={t("Search by name, location, or specialty...")} className="pl-10 text-lg p-6 rounded-full" />
      </div>

      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        {facilities.map((facility, index) => (
          <Card key={index} className="overflow-hidden flex flex-col">
            {facility.image && (
                 <div className="relative h-40 w-full">
                    <Image
                        src={facility.image.imageUrl}
                        alt={facility.image.description}
                        data-ai-hint={facility.image.imageHint}
                        fill
                        className="object-cover"
                    />
                 </div>
            )}
            <CardHeader>
              <CardTitle className="font-headline">{facility.name}</CardTitle>
              <CardDescription>{facility.type}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 flex-grow">
               <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="mr-2 h-4 w-4 text-primary" />
                    <span>{facility.location}</span>
               </div>
               <div className="flex items-center text-sm text-muted-foreground">
                    <Bed className="mr-2 h-4 w-4 text-primary" />
                    <span>{t('Bed Availability')}: {facility.bedAvailability}</span>
               </div>
                <div className="flex items-start text-sm text-muted-foreground">
                    <Stethoscope className="mr-2 h-4 w-4 text-primary mt-1 flex-shrink-0" />
                    <div className="flex flex-wrap gap-2">
                        {facility.specialists.map(spec => (
                            <Badge key={spec} variant="secondary">{spec}</Badge>
                        ))}
                    </div>
                </div>
                <p className="text-sm text-muted-foreground pt-2">{facility.details}</p>
            </CardContent>
            <CardFooter className="bg-muted/50 p-4 mt-auto flex justify-between items-center gap-2">
                <Button asChild variant="outline" size="sm">
                    <Link href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(facility.name + ', ' + facility.location)}`} target="_blank" rel="noopener noreferrer">
                      <MapPin className="mr-2 h-4 w-4" />
                      {t('Location')}
                    </Link>
                 </Button>
                 <Button asChild disabled={facility.contact.toLowerCase() === 'varies' || facility.contact === '-'} size="sm">
                    <a href={`tel:${facility.contact}`}>
                      <Phone className="mr-2 h-4 w-4" />
                      {t('Contact')}
                    </a>
                 </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <Card>
        <CardHeader>
            <CardTitle className="font-headline">{t('Other Websites')}</CardTitle>
            <CardDescription>{t('Primary sources used for this facility list.')}</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {resources.map(resource => (
                <Button key={resource.name} variant="outline" asChild>
                    <Link href={resource.link} target="_blank" rel="noopener noreferrer">
                        {resource.name} <ExternalLink className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            ))}
            <div className="p-4 rounded-md bg-muted/50 text-sm text-muted-foreground col-span-2 md:col-span-3">
                <strong>{t('Note')}:</strong> {t('There are over 100 PHC/Sub-Center facilities. For a complete directory, please consult the official district health portals.')}
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
