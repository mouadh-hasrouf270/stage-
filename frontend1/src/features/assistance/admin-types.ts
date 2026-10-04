export type AssistanceStatus = "en_attente" | "traitee";

export interface AssistanceRequest {
  id: string;
  partnerName: string;
  matterTitle: string;
  message: string;
  submittedAt: string;
  status: AssistanceStatus;
  assignedLawyerName?: string;
}

export interface InternalLawyerOption {
  id: string;
  name: string;
}
