import Link from 'next/link';
import {
  Home,
  PanelLeft,
  Settings,
  ShoppingCart,
  BookOpenText,
  Clapperboard,
  Grid2X2,
  MessageSquareText
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { Analytics } from '@vercel/analytics/react';

import { User } from './user';
import Providers from './providers';
import { NavItem } from './nav-item';
import { SearchInput } from './search';

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <main className="flex min-h-screen w-full flex-col bg-muted/40">
        <DesktopNav />
        <div className="flex flex-col sm:pl-14">
          <header className="sticky top-0 z-30 flex h-16 md:h-16 items-center gap-4 border-b bg-background dark:bg-background px-4 sm:px-6 shadow-sm">
            <MobileNav />
            <SearchInput />
            <User />
          </header>
          <div className="grid flex-1 items-start gap-2 p-4 sm:px-6 sm:py-0 md:gap-4 bg-muted/40">
            {children}
          </div>
        </div>
        <Analytics />
      </main>
    </Providers>
  );
}

function DesktopNav() {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <img src="/stacclogoliten.png" alt="" />
        <NavItem href="/" label="Dashboard">
          <Home className="h-5 w-5" />
        </NavItem>

        <NavItem href="/articles" label="Articles">
          <BookOpenText className="h-5 w-5" />
        </NavItem>

        <NavItem href="/products/modules" label="Products">
          <Grid2X2 className="h-5 w-5" />
        </NavItem>

        <NavItem href="/videos" label="Videos">
          <Clapperboard className="h-5 w-5" />
        </NavItem>

        <NavItem href="/suggestions" label="Suggestions">
          <MessageSquareText className="h-5 w-5" />
        </NavItem>
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="#"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            >
              <Settings className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Settings</TooltipContent>
        </Tooltip>
      </nav>
    </aside>
  );
}

function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="sm:hidden">
          <PanelLeft className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="sm:max-w-xs">
        <nav className="grid gap-6 text-lg font-medium">
          <div className="w-50 flex flex-1">
            <img src="/stacclogoliten.png" alt="" />
            <img src="/stacctekst.png" alt="" className="h-100" />
          </div>
          <Link
            href="/"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          >
            <Home className="h-5 w-5" />
            Dashboard
          </Link>
          <Link
            href="/articles"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          >
            <BookOpenText className="h-5 w-5" />
            Articles
          </Link>
          <Link
            href="/products"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          >
            <Grid2X2 className="h-5 w-5" />
            Products
          </Link>
          <Link
            href="/suggestions"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          >
            <MessageSquareText className="h-5 w-5" />
            Suggestions
          </Link>
          <Link
            href="/videos"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          >
            <Clapperboard className="h-5 w-5" />
            Videos
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
