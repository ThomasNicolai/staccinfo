'use client';

import React from 'react';
import Link from 'next/link';
import NavigationToolbar from 'app/(dashboard)/products/NavigationToolbar';
import { ModuleCard } from 'app/(dashboard)/products/modulecard';

export default function ModulesPage() {
  // Menu items for the navigation toolbar
  const menuItems = [
    { label: 'Moduler', icon: '/Modules.png', href: '/products/modules' },
    { label: 'Rapporter', icon: '/Reports.png', href: '/products/reports' },
    {
      label: 'Ekstra funksjonalitet',
      icon: '/Wand.png',
      href: '/products/extra'
    },
    {
      label: 'Andre tjenester',
      icon: '/Service.png',
      href: '/products/services'
    }
  ];

  // Array med alle mulige moduler - moved from SharedPageWrapper
  const modules = [
    {
      title: 'Aksjer og fond',
      href: '/products/modules/aksjer-fond',
      hasModule: true,
      limitInfo: '250 MNOK i transaksjoner',
      yearlyTransactions: 100,
      imageUrl: '/stock.png'
    },
    {
      title: 'Obligasjoner',
      href: '/products/modules/obligasjoner',
      hasModule: true,
      limitInfo: '250 MNOK i transaksjoner',
      yearlyTransactions: 100,
      imageUrl: '/agreement.png'
    },
    {
      title: 'Intern Handler',
      href: '/products/modules/intern-handler',
      hasModule: false,
      limitInfo: '250 MNOK i transaksjoner',
      yearlyTransactions: 100,
      imageUrl: '/handler.png'
    },
    {
      title: 'Derivater',
      href: '/products/modules/derivater',
      hasModule: false,
      limitInfo: '250 MNOK i transaksjoner',
      yearlyTransactions: 100,
      imageUrl: '/derivatives.png'
    },
    {
      title: 'FX Derivater',
      href: '/products/modules/fx-derivater',
      hasModule: false,
      limitInfo: '250 MNOK i transaksjoner',
      yearlyTransactions: 100,
      imageUrl: '/exchange-rate.png'
    },
    {
      title: 'Rentederivater',
      href: '/products/modules/rentederivater',
      hasModule: true,
      limitInfo: '250 MNOK i transaksjoner',
      yearlyTransactions: 100,
      imageUrl: '/tax.png'
    },
    {
      title: 'Gjeld',
      href: '/products/modules/gjeld',
      hasModule: true,
      limitInfo: '250 MNOK i transaksjoner',
      yearlyTransactions: 100,
      imageUrl: '/borrow.png'
    },
    {
      title: 'Internal bank/lending',
      href: '/products/modules/internal-bank-lending',
      hasModule: true,
      limitInfo: '250 MNOK i transaksjoner',
      yearlyTransactions: 100,
      imageUrl: '/lend.png'
    },
    {
      title: 'Funds transparency',
      href: '/products/modules/funds-transparency',
      hasModule: true,
      limitInfo: '250 MNOK i transaksjoner',
      yearlyTransactions: 100,
      imageUrl: '/tran.png'
    },
    {
      title: 'Leasing module',
      href: '/products/modules/leasing-module',
      hasModule: true,
      limitInfo: '250 MNOK i transaksjoner',
      yearlyTransactions: 100,
      imageUrl: '/lease.png'
    },
    {
      title: 'Interpretation of contract notes',
      href: '/products/modules/interpretation-contract-notes',
      hasModule: true,
      limitInfo: '250 MNOK i transaksjoner',
      yearlyTransactions: 100,
      imageUrl: '/contract.png'
    }
  ];

  return (
    <div className="relative min-h-screen">
      {/* Decorative circle in background */}
      <div className="absolute top-[-65px] left-[-170px] w-[390px] h-[390px] rounded-full transform translate-x-1 translate-y-1/3 bg-gradient-to-b from-[hsl(var(--primary))] to-[hsl(var(--secondary))] p-[55px] pointer-events-none z-0">
        <div className="w-full h-full rounded-full bg-background dark:bg-background"></div>

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
          {modules.map((module, index) => (
            <ModuleCard key={index} module={module} />
          ))}
        </div>
      </div>
    </div>
  );
}
