'use client';

import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    isPositive: boolean;
  };
  icon: LucideIcon;
  onClick?: () => void;
}

export function StatsCard({ title, value, change, icon: Icon, onClick }: StatsCardProps) {
  return (
    <motion.div
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      className={`
        bg-white rounded-xl shadow-sm border border-gray-100 p-6
        ${onClick ? 'cursor-pointer hover:border-[#0a5486]/20' : ''}
      `}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div className="w-12 h-12 rounded-lg bg-[#0a5486]/10 flex items-center justify-center">
          <Icon className="h-6 w-6 text-[#0a5486]" />
        </div>
        {change && (
          <div className={`
            flex items-center text-sm font-medium
            ${change.isPositive ? 'text-green-600' : 'text-red-600'}
          `}>
            <span className="mr-1">
              {change.isPositive ? '↑' : '↓'}
            </span>
            {Math.abs(change.value)}%
          </div>
        )}
      </div>
      <div className="mt-4">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        <p className="mt-2 text-2xl font-semibold text-gray-900">{value}</p>
      </div>
    </motion.div>
  );
} 