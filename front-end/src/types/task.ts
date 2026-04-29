export interface Task {
  idt_tarefa: number;
  nom_tarefa: string;
  des_tarefa: string;
  ind_ativo: boolean;
  ind_status: string;
}

export interface CreateTaskRequest {
  nom_tarefa: string;
  des_tarefa: string;
  idt_usuario: number;
}
