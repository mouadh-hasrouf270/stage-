export interface LawyerBillingRow {
  id: string;
  name: string;
  invoiced: number;
  collected: number;
}

export interface PartnerRetrocessionRow {
  id: string;
  partnerName: string;
  missionsBilled: number;
  amountDue: number;
  status: "paye" | "en_attente";
}
