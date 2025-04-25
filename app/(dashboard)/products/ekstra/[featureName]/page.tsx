// File: app/(dashboard)/products/ekstra/[featureName]/page.tsx
'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import NavigationToolbar from 'app/(dashboard)/products/NavigationToolbar';

export default function ExtraFeatureDetailPage() {
  const { featureName } = useParams() as { featureName?: string };

  if (!featureName) {
    return <div className="p-6">Fant ikke funksjonaliteten.</div>;
  }

  const displayFeatureName = featureName
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

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

  return (
    <div className="relative min-h-screen">
      {/* Decorative circle in background */}
      <div className="absolute top-[-65px] left-[-170px] w-[390px] h-[390px] rounded-full transform translate-x-1 translate-y-1/3 bg-gradient-to-b from-[hsl(var(--primary))] to-[hsl(var(--secondary))] p-[55px] pointer-events-none z-0">
        <div className="w-full h-full rounded-full bg-background dark:bg-background"></div>
      </div>

      {/* Header section */}
      <div className="relative z-10 pt-6 px-6">
        <div className="w-full max-w-[1200px] mx-auto">
          {/* Title */}
          <div className="flex flex-col items-center pt-10">
            <h1 className="text-7xl font-bold">{displayFeatureName}</h1>
          </div>

          {/* Two-line descriptive subtitle */}
          <div className="flex flex-col justify-center items-center pb-10">
            <p className="mt-4 text-[15px] text-center max-w-xl pt-3">
              Her får du en fullstendig oversikt over alle verktøy under{' '}
              {displayFeatureName}.<br />
              Utforsk funksjoner, mulige oppsett og eksempler på bruk.
            </p>
          </div>

          {/* Navigation toolbar */}
          <NavigationToolbar menuItems={menuItems} />
        </div>
      </div>

      {/* Placeholder content section */}
      <div className="mt-10 w-full flex justify-center pb-20 relative z-10">
        <div className="w-full max-w-[1400px] mx-auto px-6">
          <div className="bg-card dark:bg-card border dark:border-border shadow-lg rounded-xl p-6 min-h-[500px]">
            <p className="text-lg mb-6 text-center text-gray-700">
              Dette er en placeholder for {displayFeatureName}-funksjonaliteten.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
