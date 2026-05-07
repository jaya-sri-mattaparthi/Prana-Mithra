import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { AppLayout } from '@/components/app-layout';
import { Toaster } from '@/components/ui/toaster';
import { LanguageProvider } from '@/components/language-provider';

export const metadata: Metadata = {
  title: 'Prana Mithra',
  description: 'A community health companion.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair:wght@400..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={cn('font-body antialiased')}>
        <LanguageProvider>
          <AppLayout>{children}</AppLayout>
          <Toaster />
        </LanguageProvider>
      </body>
    </html>
  );
}
