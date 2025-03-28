'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function ProductsPage() {
  const [activeIndex, setActiveIndex] = useState(0);

  const menuItems = [
    { label: 'Moduler', icon: 'Modules.png' },
    { label: 'Rapporter', icon: 'Reports.png' },
    {
      label: 'Ekstra funksjonalitet',
      icon: 'Wand.png',
      description: 'Additional features included.'
    },
    {
      label: 'Andre tjenester',
      icon: 'Service.png',
      description: 'Explore other services we offer.'
    }
  ];

  return (
    <div className="flex flex-col relative items-center w-full min-h-screen overflow-y-auto overflow-hidden m-0 p-0">
      {/* Title */}
      <div className="flex flex-col items-center pt-20">
        <h1 className="text-5xl font-bold">Dine verktøy</h1>
      </div>

      {/* Description */}
      <div className="flex flex-col justify-center items-center pb-20">
        <p className="mt-4 text-[15px] w-[400px]">
          Oversikt over alle verktøy og moduler du har tilgang til. Du kan også
          gi{' '}
          <Link href="/suggestions">
            <span className="text-[#546bff] hover:text-[#324099] font-medium">
              tilbakemeldinger
            </span>
          </Link>{' '}
          eller få{' '}
          <Link href="/videos">
            <span className="text-[#546bff] hover:text-[#324099] font-medium">
              opplæring
            </span>
          </Link>
          .
        </p>
      </div>

      {/* Navigation Bar */}
      <div className="flex flex-wrap rounded-xl w-full max-w-[1200px] bg-white h-14 shadow-lg justify-center md:justify-between ">
        {menuItems.map((item, index) => (
          <span
            key={index}
            className={`cursor-pointer transition-colors duration-200 py-2 w-full gap-2 text-center rounded-xl flex-1 flex items-center justify-center ${
              activeIndex === index
                ? 'bg-[#111625] text-white font-semibold'
                : 'hover:text-blue-500'
            }`}
            onClick={() => setActiveIndex(index)}
          >
            <img
              src={item.icon}
              alt={`${item.label} icon`}
              className={`w-5 h-5 transition duration-200 ${
                activeIndex === index ? 'invert brightness-200' : ''
              }`}
            />
            {item.label}
          </span>
        ))}
      </div>

      {/* Description Box */}
      <div className="mt-4 w-[1200px] h-[240px] flex flex-col justify-center items-center pt-7">
        {activeIndex !== null ? (
          <p>{menuItems[activeIndex].description}</p>
        ) : (
          <p className="text-gray-500">
            Velg en kategori for å se mer informasjon.
          </p>
        )}

        {/* Eksempelinnhold når "Moduler" er valgt */}
        {activeIndex === 0 && (
          <div className="flex justify-center w-full h-[220px] gap-3">
            <div className="bg-white border p-4 rounded-[16px] w-full h-full flex flex-col">
              <Link href="/suggestions">
                <span className="hover:text-[#324099] font-bold">
                  Aksjer og fond
                </span>
              </Link>
              <p>Legge til funksjonalitet her</p>
            </div>

            <div className="bg-white border p-4 rounded-[16px] w-full h-full flex flex-col">
              <Link href="/suggestions">
                <span className="hover:text-[#324099] font-bold">
                  Eksempel 2
                </span>
              </Link>
              <p>Legge til funksjonalitet her</p>
            </div>

            <div className="bg-white border p-4 rounded-[16px] w-full h-full flex flex-col">
              <Link href="/suggestions">
                <span className="hover:text-[#324099] font-bold">
                  Eksempel 3
                </span>
              </Link>
              <p>Legge til funksjonalitet her</p>
            </div>
          </div>
        )}

        {/* Eksempelinnhold når "Rapporter" er valgt */}
        {activeIndex === 1 && (
          <div className="flex justify-center w-full h-[220px] gap-3">
            <div className="bg-white border p-4 rounded-[16px] w-[350px] h-full flex flex-col">
              <Link href="/suggestions">
                <span className="hover:text-[#324099] font-bold">
                  Rapport 1
                </span>
              </Link>
              <p>Legge til funksjonalitet her</p>
            </div>

            <div className="bg-white border p-4 rounded-[16px] w-[350px] h-full flex flex-col">
              <Link href="/suggestions">
                <span className="hover:text-[#324099] font-bold">
                  Rapport 2
                </span>
              </Link>
              <p>Legge til funksjonalitet her</p>
            </div>
          </div>
        )}
      </div>

      {/* Se mer box */}
      <div className="pt-5 pb-20">
        <Link
          href="/articles" // Bytt evt. til en annen side
          className="flex gap-2 justify-center items-center"
        >
          <span className="text-[#546bff] hover:text-[#324099] font-medium">
            Se mer
          </span>
          <img src="/right-arrow.png" alt="Arrow" className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
