export interface MatterBreakdownRow {
  id: string;
  name: string;
  active: number;
  pending: number;
  closed: number;
}

export type DashboardAlertType =
  | "candidature"
  | "retard"
  | "assistance"
  | "rdv";

export interface DashboardAlert {
  id: string;
  type: DashboardAlertType;
  label: string;
  to: string;
}
