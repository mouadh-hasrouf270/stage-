import { useState } from "react";
import { Plus } from "lucide-react";
import PageHeader from "../../../components/ui/PageHeader";
import Card from "../../../components/ui/Card";
import Badge from "../../../components/ui/Badge";
import DelegationForm from "../components/DelegationForm";
import type { Delegation, DelegationFormValues } from "../types";

const mockMatters = [
  { id: "m1", title: "Succession Benali" },
  { id: "m2", title: "Litige commercial — SARL Amazigh" },
  { id: "m3", title: "Bail commercial Oran" },
];

const mockPartners = [
  { id: "p1", name: "Me. Rachid Amrani" },
  { id: "p2", name: "Me. Sarah Belkacem" },
];

const initialDelegations: Delegation[] = [
  {
    id: "d1",
    matterTitle: "Succession Benali",
    partnerName: "Me. Rachid Amrani",
    scope: "Représentation à l'audience du 14/10",
    retrocessionRate: 30,
    deadline: "2026-10-14",
    status: "en_cours",
  },
  {
    id: "d2",
    matterTitle: "Bail commercial Oran",
    partnerName: "Me. Sarah Belkacem",
    scope: "Négociation du bail avec le bailleur",
    retrocessionRate: 25,
    deadline: "2026-09-30",
    status: "livree",
  },
];

const statusLabel: Record<Delegation["status"], string> = {
  en_cours: "En cours",
  livree: "Livrée",
  cloturee: "Clôturée",
};

const statusTone: Record<
  Delegation["status"],
  "gold" | "muted" | "green" | "alert"
> = {
  en_cours: "gold",
  livree: "green",
  cloturee: "muted",
};

export default function DelegationsPage() {
  const [delegations, setDelegations] =
    useState<Delegation[]>(initialDelegations);

  const [isCreating, setIsCreating] = useState(false);

  function handleCreate(values: DelegationFormValues) {
    const matter = mockMatters.find((m) => m.id === values.matterId);
    const partner = mockPartners.find((p) => p.id === values.partnerId);

    if (!matter || !partner) return;

    const newDelegation: Delegation = {
      id: crypto.randomUUID(),
      matterTitle: matter.title,
      partnerName: partner.name,
      scope: values.scope,
      retrocessionRate: values.retrocessionRate,
      deadline: values.deadline,
      status: "en_cours",
    };

    setDelegations((prev) => [newDelegation, ...prev]);

    setIsCreating(false);
  }

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Sous-traitance"
        title="Délégations"
        subtitle="Missions confiées à des avocats partenaires."
        action={
          !isCreating && (
            <button
              onClick={() => setIsCreating(true)}
              className="flex items-center gap-2 bg-ch2ma-dark px-4 py-2.5 text-sm font-semibold text-ch2ma-cream hover:bg-ch2ma-dark/90"
            >
              <Plus size={16} />
              Nouvelle délégation
            </button>
          )
        }
      />

      {isCreating && (
        <DelegationForm
          matters={mockMatters}
          partners={mockPartners}
          onSubmit={handleCreate}
          onCancel={() => setIsCreating(false)}
        />
      )}

      <Card className="overflow-hidden p-0">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-ch2ma-border text-xs uppercase tracking-wide text-ch2ma-muted">
            <tr>
              <th className="px-6 py-3 font-medium">Dossier</th>

              <th className="px-6 py-3 font-medium">Partenaire</th>

              <th className="px-6 py-3 font-medium">Rétrocession</th>

              <th className="px-6 py-3 font-medium">Échéance</th>

              <th className="px-6 py-3 font-medium">Statut</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-ch2ma-border">
            {delegations.map((d) => (
              <tr key={d.id}>
                <td className="px-6 py-4 text-ch2ma-text">{d.matterTitle}</td>

                <td className="px-6 py-4 text-ch2ma-text">{d.partnerName}</td>

                <td className="px-6 py-4 text-ch2ma-text">
                  {d.retrocessionRate}%
                </td>

                <td className="px-6 py-4 text-ch2ma-muted">{d.deadline}</td>

                <td className="px-6 py-4">
                  <Badge tone={statusTone[d.status]}>
                    {statusLabel[d.status]}
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
