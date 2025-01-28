import { TasksList } from '@/components/tasks/TasksList';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tasks | CRM Portal',
  description: 'Manage your daily tasks and activities',
};

export default function TasksPage() {
  return <TasksList />;
} 