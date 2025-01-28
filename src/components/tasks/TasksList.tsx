'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { tasksService } from '@/services/tasks.service';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';
import { Clock, CheckCircle } from 'lucide-react';

export function TasksList() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useQuery({
    queryKey: ['tasks', page],
    queryFn: () => tasksService.getTasks({ page }),
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Tasks</h1>
        <Link href="/tasks/new">
          <Button>New Task</Button>
        </Link>
      </div>

      <Card>
        <ul className="divide-y divide-gray-200">
          {isLoading ? (
            <div className="p-4 text-center">Loading...</div>
          ) : (
            data?.tasks.map((task) => (
              <li key={task.id} className="p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`${
                      task.completed ? 'text-green-500' : 'text-gray-400'
                    }`}>
                      <CheckCircle className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {task.title}
                      </p>
                      <p className="text-sm text-gray-500">
                        {task.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-sm text-gray-500">
                      <Clock className="h-4 w-4 inline mr-1" />
                      {formatDate(task.dueDate)}
                    </div>
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>
      </Card>

      {data?.totalPages > 1 && (
        <div className="flex justify-center mt-4">
          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
            {Array.from({ length: data.totalPages }).map((_, index) => (
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