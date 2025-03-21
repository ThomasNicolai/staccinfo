// app/page.tsx
"use client";
import Link from "next/link";
import { useState } from "react";




export default function HomePage() {

  const [activeIndex, setActiveIndex] = useState(0);

  const menuItems = [
    { label: "Moduler" },
    { label: "Reports", description: "Detailed reports available here." },
    { label: "Ekstra funksjonalitet", description: "Additional features included." },
    { label: "Andre tjenester", description: "Explore other services we offer." },
  ];


  return (


    <div className="flex min-h-screen flex-col items-center gap-6 p-4 border-2 border-black">

      <div className="border-2 border-black flex flex-col items-center p-20">
        <h1 className="text-5xl font-bold">Velkommen tilbake!</h1>
      </div>

      <div className="border-2 border-black">
        <p className="mt-4 text-lg w-[400px]"> Enkel oversikt over dine moduler og tjenester. Du kan også gi{" "}
          <Link href="/suggestions">
            <span className="text-[#546bff] hover:text-[#324099] font-medium">tilbakemeldinger</span>
          </Link>{" "}
          og få {" "}
          <Link href="">
            <span className="text-[#546bff] hover:text-[#324099] font-medium">opplæring</span>
          </Link>{" "}  i våre ulike tjenester.
        </p>
      </div>

     
      
      {/* Navigation Bar */}
      <div className="flex rounded-xl w-full bg-white h-14">
        {menuItems.map((item, index) => (
         <span
          key={index}
          className={`cursor-pointer transition-colors duration-200 py-2 w-full  text-center rounded-xl flex-1 flex items-center justify-center ${
          activeIndex === index
          ? "bg-[#111625] text-white font-semibold"
          : "hover:text-blue-500"
        }`}
        onClick={() => setActiveIndex(index)}
          >
        {item.label}
        </span>
        ))}
      </div>

      {/* Description Box */}
      <div className="border-2 border-black p-4 mt-4 w-[400px] min-h-[50px]">


        {activeIndex !== null ? (
          <p>{menuItems[activeIndex].description}</p>
        ) : (
          <p className="text-gray-500">Velg en kategori for å se mer informasjon.</p>
        )}


        {/* Show extra divs when 'Moduler' is selected */}
        {activeIndex === 0 && (
          <div className="flex justify-center flex w-full ">
            <div className="border border-black p-4 rounded-lg">Aksjer og fond</div>
            <div className="border border-black p-4 rounded-lg">Obligasjoner</div>
            <div className="border border-black p-4 rounded-lg">Intern handler </div>
          </div>
        )}


      </div>


      <div className="border-2 border-black">
      <p> Boks </p>
      <p> Boks </p>
      <p> Boks </p>
      </div>

      <div className="border-2 border-black">
      <p> Se mer, skal være en link  </p>
      </div>

    </div>
  );
}
