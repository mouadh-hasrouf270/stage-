import { Gavel, AlarmClock, Video, Building2 } from "lucide-react";
import { PageHeader, Card, Badge } from "../../../components/ui/InternalUI";

type TypeEvenement = "audience" | "echeance" | "presentiel" | "visio";

const icones: Record<TypeEvenement, typeof Gavel> = {
  audience: Gavel,
  echeance: AlarmClock,
  presentiel: Building2,
  visio: Video,
};
const labels: Record<TypeEvenement, string> = {
  audience: "Audience",
  echeance: "Échéance",
  presentiel: "RDV présentiel",
  visio: "RDV visio",
};

const semaine = [
  {
    jour: "Lundi 14",
    evenements: [
      {
        heure: "09:30",
        type: "audience" as const,
        titre: "Atlas Import — mise en état",
      },
    ],
  },
  {
    jour: "Mardi 15",
    evenements: [
      { heure: "10:00", type: "visio" as const, titre: "Point — SCI Hamdi" },
    ],
  },
  {
    jour: "Mercredi 16",
    evenements: [
      {
        heure: "08:30",
        type: "audience" as const,
        titre: "Benziane — plaidoirie",
      },
    ],
  },
  {
    jour: "Jeudi 17",
    evenements: [
      {
        heure: "17:00",
        type: "echeance" as const,
        titre: "Dépôt conclusions — Atlas Import",
      },
    ],
  },
  {
    jour: "Vendredi 18",
    evenements: [
      {
        heure: "11:00",
        type: "presentiel" as const,
        titre: "Consultation nouveau client",
      },
    ],
  },
];

export default function CalendarPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Calendrier"
        title="Semaine du 14 au 18 septembre"
        subtitle="Rendez-vous, audiences et échéances, dans une seule vue."
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
        {semaine.map((jour) => (
          <Card key={jour.jour} className="p-4">
            <p className="mb-3 text-[12px] font-semibold text-ch2ma-dark2">
              {jour.jour}
            </p>
            <ul className="space-y-3">
              {jour.evenements.map((e) => {
                const Icon = icones[e.type];
                return (
                  <li
                    key={e.heure}
                    className={`border-l-2 pl-3 ${e.type === "echeance" ? "border-red-300" : "border-ch2ma-gold/50"}`}
                  >
                    <p className="text-[12px] font-semibold text-ch2ma-text">
                      {e.heure}
                    </p>
                    <p className="mt-1 text-[12px] leading-snug text-ch2ma-text">
                      {e.titre}
                    </p>
                    <span className="mt-2 inline-flex items-center gap-1.5 text-[11px] text-ch2ma-muted">
                      <Icon size={12} strokeWidth={1.8} /> {labels[e.type]}
                    </span>
                    {e.type === "echeance" && (
                      <div className="mt-1">
                        <Badge tone="alert">Urgent</Badge>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </Card>
        ))}
      </div>
    </div>
  );
}
