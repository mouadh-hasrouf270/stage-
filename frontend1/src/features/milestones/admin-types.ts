export type MilestoneStatus = "a_faire" | "fait" | "en_retard";

export interface Milestone {
  id: string;
  title: string;
  matterTitle: string;
  partnerName: string;
  dueDate: string;
  status: MilestoneStatus;
}
