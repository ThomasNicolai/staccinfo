import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getIconRefFromModuleName(moduleName: string): string {
  switch (moduleName) {
    case 'Aksje- og fondsmodul':
      return '/stock.png';
    case 'obligasjoner':
      return '/agreement.png';
    case 'intern-handler':
      return '/handler.png';
    case 'Rentederivatmodul':
      return '/derivatives.png';
    case 'fx-derivater':
      return '/exchange-rate.png';
    case 'Rentepapirmodul':
      return '/tax.png';
    case 'Utlånsmodul':
      return '/borrow.png';
    case 'internal-bank-lending':
      return '/lend.png';
    case 'funds-transparency':
      return '/tran.png';
    case 'leasing-module':
      return '/lease.png';
    case 'Tolkning av kontrakter':
      return '/contract.png';
    default:
      // Fallback
      return '/contract.png';
  }
}
