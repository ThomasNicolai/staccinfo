import HomePageClient from './dashboardClient';

// This DashboardPage now uses the old HomePageClient dashboard, not the videos page.
export default async function DashboardPage() {
  return <HomePageClient />;
}
