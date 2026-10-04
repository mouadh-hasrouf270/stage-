import { Link } from "react-router-dom";
import { Folder, Clock, CheckCircle2 } from "lucide-react";
import PageHeader from "../../../components/ui/PageHeader";
import Card from "../../../components/ui/Card";
import StatCard from "../../../components/ui/StatCard";
import Badge from "../../../components/ui/Badge";
import MatterBreakdownTable from "../components/MatterBreakdownTable";
import type {
  DashboardAlert,
  DashboardAlertType,
  MatterBreakdownRow,
} from "../types";

// TODO: remplacer par un fetch réel (GET /api/matters/summary?group_by=lawyer)
const internalBreakdown: MatterBreakdownRow[] = [
  { id: "l1", name: "Me. Amine Cherif", active: 9, pending: 2, closed: 14 },
  { id: "l2", name: "Me. Lina Boudiaf", active: 6, pending: 1, closed: 10 },
  { id: "l3", name: "Me. Hocine Meziane", active: 0, pending: 0, closed: 3 },
];

const partnerBreakdown: MatterBreakdownRow[] = [
  { id: "p1", name: "Me. Rachid Amrani", active: 2, pending: 0, closed: 5 },
  { id: "p2", name: "Me. Sarah Belkacem", active: 1, pending: 1, closed: 3 },
];

function sumColumn(
  rows: MatterBreakdownRow[],
  key: "active" | "pending" | "closed",
) {
  return rows.reduce((total, row) => total + row[key], 0);
}

const allRows = [...internalBreakdown, ...partnerBreakdown];
const totals = {
  active: sumColumn(allRows, "active"),
  pending: sumColumn(allRows, "pending"),
  closed: sumColumn(allRows, "closed"),
};

// TODO: remplacer par un fetch réel (GET /api/admin/alerts)
const alerts: DashboardAlert[] = [
  {
    id: "1",
    type: "rdv",
    label: "5 demandes de rendez-vous non attribuées",
    to: "/admin/clients",
  },
  {
    id: "2",
    type: "retard",
    label: "2 dossiers en retard d'échéance",
    to: "/admin/dossiers",
  },
  {
    id: "3",
    type: "candidature",
    label: "3 candidatures partenaires en attente",
    to: "/admin/partenaires",
  },
  {
    id: "4",
    type: "assistance",
    label: "1 demande d'assistance non traitée",
    to: "/admin/assistance",
  },
];

const alertLabel: Record<DashboardAlertType, string> = {
  rdv: "RDV",
  retard: "Retard",
  candidature: "Candidature",
  assistance: "Assistance",
};

// tone confirmés d'après ton vrai BadgeTone ("gold" | "muted" | "green" | "alert")
const alertTone: Record<DashboardAlertType, "gold" | "alert"> = {
  rdv: "gold",
  retard: "alert",
  candidature: "gold",
  assistance: "gold",
};

// TODO: piloter par l'état réel du module billing (feature flag ou présence
// de données) — false tant que le paiement en ligne n'est pas branché
const billingConnected = false;

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Super-administrateur"
        title="Tableau de bord"
        subtitle="Vue d'ensemble du cabinet, tous avocats confondus."
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard
          label="Dossiers actifs"
          value={String(totals.active)}
          icon={Folder}
        />
        <StatCard
          label="En attente"
          value={String(totals.pending)}
          icon={Clock}
        />
        <StatCard
          label="Clôturés"
          value={String(totals.closed)}
          icon={CheckCircle2}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <MatterBreakdownTable
          title="Avocats internes"
          rows={internalBreakdown}
        />
        <MatterBreakdownTable
          title="Avocats partenaires"
          rows={partnerBreakdown}
        />
      </div>

      <Card className="p-6">
        <h2 className="text-sm font-semibold text-ch2ma-text">
          Alertes prioritaires
        </h2>
        <ul className="mt-4 divide-y divide-ch2ma-border">
          {alerts.map((alert) => (
            <li
              key={alert.id}
              className="flex items-center justify-between py-3"
            >
              <div className="flex items-center gap-3">
                <Badge tone={alertTone[alert.type]}>
                  {alertLabel[alert.type]}
                </Badge>
                <span className="text-sm text-ch2ma-text">{alert.label}</span>
              </div>
              <Link
                to={alert.to}
                className="text-sm font-medium text-ch2ma-gold hover:underline"
              >
                Traiter →
              </Link>
            </li>
          ))}
        </ul>
      </Card>

      {billingConnected && (
        <Card className="p-6">
          <h2 className="text-sm font-semibold text-ch2ma-text">
            Activité agrégée
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <div>
              <p className="text-xs uppercase tracking-wide text-ch2ma-muted">
                Facturé ce mois-ci
              </p>
              <p className="mt-1 text-xl font-semibold text-ch2ma-text">—</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-ch2ma-muted">
                Encaissé ce mois-ci
              </p>
              <p className="mt-1 text-xl font-semibold text-ch2ma-text">—</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-ch2ma-muted">
                Rétrocessions dues
              </p>
              <p className="mt-1 text-xl font-semibold text-ch2ma-text">—</p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
