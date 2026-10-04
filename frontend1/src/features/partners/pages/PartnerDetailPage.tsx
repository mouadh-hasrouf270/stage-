import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import PageHeader from "../../../components/ui/PageHeader";
import Card from "../../../components/ui/Card";
import Badge from "../../../components/ui/Badge";

const mockMissionHistory = [
  {
    id: "d1",
    matterTitle: "Succession Benali",
    status: "En cours",
    retrocessionRate: 30,
  },
  {
    id: "d2",
    matterTitle: "Bail commercial Oran — 2025",
    status: "Clôturée",
    retrocessionRate: 25,
  },
];

export default function PartnerDetailPage() {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <p className="text-sm text-ch2ma-muted">Partenaire introuvable.</p>;
  }

  return (
    <div className="space-y-8">
      {/* Retour */}
      <Link
        to="/admin/partenaires"
        className="inline-flex items-center gap-2 text-sm text-ch2ma-muted hover:text-ch2ma-text"
      >
        <ArrowLeft size={14} />
        Retour aux partenaires
      </Link>

      {/* Header */}
      <PageHeader
        eyebrow="Administration"
        title="Me. Rachid Amrani"
        subtitle="Droit des affaires · Partenaire depuis janvier 2026"
        action={
          <Link
            to="/admin/delegations"
            className="bg-ch2ma-dark px-4 py-2.5 text-sm font-semibold text-ch2ma-cream hover:bg-ch2ma-dark/90"
          >
            Nouvelle délégation
          </Link>
        }
      />

      {/* Informations */}
      <div className="grid gap-6 sm:grid-cols-3">
        <Card className="p-5">
          <p className="text-xs uppercase tracking-wide text-ch2ma-muted">
            Statut
          </p>

          <div className="mt-2">
            <Badge tone="green">Actif</Badge>
          </div>
        </Card>

        <Card className="p-5">
          <p className="text-xs uppercase tracking-wide text-ch2ma-muted">
            Taux de rétrocession
          </p>

          <p className="mt-2 text-xl font-semibold text-ch2ma-text">30%</p>
        </Card>

        <Card className="p-5">
          <p className="text-xs uppercase tracking-wide text-ch2ma-muted">
            Missions en cours
          </p>

          <p className="mt-2 text-xl font-semibold text-ch2ma-text">2</p>
        </Card>
      </div>

      {/* Historique des missions */}
      <Card className="overflow-hidden p-0">
        <div className="border-b border-ch2ma-border px-6 py-4">
          <h2 className="text-sm font-semibold text-ch2ma-text">
            Historique des missions
          </h2>
        </div>

        <table className="w-full text-left text-sm">
          <thead className="border-b border-ch2ma-border text-xs uppercase tracking-wide text-ch2ma-muted">
            <tr>
              <th className="px-6 py-3 font-medium">Dossier</th>

              <th className="px-6 py-3 font-medium">Rétrocession</th>

              <th className="px-6 py-3 font-medium">Statut</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-ch2ma-border">
            {mockMissionHistory.map((mission) => (
              <tr key={mission.id}>
                <td className="px-6 py-4 text-ch2ma-text">
                  {mission.matterTitle}
                </td>

                <td className="px-6 py-4 text-ch2ma-text">
                  {mission.retrocessionRate}%
                </td>

                <td className="px-6 py-4">
                  {mission.status === "En cours" ? (
                    <Badge tone="gold">En cours</Badge>
                  ) : (
                    <Badge tone="muted">Clôturée</Badge>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
