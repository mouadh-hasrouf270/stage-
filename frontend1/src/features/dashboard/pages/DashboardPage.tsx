import {
  Gavel,
  ListChecks,
  FolderOpen,
  Users,
  Clock3,
  MapPin,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

import { Link } from "react-router-dom";

import {
  PageHeader,
  StatCard,
  Card,
  Badge,
} from "../../../components/ui/InternalUI";

const audiencesDuJour = [
  {
    id: "atlas-import",
    heure: "09:30",
    dossier: "SARL Atlas Import c/ SPA Numidia",
    tribunal: "Tribunal de Khenchela",
  },
  {
    id: "benziane-cnas",
    heure: "11:00",
    dossier: "Benziane c/ CNAS",
    tribunal: "Tribunal administratif",
  },
];

const tachesPrioritaires = [
  {
    id: "conclusions-atlas-import",
    titre: "Déposer les conclusions — Atlas Import",
    echeance: "Aujourd'hui, 17h",
    priorite: "urgente" as const,
  },
  {
    id: "plaidoirie-benziane",
    titre: "Préparer le dossier de plaidoirie — Benziane",
    echeance: "Demain",
    priorite: "urgente" as const,
  },
  {
    id: "convention-meziane",
    titre: "Relire le projet de convention — Meziane",
    echeance: "Cette semaine",
    priorite: "normale" as const,
  },
];

export default function DashboardPage() {
  return (
    <div className="w-full">
      {/* =====================================================
          HEADER
      ===================================================== */}
      <PageHeader
        eyebrow="Tableau de bord"
        title="Bonjour, Maître Benali"
        subtitle="Vendredi 18 septembre — voici votre journée."
      />

      {/* =====================================================
          STATISTIQUES
      ===================================================== */}
      <div className="mb-6 grid grid-cols-2 items-stretch gap-3 sm:mb-8 sm:gap-4 lg:grid-cols-4">
        <Link
          to="/app/clients"
          className="group block h-[140px] w-full rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-ch2ma-gold sm:h-[150px]"
        >
          <StatCard
            label="Clients actifs"
            value="9"
            icon={Users}
            className="h-[140px] sm:h-[150px]"
          />
        </Link>

        <Link
          to="/app/matters"
          className="group block h-[140px] w-full rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-ch2ma-gold sm:h-[150px]"
        >
          <StatCard
            label="Dossiers actifs"
            value="12"
            icon={FolderOpen}
            className="h-[140px] sm:h-[150px]"
          />
        </Link>

        <Link
          to="/app/calendar"
          className="group block h-[140px] w-full rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-ch2ma-gold sm:h-[150px]"
        >
          <StatCard
            label="Audiences aujourd'hui"
            value="2"
            icon={Gavel}
            className="h-[140px] sm:h-[150px]"
          />
        </Link>

        <Link
          to="/app/tasks"
          className="group block h-[140px] w-full rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-ch2ma-gold sm:h-[150px]"
        >
          <StatCard
            label="Tâches urgentes"
            value="2"
            icon={ListChecks}
            className="h-[140px] sm:h-[150px]"
          />
        </Link>
      </div>

      {/* =====================================================
          CONTENU PRINCIPAL
      ===================================================== */}
      <div className="grid grid-cols-1 items-stretch gap-4 sm:gap-6 lg:grid-cols-2">
        {/* ===================================================
            AUDIENCES DU JOUR
        =================================================== */}
        <Card className="flex h-full flex-col overflow-hidden border border-ch2ma-border bg-ch2ma-cream p-0 shadow-none">
          {/* Header */}
          <div className="flex shrink-0 items-center justify-between border-b border-ch2ma-border px-4 py-4 sm:px-6 sm:py-5">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ch2ma-dark text-ch2ma-gold">
                <Gavel size={18} strokeWidth={1.8} />
              </div>

              <div className="min-w-0">
                <h2 className="truncate text-[17px] text-ch2ma-text sm:text-[19px]">
                  Audiences du jour
                </h2>

                <p className="mt-0.5 truncate text-[11px] text-ch2ma-muted">
                  Vos prochaines audiences
                </p>
              </div>
            </div>

            <Link
              to="/app/calendar"
              className="ml-3 flex shrink-0 items-center gap-1 text-[12px] font-semibold text-ch2ma-gold transition-colors hover:text-ch2ma-dark2"
            >
              <span className="hidden sm:inline">Voir tout</span>

              <ArrowRight size={13} />
            </Link>
          </div>

          {/* Liste */}
          <div className="flex-1 p-2 sm:p-3">
            <ul className="space-y-2">
              {audiencesDuJour.map((a) => (
                <li key={a.id}>
                  <Link
                    to="/app/calendar"
                    className="group flex min-w-0 items-center gap-3 rounded-xl border border-transparent bg-white px-3 py-3 outline-none transition-all hover:border-ch2ma-border hover:bg-ch2ma-green/30 focus-visible:ring-2 focus-visible:ring-ch2ma-gold sm:gap-4 sm:px-4 sm:py-4"
                  >
                    {/* Heure */}
                    <div className="flex h-11 w-11 shrink-0 flex-col items-center justify-center rounded-xl border border-ch2ma-border bg-ch2ma-green sm:h-12 sm:w-12">
                      <Clock3
                        size={13}
                        className="mb-0.5 text-ch2ma-dark2 sm:size-[14px]"
                      />

                      <span className="text-[10px] font-bold text-ch2ma-dark2 sm:text-[11px]">
                        {a.heure}
                      </span>
                    </div>

                    {/* Informations */}
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[12px] font-semibold text-ch2ma-text sm:text-[13px]">
                        {a.dossier}
                      </p>

                      <div className="mt-1.5 flex min-w-0 items-center gap-1.5">
                        <MapPin
                          size={12}
                          className="shrink-0 text-ch2ma-muted"
                        />

                        <p className="truncate text-[11px] text-ch2ma-muted sm:text-[11.5px]">
                          {a.tribunal}
                        </p>
                      </div>
                    </div>

                    <ArrowRight
                      size={15}
                      className="shrink-0 text-ch2ma-muted transition-transform group-hover:translate-x-1 group-hover:text-ch2ma-gold"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Footer */}
          <div className="mt-auto shrink-0 border-t border-ch2ma-border px-4 py-3 sm:px-6">
            <p className="text-[11px] text-ch2ma-muted">
              <span className="font-semibold text-ch2ma-dark2">
                {audiencesDuJour.length}
              </span>{" "}
              audiences prévues aujourd'hui
            </p>
          </div>
        </Card>

        {/* ===================================================
            TÂCHES PRIORITAIRES
        =================================================== */}
        <Card className="flex h-full flex-col overflow-hidden border border-ch2ma-border bg-ch2ma-cream p-0 shadow-none">
          {/* Header */}
          <div className="flex shrink-0 items-center justify-between border-b border-ch2ma-border px-4 py-4 sm:px-6 sm:py-5">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ch2ma-dark text-ch2ma-gold">
                <ListChecks size={18} strokeWidth={1.8} />
              </div>

              <div className="min-w-0">
                <h2 className="truncate text-[17px] text-ch2ma-text sm:text-[19px]">
                  Tâches prioritaires
                </h2>

                <p className="mt-0.5 truncate text-[11px] text-ch2ma-muted">
                  À traiter prochainement
                </p>
              </div>
            </div>

            <Link
              to="/app/tasks"
              className="ml-3 flex shrink-0 items-center gap-1 text-[12px] font-semibold text-ch2ma-gold transition-colors hover:text-ch2ma-dark2"
            >
              <span className="hidden sm:inline">Voir tout</span>

              <ArrowRight size={13} />
            </Link>
          </div>

          {/* Liste */}
          <div className="flex-1 p-2 sm:p-3">
            <ul className="space-y-2">
              {tachesPrioritaires.map((t) => (
                <li key={t.id}>
                  <Link
                    to="/app/tasks"
                    className="group flex min-w-0 items-center gap-3 rounded-xl border border-transparent bg-white px-3 py-3 outline-none transition-all hover:border-ch2ma-border hover:bg-ch2ma-green/30 focus-visible:ring-2 focus-visible:ring-ch2ma-gold sm:gap-4 sm:px-4 sm:py-4"
                  >
                    {/* Icône */}
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-ch2ma-border bg-ch2ma-green">
                      {t.priorite === "urgente" ? (
                        <Clock3 size={15} className="text-ch2ma-dark2" />
                      ) : (
                        <CheckCircle2 size={15} className="text-ch2ma-dark2" />
                      )}
                    </div>

                    {/* Informations */}
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[12px] font-semibold text-ch2ma-text sm:text-[13px]">
                        {t.titre}
                      </p>

                      <p className="mt-1 truncate text-[11px] text-ch2ma-muted sm:text-[11.5px]">
                        Échéance : {t.echeance}
                      </p>
                    </div>

                    {/* Badge */}
                    <div className="shrink-0">
                      <Badge
                        tone={t.priorite === "urgente" ? "alert" : "muted"}
                      >
                        {t.priorite === "urgente" ? "Urgent" : "Normal"}
                      </Badge>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Footer */}
          <div className="mt-auto shrink-0 border-t border-ch2ma-border px-4 py-3 sm:px-6">
            <p className="text-[11px] text-ch2ma-muted">
              <span className="font-semibold text-ch2ma-dark2">
                {tachesPrioritaires.length}
              </span>{" "}
              tâches dans votre liste prioritaire
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
