import { api } from '@/lib/api';

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

interface GetTasksResponse {
  tasks: Task[];
  totalPages: number;
}

class TasksService {
  async getTasks({ page = 1, limit = 10 } = {}): Promise<GetTasksResponse> {
    const response = await api.get(`/tasks?page=${page}&limit=${limit}`);
    return response.data;
  }

  async createTask(data: Partial<Task>): Promise<Task> {
    const response = await api.post('/tasks', data);
    return response.data;
  }

  async updateTask(id: string, data: Partial<Task>): Promise<Task> {
    const response = await api.patch(`/tasks/${id}`, data);
    return response.data;
  }

  async deleteTask(id: string): Promise<void> {
    await api.delete(`/tasks/${id}`);
  }
}

export const tasksService = new TasksService(); 