'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  UserPlus, 
  Calendar, 
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';

const menuItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/leads', label: 'Leads', icon: UserPlus },
  { href: '/customers', label: 'Customers', icon: Users },
  { href: '/calendar', label: 'Calendar', icon: Calendar },
  { href: '/settings', label: 'Settings', icon: Settings },
];

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: isOpen ? '16rem' : '5rem' }}
        className={`fixed inset-y-0 left-0 bg-white border-r z-30 transition-all duration-300`}
      >
        <nav className="h-full flex flex-col">
          {/* Logo Section */}
          <div className="p-4 border-b relative">
            <div className="flex justify-center items-center">
              {isOpen ? (
                <Image
                  src="/src/assets/images/HypermilesLogoRectangular.png"
                  alt="HyperMiles Logo"
                  width={180}
                  height={50}
                  className="object-contain"
                />
              ) : (
                <Image
                  src="/src/assets/images/HypermilesIcon.png"
                  alt="HyperMiles Icon"
                  width={35}
                  height={35}
                  className="object-contain"
                />
              )}
            </div>
            {/* Toggle Button */}
            <button
              onClick={onToggle}
              className="absolute -right-3 top-1/2 transform -translate-y-1/2 bg-white border rounded-full p-1 shadow-md hover:bg-gray-50"
            >
              {isOpen ? (
                <ChevronLeft className="h-4 w-4 text-gray-600" />
              ) : (
                <ChevronRight className="h-4 w-4 text-gray-600" />
              )}
            </button>
          </div>

          {/* Menu Items */}
          <div className="flex-1 px-2 py-4 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname?.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center px-3 py-2 rounded-lg transition-colors duration-150 ${
                    isActive
                      ? 'bg-[#0a5486] text-white'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="h-5 w-5 min-w-[1.25rem]" />
                  {isOpen && (
                    <span className="ml-3 whitespace-nowrap">{item.label}</span>
                  )}
                </Link>
              );
            })}
          </div>
        </nav>
      </motion.aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={onToggle}
        />
      )}
    </>
  );
} 