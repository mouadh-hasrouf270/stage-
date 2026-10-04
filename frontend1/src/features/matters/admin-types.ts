export type MatterStatus = "ouvert" | "en_cours" | "en_attente" | "cloture";

export interface MatterSummary {
  id: string;
  title: string;
  clientName: string;
  lawyerId: string;
  lawyerName: string;
  domain: string;
  status: MatterStatus;
}

export interface InternalLawyerOption {
  id: string;
  name: string;
}
