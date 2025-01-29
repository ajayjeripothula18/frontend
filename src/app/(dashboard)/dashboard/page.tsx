'use client';

import { motion } from 'framer-motion';
import { 
  UserPlus, 
  Users, 
  DollarSign, 
  TrendingUp,
  Calendar,
  CheckSquare,
  BarChart,
  PhoneCall
} from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { Button } from '@/components/ui/Button';

export default function DashboardPage() {
  const stats = [
    {
      title: 'Total Leads',
      value: '2,345',
      change: { value: 12, isPositive: true },
      icon: UserPlus,
      href: '/leads'
    },
    {
      title: 'Active Customers',
      value: '1,420',
      change: { value: 8, isPositive: true },
      icon: Users,
      href: '/customers'
    },
    {
      title: 'Revenue',
      value: '$234,567',
      change: { value: 15, isPositive: true },
      icon: DollarSign
    },
    {
      title: 'Conversion Rate',
      value: '24%',
      change: { value: 3, isPositive: false },
      icon: TrendingUp
    }
  ];

  const quickActions = [
    {
      title: 'Add New Lead',
      icon: UserPlus,
      href: '/leads/new',
      color: 'text-blue-600 bg-blue-100'
    },
    {
      title: 'Schedule Meeting',
      icon: Calendar,
      href: '/calendar/new',
      color: 'text-purple-600 bg-purple-100'
    },
    {
      title: 'Create Task',
      icon: CheckSquare,
      href: '/tasks/new',
      color: 'text-green-600 bg-green-100'
    },
    {
      title: 'Log Call',
      icon: PhoneCall,
      href: '/activities/new',
      color: 'text-orange-600 bg-orange-100'
    }
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        title="Dashboard"
        subtitle="Welcome back! Here's what's happening with your business today."
      />

      {/* Stats Grid */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat, index) => (
          <StatsCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            icon={stat.icon}
            onClick={stat.href ? () => window.location.href = stat.href : undefined}
          />
        ))}
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <Button
              key={action.title}
              variant="outline"
              className="h-auto p-4 flex flex-col items-center justify-center space-y-2 hover:border-[#0a5486]/20"
              onClick={() => window.location.href = action.href}
            >
              <div className={`w-12 h-12 rounded-lg ${action.color} flex items-center justify-center`}>
                <action.icon className="h-6 w-6" />
              </div>
              <span className="text-sm font-medium text-gray-700">{action.title}</span>
            </Button>
          ))}
        </div>
      </motion.div>

      {/* Recent Activity & Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
            <Button variant="ghost" className="text-sm">View All</Button>
          </div>
          <div className="space-y-4">
            {/* Add activity items here */}
          </div>
        </motion.div>

        {/* Performance Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Performance</h2>
            <Button variant="ghost" className="text-sm">View Report</Button>
          </div>
          <div className="h-64 flex items-center justify-center text-gray-500">
            <BarChart className="h-6 w-6 mr-2" />
            <span>Chart will be implemented here</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 