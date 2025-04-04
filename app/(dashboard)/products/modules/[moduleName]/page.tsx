import SharedPageWrapper from '@/components/sharedpagewrapper';

export default async function AksjerFondPage({
  params
}: {
  params: Promise<{ moduleName: string }>;
}) {
  const moduleName = (await params).moduleName;

  return (
    <SharedPageWrapper title={moduleName} subtitle=" " defaultActiveIndex={-1}>
      <div className="w-full max-w-[1400px] mx-auto bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">Aksjer</h2>
        <p className="text-gray-700 text-lg mb-6">
          Aksjer representerer eierskap i et selskap, og gir aksjeeieren rett
          til en andel av selskapets fortjeneste og stemmerett ved
          generalforsamlinger. Ved å kjøpe aksjer investerer du i selskapets
          fremtid, og verdien av aksjene kan øke dersom selskapet presterer
          godt. Aksjemarkedet er en dynamisk arena der prisene påvirkes av alt
          fra økonomiske resultater til globale markedsforhold.
        </p>
        <h2 className="text-3xl font-bold mb-4 text-gray-800">Fond</h2>
        <p className="text-gray-700 text-lg">
          Fond er investeringsprodukter som samler penger fra mange investorer
          for å investere i en bred portefølje av aksjer, obligasjoner eller
          andre verdipapirer. Forvaltet av profesjonelle investorer, gir fond
          deg muligheten til å spre risikoen over flere investeringer. Dette
          gjør fond til et populært alternativ for de som ønsker en enklere måte
          å investere i markedet uten å måtte plukke enkeltaksjer.
        </p>
      </div>
    </SharedPageWrapper>
  );
}
