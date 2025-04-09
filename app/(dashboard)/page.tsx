import { getActiveLicenses } from '@/lib/queries';
import HomePageClient from './dashboardClient';

export default async function HomePage() {
  const licences = (await getActiveLicenses(190)).result;
  // console.log(licences);
  return <HomePageClient licences={licences} />;
}
