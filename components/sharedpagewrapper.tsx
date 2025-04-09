'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ModuleCard } from './modulecard';

// Definerer interface til navigasjonsbaren.
interface MenuItem {
  label: string;
  icon: string;
  href?: string; // Til senere i tilfelle et element i navigasjon skal navigere til egen side.
}

// Alle props for komponenten.
interface SharedPageWrapperProps {
  title: string;
  subtitle: React.ReactNode;
  children?: React.ReactNode;
  defaultActiveIndex?: number; // Ny prop for initialt aktiv fane. Standard er 0.
}

export default function SharedPageWrapper({
  title,
  subtitle,
  children,
  defaultActiveIndex = 0
}: SharedPageWrapperProps) {
  // Bestemmer hvilken fane i navigasjon som er aktiv.
  const [activeIndex, setActiveIndex] = useState<number>(defaultActiveIndex);

  // Definer nagivasjonselementene. Ingen href foreløpig, fungerer som ulike faner.
  const menuItems: MenuItem[] = [
    { label: 'Moduler', icon: '/Modules.png' },
    { label: 'Rapporter', icon: '/Reports.png' },
    { label: 'Ekstra funksjonalitet', icon: '/Wand.png' },
    { label: 'Andre tjenester', icon: '/Service.png' }
  ];

  // Array med alle mulige moduler
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

  // Array med alle mulige escalirapporter.
  const escaliReports = [
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
  const modelReports = [
    { title: 'Gjeld', href: '/products/reports/gjeld' },
    { title: 'Investeringer', href: '/products/reports/investeringer' },
    { title: 'Leasing', href: '/products/reports/leasing' },
    { title: 'Regnskap', href: '/products/reports/regnskap' },
    { title: 'Risk manager', href: '/products/reports/risk-manager' }
  ];

  // Array med alle rapporter i rapportpakken.

  const reportPack = [
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
  const tailoredReports = [
    {
      title: 'Skreddersydd rapport',
      href: '/products/reports/skreddersydd-rapport'
    }
  ];

  // Definer state for toggling av rapport kategori.
  // Dersom true så vil alle rapportene i kategorien vises.
  const [showEscali, setShowEscali] = useState(true);
  const [showModel, setShowModel] = useState(true);
  const [showReportPack, setShowReportPack] = useState(true);
  const [showTailored, setShowTailored] = useState(true);

  return (
    <div className="flex flex-col relative items-center w-full min-h-screen m-0 p-0">
      {/* Tittel på siden */}
      <div className="flex flex-col items-center pt-10">
        <h1 className="text-7xl font-bold">{title}</h1>
      </div>

      {/* Beskrivelse for siden under tittelen */}
      <div className="flex flex-col justify-center items-center pb-10">
        <p className="mt-4 text-[15px] text-center max-w-xl pt-3">{subtitle}</p>
      </div>

      {/* Navigationsbaren */}
      <div className="flex flex-wrap rounded-xl w-full max-w-[1200px] mx-auto bg-background dark:bg-background h-14 shadow-lg justify-center md:justify-between">
        {menuItems.map((item, index) => {
          if (item.href) {
            return (
              <Link
                key={index}
                href={item.href}
                className={`cursor-pointer transition-colors duration-200 py-2 w-full gap-2 text-center rounded-xl flex-1 flex items-center justify-center ${
                  activeIndex === index
                    ? 'bg-primary dark:bg-secondary text-primary-foreground dark:text-secondary-foreground font-semibold'
                    : 'hover:text-blue-500'
                }`}
                onClick={() =>
                  setActiveIndex((prev) => (prev === index ? -1 : index))
                }
              >
                <img
                  src={item.icon}
                  alt={`${item.label} icon`}
                  className={`w-5 h-5 transition duration-200 ${
                    activeIndex === index ? 'invert brightness-200' : ''
                  }`}
                />
                {item.label}
              </Link>
            );
          } else {
            return (
              <span
                key={index}
                onClick={() =>
                  setActiveIndex((prev) => (prev === index ? -1 : index))
                }
                className={`cursor-pointer transition-colors duration-200 py-2 w-full gap-2 text-center rounded-xl flex-1 flex items-center justify-center ${
                  activeIndex === index
                    ? 'bg-black dark:bg-secondary text-primary-foreground dark:text-secondary-foreground font-semibold'
                    : 'hover:text-blue-500'
                }`}
              >
                <img
                  src={item.icon}
                  alt={`${item.label} icon`}
                  className={`w-5 h-5 transition duration-200 ${
                    activeIndex === index ? 'invert brightness-200' : ''
                  }`}
                />
                {item.label}
              </span>
            );
          }
        })}
      </div>

      {/* Innhold for Moduler når det er valgt */}
      {activeIndex === 0 && (
        <div className="mt-10 w-full flex justify-center pb-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-[1200px] auto-rows-[220px]">
            {modules.map((module, index) => (
              <ModuleCard key={index} module={module} />
            ))}
          </div>
        </div>
      )}

      {/* Innhold for Rapporter når det er valgt */}
      {activeIndex === 1 && (
        // Denne blokken vises når man velger rapporter.
        <div className="mt-10 w-full flex flex-col items-center pb-20">
          <div className="w-full max-w-[1200px] flex flex-col gap-4">
            {/* Escalirapporter klikkbar tittel */}
            <div
              className="bg-card dark:bg-card border dark:border-border p-4 rounded-[16px] flex items-center justify-center cursor-pointer"
              onClick={() => setShowEscali(!showEscali)} // Toggle for Escalirapporter
            >
              <h2 className="text-xl font-bold">Escali Financials Rapporter</h2>
            </div>

            {/* Hvis showEscali er true vil rapportkort for alle escalirapporter vises */}
            {showEscali && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[220px]">
                {escaliReports.map((report, index) => (
                  <Link key={index} href={report.href}>
                    <div className="bg-card dark:bg-card border dark:border-border p-4 rounded-[16px] flex flex-col h-full items-center justify-center">
                      {/* Viser tittelen på rapporten */}
                      <span className="text-lg font-bold">{report.title}</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* Modellrapporter klikkbar tittel  */}
            <div
              className="bg-card dark:bg-card border dark:border-border p-4 rounded-[16px] flex items-center justify-center cursor-pointer mt-6"
              onClick={() => setShowModel(!showModel)} // Toggle for modellrapporter
            >
              <h2 className="text-xl font-bold">Modellrapporter</h2>
            </div>
            {showModel && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[220px]">
                {modelReports.map((report, index) => (
                  // Hvis du ønsker disse klikkbare, pakk dem også i Link (bruk report.href om tilgjengelig)
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
              onClick={() => setShowReportPack(!showReportPack)} // Toggle for rapportpakker
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
              onClick={() => setShowTailored(!showTailored)} // Toggle for skreddersydd rapport
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
      )}

      {/* Hvis sidespesifikt innhold eller children */}
      {children && <div className="w-full max-w-[1200px] p-4">{children}</div>}
    </div>
  );
}
