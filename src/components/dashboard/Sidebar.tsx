'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  UserPlus, 
  Calendar, 
  CheckSquare,
  Settings,
  Menu,
  X
} from 'lucide-react';

const menuItems = [
  { 
    name: 'Dashboard', 
    href: '/dashboard', 
    icon: LayoutDashboard 
  },
  { 
    name: 'Leads', 
    href: '/leads', 
    icon: UserPlus 
  },
  { 
    name: 'Customers', 
    href: '/customers', 
    icon: Users 
  },
  { 
    name: 'Tasks', 
    href: '/tasks', 
    icon: CheckSquare 
  },
  { 
    name: 'Calendar', 
    href: '/calendar', 
    icon: Calendar 
  },
  { 
    name: 'Settings', 
    href: '/settings', 
    icon: Settings 
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile menu button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-lg bg-white shadow-md text-gray-600 hover:text-[#0a5486] transition-colors"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar content */}
      <div className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-white transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        md:relative md:translate-x-0
      `}>
        <nav className="flex flex-col h-full">
          <div className="space-y-1 p-4">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all
                    ${isActive 
                      ? 'bg-[#0a5486] text-white' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-[#0a5486]'
                    }
                  `}
                >
                  <Icon className={`h-5 w-5 ${isActive ? 'text-white' : 'text-gray-400'} mr-3`} />
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Mobile close button */}
          <div className="md:hidden mt-auto p-4">
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full px-4 py-2 text-sm font-medium text-gray-600 hover:text-[#0a5486] transition-colors"
            >
              Close Menu
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}