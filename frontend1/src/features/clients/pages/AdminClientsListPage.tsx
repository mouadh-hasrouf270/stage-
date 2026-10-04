import { useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../../../components/ui/PageHeader";
import Card from "../../../components/ui/Card";
import type { Client, InternalLawyerOption } from "../admin-types";

// TODO: remplacer par un fetch réel (GET /api/internal-lawyers)
const internalLawyers: InternalLawyerOption[] = [
  { id: "l1", name: "Me. Amine Cherif" },
  { id: "l2", name: "Me. Lina Boudiaf" },
  { id: "l3", name: "Me. Hocine Meziane" },
];

// TODO: remplacer par un fetch réel (GET /api/clients — tous, scope admin)
const initialClients: Client[] = [
  {
    id: "c1",
    name: "SARL Amazigh",
    email: "contact@amazigh-sarl.dz",
    phone: "0555 12 34 56",
    assignedLawyerId: "l1",
    activeMatters: 1,
    since: "14/03/2025",
  },
  {
    id: "c2",
    name: "Karim Benali",
    email: "k.benali@gmail.com",
    phone: "0661 22 33 44",
    assignedLawyerId: "l1",
    activeMatters: 1,
    since: "02/01/2026",
  },
  {
    id: "c3",
    name: "SCI Oran Centre",
    email: "gestion@sci-oran.dz",
    phone: "0770 98 76 54",
    assignedLawyerId: "l2",
    activeMatters: 1,
    since: "19/06/2025",
  },
  {
    id: "c4",
    name: "Nadia Haddad",
    email: "nadia.haddad@gmail.com",
    phone: "0550 11 22 33",
    assignedLawyerId: "l3",
    activeMatters: 0,
    since: "08/11/2024",
  },
];

export default function AdminClientsListPage() {
  const [clients, setClients] = useState<Client[]>(initialClients);

  function reassign(clientId: string, lawyerId: string) {
    // TODO: PATCH /api/clients/:id { assignedLawyerId }
    setClients((prev) =>
      prev.map((c) =>
        c.id === clientId ? { ...c, assignedLawyerId: lawyerId } : c,
      ),
    );
  }

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Super-administrateur"
        title="Clients"
        subtitle="Tous les clients du cabinet, tous avocats confondus."
      />

      <Card className="overflow-hidden p-0">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-ch2ma-border text-xs uppercase tracking-wide text-ch2ma-muted">
            <tr>
              <th className="px-6 py-3 font-medium">Client</th>
              <th className="px-6 py-3 font-medium">Contact</th>
              <th className="px-6 py-3 font-medium">Dossiers actifs</th>
              <th className="px-6 py-3 font-medium">Avocat assigné</th>
              <th className="px-6 py-3 font-medium">Client depuis</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ch2ma-border">
            {clients.map((client) => (
              <tr key={client.id}>
                <td className="px-6 py-4">
                  <Link
                    to={`/admin/clients/${client.id}`}
                    className="font-medium text-ch2ma-text hover:text-ch2ma-gold"
                  >
                    {client.name}
                  </Link>
                </td>
                <td className="px-6 py-4 text-ch2ma-muted">
                  <div>{client.email}</div>
                  <div>{client.phone}</div>
                </td>
                <td className="px-6 py-4 text-ch2ma-text">
                  {client.activeMatters}
                </td>
                <td className="px-6 py-4">
                  <select
                    value={client.assignedLawyerId}
                    onChange={(e) => reassign(client.id, e.target.value)}
                    className="border border-ch2ma-border bg-transparent px-2 py-1.5 text-sm text-ch2ma-text focus:border-ch2ma-gold focus:outline-none"
                  >
                    {internalLawyers.map((lawyer) => (
                      <option key={lawyer.id} value={lawyer.id}>
                        {lawyer.name}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-6 py-4 text-ch2ma-muted">{client.since}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
