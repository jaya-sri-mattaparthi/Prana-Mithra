'use client';

import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { PlayCircle, Youtube } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n';

const kathaStoriesData = [
  {
    title: 'Animated Telugu Stories For Kids (Playlist)',
    topic: 'Playlist',
    description:
      'A broad set of mythological / moral stories in Telugu in animated format.',
    imageId: 'katha-storytelling',
    link: 'https://www.youtube.com/playlist?list=PLEpuPhADcUzkJpAF-HkwkDWRyBdWI-gsj',
  },
  {
    title: 'Telugu Tales (Channel)',
    topic: 'Channel',
    description:
      'Moral / fairy / animal stories in Telugu (Panchatantra, Neeti Kathalu, etc.)',
    imageId: 'katha-hygiene',
    link: 'https://www.youtube.com/c/TeluguTales',
  },
  {
    title: 'Folktales of India – “The Unwanted Guests” (Telangana / Andhra folk)',
    topic: 'Andhra Folk Tale',
    description: 'A folk tale from Telangana & Andhra region, animated adaptation.',
    imageId: 'maternal-health-banner',
    link: 'https://m.youtube.com/watch?v=ScokNdPkpew',
  },
  {
    title: 'Nalla Hamsa Story | Telugu Cartoon Stories',
    topic: 'Telugu Cartoon',
    description: 'Animated moral story in Telugu (Black Swan).',
    imageId: 'katha-malaria',
    link: 'https://m.youtube.com/watch?v=mFGk9zfs-s8',
  },
  {
    title: 'Top 10 Telugu Moral Stories for Kids Vol.1 (Infobells)',
    topic: 'Moral Stories',
    description: 'Compilation of short moral stories in Telugu.',
    imageId: 'katha-vaccination',
    link: 'https://www.youtube.com/watch?v=dYknzPMr5i8',
  },
  {
    title: 'దుష్ట పాము | Evil Snake Story (Telugu Cartoon Stories)',
    topic: 'Cartoon Story',
    description: 'Cartoon moral story about a snake in Telugu.',
    imageId: 'katha-storytelling',
    link: 'https://www.youtube.com/watch?v=_FeILo9sKtg',
  },
  {
    title: 'Short Stories || Gadida Uppu',
    topic: '2D Animated Story',
    description: '2D animated audio / story in Telugu (“Gadida Uppu”).',
    imageId: 'katha-hygiene',
    link: 'https://www.youtube.com/watch?v=SUFjb6jp4eI',
  },
  {
    title: 'Telugu audio stories — కోడలు వచ్చిన వేళ!',
    topic: 'Audio Story',
    description: 'Telugu audio story episodes (real life / imaginative).',
    imageId: 'maternal-health-banner',
    link: 'https://www.youtube.com/watch?v=73whGDqNQSo',
  },
  {
    title: 'Telugu Audio Books (Channel)',
    topic: 'Channel',
    description: 'Audio form of Telugu stories / literature.',
    imageId: 'katha-malaria',
    link: 'https://www.youtube.com/@TeluguAudioBooks1',
  },
  {
    title: 'Telugu Mythological Stories | Agastyamuni Katha',
    topic: 'Mythological Tale',
    description: 'Animated mythological tale in Telugu.',
    imageId: 'katha-storytelling',
    link: 'https://www.youtube.com/watch?v=dTsomJ0-dco',
  },
  {
    title: 'Folk tales of adventure (MagicBox Telugu)',
    topic: 'Adventure Tale',
    description: 'Animated folk / world tales in Telugu.',
    imageId: 'katha-hygiene',
    link: 'https://www.youtube.com/watch?v=fBQ_GXD1xkc',
  },
  {
    title: 'Oka Telivaina Meka (Infobells)',
    topic: 'Moral Story',
    description: 'Short moral story in Telugu (Goat / Goat story).',
    imageId: 'maternal-health-banner',
    link: 'https://www.youtube.com/watch?v=8O4Ev68rkVQ',
  },
  {
    title: 'Marri Kayalu Gummadi Kayalu',
    topic: 'Animated Short Story',
    description: 'Animated short story in Telugu.',
    imageId: 'katha-malaria',
    link: 'https://www.youtube.com/watch?v=5gCpXYhf7LA',
  },
  {
    title: 'Mythological Stories – Valmiki Story in Telugu',
    topic: 'Mythological Animation',
    description: 'Animation about Valmiki’s life in Telugu.',
    imageId: 'katha-vaccination',
    link: 'https://www.youtube.com/watch?v=EWlY4FNvDgo',
  },
  {
    title: 'Magic Pot (MagicBox Telugu)',
    topic: 'Folk Tale',
    description: 'Folk tale “Magic Pot” in Telugu.',
    imageId: 'katha-storytelling',
    link: 'https://www.youtube.com/watch?v=6eR4qUMsjgg',
  },
  {
    title: 'The Emperor and the Nightingale (World Folk Tales in Telugu)',
    topic: 'World Folk Tale',
    description: 'Folk tale in Telugu.',
    imageId: 'katha-hygiene',
    link: 'https://www.youtube.com/watch?v=Xlnr1swVvSo',
  },
  {
    title: 'Mythological Stories – Rama Ravana Yuddham',
    topic: 'Mythological Animation',
    description: 'Animated story of Rama vs Ravana in Telugu.',
    imageId: 'maternal-health-banner',
    link: 'https://www.youtube.com/watch?v=wLm8l1Gcclo',
  },
];

export default function HealthKathaPage() {
  const heroImage = PlaceHolderImages.find(
    (img) => img.id === 'katha-storytelling'
  );
  const { t } = useLanguage();

  const kathaStories = kathaStoriesData.map((story) => ({
    ...story,
    title: t(story.title),
    topic: t(story.topic),
    description: t(story.description),
    image: PlaceHolderImages.find((img) => img.id === story.imageId),
  }));

  return (
    <div className="space-y-8 content-to-read">
      {heroImage && (
        <div className="relative h-48 w-full overflow-hidden rounded-lg md:h-64">
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            data-ai-hint={heroImage.imageHint}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6">
            <h1 className="font-headline text-3xl font-bold text-white md:text-4xl">
              {t("Health Education through 'Katha'")}
            </h1>
            <p className="mt-2 text-white/90 max-w-prose">
              {t('Culturally immersive health education using tribal folk storytelling.')}
            </p>
          </div>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {kathaStories.map((story) => (
          <Card key={story.title} className="flex flex-col overflow-hidden">
            {story.image && (
              <div className="relative h-40 w-full">
                <Image
                  src={story.image.imageUrl}
                  alt={story.image.description}
                  data-ai-hint={story.image.imageHint}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <PlayCircle className="h-16 w-16 text-white/70" />
                </div>
              </div>
            )}
            <CardHeader>
              <CardTitle className="font-headline">{story.title}</CardTitle>
              <Badge variant="secondary" className="w-fit">
                {story.topic}
              </Badge>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-muted-foreground">
                {story.description}
              </p>
            </CardContent>
            <CardFooter className="bg-muted/50 p-3">
              <Button className="w-full" asChild>
                <Link
                  href={story.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Youtube className="mr-2 h-4 w-4" />
                  {t('Watch on YouTube')}
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
