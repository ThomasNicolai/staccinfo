'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface MenuItem {
  label: string;
  icon: string;
  href?: string; // This is optional, hence the error
}

interface NavigationToolbarProps {
  menuItems: MenuItem[];
  onNavigate?: (index: number) => void;
}

export default function NavigationToolbar({
  menuItems
}: NavigationToolbarProps) {
  const pathname = usePathname();

  // Check if we're on the root products page
  const isRootProductsPage =
    pathname === '/products' || pathname === '/products/';

  return (
    <div className="flex flex-wrap rounded-xl w-full bg-background dark:bg-background h-14 shadow-lg justify-center md:justify-between">
      {menuItems.map((item, index) => {
        // Fix: Add null check before calling startsWith
        const isActive =
          (item.href && pathname.startsWith(item.href)) ||
          (isRootProductsPage && item.href === '/products/modules');

        return (
          <Link
            key={index}
            href={item.href || '#'} // Already has a fallback
            className={`cursor-pointer transition-colors duration-200 py-2 w-full gap-2 text-center rounded-xl flex-1 flex items-center justify-center ${
              isActive
                ? 'bg-primary dark:bg-secondary text-primary-foreground dark:text-secondary-foreground font-semibold'
                : 'hover:text-blue-500'
            }`}
          >
            <img
              src={item.icon}
              alt={`${item.label} icon`}
              className={`w-5 h-5 transition duration-200 ${
                isActive ? 'invert brightness-200' : ''
              }`}
            />
            {item.label}
          </Link>
        );
      })}
    </div>
  );
}
