'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Menu, Bell, Search, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { signOut, useSession } from 'next-auth/react';

interface NavigationProps {
  onMenuClick: () => void;
  onSearchToggle: () => void;
  isSearchOpen: boolean;
  currentPath: string;
}

export function Navigation({ onMenuClick, onSearchToggle, isSearchOpen, currentPath }: NavigationProps) {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={onMenuClick}
              className="p-2 rounded-md text-gray-400 hover:bg-gray-100 hover:text-gray-500 lg:hidden"
            >
              <Menu className="h-6 w-6" />
            </button>
            <Link href="/dashboard" className="flex items-center space-x-3 px-4">
              <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
                <span className="text-white font-bold text-xl">C</span>
              </div>
              <span className="text-xl font-semibold text-gray-900">CRM Portal</span>
            </Link>
          </div>

          <div className="flex-1 max-w-xl mx-4 hidden md:block">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="search"
                placeholder="Search..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100 relative">
              <Bell className="h-6 w-6" />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white" />
            </button>

            <div className="relative">
              <button
                onClick={() => signOut({ callbackUrl: '/login' })}
                className="flex items-center space-x-3 p-2 rounded-full hover:bg-gray-100"
              >
                <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                  <User className="h-5 w-5 text-gray-500" />
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-gray-700">
                    {session?.user?.name || 'User'}
                  </p>
                  <p className="text-xs text-gray-500">
                    {session?.user?.email}
                  </p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}