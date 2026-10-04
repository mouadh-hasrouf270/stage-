export type TaskPriority = "haute" | "normale" | "basse";
export type TaskStatus = "a_faire" | "en_cours" | "terminee";

export interface AdminTask {
  id: string;
  title: string;
  matterTitle: string;
  lawyerId: string;
  lawyerName: string;
  dueDate: string;
  priority: TaskPriority;
  status: TaskStatus;
}

export interface InternalLawyerOption {
  id: string;
  name: string;
}
