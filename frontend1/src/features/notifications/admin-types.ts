export type NotificationType =
  | "rdv_public"
  | "candidature_partenaire"
  | "dossier_retard"
  | "assistance";

export interface AdminNotification {
  id: string;
  type: NotificationType;
  message: string;
  createdAt: string;
  read: boolean;
  to: string;
}
