// app/page.tsx
"use client";
import Link from "next/link";
import { useState } from "react";




export default function HomePage() {

  const [activeIndex, setActiveIndex] = useState(0);

  const menuItems = [
    { label: "Moduler", icon: "Modules.png" },
    { label: "Reports", icon: "Reports.png", description: "Detailed reports available here." },
    { label: "Ekstra funksjonalitet", icon: "Wand.png", description: "Additional features included." },
    { label: "Andre tjenester", icon: "Service.png", description: "Explore other services we offer." },
  ];


  return (


    <div className="flex flex-col relative items-center w-full min-h-screen overflow-y-auto overflow-hidden m-0 p-0">

      {/* Circles*/}
     
      {/* Title*/}
      <div className="flex flex-col items-center pt-20">
        <h1 className="text-5xl font-bold">Velkommen tilbake!</h1>
      </div>

      {/* Description*/}
      <div className="flex flex-col justify-center items-center pb-20">
        <p className="mt-4 text-[15px] w-[400px]"> Enkel oversikt over dine moduler og tjenester. Du kan også gi{" "}
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
      <div className="flex flex-wrap rounded-xl w-full max-w-[1200px] bg-white h-14 shadow-lg justify-center md:justify-between ">
        {menuItems.map((item, index) => (
         <span
          key={index}
          className={`cursor-pointer transition-colors duration-200 py-2 w-full gap-2 text-center rounded-xl flex-1 flex items-center justify-center ${
          activeIndex === index
          ? "bg-[#111625] text-white font-semibold"
          : "hover:text-blue-500"
        }`}
        onClick={() => setActiveIndex(index)}
          >
        <img 
        src={item.icon} 
        alt={`${item.label} icon`} 
        className={`w-5 h-5 transition duration-200 ${
          activeIndex === index ? "invert brightness-200" : "" // Change color when active
        }`}
      />
        {item.label}
        </span>
        ))}
      </div>

      {/* Description Box */}
      <div className=" mt-4 w-[1200px] h-[240px] flex flex-col justify-center items-center pt-7">

        {activeIndex !== null ? (
          <p>{menuItems[activeIndex].description}</p>
        ) : (
          <p className="text-gray-500">Velg en kategori for å se mer informasjon.</p>
        )}

        {/* Show extra divs when 'Moduler' is selected */}
        {activeIndex === 0 && (
          <div className="flex justify-center w-full h-[220px] gap-3 ">
            
            {/* Should show the three first, based on user*/}
            <div className="bg-white border border p-4 rounded-[16px] w-full h-full flex flex-col ">
              <Link href="/suggestions">
              <span className="hover:text-[#324099] font-bold">Aksjer og fond</span>
              </Link>
              <p>Legge til funksjonalitet her</p>
            </div>

            <div className="bg-white border border p-4 rounded-[16px] w-full h-full flex flex-col">
              <Link href="/suggestions">
                <span className="hover:text-[#324099] font-bold">Eksempel 2</span>
              </Link>
              <p>Legge til funksjonalitet her</p>
            </div>


            <div className="bg-white border border p-4 rounded-[16px] w-full h-full flex flex-col">
              <Link href="/suggestions">
              <span className="hover:text-[#324099] font-bold">Eksempel 3</span>
              </Link>
              <p>Legge til funksjonalitet her</p>
            </div>          
          </div>
        )}
        
      </div>

      {/* Se mer box */}
      <div className="pt-5 pb-20 ">
        <Link href="/articles" className="flex gap-2 justify-center items-center ">
        {/* Should switch link to products page */}
              <span className="text-[#546bff] hover:text-[#324099] font-medium"> Se mer </span>
              <img src="/right-arrow.png" alt="Arrow" className="w-4 h-4" />
        </Link>
      </div>

      {/* New box*/}
      <div className="flex flex-col items-center pb-15 gap-2">
        <h2 className="text-2xl font-bold">Vi hjelper deg gjerne</h2>
        <p> Har du spørsmål eller trenger veiledning?</p>
      </div>

      {/* Container of shortcuts*/}
      <div className="flex justify-center items-center gap-4 p-10">
        {/* First Circle with Image */}
        <Link href="/">
          <div className="w-20 h-20 bg-[#627afa] rounded-full overflow-hidden flex items-center justify-center">
            <img src="/Modules.png" alt="First Icon" className="w-10 invert brightness-100 object-cover" />
          </div>
        </Link>

        {/* Second Circle with Image */}
        <Link href="/suggestions">
          <div className="w-20 h-20 bg-[#627afa] rounded-full overflow-hidden  flex items-center justify-center">
            <img src="/paper.png" alt="Second Icon" className="w-10 brightness-124 object-cover" />
          </div>
        </Link>

      </div>

        {/*FAQ and videos*/}
      <div className="w-[700] h-[300] flex gap-3 pb-20">
        
        <div className="bg-white shadow-xl p-6 rounded-[16px] w-full h-full flex flex-col"> 
          <Link href="/videos">
            <p className="text-[25px] font-semibold"> Videoer </p>
            <p> Endre font på dette elementet </p>
          </Link>
        </div>

        <div className="bg-white shadow-xl p-4  rounded-[16px] w-full h-full flex flex-col"> 
          <Link href="/videos">
            <p className="text-[25px] font-semibold"> FAQs </p>
            <p> Endre font på dette elementet </p>
          </Link>
        </div>


      </div>

      {/* Snarveier */}
      <div className="w-[700] h-[270] bg-white shadow-xl pb-[50px] rounded-[16px] flex justify-center items-center gap-16" >
        <Link href="/">
            <div className="w-20 h-20 bg-[#627afa] rounded-full overflow-hidden flex items-center justify-center">
              <img src="/Modules.png" alt="First Icon" className="w-10 invert brightness-100 object-cover" />
            </div>
          </Link>

          {/* Second Circle with Image */}
          <Link href="/suggestions">
            <div className="w-20 h-20 bg-[#627afa] rounded-full overflow-hidden  flex items-center justify-center">
              <img src="/paper.png" alt="Second Icon" className="w-10 brightness-124 object-cover" />
            </div>
          </Link>

          <Link href="/">
            <div className="w-20 h-20 bg-[#627afa] rounded-full overflow-hidden flex items-center justify-center">
              <img src="/Modules.png" alt="First Icon" className="w-10 invert brightness-100 object-cover" />
            </div>
          </Link>

          {/* Second Circle with Image */}
          <Link href="/suggestions">
            <div className="w-20 h-20 bg-[#627afa] rounded-full overflow-hidden  flex items-center justify-center">
              <img src="/paper.png" alt="Second Icon" className="w-10 brightness-124 object-cover" />
            </div>
          </Link>
        
      </div>

      {/* Circles*/}


    </div>
  );
}
