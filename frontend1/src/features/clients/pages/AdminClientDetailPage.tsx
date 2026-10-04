import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import PageHeader from "../../../components/ui/PageHeader";
import Card from "../../../components/ui/Card";
import Badge from "../../../components/ui/Badge";
import type { InternalLawyerOption } from "../admin-types";

const internalLawyers: InternalLawyerOption[] = [
  { id: "l1", name: "Me. Amine Cherif" },
  { id: "l2", name: "Me. Lina Boudiaf" },
  { id: "l3", name: "Me. Hocine Meziane" },
];

// TODO: remplacer par un fetch réel (GET /api/clients/:id)
const mockClient = {
  name: "SARL Amazigh",
  email: "contact@amazigh-sarl.dz",
  phone: "0555 12 34 56",
  since: "14/03/2025",
  assignedLawyerId: "l1",
};

const mockMatters = [
  {
    id: "m1",
    title: "Litige commercial — SARL Amazigh",
    status: "En cours",
    lawyerName: "Me. Amine Cherif",
  },
  {
    id: "m2",
    title: "Contentieux fournisseur — 2024",
    status: "Clôturé",
    lawyerName: "Me. Amine Cherif",
  },
];

export default function AdminClientDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [assignedLawyerId, setAssignedLawyerId] = useState(
    mockClient.assignedLawyerId,
  );

  if (!id) {
    return <p className="text-sm text-ch2ma-muted">Client introuvable.</p>;
  }

  function handleReassign(lawyerId: string) {
    // TODO: PATCH /api/clients/:id { assignedLawyerId: lawyerId }
    setAssignedLawyerId(lawyerId);
  }

  return (
    <div className="space-y-8">
      <Link
        to="/admin/clients"
        className="inline-flex items-center gap-2 text-sm text-ch2ma-muted hover:text-ch2ma-text"
      >
        <ArrowLeft size={14} /> Retour aux clients
      </Link>

      <PageHeader
        eyebrow="Client"
        title={mockClient.name}
        subtitle={`Client depuis le ${mockClient.since}`}
      />

      <div className="grid gap-6 sm:grid-cols-3">
        <Card className="p-5">
          <p className="text-xs uppercase tracking-wide text-ch2ma-muted">
            Email
          </p>
          <p className="mt-2 text-sm text-ch2ma-text">{mockClient.email}</p>
        </Card>
        <Card className="p-5">
          <p className="text-xs uppercase tracking-wide text-ch2ma-muted">
            Téléphone
          </p>
          <p className="mt-2 text-sm text-ch2ma-text">{mockClient.phone}</p>
        </Card>
        <Card className="p-5">
          <p className="text-xs uppercase tracking-wide text-ch2ma-muted">
            Avocat assigné
          </p>
          <select
            value={assignedLawyerId}
            onChange={(e) => handleReassign(e.target.value)}
            className="mt-2 w-full border border-ch2ma-border bg-transparent px-2 py-1.5 text-sm text-ch2ma-text focus:border-ch2ma-gold focus:outline-none"
          >
            {internalLawyers.map((lawyer) => (
              <option key={lawyer.id} value={lawyer.id}>
                {lawyer.name}
              </option>
            ))}
          </select>
        </Card>
      </div>

      <Card className="overflow-hidden p-0">
        <div className="border-b border-ch2ma-border px-6 py-4">
          <h2 className="text-sm font-semibold text-ch2ma-text">
            Dossiers du client
          </h2>
        </div>
        <table className="w-full text-left text-sm">
          <thead className="border-b border-ch2ma-border text-xs uppercase tracking-wide text-ch2ma-muted">
            <tr>
              <th className="px-6 py-3 font-medium">Dossier</th>
              <th className="px-6 py-3 font-medium">Avocat</th>
              <th className="px-6 py-3 font-medium">Statut</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ch2ma-border">
            {mockMatters.map((matter) => (
              <tr key={matter.id}>
                <td className="px-6 py-4 text-ch2ma-text">{matter.title}</td>
                <td className="px-6 py-4 text-ch2ma-muted">
                  {matter.lawyerName}
                </td>
                <td className="px-6 py-4">
                  <Badge tone={matter.status === "En cours" ? "gold" : "muted"}>
                    {matter.status}
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
