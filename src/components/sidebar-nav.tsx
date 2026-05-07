
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HeartPulse, Siren } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { Button } from './ui/button';
import { menuItems } from '@/lib/menu-items';
import { EmergencyAlertDialog } from './emergency-alert-dialog';
import { useLanguage } from '@/lib/i18n';

export function SidebarNav() {
  const pathname = usePathname();
  const { t } = useLanguage();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-3">
          <SidebarMenuButton
            asChild
            className="h-14 justify-start bg-transparent p-2 text-2xl hover:bg-sidebar-accent"
            size="lg"
            tooltip={t('Prana Mithra')}
          >
            <Link href="/">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-200">
                <HeartPulse className="h-6 w-6 shrink-0 text-primary" />
              </div>
              <span className="font-headline font-bold text-white">{t('Prana Mithra')}</span>
            </Link>
          </SidebarMenuButton>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={
                  item.href === '/'
                    ? pathname === item.href
                    : pathname.startsWith(item.href)
                }
                tooltip={t(item.label)}
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{t(item.label)}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <EmergencyAlertDialog>
          <Button variant="destructive" className="w-full justify-start">
            <Siren className="mr-2 h-4 w-4" />
            {t('Emergency Alert')}
          </Button>
        </EmergencyAlertDialog>
      </SidebarFooter>
    </Sidebar>
  );
}
