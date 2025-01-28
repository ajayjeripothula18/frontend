'use client';

import { Menu, Bell, User } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface NavbarProps {
  onMenuClick: () => void;
}

export function Navbar({ onMenuClick }: NavbarProps) {
  return (
    <header className="bg-white border-b h-16">
      <div className="flex items-center justify-between px-6 h-full">
        <Button variant="ghost" size="sm" onClick={onMenuClick}>
          <Menu className="h-5 w-5" />
        </Button>
        
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="sm">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
} 