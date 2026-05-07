'use client';

import { SidebarProvider } from '@/components/ui/sidebar';
import { SidebarNav } from '@/components/sidebar-nav';
import { Header } from '@/components/header';
import { ClientOnly } from './client-only';

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClientOnly>
      <SidebarProvider>
        <div className="flex min-h-screen">
          <SidebarNav />
          <main className="flex-1 flex flex-col bg-background">
            <Header />
            <div className="p-4 sm:p-6 lg:p-8 flex-1">{children}</div>
          </main>
        </div>
      </SidebarProvider>
    </ClientOnly>
  );
}
