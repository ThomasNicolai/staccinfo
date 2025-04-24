'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import NavigationToolbar from 'app/(dashboard)/products/NavigationToolbar';

export default function ModuleDetailPage() {
  // Get the module name from URL params
  const params = useParams();
  const moduleName = params.moduleName as string;

  // Format module name for display (capitalize and replace hyphens)
  const displayModuleName = moduleName
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

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

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Decorative circle in background */}
      <div className="absolute top-[-65px] left-[-170px] w-[390px] h-[390px] rounded-full transform translate-x-1 translate-y-1/3 bg-gradient-to-b from-[hsl(var(--primary))] to-[hsl(var(--secondary))] p-[55px] pointer-events-none z-[-1]">
        <div className="w-full h-full rounded-full bg-background dark:bg-background"></div>
      </div>

      {/* Header section */}
      <div className="relative z-10 pt-6 px-6">
        <div className="w-full max-w-[1200px] mx-auto">
          {/* Title and subtitle */}
          <div className="flex flex-col items-center pt-10">
            <h1 className="text-7xl font-bold">{displayModuleName}</h1>
          </div>

          <div className="flex flex-col justify-center items-center pb-10">
            <p className="mt-4 text-[15px] text-center max-w-xl pt-3">
              Detailed information about the {displayModuleName.toLowerCase()}{' '}
              module.
            </p>
          </div>

          {/* Navigation toolbar */}
          <NavigationToolbar menuItems={menuItems} />
        </div>
      </div>

      {/* Content section */}
      <div className="mt-10 w-full flex justify-center pb-20 relative z-10">
        <div className="w-full max-w-[1400px] mx-auto px-6">
          <div className="bg-card dark:bg-card border dark:border-border shadow-lg rounded-xl p-6">
            <h2 className="text-3xl font-bold mb-4 text-foreground dark:text-foreground">
              {displayModuleName}
            </h2>
            <p className="text-lg mb-6 text-muted-foreground dark:text-muted-foreground">
              This is a placeholder for the "{displayModuleName}" module.
            </p>

            {/* Additional module content can be added here */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-3">Features</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Feature 1: Description of feature</li>
                <li>Feature 2: Description of feature</li>
                <li>Feature 3: Description of feature</li>
                <li>Feature 4: Description of feature</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
