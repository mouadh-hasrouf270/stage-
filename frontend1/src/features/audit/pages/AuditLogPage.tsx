import { useState } from "react";
import { Search } from "lucide-react";
import PageHeader from "../../../components/ui/PageHeader";
import Card from "../../../components/ui/Card";

interface AuditEntry {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  target: string;
}

const entries: AuditEntry[] = [
  {
    id: "e1",
    timestamp: "02/10/2026 14:32",
    actor: "Me. Amine Cherif",
    action: "a modifié le statut du dossier",
    target: "Succession Benali",
  },
  {
    id: "e2",
    timestamp: "02/10/2026 11:05",
    actor: "Maître Chama",
    action: "a créé une délégation sur",
    target: "Bail commercial Oran",
  },
  {
    id: "e3",
    timestamp: "01/10/2026 17:48",
    actor: "Me. Sarah Belkacem",
    action: "a consulté un document du Coffre-Fort pour",
    target: "Litige commercial — SARL Amazigh",
  },
  {
    id: "e4",
    timestamp: "01/10/2026 09:12",
    actor: "Maître Chama",
    action: "a approuvé la candidature de",
    target: "Me. Rachid Amrani",
  },
];

export default function AuditLogPage() {
  const [query, setQuery] = useState("");

  const filtered = entries.filter((entry) =>
    `${entry.actor} ${entry.action} ${entry.target}`
      .toLowerCase()
      .includes(query.toLowerCase()),
  );

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Administration"
        title="Journal d'audit"
        subtitle="Traçabilité des actions effectuées sur la plateforme."
      />

      <label className="relative block max-w-sm">
        <Search
          size={16}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ch2ma-muted"
        />

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher un avocat, une action, un dossier..."
          className="w-full border border-ch2ma-border bg-transparent py-2.5 pl-10 pr-3 text-sm text-ch2ma-text focus:border-ch2ma-gold focus:outline-none"
        />
      </label>

      <Card className="overflow-hidden p-0">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-ch2ma-border text-xs uppercase tracking-wide text-ch2ma-muted">
            <tr>
              <th className="px-6 py-3 font-medium">Date</th>

              <th className="px-6 py-3 font-medium">Utilisateur</th>

              <th className="px-6 py-3 font-medium">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-ch2ma-border">
            {filtered.map((entry) => (
              <tr key={entry.id}>
                <td className="whitespace-nowrap px-6 py-4 text-ch2ma-muted">
                  {entry.timestamp}
                </td>

                <td className="px-6 py-4 font-medium text-ch2ma-text">
                  {entry.actor}
                </td>

                <td className="px-6 py-4 text-ch2ma-text">
                  {entry.action}{" "}
                  <span className="text-ch2ma-muted">{entry.target}</span>
                </td>
              </tr>
            ))}

            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={3}
                  className="px-6 py-10 text-center text-sm text-ch2ma-muted"
                >
                  Aucun résultat trouvé.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
