'use client';
import { createContext } from 'react';

export const LicensesContext = createContext<any>(null);

export default function LicensesProvider({
  children,
  licenses
}: {
  children: any;
  licenses: any;
}) {
  return (
    <LicensesContext.Provider value={licenses}>
      {children}
    </LicensesContext.Provider>
  );
}
