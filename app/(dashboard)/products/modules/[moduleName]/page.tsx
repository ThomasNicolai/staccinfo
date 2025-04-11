import SharedPageWrapper from '@/components/sharedpagewrapper';

export default async function AksjerFondPage({
  params
}: {
  params: Promise<{ moduleName: string }>;
}) {
  const moduleName = (await params).moduleName;

  return (
    <div className="relative overflow-x-hidden">
      {/* Dekorativ uthult sirkel i venstre hjørne */}
      <div className="absolute top-[-65px] left-[-170px] w-[390px] h-[390px] rounded-full transform translate-x-1 translate-y-1/3 bg-gradient-to-b from-[hsl(var(--primary))] to-[hsl(var(--secondary))] p-[55px] pointer-events-none z-0">
        <div className="w-full h-full rounded-full bg-background dark:bg-background"></div>
      </div>
      <SharedPageWrapper
        title={moduleName}
        subtitle="Detailed info about the module."
        defaultActiveIndex={-1}
      >
        <div className="w-full max-w-[1400px] mx-auto bg-card dark:bg-card shadow-lg rounded-xl p-6">
          <h2 className="text-3xl font-bold mb-4 text-foreground dark:text-foreground">
            {moduleName}
          </h2>
          <p className="text-lg mb-6 text-muted-foreground dark:text-muted-foreground">
            This is a placeholder for the "{moduleName}" module.
          </p>
        </div>
      </SharedPageWrapper>
    </div>
  );
}
