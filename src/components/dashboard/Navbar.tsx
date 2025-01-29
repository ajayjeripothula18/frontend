'use client';

import { useState } from 'react';
import { signOut } from 'next-auth/react';
import { User, LogOut, Settings, Bell } from 'lucide-react';
import Image from 'next/image';
import { Button } from '../ui/Button';
import { Dropdown } from '../ui/Dropdown';
import { AuthUser } from '@/types/auth';
import HypermilesLogo from '@/assets/images/HypermilesLogoRectangular.png';

interface NavbarProps {
  user: AuthUser;
}

export function Navbar({ user }: NavbarProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Image
              src={HypermilesLogo}
              alt="HyperMiles Logo"
              width={140}
              height={40}
              className="object-contain"
            />
          </div>

          {/* Right section */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <Button 
              variant="ghost" 
              size="sm"
              className="relative text-gray-600 hover:text-[#0a5486] transition-colors"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-[#fd9f0d] ring-2 ring-white" />
            </Button>

            {/* User menu */}
            <Dropdown
              trigger={
                <Button 
                  variant="ghost" 
                  className="flex items-center space-x-2 text-gray-600 hover:text-[#0a5486] transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-[#0a5486] text-white flex items-center justify-center">
                    <User className="h-5 w-5" />
                  </div>
                  <span className="font-medium">{user?.name}</span>
                </Button>
              }
              items={[
                {
                  label: 'Settings',
                  icon: Settings,
                  onClick: () => window.location.href = '/settings'
                },
                {
                  label: 'Logout',
                  icon: LogOut,
                  onClick: () => signOut({ callbackUrl: '/login' })
                }
              ]}
              className="w-48 py-1 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 divide-y divide-gray-100"
            />
          </div>
        </div>
      </div>
    </div>
  );
} 