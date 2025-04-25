'use client';

import { useState } from 'react';
import Link from 'next/link';
import NavigationToolbar from 'app/(dashboard)/products/NavigationToolbar';

type Report = {
  title: string;
  href: string;
};

export default function ReportsPage() {
  // Array med alle mulige escalirapporter.
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

  const escaliReports: Report[] = [
    { title: 'Budsjett', href: '/products/reports/budsjett' },
    { title: 'Bokført verdi', href: '/products/reports/bokfort-verdi' },
    { title: 'Fondsovervåkning', href: '/products/reports/fondsovervakning' },
    { title: 'Kontoppsett', href: '/products/reports/kontoppsett' },
    { title: 'Kontrollister', href: '/products/reports/kontrollister' },
    {
      title: 'Lån og rentepapirer',
      href: '/products/reports/lan-og-rentepapirer'
    },
    { title: 'Låneavtale', href: '/products/reports/laneavtale' },
    {
      title: 'Periodisk avkastning',
      href: '/products/reports/periodisk-avkastning'
    },
    {
      title: 'Regnskapsinstruksjon',
      href: '/products/reports/regnskapsinstruksjon'
    },
    { title: 'Rentefaktura', href: '/products/reports/rentefaktura' },
    { title: 'Renter', href: '/products/reports/renter' },
    {
      title: 'Skatterapportering',
      href: '/products/reports/skatterapportering'
    },
    { title: 'Transaksjoner', href: '/products/reports/transaksjoner' },
    {
      title: 'Transaksjonsdetaljer',
      href: '/products/reports/transaksjonsdetaljer'
    },
    { title: 'Valutaderivater', href: '/products/reports/valutaderivater' }
  ];

  // Array med alle modellrapporter.
  const modelReports: Report[] = [
    { title: 'Gjeld', href: '/products/reports/gjeld' },
    { title: 'Investeringer', href: '/products/reports/investeringer' },
    { title: 'Leasing', href: '/products/reports/leasing' },
    { title: 'Regnskap', href: '/products/reports/regnskap' },
    { title: 'Risk manager', href: '/products/reports/risk-manager' }
  ];

  // Array med alle rapporter i rapportpakken.
  const reportPack: Report[] = [
    { title: 'Aksjeeierbok', href: '/products/reports/aksjeeierbok' },
    { title: 'Budsjettering', href: '/products/reports/budsjettering' },
    { title: 'Covenant', href: '/products/reports/covenant' },
    { title: 'Indeksattribusjon', href: '/products/reports/indeksattribusjon' },
    { title: 'Intercompany debt', href: '/products/reports/intercompany-debt' },
    {
      title: 'Likviditetsrapport',
      href: '/products/reports/likviditetsrapport'
    },
    { title: 'Markedsrisiko', href: '/products/reports/markedsrisiko' },
    { title: 'Nordnet', href: '/products/reports/nordnet' },
    { title: 'Noter IFRS', href: '/products/reports/noter-ifrs' },
    {
      title: 'Pengemarkedsinvestering',
      href: '/products/reports/pengemarkedsinvestering'
    },
    {
      title: 'Refinansieringsrisiko',
      href: '/products/reports/refinansieringsrisiko'
    },
    { title: 'Renterisiko', href: '/products/reports/renterisiko' },
    {
      title: 'Valutaeksponering - Balanse',
      href: '/products/reports/valutaeksponering-balanse'
    },
    {
      title: 'Valutaeksponering - Kontantstrøm',
      href: '/products/reports/valutaeksponering-kontantstrom'
    }
  ];

  // Alle rapporter i kategorien skreddersydd rapport.
  const tailoredReports: Report[] = [
    {
      title: 'Skreddersydd rapport',
      href: '/products/reports/skreddersydd-rapport'
    }
  ];

  // Definer state for toggling av rapport kategori.
  const [showEscali, setShowEscali] = useState(true);
  const [showModel, setShowModel] = useState(true);
  const [showReportPack, setShowReportPack] = useState(true);
  const [showTailored, setShowTailored] = useState(true);

  return (
    <div className="relative min-h-screen">
      {/* Decorative circle in background */}
      <div className="absolute top-[-65px] left-[-170px] w-[390px] h-[390px] rounded-full transform translate-x-1 translate-y-1/3 bg-gradient-to-b from-[hsl(var(--primary))] to-[hsl(var(--secondary))] p-[55px] pointer-events-none z-0">
        <div className="w-full h-full rounded-full bg-background dark:bg-background"></div>
      </div>

      {/* Header section - keep z-10 */}
      <div className="relative z-10 pt-6 px-6">
        <div className="w-full max-w-[1200px] mx-auto">
          {/* Navigation toolbar */}

          {/* Title and subtitle */}
          <div className="flex flex-col items-center pt-10">
            <h1 className="text-7xl font-bold">Dine verktøy</h1>
          </div>

          <div className="flex flex-col justify-center items-center pb-10">
            <p className="mt-4 text-[15px] text-center max-w-xl pt-3">
              Her får du fullstendig oversikt over alle rapporter i Escali
              Financials. Velg rapportgruppen du ønsker å se eller søk etter
              spesifikke rapporter.
            </p>
          </div>
          <NavigationToolbar menuItems={menuItems} />
        </div>
      </div>

      {/* Content section - add z-10 to match header */}
      <div className="mt-10 w-full flex flex-col items-center pb-20 relative z-10">
        <div className="w-full max-w-[1200px] flex flex-col gap-4 px-6">
          {/* Escalirapporter klikkbar tittel */}
          <div
            className="bg-card dark:bg-card border dark:border-border p-4 rounded-[16px] flex items-center justify-center cursor-pointer"
            onClick={() => setShowEscali(!showEscali)}
          >
            <h2 className="text-xl font-bold">Escali Financials Rapporter</h2>
          </div>

          {/* Hvis showEscali er true vil rapportkort for alle escalirapporter vises */}
          {showEscali && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[220px]">
              {escaliReports.map((report, index) => (
                <Link key={index} href={report.href}>
                  <div className="bg-card dark:bg-card border dark:border-border p-4 rounded-[16px] flex flex-col h-full items-center justify-center">
                    <span className="text-lg font-bold">{report.title}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Modellrapporter klikkbar tittel */}
          <div
            className="bg-card dark:bg-card border dark:border-border p-4 rounded-[16px] flex items-center justify-center cursor-pointer mt-6"
            onClick={() => setShowModel(!showModel)}
          >
            <h2 className="text-xl font-bold">Modellrapporter</h2>
          </div>
          {showModel && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[220px]">
              {modelReports.map((report, index) => (
                <Link key={index} href={report.href || '#'}>
                  <div className="bg-card dark:bg-card border dark:border-border p-4 rounded-[16px] flex flex-col h-full items-center justify-center">
                    <span className="text-lg font-bold">{report.title}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Rapportpakke klikkbar tittel */}
          <div
            className="bg-card dark:bg-card border dark:border-border p-4 rounded-[16px] flex items-center justify-center cursor-pointer mt-6"
            onClick={() => setShowReportPack(!showReportPack)}
          >
            <h2 className="text-xl font-bold">Rapportpakker</h2>
          </div>

          {/* Hvis showReportPack er true, vises gridet med rapportpakkekort */}
          {showReportPack && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[220px]">
              {reportPack.map((report, index) => (
                <Link key={index} href={report.href || '#'}>
                  <div className="bg-card dark:bg-card border dark:border-border p-4 rounded-[16px] flex flex-col h-full items-center justify-center">
                    <span className="text-lg font-bold">{report.title}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Skreddersydd rapport klikkbar tittel */}
          <div
            className="bg-card dark:bg-card border dark:border-border p-4 rounded-[16px] flex items-center justify-center cursor-pointer mt-6"
            onClick={() => setShowTailored(!showTailored)}
          >
            <h2 className="text-xl font-bold">Skreddersydd rapport</h2>
          </div>

          {showTailored && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[220px]">
              {tailoredReports.map((report, index) => (
                <Link key={index} href={report.href || '#'}>
                  <div className="bg-card dark:bg-card border dark:border-border p-4 rounded-[16px] flex flex-col h-full items-center justify-center">
                    <span className="text-lg font-bold">{report.title}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
