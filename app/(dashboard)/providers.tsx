import { TooltipProvider } from '@/components/ui/tooltip';
import { auth } from '@/lib/auth';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
import { redirect } from 'next/navigation';
import { createUser, getUserByEmail, SelectUser } from '@/lib/db';
import UserContext from './userContext';
import { getActiveLicenses } from '@/lib/queries';
import LicensesContext from './licensesContext';

export default async function Providers({
  children
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }
  if (!session.user) {
    redirect('/login');
  }
  if (!session.user.email || !session.user.name) {
    redirect('/login');
  }
  let userData = await getUserByEmail(session.user.email);
  if (!userData.user) {
    userData.user = await createUser({
      email: session.user.email,
      fullName: session.user.name,
      role: 'unassigned',
      username: session.user.name
    });
  }
  if (!userData.user.stacc_customer_seq) {
    redirect('/no_permissions');
  }
  const licences = (await getActiveLicenses(userData.user.stacc_customer_seq))
    .result;
  if (!licences) {
    redirect('/no_permissions');
  }
  console.log('Found licences in stacc database: ', licences);
  console.log('Found userData in database: ', userData);
  // TODO: Look into https://react.dev/reference/react/experimental_taintObjectReference
  // filter out sensitive data before passing to client.
  session.user = {
    name: session.user.name,
    email: session.user.email,
    image: session.user.image
  };
  return (
    <TooltipProvider>
      <SessionProvider session={session}>
        <ThemeProvider attribute="class" defaultTheme="system">
          <UserContext user={userData.user}>
            <LicensesContext licenses={licences.recordset}>
              {children}
            </LicensesContext>
          </UserContext>
        </ThemeProvider>
      </SessionProvider>
    </TooltipProvider>
  );
}
