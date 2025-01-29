'use client';

import { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { LEAD_SOURCES, LEAD_STATUSES } from '@/lib/constants';
import { motion, AnimatePresence } from 'framer-motion';

interface LeadFiltersProps {
  onFilterChange: (filters: Record<string, any>) => void;
}

export function LeadFilters({ onFilterChange }: LeadFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState({
    searchTerm: '',
    status: '',
    source: '',
    assignedTo: '',
    dateRange: '',
  });

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(Object.fromEntries(
      Object.entries(newFilters).filter(([_, v]) => v !== '')
    ));
  };

  const clearFilters = () => {
    setFilters({
      searchTerm: '',
      status: '',
      source: '',
      assignedTo: '',
      dateRange: '',
    });
    onFilterChange({});
  };

  return (
    <Card className="mb-6">
      <div className="p-4">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search leads..."
                value={filters.searchTerm}
                onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <Button
            variant="outline"
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            Filters
          </Button>
          {Object.values(filters).some(Boolean) && (
            <Button
              variant="ghost"
              onClick={clearFilters}
              className="flex items-center gap-2 text-red-500"
            >
              <X className="h-4 w-4" />
              Clear
            </Button>
          )}
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Status</label>
                  <Select
                    value={filters.status}
                    onChange={(e) => handleFilterChange('status', e.target.value)}
                    options={[
                      { label: 'All Statuses', value: '' },
                      ...Object.entries(LEAD_STATUSES).map(([value, label]) => ({
                        label,
                        value
                      }))
                    ]}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Source</label>
                  <Select
                    value={filters.source}
                    onChange={(e) => handleFilterChange('source', e.target.value)}
                    options={[
                      { label: 'All Sources', value: '' },
                      ...LEAD_SOURCES.map((source) => ({
                        label: source.replace('_', ' '),
                        value: source
                      }))
                    ]}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Date Range</label>
                  <Select
                    value={filters.dateRange}
                    onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                    options={[
                      { label: 'All Time', value: '' },
                      { label: 'Today', value: 'today' },
                      { label: 'This Week', value: 'week' },
                      { label: 'This Month', value: 'month' },
                      { label: 'This Quarter', value: 'quarter' }
                    ]}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Card>
  );
} 