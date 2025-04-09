import Link from 'next/link';
import { Check, X } from 'lucide-react';

export interface Module {
  title: string;
  href: string;
  hasModule: boolean;
  limitInfo?: string;
  yearlyTransactions?: number;
  imageUrl?: string;
}

interface ModuleCardProps {
  module: Module;
}

export function ModuleCard({ module }: ModuleCardProps) {
  return (
    <div className="relative bg-card dark:bg-card border dark:border-border p-4 rounded-[16px] flex flex-col h-full">
      {/* Toppseksjon med tittel og statusikon */}
      <div className="flex items-center justify-between mb-6 mt-3">
        <Link href={module.href}>
          <span className="text-lg font-bold hover:text-[#324099] dark:text-gray-100">
            {module.title}
          </span>
        </Link>
        {module.hasModule ? (
          <Check className="w-6 h-6 text-green-500" />
        ) : (
          <X className="w-6 h-6 text-red-500" />
        )}
      </div>

      <div className="text-sm text-gray-700 dark:text-gray-300">
        {/* Statisk tekst */}
        <p className="text-blue-500 text-lg mb-3 font-semibold">
          Maks begrensninger:
        </p>
        {module.limitInfo && <p className="mb-2">{module.limitInfo}</p>}
        {module.yearlyTransactions !== undefined && (
          <p>{module.yearlyTransactions} årlige transaksjoner</p>
        )}
      </div>

      {/* Bilde nede i høyre hjørne */}
      {module.imageUrl && (
        <img
          src={module.imageUrl}
          alt={module.title}
          className="absolute bottom-4 right-4 w-[92px] h-[92px] object-contain"
        />
      )}
    </div>
  );
}
