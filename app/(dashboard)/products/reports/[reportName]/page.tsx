import React from 'react';
import NavigationToolbar from 'app/(dashboard)/products/NavigationToolbar';

export default async function ReportPage({
  params
}: {
  params: Promise<{ reportName: string }>;
}) {
  const reportName = (await params).reportName;

  // Rest of your code remains the same...
  const normalizedName = reportName
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

  // Existing logic continues...
  let pdfUrl = '';

  if (normalizedName.includes('likviditetsrapport')) {
    pdfUrl = '/Likviditetsrapport.pdf';
  } else if (normalizedName.includes('covenant')) {
    pdfUrl = '/Covenant.pdf';
  } else if (
    normalizedName.includes('valutaeksponering') &&
    normalizedName.includes('kontantstrom')
  ) {
    pdfUrl = '/Valutaeksponering - Kontantstrøm.pdf';
  }

  // Use Example_raport.pdf if no specific PDF is found
  pdfUrl = pdfUrl || '/Example_raport.pdf';

  // Capitalize the first letter of the reportName
  const displayTitle = reportName.charAt(0).toUpperCase() + reportName.slice(1);

  // Menu items for the navigation toolbar
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
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Decorative hollow circle in the background */}
      <div className="absolute top-[-65px] left-[-170px] w-[390px] h-[390px] rounded-full transform translate-x-1 translate-y-1/3 bg-gradient-to-b from-[hsl(var(--primary))] to-[hsl(var(--secondary))] p-[55px] pointer-events-none z-[-1]">
        <div className="w-full h-full rounded-full bg-background dark:bg-background"></div>
      </div>

      {/* Header section */}
      <div className="relative z-10 pt-6 px-6">
        <div className="w-full max-w-[1200px] mx-auto">
          {/* Title and subtitle */}
          <div className="flex flex-col items-center pt-10">
            <h1 className="text-7xl font-bold">{displayTitle}</h1>
          </div>

          <div className="flex flex-col justify-center items-center pb-10">
            <p className="mt-4 text-[15px] text-center max-w-xl pt-3">
              Detailed information about the {displayTitle.toLowerCase()}{' '}
              report.
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
              {displayTitle} Report
            </h2>

            {pdfUrl ? (
              <div className="w-full h-[800px]">
                <iframe
                  src={pdfUrl}
                  className="w-full h-full border-0"
                  title={`${displayTitle} Report`}
                />
              </div>
            ) : (
              <p className="text-lg mb-6 text-muted-foreground dark:text-muted-foreground">
                This is a placeholder for the "{reportName}" report.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
