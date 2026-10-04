export interface PartnerApplication {
  id: string;
  name: string;
  specialties: string[];
  submittedAt: string;
  bio: string;
}

export interface Partner {
  id: string;
  name: string;
  specialties: string[];
  activeMissions: number;
  retrocessionRate: number;
  status: "actif" | "suspendu";
}
