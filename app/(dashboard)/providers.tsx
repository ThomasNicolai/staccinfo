
import { TooltipProvider } from '@/components/ui/tooltip';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { SessionProvider } from 'next-auth/react';

export default async function Providers({
  children
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (session?.user) {
    // TODO: Look into https://react.dev/reference/react/experimental_taintObjectReference
    // filter out sensitive data before passing to client.
    session.user = {
      name: session.user.name,
      email: session.user.email,
      image: session.user.image
    };
  } else {
    //redirect('/login');
  }
  return (
    <TooltipProvider>
      <SessionProvider session={session}>{children}</SessionProvider>
    </TooltipProvider>
  );
}
