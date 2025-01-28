import { CalendarView } from '@/components/calendar/CalendarView';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Calendar | CRM Portal',
  description: 'View and manage your schedule',
};

export default function CalendarPage() {
  return <CalendarView />;
} 