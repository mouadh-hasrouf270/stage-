import { Banknote, Wallet, Clock } from "lucide-react";
import PageHeader from "../../../components/ui/PageHeader";
import Card from "../../../components/ui/Card";
import StatCard from "../../../components/ui/StatCard";
import Badge from "../../../components/ui/Badge";
import type { LawyerBillingRow, PartnerRetrocessionRow } from "../admin-types";

// TODO: remplacer par un fetch réel (GET /api/billing/summary — scope admin)
const lawyerBilling: LawyerBillingRow[] = [
  { id: "l1", name: "Me. Amine Cherif", invoiced: 480000, collected: 360000 },
  { id: "l2", name: "Me. Lina Boudiaf", invoiced: 310000, collected: 310000 },
  { id: "l3", name: "Me. Hocine Meziane", invoiced: 0, collected: 0 },
];

// TODO: remplacer par un fetch réel (GET /api/delegations/retrocessions)
const partnerRetrocessions: PartnerRetrocessionRow[] = [
  {
    id: "p1",
    partnerName: "Me. Rachid Amrani",
    missionsBilled: 2,
    amountDue: 54000,
    status: "en_attente",
  },
  {
    id: "p2",
    partnerName: "Me. Sarah Belkacem",
    missionsBilled: 1,
    amountDue: 0,
    status: "paye",
  },
];

function formatDZD(amount: number) {
  return `${amount.toLocaleString("fr-DZ")} DA`;
}

const totalInvoiced = lawyerBilling.reduce((sum, row) => sum + row.invoiced, 0);
const totalCollected = lawyerBilling.reduce(
  (sum, row) => sum + row.collected,
  0,
);
const totalDue = partnerRetrocessions.reduce(
  (sum, row) => sum + (row.status === "en_attente" ? row.amountDue : 0),
  0,
);

export default function AdminBillingPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Super-administrateur"
        title="Facturation"
        subtitle="Vue agrégée du cabinet et rétrocessions dues aux partenaires."
      />

      <div className="border border-ch2ma-gold/30 bg-ch2ma-gold/5 px-5 py-4 text-sm text-ch2ma-text">
        Le moyen de paiement en ligne n'est pas encore branché (Stripe vs
        SATIM/CIB/Edahabia à trancher) — ces montants sont saisis/calculés
        manuellement pour l'instant, pas encore liés à un encaissement réel.
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard
          label="Facturé (cabinet)"
          value={formatDZD(totalInvoiced)}
          icon={Banknote}
        />
        <StatCard
          label="Encaissé (cabinet)"
          value={formatDZD(totalCollected)}
          icon={Wallet}
        />
        <StatCard
          label="Rétrocessions dues"
          value={formatDZD(totalDue)}
          icon={Clock}
        />
      </div>

      <Card className="overflow-hidden p-0">
        <div className="border-b border-ch2ma-border px-6 py-4">
          <h2 className="text-sm font-semibold text-ch2ma-text">
            Par avocat interne
          </h2>
        </div>
        <table className="w-full text-left text-sm">
          <thead className="border-b border-ch2ma-border text-xs uppercase tracking-wide text-ch2ma-muted">
            <tr>
              <th className="px-6 py-3 font-medium">Avocat</th>
              <th className="px-6 py-3 font-medium">Facturé</th>
              <th className="px-6 py-3 font-medium">Encaissé</th>
              <th className="px-6 py-3 font-medium">Reste dû</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ch2ma-border">
            {lawyerBilling.map((row) => (
              <tr key={row.id}>
                <td className="px-6 py-4 text-ch2ma-text">{row.name}</td>
                <td className="px-6 py-4 text-ch2ma-text">
                  {formatDZD(row.invoiced)}
                </td>
                <td className="px-6 py-4 text-ch2ma-text">
                  {formatDZD(row.collected)}
                </td>
                <td className="px-6 py-4 text-ch2ma-muted">
                  {formatDZD(row.invoiced - row.collected)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Card className="overflow-hidden p-0">
        <div className="border-b border-ch2ma-border px-6 py-4">
          <h2 className="text-sm font-semibold text-ch2ma-text">
            Rétrocessions dues aux partenaires
          </h2>
        </div>
        <table className="w-full text-left text-sm">
          <thead className="border-b border-ch2ma-border text-xs uppercase tracking-wide text-ch2ma-muted">
            <tr>
              <th className="px-6 py-3 font-medium">Partenaire</th>
              <th className="px-6 py-3 font-medium">Missions facturées</th>
              <th className="px-6 py-3 font-medium">Montant dû</th>
              <th className="px-6 py-3 font-medium">Statut</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ch2ma-border">
            {partnerRetrocessions.map((row) => (
              <tr key={row.id}>
                <td className="px-6 py-4 text-ch2ma-text">{row.partnerName}</td>
                <td className="px-6 py-4 text-ch2ma-text">
                  {row.missionsBilled}
                </td>
                <td className="px-6 py-4 text-ch2ma-text">
                  {formatDZD(row.amountDue)}
                </td>
                <td className="px-6 py-4">
                  <Badge tone={row.status === "paye" ? "green" : "gold"}>
                    {row.status === "paye" ? "Payé" : "En attente"}
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
