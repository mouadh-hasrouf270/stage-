export interface Delegation {
  id: string;
  matterTitle: string;
  partnerName: string;
  scope: string;
  retrocessionRate: number;
  deadline: string;
  status: "en_cours" | "livree" | "cloturee";
}

export interface DelegationFormValues {
  matterId: string;
  partnerId: string;
  scope: string;
  retrocessionRate: number;
  deadline: string;
}
