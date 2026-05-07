
'use client';
import { usePathname } from 'next/navigation';
import { Globe, Menu, Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useSidebar } from '@/components/ui/sidebar';
import { menuItems } from '@/lib/menu-items';
import { useLanguage } from '@/lib/i18n';
import { TextToSpeech } from './text-to-speech';

export function Header() {
  const { toggleSidebar, isMobile } = useSidebar();
  const { language, setLanguage, t } = useLanguage();
  const pathname = usePathname();
  const currentPage =
    menuItems.find(
      (item) =>
        (item.href === '/' && pathname === item.href) ||
        (item.href !== '/' && pathname.startsWith(item.href))
    )?.label || 'Prana Mithra';

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-card px-4 sm:px-6">
      {isMobile && (
        <Button variant="outline" size="icon" onClick={toggleSidebar}>
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      )}
      <div className="flex-1">
        <h1 className="font-headline text-2xl font-semibold">{t(currentPage)}</h1>
      </div>
      <div className="flex items-center gap-2">
        <TextToSpeech />
        <form className="relative ml-auto hidden flex-1 sm:flex-initial md:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder={t('Search...')}
            className="rounded-full bg-background pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
          />
        </form>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <Globe className="h-5 w-5" />
              <span className="sr-only">{t('Change language')}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{t('Language')}</DropdownMenuLabel>
            <DropdownMenuRadioGroup value={language} onValueChange={(value) => setLanguage(value as any)}>
              <DropdownMenuRadioItem value="en">English</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="hi">हिन्दी</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="te">తెలుగు</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="or">ଓଡ଼ିଆ</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="konda">కొండ</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="koya">కోయ</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <User className="h-5 w-5" />
              <span className="sr-only">{t('Toggle user menu')}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{t('My Account')}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>{t('Settings')}</DropdownMenuItem>
            <DropdownMenuItem>{t('Support')}</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>{t('Logout')}</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
