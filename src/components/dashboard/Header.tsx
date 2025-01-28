'use client';

import { ChevronDown } from 'lucide-react';
import { usePathname } from 'next/navigation';

const breadcrumbMap: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/dashboard/leads': 'Leads',
  '/dashboard/customers': 'Customers',
  '/dashboard/tasks': 'Tasks',
  '/dashboard/calendar': 'Calendar',
  '/dashboard/settings': 'Settings',
};

export function Header() {
  const pathname = usePathname() || '/dashboard';
  const title = breadcrumbMap[pathname as keyof typeof breadcrumbMap] || 'Dashboard';

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
          <nav className="mt-1">
            <ol className="flex items-center space-x-2 text-sm text-gray-500">
              <li>
                <span>Dashboard</span>
              </li>
              {pathname !== '/dashboard' && (
                <>
                  <li>
                    <span className="mx-2">/</span>
                  </li>
                  <li>
                    <span className="text-gray-900">{title}</span>
                  </li>
                </>
              )}
            </ol>
          </nav>
        </div>

        <div className="flex items-center space-x-3">
          <select className="form-select rounded-md border-gray-300 text-sm shadow-sm">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
            <option>All time</option>
          </select>

          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Export
            <ChevronDown className="ml-2 h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}