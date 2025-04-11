'use client';
import { SelectUser } from '@/lib/db';
import { createContext } from 'react';

export const UserContext = createContext<SelectUser | null>(null);

export default function UserProvider({
  children,
  user
}: {
  children: any;
  user: SelectUser | null;
}) {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}
