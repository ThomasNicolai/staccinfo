'use client';
import SharedPageWrapper from '@/components/sharedpagewrapper';
import Link from 'next/link';

export default function ProductsPage() {
  return (
    <div className="relative">
      {/* Dekorativ uthult sirkel i bakgrunnen */}
      <div className="absolute top-[-65px] left-[-170px] w-[390px] h-[390px] rounded-full transform translate-x-1 translate-y-1/3 bg-gradient-to-b from-[#627afa] to-[rgba(139,170,255,0.5)] p-[55px] pointer-events-none z-0">
        <div className="w-full h-full rounded-full bg-background"></div>
      </div>

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
    </div>
  );
}
