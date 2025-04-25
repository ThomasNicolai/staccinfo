'use client';

import { useContext } from 'react';
import Link from 'next/link';
import NavigationToolbar from 'app/(dashboard)/products/NavigationToolbar';
import { ModuleCard } from 'app/(dashboard)/products/modulecard';
import { LicensesContext } from 'app/(dashboard)/licensesContext';
import { getIconRefFromModuleName } from '@/lib/utils';

export default function ModulesPage() {
  // Menu items for the navigation toolbar
  const menuItems = [
    { label: 'Moduler', icon: '/Modules.png', href: '/products/modules' },
    { label: 'Rapporter', icon: '/Reports.png', href: '/products/reports' },
    {
      label: 'Ekstra funksjonalitet',
      icon: '/Wand.png',
      href: './'
    },
    {
      label: 'Andre tjenester',
      icon: '/Service.png',
      href: './'
    }
  ];

  // Array med alle mulige moduler - moved from SharedPageWrapper
  const licences = useContext(LicensesContext);
  console.log('licnences:');
  console.log(licences);
  const modules = licences.map((l: any) => {
    return {
      title: l.ModuleName,
      hasModule: true,
      limitInfo: l.ModuleLevelName,
      href: '/products/modules/' + encodeURI(l.ProductName),
      imageUrl: getIconRefFromModuleName(l.ModuleName)
    };
  });

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
            <h1 className="text-7xl font-bold">Dine verktøy</h1>
          </div>

          <div className="flex flex-col justify-center items-center pb-10">
            <p className="mt-4 text-[15px] text-center max-w-xl pt-3">
              Her får du fullstendig oversikt over dine moduler hos oss. Dersom
              du ønsker flere moduler kan du ta{' '}
              <Link href="/products">
                <span className="text-primary dark:text-primary hover:text-accent dark:hover:text-accent font-medium">
                  kontakt med oss
                </span>
              </Link>
              .
            </p>
          </div>
          <NavigationToolbar menuItems={menuItems} />
        </div>
      </div>

      {/* Modules grid */}
      <div className="mt-10 w-full flex justify-center pb-20 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-[1200px] auto-rows-[220px] px-6">
          {modules.map((module: any, index: number) => (
            <ModuleCard key={index} module={module} />
          ))}
        </div>
      </div>
    </div>
  );
}
