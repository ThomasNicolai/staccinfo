'use client';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useContext, useState } from 'react';
import { UserContext } from './userContext';
import { LicensesContext } from './licensesContext';

export default function HomePageClient() {
  const userData = useContext(UserContext);
  console.log(userData);
  const licences = useContext(LicensesContext);
  console.log(licences);
  const { data: session } = useSession();

  const [activeIndex, setActiveIndex] = useState(0);
  const menuItems = [
    { label: 'Moduler', icon: 'Modules.png' },
    { label: 'Rappporter', icon: 'Reports.png' },
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
        <h1 className="text-5xl font-bold">
          Velkommen tilbake, {session?.user?.name}!
        </h1>
      </div>

      {/* Description */}
      <div className="flex flex-col justify-center items-center pb-20">
        <p className="mt-4 text-[15px] w-[400px]">
          Enkel oversikt over dine moduler og tjenester. Du kan også gi{' '}
          <Link href="/suggestions">
            <span className="text-primary hover:text-secondary font-medium">
              tilbakemeldinger
            </span>
          </Link>{' '}
          og få{' '}
          <Link href="">
            <span className="text-primary hover:text-secondary font-medium">
              opplæring
            </span>
          </Link>{' '}
          i våre ulike tjenester.
        </p>
      </div>

      {/* Navigation Bar */}
      <div className="flex flex-wrap rounded-xl w-full max-w-[1200px] mx-auto bg-background dark:bg-background h-14 shadow-lg justify-center md:justify-between">
        {menuItems.map((item, index) => (
          <span
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`cursor-pointer transition-colors duration-200 py-2 w-full gap-2 text-center rounded-xl flex-1 flex items-center justify-center ${
              activeIndex === index
                ? 'bg-black dark:bg-secondary text-primary-foreground dark:text-secondary-foreground font-semibold'
                : 'hover:text-blue-500'
            }`}
          >
            <img
              src={item.icon}
              alt={`${item.label} icon`}
              className={`w-5 h-5 transition duration-200 ${
                activeIndex === index ? 'invert brightness-200' : ''
              }`}
            />
            <span className="text-xs md:text-sm">{item.label}</span>
          </span>
        ))}
      </div>

      {/* Description Box */}
      <div className="mt-4 w-[1200px] h-[240px] flex flex-col justify-center items-center pt-7">
        {activeIndex !== null ? (
          <p>{menuItems[activeIndex].description}</p>
        ) : (
          <p className="text-muted-foreground">
            Velg en kategori for å se mer informasjon.
          </p>
        )}

        {/* Show extra divs when 'Moduler' is selected */}
        {activeIndex === 0 && (
          <div className="flex justify-center w-full h-[220px] gap-3">
            <div className="bg-card border dark:border-border p-4 rounded-[16px] w-full h-full flex flex-col">
              <Link href="/suggestions">
                <span className="hover:text-secondary font-bold">
                  Aksjer og fond
                </span>
              </Link>
              <p>Legge til funksjonalitet her</p>
            </div>

            <div className="bg-card border dark:border-border p-4 rounded-[16px] w-full h-full flex flex-col">
              <Link href="/suggestions">
                <span className="hover:text-secondary font-bold">
                  Eksempel 2
                </span>
              </Link>
              <p>Legge til funksjonalitet her</p>
            </div>

            <div className="bg-card border dark:border-border p-4 rounded-[16px] w-full h-full flex flex-col">
              <Link href="/suggestions">
                <span className="hover:text-secondary font-bold">
                  Eksempel 3
                </span>
              </Link>
              <p>Legge til funksjonalitet her</p>
            </div>
          </div>
        )}

        {/* Show extra divs when 'Rapporter' is selected */}
        {activeIndex === 1 && (
          <div className="flex justify-center w-full h-[220px] gap-3">
            <div className="bg-card border dark:border-border p-4 rounded-[16px] w-[350px] h-full flex flex-col">
              <Link href="/suggestions">
                <span className="hover:text-secondary font-bold">
                  Rapport 1
                </span>
              </Link>
              <p>Legge til funksjonalitet her</p>
            </div>

            <div className="bg-card border dark:border-border p-4 rounded-[16px] w-[350px] h-full flex flex-col">
              <Link href="/suggestions">
                <span className="hover:text-secondary font-bold">
                  Rapport 2
                </span>
              </Link>
              <p>Legge til funksjonalitet her</p>
            </div>
          </div>
        )}
      </div>

      {/* 'Se mer' box */}
      <div className="pt-5 pb-20">
        <Link
          href="/products"
          className="flex gap-2 justify-center items-center"
        >
          <span className="text-primary hover:text-secondary font-medium">
            Se mer
          </span>
          <img src="/right-arrow.png" alt="Arrow" className="w-4 h-4" />
        </Link>
      </div>

      {/* New box */}
      <div className="flex flex-col items-center pb-15 gap-2">
        <h2 className="text-2xl font-bold">Vi hjelper deg gjerne</h2>
        <p>Har du spørsmål eller trenger veiledning?</p>
      </div>

      {/* Container of shortcuts */}
      <div className="flex justify-center items-center gap-4 p-10">
        <Link href="/">
          <div className="w-20 h-20 bg-primary rounded-full overflow-hidden flex items-center justify-center">
            <img
              src="/Modules.png"
              alt="First Icon"
              className="w-10 invert brightness-100 object-cover"
            />
          </div>
        </Link>

        <Link href="/suggestions">
          <div className="w-20 h-20 bg-primary rounded-full overflow-hidden flex items-center justify-center">
            <img
              src="/paper.png"
              alt="Second Icon"
              className="w-10 object-cover brightness-125"
            />
          </div>
        </Link>
      </div>

      {/* FAQ and Videos */}
      <div className="w-[700px] h-[235px] flex gap-3 pb-[20px] mb-[15px]">
        <div className="bg-card shadow-xl p-6 rounded-[16px] w-full h-full flex flex-col">
          <Link href="/videos">
            <p className="text-[25px] font-semibold">Videoer</p>
            <p>Endre font på dette elementet</p>
          </Link>
        </div>

        <div className="bg-card shadow-xl p-4 rounded-[16px] w-full h-full flex flex-col">
          <Link href="/videos">
            <p className="text-[25px] font-semibold">FAQs</p>
            <p>Endre font på dette elementet</p>
          </Link>
        </div>
      </div>

      {/* Snarveier */}
      <div className="w-[700px] h-[230px] bg-card shadow-xl rounded-[16px] flex justify-center items-center gap-16 mb-[70px]">
        <Link href="/">
          <div className="w-20 h-20 bg-primary rounded-full overflow-hidden flex items-center justify-center">
            <img
              src="/Modules.png"
              alt="First Icon"
              className="w-10 invert brightness-100 object-cover"
            />
          </div>
        </Link>

        <Link href="/suggestions">
          <div className="w-20 h-20 bg-primary rounded-full overflow-hidden flex items-center justify-center">
            <img
              src="/paper.png"
              alt="Second Icon"
              className="w-10 object-cover brightness-125"
            />
          </div>
        </Link>

        <Link href="/">
          <div className="w-20 h-20 bg-primary rounded-full overflow-hidden flex items-center justify-center">
            <img
              src="/Modules.png"
              alt="First Icon"
              className="w-10 invert brightness-100 object-cover"
            />
          </div>
        </Link>

        <Link href="/suggestions">
          <div className="w-20 h-20 bg-primary rounded-full overflow-hidden flex items-center justify-center">
            <img
              src="/paper.png"
              alt="Second Icon"
              className="w-10 object-cover brightness-125"
            />
          </div>
        </Link>
      </div>

      <div className="flex flex-col items-center pb-15 gap-2">
        <h2 className="text-2xl font-bold">Supportcase</h2>
        <p>Har du spørsmål eller trenger veiledning?</p>
      </div>

      {/* Support Cases */}
      <div className="flex justify-center items-center gap-4 p-10">
        <Link href="/">
          <div className="max-w-[200px] overflow-hidden flex flex-col items-center justify-center gap-4">
            <img
              src="/Case.png"
              alt="First Icon"
              className="w-20 object-cover"
            />
            <p className="font-bold text-xl text-svart">Case</p>
            <p className="text-center">
              Lörem ipsum bilmålvakt intramis, de kronera, av plat
            </p>
            <div className="flex items-center justify-center text-primary hover:text-secondary gap-1">
              <span className="align-middle">Les</span>
              <img
                src="/arrow_short.png"
                alt="Arrow Icon"
                className="w-3 h-3 relative top-[1px] contrast-150"
              />
            </div>
          </div>
        </Link>

        <Link href="/">
          <div className="max-w-[200px] overflow-hidden flex flex-col items-center justify-center gap-4">
            <img
              src="/Case.png"
              alt="First Icon"
              className="w-20 object-cover"
            />
            <p className="font-bold text-xl text-svart">Case</p>
            <p className="text-center">
              Lörem ipsum bilmålvakt intramis, de kronera, av plat
            </p>
            <div className="flex items-center justify-center text-primary hover:text-secondary gap-1">
              <span className="align-middle">Les</span>
              <img
                src="/arrow_short.png"
                alt="Arrow Icon"
                className="w-3 h-3 relative top-[1px] contrast-150"
              />
            </div>
          </div>
        </Link>

        <Link href="/">
          <div className="max-w-[200px] overflow-hidden flex flex-col items-center justify-center gap-4">
            <img
              src="/Case.png"
              alt="First Icon"
              className="w-20 object-cover"
            />
            <p className="font-bold text-xl text-svart">Case</p>
            <p className="text-center">
              Lörem ipsum bilmålvakt intramis, de kronera, av plat
            </p>
            <div className="flex items-center justify-center text-primary hover:text-secondary gap-1">
              <span className="align-middle">Les</span>
              <img
                src="/arrow_short.png"
                alt="Arrow Icon"
                className="w-3 h-3 relative top-[1px] contrast-150"
              />
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
