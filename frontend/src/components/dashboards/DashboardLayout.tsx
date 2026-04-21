import type { ReactNode } from 'react';

interface DashboardLayoutProps {
  title: string;
  subtitle?: string;
  sidebar: ReactNode;
  children: ReactNode;
}

export default function DashboardLayout({ title, subtitle, sidebar, children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen bg-slate-900">
      <div className="hidden shrink-0 border-r border-slate-700 bg-slate-900 md:block">{sidebar}</div>
      <main className="flex-1 p-4 sm:p-6">
        <header className="mb-6 border-b border-slate-700 pb-4">
          <h1 className="text-2xl font-semibold text-slate-100">{title}</h1>
          {subtitle ? <p className="text-sm text-slate-400">{subtitle}</p> : null}
        </header>
        {children}
      </main>
    </div>
  );
}
