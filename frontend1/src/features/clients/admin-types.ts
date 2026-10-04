export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  assignedLawyerId: string;
  activeMatters: number;
  since: string;
}

export interface InternalLawyerOption {
  id: string;
  name: string;
}
