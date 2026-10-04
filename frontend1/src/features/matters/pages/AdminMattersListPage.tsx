import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../../../components/ui/PageHeader";
import Card from "../../../components/ui/Card";
import Badge from "../../../components/ui/Badge";
import type {
  InternalLawyerOption,
  MatterStatus,
  MatterSummary,
} from "../admin-types";

const internalLawyers: InternalLawyerOption[] = [
  { id: "l1", name: "Me. Amine Cherif" },
  { id: "l2", name: "Me. Lina Boudiaf" },
  { id: "l3", name: "Me. Hocine Meziane" },
];

const domains = [
  "Droit des affaires",
  "Droit des sociétés",
  "Droit commercial",
  "Droit civil",
  "Droit immobilier",
  "Contentieux et litiges",
];

const statusLabel: Record<MatterStatus, string> = {
  ouvert: "Ouvert",
  en_cours: "En cours",
  en_attente: "En attente",
  cloture: "Clôturé",
};

// tone confirmés d'après ton vrai BadgeTone ("gold" | "muted" | "green" | "alert")
const statusTone: Record<MatterStatus, "gold" | "green" | "muted" | "alert"> = {
  ouvert: "gold",
  en_cours: "green",
  en_attente: "alert",
  cloture: "muted",
};

// TODO: remplacer par un fetch réel (GET /api/matters — tous, scope admin)
const initialMatters: MatterSummary[] = [
  {
    id: "m1",
    title: "Succession Benali",
    clientName: "Karim Benali",
    lawyerId: "l1",
    lawyerName: "Me. Amine Cherif",
    domain: "Droit civil",
    status: "en_cours",
  },
  {
    id: "m2",
    title: "Litige commercial — SARL Amazigh",
    clientName: "SARL Amazigh",
    lawyerId: "l1",
    lawyerName: "Me. Amine Cherif",
    domain: "Contentieux et litiges",
    status: "ouvert",
  },
  {
    id: "m3",
    title: "Bail commercial Oran",
    clientName: "SCI Oran Centre",
    lawyerId: "l2",
    lawyerName: "Me. Lina Boudiaf",
    domain: "Droit immobilier",
    status: "en_attente",
  },
  {
    id: "m4",
    title: "Contentieux fournisseur — 2024",
    clientName: "SARL Amazigh",
    lawyerId: "l1",
    lawyerName: "Me. Amine Cherif",
    domain: "Droit commercial",
    status: "cloture",
  },
];

export default function AdminMattersListPage() {
  const [matters, setMatters] = useState<MatterSummary[]>(initialMatters);
  const [lawyerFilter, setLawyerFilter] = useState("tous");
  const [statusFilter, setStatusFilter] = useState("tous");
  const [domainFilter, setDomainFilter] = useState("tous");

  const filteredMatters = useMemo(() => {
    return matters.filter((matter) => {
      if (lawyerFilter !== "tous" && matter.lawyerId !== lawyerFilter)
        return false;
      if (statusFilter !== "tous" && matter.status !== statusFilter)
        return false;
      if (domainFilter !== "tous" && matter.domain !== domainFilter)
        return false;
      return true;
    });
  }, [matters, lawyerFilter, statusFilter, domainFilter]);

  function reassign(matterId: string, lawyerId: string) {
    // TODO: PATCH /api/matters/:id { lawyerId }
    const lawyer = internalLawyers.find((l) => l.id === lawyerId);
    if (!lawyer) return;
    setMatters((prev) =>
      prev.map((m) =>
        m.id === matterId
          ? { ...m, lawyerId: lawyer.id, lawyerName: lawyer.name }
          : m,
      ),
    );
  }

  function changeStatus(matterId: string, status: MatterStatus) {
    // TODO: PATCH /api/matters/:id { status }
    setMatters((prev) =>
      prev.map((m) => (m.id === matterId ? { ...m, status } : m)),
    );
  }

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Super-administrateur"
        title="Dossiers"
        subtitle="Tous les dossiers du cabinet, tous avocats confondus."
      />

      <div className="flex flex-wrap gap-3">
        <select
          value={lawyerFilter}
          onChange={(e) => setLawyerFilter(e.target.value)}
          className="border border-ch2ma-border bg-transparent px-3 py-2 text-sm text-ch2ma-text focus:border-ch2ma-gold focus:outline-none"
        >
          <option value="tous">Tous les avocats</option>
          {internalLawyers.map((lawyer) => (
            <option key={lawyer.id} value={lawyer.id}>
              {lawyer.name}
            </option>
          ))}
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-ch2ma-border bg-transparent px-3 py-2 text-sm text-ch2ma-text focus:border-ch2ma-gold focus:outline-none"
        >
          <option value="tous">Tous les statuts</option>
          {(Object.keys(statusLabel) as MatterStatus[]).map((status) => (
            <option key={status} value={status}>
              {statusLabel[status]}
            </option>
          ))}
        </select>

        <select
          value={domainFilter}
          onChange={(e) => setDomainFilter(e.target.value)}
          className="border border-ch2ma-border bg-transparent px-3 py-2 text-sm text-ch2ma-text focus:border-ch2ma-gold focus:outline-none"
        >
          <option value="tous">Tous les domaines</option>
          {domains.map((domain) => (
            <option key={domain} value={domain}>
              {domain}
            </option>
          ))}
        </select>
      </div>

      <Card className="overflow-hidden p-0">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-ch2ma-border text-xs uppercase tracking-wide text-ch2ma-muted">
            <tr>
              <th className="px-6 py-3 font-medium">Dossier</th>
              <th className="px-6 py-3 font-medium">Client</th>
              <th className="px-6 py-3 font-medium">Domaine</th>
              <th className="px-6 py-3 font-medium">Avocat</th>
              <th className="px-6 py-3 font-medium">Statut</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ch2ma-border">
            {filteredMatters.map((matter) => (
              <tr key={matter.id}>
                <td className="px-6 py-4">
                  <Link
                    to={`/admin/dossiers/${matter.id}`}
                    className="font-medium text-ch2ma-text hover:text-ch2ma-gold"
                  >
                    {matter.title}
                  </Link>
                </td>
                <td className="px-6 py-4 text-ch2ma-muted">
                  {matter.clientName}
                </td>
                <td className="px-6 py-4 text-ch2ma-muted">{matter.domain}</td>
                <td className="px-6 py-4">
                  <select
                    value={matter.lawyerId}
                    onChange={(e) => reassign(matter.id, e.target.value)}
                    className="border border-ch2ma-border bg-transparent px-2 py-1.5 text-sm text-ch2ma-text focus:border-ch2ma-gold focus:outline-none"
                  >
                    {internalLawyers.map((lawyer) => (
                      <option key={lawyer.id} value={lawyer.id}>
                        {lawyer.name}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Badge tone={statusTone[matter.status]}>
                      {statusLabel[matter.status]}
                    </Badge>
                    <select
                      value={matter.status}
                      onChange={(e) =>
                        changeStatus(matter.id, e.target.value as MatterStatus)
                      }
                      className="border border-ch2ma-border bg-transparent px-1.5 py-1 text-xs text-ch2ma-muted focus:border-ch2ma-gold focus:outline-none"
                    >
                      {(Object.keys(statusLabel) as MatterStatus[]).map(
                        (status) => (
                          <option key={status} value={status}>
                            {statusLabel[status]}
                          </option>
                        ),
                      )}
                    </select>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
