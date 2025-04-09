import SharedPageWrapper from '@/components/sharedpagewrapper';

export default async function ReportPage({
  params
}: {
  params: Promise<{ reportName: string }>;
}) {
  const reportName = (await params).reportName;
  // Normalize string to remove accents for matching
  const normalizedName = reportName
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
    
  let pdfUrl = '';

  if (normalizedName.includes('likviditetsrapport')) {
    pdfUrl = '/Likviditetsrapport.pdf';
  } else if (normalizedName.includes('covenant')) {
    pdfUrl = '/Covenant.pdf';
  } else if (normalizedName.includes('valutaeksponering') && normalizedName.includes('kontantstrom')) {
    pdfUrl = '/Valutaeksponering - Kontantstrøm.pdf';
  }
  
  // Use Example_raport.pdf if no specific PDF is found
  pdfUrl = pdfUrl || '/Example_raport.pdf';
  
  // Capitalize the first letter of the reportName 
  const displayTitle = reportName.charAt(0).toUpperCase() + reportName.slice(1);

  return (
    <SharedPageWrapper
      title={displayTitle}
      subtitle="Detailed info about the report."
      defaultActiveIndex={-1}
    >
      <div className="w-full max-w-[1400px] mx-auto bg-white shadow-lg rounded-xl p-6">
        <div className="mt-8">
          <iframe 
            src={encodeURI(pdfUrl)} 
            title={displayTitle} 
            className="w-full" 
            style={{ height: 'calc(100vh - 300px)' }}
          />
        </div>
      </div>
    </SharedPageWrapper>
  );
}
