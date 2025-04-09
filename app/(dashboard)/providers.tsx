import { TooltipProvider } from '@/components/ui/tooltip';
import { auth } from '@/lib/auth';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
import { redirect } from 'next/navigation';

export default async function Providers({
  children
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (session?.user) {
    session.user = {
      name: session.user.name,
      email: session.user.email,
      image: session.user.image
    };
  } else {
    // redirect('/login');
  }

  return (
    <TooltipProvider>
      <SessionProvider session={session}>
        <ThemeProvider attribute="class" defaultTheme="system">
          {children}
        </ThemeProvider>
      </SessionProvider>
    </TooltipProvider>
  );
}
