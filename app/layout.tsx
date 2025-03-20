import './globals.css';
import { Analytics } from '@vercel/analytics/react';
import { ThemeProvider } from "next-themes";

export const metadata = {
  title: 'Next.js App Router + NextAuth + Tailwind CSS',
  description:
    'A user admin dashboard configured with Next.js, Postgres, NextAuth, Tailwind CSS, TypeScript, and Prettier.'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex min-h-screen w-full flex-col">
        <ThemeProvider attribute="class" defaultTheme="system">
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}

// Importert og wrappet innhold i next-themes ThemeProvider i rot. 
// Bytte ut manuell theme prosess. Tailwin DarkMode skal settes korrekt ved innlastning av side.
