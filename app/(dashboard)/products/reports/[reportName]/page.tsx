import SharedPageWrapper from '@/components/sharedpagewrapper';

export default async function ReportPage({
  params
}: {
  params: Promise<{ reportName: string }>;
}) {
  const reportName = (await params).reportName;
  return (
    <SharedPageWrapper
      title={reportName}
      subtitle="Detailed info about the report."
      defaultActiveIndex={-1}
    >
      <div className="w-full max-w-[1400px] mx-auto bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">{reportName}</h2>
        <p className="text-gray-700 text-lg mb-6">
          This is a placeholder for the "{reportName}" report.
        </p>
      </div>
    </SharedPageWrapper>
  );
}
