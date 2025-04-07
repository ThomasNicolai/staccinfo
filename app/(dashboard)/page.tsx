import { getActiveLicenses } from '@/lib/queries';
import HomePageClient from './dashboardClient';

export default async function HomePage() {
  const licences = getActiveLicenses(190);
  console.log(licences);
  return <HomePageClient />;
}
