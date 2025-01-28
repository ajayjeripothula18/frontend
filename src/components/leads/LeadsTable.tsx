'use client';

import { useLeads } from '@/hooks/useLeads';
import { useState } from 'react';
import { Lead } from '@/types/leads';
import { LeadStatusBadge } from './LeadStatusBadge';
import { Button } from '../ui/Button';
import Link from 'next/link';
import { formatCurrency } from '@/lib/utils';

export function LeadsTable() {
  const [page, setPage] = useState(1);
  const { leads, totalPages, isLoading } = useLeads(page);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Leads</h1>
        <Link href="/leads/new">
          <Button>New Lead</Button>
        </Link>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {isLoading ? (
            <div className="p-4 text-center">Loading...</div>
          ) : (
            leads.map((lead: Lead) => (
              <li key={lead.id}>
                <Link href={`/leads/${lead.id}`}>
                  <div className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center">
                          <p className="text-sm font-medium text-gray-900">{lead.name}</p>
                          {lead.value && (
                            <span className="ml-2 text-sm text-gray-600">
                              {formatCurrency(lead.value)}
                            </span>
                          )}
                        </div>
                        <div className="mt-1">
                          <p className="text-sm text-gray-500">{lead.email}</p>
                          {lead.company && (
                            <p className="text-sm text-gray-500">{lead.company}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <LeadStatusBadge status={lead.status} />
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