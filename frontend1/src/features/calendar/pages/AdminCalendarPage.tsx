import { useMemo, useState } from "react";
import PageHeader from "../../../components/ui/PageHeader";
import Card from "../../../components/ui/Card";
import Badge from "../../../components/ui/Badge";
import type {
  CalendarEvent,
  CalendarEventType,
  InternalLawyerOption,
} from "../admin-types";

const internalLawyers: InternalLawyerOption[] = [
  { id: "l1", name: "Me. Amine Cherif" },
  { id: "l2", name: "Me. Lina Boudiaf" },
  { id: "l3", name: "Me. Hocine Meziane" },
];

const typeLabel: Record<CalendarEventType, string> = {
  rdv_client: "RDV client",
  audience: "Audience",
  echeance: "Échéance",
};

const typeTone: Record<CalendarEventType, "gold" | "alert" | "muted"> = {
  rdv_client: "gold",
  audience: "alert",
  echeance: "muted",
};

// TODO: remplacer par un fetch réel (GET /api/calendar/events — tous les avocats internes)
const events: CalendarEvent[] = [
  {
    id: "e1",
    title: "RDV — Karim Benali",
    date: "2026-10-06",
    time: "09:30",
    lawyerId: "l1",
    lawyerName: "Me. Amine Cherif",
    type: "rdv_client",
  },
  {
    id: "e2",
    title: "Audience — Succession Benali",
    date: "2026-10-06",
    time: "14:00",
    lawyerId: "l1",
    lawyerName: "Me. Amine Cherif",
    type: "audience",
  },
  {
    id: "e3",
    title: "Échéance dépôt mémoire — SCI Oran Centre",
    date: "2026-10-08",
    time: "00:00",
    lawyerId: "l2",
    lawyerName: "Me. Lina Boudiaf",
    type: "echeance",
  },
  {
    id: "e4",
    title: "RDV — SARL Amazigh",
    date: "2026-10-09",
    time: "11:00",
    lawyerId: "l1",
    lawyerName: "Me. Amine Cherif",
    type: "rdv_client",
  },
];

export default function AdminCalendarPage() {
  const [lawyerFilter, setLawyerFilter] = useState("tous");

  const filtered = useMemo(
    () =>
      events
        .filter((e) => lawyerFilter === "tous" || e.lawyerId === lawyerFilter)
        .sort((a, b) =>
          `${a.date}${a.time}`.localeCompare(`${b.date}${b.time}`),
        ),
    [lawyerFilter],
  );

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Super-administrateur"
        title="Calendrier"
        subtitle="Agenda de tous les avocats internes."
      />

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

      <Card className="overflow-hidden p-0">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-ch2ma-border text-xs uppercase tracking-wide text-ch2ma-muted">
            <tr>
              <th className="px-6 py-3 font-medium">Date</th>
              <th className="px-6 py-3 font-medium">Heure</th>
              <th className="px-6 py-3 font-medium">Évènement</th>
              <th className="px-6 py-3 font-medium">Avocat</th>
              <th className="px-6 py-3 font-medium">Type</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ch2ma-border">
            {filtered.map((event) => (
              <tr key={event.id}>
                <td className="whitespace-nowrap px-6 py-4 text-ch2ma-muted">
                  {event.date}
                </td>
                <td className="px-6 py-4 text-ch2ma-muted">{event.time}</td>
                <td className="px-6 py-4 text-ch2ma-text">{event.title}</td>
                <td className="px-6 py-4 text-ch2ma-muted">
                  {event.lawyerName}
                </td>
                <td className="px-6 py-4">
                  <Badge tone={typeTone[event.type]}>
                    {typeLabel[event.type]}
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
