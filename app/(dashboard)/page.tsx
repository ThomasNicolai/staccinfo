import HomePageClient from './dashboardClient';

export default async function HomePage() {
  return (
    <div className="relative min-h-screen">
      {/* Decorative circle in background */}
      <div className="absolute top-[-65px] left-[-170px] w-[390px] h-[390px] rounded-full transform translate-x-1 translate-y-1/3 bg-gradient-to-b from-[hsl(var(--primary))] to-[hsl(var(--secondary))] p-[55px] pointer-events-none z-0">
        <div className="w-full h-full rounded-full bg-background dark:bg-background"></div>
      </div>

      <div className="absolute top-0 right-0 w-[350px] h-[350px] bg-gradient-to-br from-[#7590fa] to-[#bfcafa] rounded-full transform translate-x-1/3 -translate-y-1/3"></div>

      {/* Content */}
      <div className="relative z-10">
        <HomePageClient />
      </div>
    </div>
  );
}
