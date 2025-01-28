'use client';

import { useQuery } from '@tanstack/react-query';
import { customersService, type Customer } from '@/services/customers.service';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export function CustomersTable() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useQuery({
    queryKey: ['customers', page],
    queryFn: () => customersService.getCustomers({ page }),
  });

  const customers = data?.data?.customers ?? [];
  const totalPages = data?.meta?.totalPages ?? 1;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Customers</h1>
        <Link href="/customers/new">
          <Button>New Customer</Button>
        </Link>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {isLoading ? (
            <div className="p-4 text-center">Loading...</div>
          ) : (
            customers.map((customer) => (
              <li key={customer.id}>
                <Link href={`/customers/${customer.id}`}>
                  <div className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">
                            {customer.name}
                          </p>
                          <p className="text-sm text-gray-500">{customer.email}</p>
                        </div>
                      </div>
                      <div className="ml-2 flex-shrink-0">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          customer.status === 'ACTIVE' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {customer.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
            ))
          )}
        </ul>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-4">
          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => setPage(index + 1)}
                className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                  page === index + 1
                    ? 'z-10 bg-primary-50 border-primary-500 text-primary-600'
                    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}
