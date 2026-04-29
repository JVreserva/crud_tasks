import ApiService from './api';
import { Task, CreateTaskRequest } from '../types/task';

const taskService = {
  async listMyTasks(): Promise<Task[]> {
    return ApiService.list_my_tasks();
  },

  async createTask(data: CreateTaskRequest): Promise<any> {
    return ApiService.createTask(data);
  },

  async deleteTask(idt_tarefa: number): Promise<any> {
    return ApiService.deleteTask(idt_tarefa);
  },
};

export default taskService;
