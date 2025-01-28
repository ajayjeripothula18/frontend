'use client';

import { useState } from 'react';
import { signOut } from 'next-auth/react';
import { User, LogOut, Settings, Bell } from 'lucide-react';
import { Button } from '../ui/Button';
import { Dropdown } from '../ui/Dropdown';
import { AuthUser } from '@/types/auth';

interface NavbarProps {
  user: Pick<AuthUser, 'id' | 'email' | 'name' | 'role'>;
}

export function Navbar({ user }: NavbarProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="bg-white border-b px-4 py-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-semibold">CRM Portal</h1>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm">
            <Bell className="h-5 w-5" />
          </Button>

          <Dropdown
            trigger={
              <Button variant="ghost" className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>{user?.name}</span>
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
          />
        </div>
      </div>
    </div>
  );
} 