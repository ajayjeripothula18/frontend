'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  UserPlus, 
  Calendar,
  CheckSquare,
  BarChart,
  Settings,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navigationItems = [
  { 
    label: 'Dashboard',
    icon: LayoutDashboard,
    href: '/dashboard',
  },
  { 
    label: 'Leads',
    icon: UserPlus,
    href: '/dashboard/leads',
  },
  { 
    label: 'Customers',
    icon: Users,
    href: '/dashboard/customers',
  },
  { 
    label: 'Tasks',
    icon: CheckSquare,
    href: '/dashboard/tasks',
  },
  { 
    label: 'Calendar',
    icon: Calendar,
    href: '/dashboard/calendar',
  },
  { 
    label: 'Reports',
    icon: BarChart,
    href: '/dashboard/reports',
  },
  { 
    label: 'Settings',
    icon: Settings,
    href: '/dashboard/settings',
  },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-20 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          'fixed inset-y-0 left-0 z-30 w-64 bg-white transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0',
          {
            'translate-x-0': isOpen,
            '-translate-x-full': !isOpen,
          }
        )}
      >
        <div className="h-full flex flex-col">
          {/* Close button - Mobile only */}
          <div className="flex items-center justify-between px-4 h-16 lg:hidden">
            <span className="text-xl font-semibold">Menu</span>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors',
                    {
                      'bg-primary text-white': isActive,
                      'text-gray-700 hover:bg-gray-100': !isActive,
                    }
                  )}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
}