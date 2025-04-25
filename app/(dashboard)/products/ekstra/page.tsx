'use client';

import React from 'react';
import Link from 'next/link';
import NavigationToolbar from 'app/(dashboard)/products/NavigationToolbar';

type Feature = {
  title: string;
  href: string;
};

export default function ExtraPage() {
  const menuItems = [
    { label: 'Moduler', icon: '/Modules.png', href: '/products/modules' },
    { label: 'Rapporter', icon: '/Reports.png', href: '/products/reports' },
    {
      label: 'Ekstra funksjonalitet',
      icon: '/Wand.png',
      href: '/products/ekstra'
    },
    {
      label: 'Andre tjenester',
      icon: '/Service.png',
      href: '/products/services'
    }
  ];

  const features: Feature[] = [
    { title: 'Settlement', href: '/products/ekstra/settlement' },
    { title: 'Asset Management', href: '/products/ekstra/asset-management' },
    { title: 'Risk Manager', href: '/products/ekstra/risk-manager' }
  ];

  return (
    <div className="relative min-h-screen">
      {/* Decorative circle in background */}
      <div className="absolute top-[-65px] left-[-170px] w-[390px] h-[390px] rounded-full transform translate-x-1 translate-y-1/3 bg-gradient-to-b from-[hsl(var(--primary))] to-[hsl(var(--secondary))] p-[55px] pointer-events-none z-0">
        <div className="w-full h-full rounded-full bg-background dark:bg-background"></div>
      </div>

      {/* Header section */}
      <div className="relative z-10 pt-6 px-6">
        <div className="w-full max-w-[1200px] mx-auto">
          {/* Navigation toolbar */}

          {/* Title and subtitle */}
          <div className="flex flex-col items-center pt-10">
            <h1 className="text-7xl font-bold">Dine Verktøy</h1>
          </div>

          <div className="flex flex-col justify-center items-center pb-10">
            <p className="mt-4 text-[15px] text-center max-w-xl pt-3">
              På denne siden finner du ekstra funksjonalitet og avanserte
              verktøy. Ved spørsmål kan du ta{' '}
              <Link href="/suggestions">
                <span className="text-primary dark:text-primary hover:text-blue dark:hover:text-accent font-medium">
                  kontakt med oss
                </span>
              </Link>
              .
            </p>
          </div>
          <NavigationToolbar menuItems={menuItems} />
        </div>
      </div>

      {/* Grid med like store kort */}
      <div className="mt-10 pb-20 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[220px] max-w-[1200px] mx-auto px-6">
          {features.map((feat) => (
            <Link key={feat.href} href={feat.href}>
              <div
                className="bg-card dark:bg-card border dark:border-border
                           p-4 rounded-[16px]
                           flex flex-col items-center justify-center
                           h-full cursor-pointer
                           hover:shadow-lg transition-shadow"
              >
                <span className="text-lg font-bold">{feat.title}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
