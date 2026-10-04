import { useState } from "react";
import PageHeader from "../../../components/ui/PageHeader";
import Card from "../../../components/ui/Card";
import Badge from "../../../components/ui/Badge";
import type { Milestone, MilestoneStatus } from "../admin-types";

const statusLabel: Record<MilestoneStatus, string> = {
  a_faire: "À faire",
  fait: "Fait",
  en_retard: "En retard",
};

const statusTone: Record<MilestoneStatus, "muted" | "green" | "alert"> = {
  a_faire: "muted",
  fait: "green",
  en_retard: "alert",
};

// TODO: remplacer par un fetch réel (GET /api/milestones — toutes les missions déléguées)
const initialMilestones: Milestone[] = [
  {
    id: "j1",
    title: "Dépôt du mémoire",
    matterTitle: "Succession Benali",
    partnerName: "Me. Rachid Amrani",
    dueDate: "2026-10-10",
    status: "a_faire",
  },
  {
    id: "j2",
    title: "Négociation du bail",
    matterTitle: "Bail commercial Oran",
    partnerName: "Me. Sarah Belkacem",
    dueDate: "2026-09-28",
    status: "fait",
  },
  {
    id: "j3",
    title: "Audience de mise en état",
    matterTitle: "Succession Benali",
    partnerName: "Me. Rachid Amrani",
    dueDate: "2026-09-30",
    status: "en_retard",
  },
];

export default function AdminMilestonesPage() {
  const [milestones] = useState<Milestone[]>(initialMilestones);
  const [partnerFilter, setPartnerFilter] = useState("tous");
  const partners = Array.from(new Set(milestones.map((m) => m.partnerName)));
  const filtered = milestones.filter(
    (m) => partnerFilter === "tous" || m.partnerName === partnerFilter,
  );

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Super-administrateur"
        title="Jalons"
        subtitle="Jalons de toutes les missions déléguées aux partenaires."
      />

      <select
        value={partnerFilter}
        onChange={(e) => setPartnerFilter(e.target.value)}
        className="border border-ch2ma-border bg-transparent px-3 py-2 text-sm text-ch2ma-text focus:border-ch2ma-gold focus:outline-none"
      >
        <option value="tous">Tous les partenaires</option>
        {partners.map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>

      <Card className="overflow-hidden p-0">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-ch2ma-border text-xs uppercase tracking-wide text-ch2ma-muted">
            <tr>
              <th className="px-6 py-3 font-medium">Jalon</th>
              <th className="px-6 py-3 font-medium">Dossier</th>
              <th className="px-6 py-3 font-medium">Partenaire</th>
              <th className="px-6 py-3 font-medium">Échéance</th>
              <th className="px-6 py-3 font-medium">Statut</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ch2ma-border">
            {filtered.map((milestone) => (
              <tr key={milestone.id}>
                <td className="px-6 py-4 text-ch2ma-text">{milestone.title}</td>
                <td className="px-6 py-4 text-ch2ma-muted">
                  {milestone.matterTitle}
                </td>
                <td className="px-6 py-4 text-ch2ma-muted">
                  {milestone.partnerName}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-ch2ma-muted">
                  {milestone.dueDate}
                </td>
                <td className="px-6 py-4">
                  <Badge tone={statusTone[milestone.status]}>
                    {statusLabel[milestone.status]}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
