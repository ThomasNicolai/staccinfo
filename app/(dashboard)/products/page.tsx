'use client';
import SharedPageWrapper from '@/components/sharedpagewrapper';
import Link from 'next/link';

export default function ProductsPage() {
  return (
    <SharedPageWrapper
      title="Dine verktøy"
      subtitle={
        <>
          Her får du fullstendig oversikt over dine moduler hos oss. Dersom du
          ønsker flere moduler kan du ta{' '}
          <Link href="/products">
            <span className="text-[#546bff] hover:text-[#324099] font-medium">
              kontakt med oss
            </span>
          </Link>
          .
        </>
      }
    >
      {/* Eventuelt ekstra innhold som er spesifikt for Products-siden */}
    </SharedPageWrapper>
  );
}
