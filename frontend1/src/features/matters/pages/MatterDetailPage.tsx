import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Phone, Mail, Users as UsersIcon, Lock } from "lucide-react";

import { PageHeader, Card, Badge } from "../../../components/ui/InternalUI";

const tabs = [
  "Overview",
  "Timeline",
  "Documents",
  "Hearings",
  "Deadlines",
  "Tasks",
  "Notes",
  "Contacts",
  "Billing",
  "Team",
] as const;

const timeline = [
  {
    date: "02 sept. 2026",
    evenement: "Assignation déposée au greffe",
  },
  {
    date: "15 sept. 2026",
    evenement: "Première audience de mise en état",
  },
  {
    date: "12 oct. 2026",
    evenement: "Audience de plaidoirie (prévisionnel)",
  },
];

const documents = [
  {
    nom: "Assignation.pdf",
    taille: "1,2 Mo",
  },
  {
    nom: "Convention_honoraires.pdf",
    taille: "340 Ko",
  },
];

const hearings = [
  {
    date: "15 sept. 2026",
    tribunal: "Tribunal de Khenchela",
    salle: "Salle 2",
    type: "Mise en état",
  },
];

const deadlines = [
  {
    type: "Dépôt des conclusions",
    date: "18 sept. 2026",
    urgence: "urgent" as const,
  },
];

const tasks = [
  {
    titre: "Déposer les conclusions",
    statut: "En cours" as const,
  },
  {
    titre: "Préparer les pièces annexes",
    statut: "À faire" as const,
  },
];

const contacts = [
  {
    date: "10 sept.",
    personne: "M. Belkacem (client)",
    moyen: "phone" as const,
    resume: "Point sur les pièces manquantes.",
  },
];

const notes = [
  {
    date: "09 sept.",
    auteur: "Sami Benali",
    contenu: "Vérifier la prescription avant la prochaine audience.",
  },
];

const equipe = [
  {
    nom: "Maître Sami Benali",
    role: "Avocat responsable",
  },
];

const moyenIcon = {
  phone: Phone,
  mail: Mail,
};

export default function MatterDetailPage() {
  const { id } = useParams();

  const [tab, setTab] = useState<(typeof tabs)[number]>("Overview");

  return (
    <div className="w-full min-w-0">
      {/* Retour */}
      <Link
        to="/app/matters"
        className="mb-5 inline-flex items-center gap-2 text-[12px] font-semibold text-ch2ma-muted transition-colors hover:text-ch2ma-dark sm:mb-6"
      >
        <ArrowLeft size={14} strokeWidth={1.8} />
        Retour aux dossiers
      </Link>

      {/* Header */}
      <PageHeader
        eyebrow="Fiche dossier"
        title="SARL Atlas Import c/ SPA Numidia"
        subtitle={`Référence : ${id ?? "dossier"}`}
        action={<Badge tone="gold">Actif</Badge>}
      />

      {/* Tabs */}
      <div className="mb-5 -mx-1 overflow-x-auto border-b border-ch2ma-border px-1">
        <div className="flex min-w-max gap-1">
          {tabs.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`whitespace-nowrap border-b-2 px-2.5 pb-3 pt-1 text-[12px] font-medium transition sm:text-[12.5px] ${
                tab === t
                  ? "border-ch2ma-gold text-ch2ma-text"
                  : "border-transparent text-ch2ma-muted hover:text-ch2ma-text"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* ================= OVERVIEW ================= */}
      {tab === "Overview" && (
        <Card className="p-4 sm:p-6">
          <dl className="grid grid-cols-1 gap-4 text-[13px] sm:grid-cols-2 sm:gap-y-5 lg:grid-cols-4">
            <div>
              <dt className="text-ch2ma-muted">Client</dt>
              <dd className="mt-1 break-words text-ch2ma-text">
                SARL Atlas Import
              </dd>
            </div>

            <div>
              <dt className="text-ch2ma-muted">Type</dt>
              <dd className="mt-1 text-ch2ma-text">Commercial</dd>
            </div>

            <div>
              <dt className="text-ch2ma-muted">Tribunal</dt>
              <dd className="mt-1 break-words text-ch2ma-text">
                Tribunal de Khenchela
              </dd>
            </div>

            <div>
              <dt className="text-ch2ma-muted">Ouvert le</dt>
              <dd className="mt-1 text-ch2ma-text">02 sept. 2026</dd>
            </div>
          </dl>
        </Card>
      )}

      {/* ================= TIMELINE ================= */}
      {tab === "Timeline" && (
        <Card className="p-4 sm:p-6">
          <ol className="space-y-5">
            {timeline.map((h, i) => (
              <li
                key={`${h.date}-${h.evenement}`}
                className="flex gap-3 sm:gap-4"
              >
                <div className="flex shrink-0 flex-col items-center">
                  <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-ch2ma-gold" />

                  {i < timeline.length - 1 && (
                    <span className="mt-1 w-px flex-1 bg-ch2ma-border" />
                  )}
                </div>

                <div className="min-w-0 pb-1">
                  <p className="text-[12px] font-semibold text-ch2ma-dark2">
                    {h.date}
                  </p>

                  <p className="mt-1 break-words text-[13px] text-ch2ma-text sm:text-[14px]">
                    {h.evenement}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Card>
      )}

      {/* ================= DOCUMENTS ================= */}
      {tab === "Documents" && (
        <Card className="overflow-hidden p-1.5 sm:p-2">
          {documents.map((d) => (
            <div
              key={d.nom}
              className="flex flex-col gap-2 border-b border-ch2ma-border p-3.5 last:border-0 sm:flex-row sm:items-center sm:justify-between sm:p-4"
            >
              <span className="min-w-0 break-all text-[13px] text-ch2ma-text">
                {d.nom}
              </span>

              <div className="flex shrink-0 items-center justify-between gap-3 text-[12px] text-ch2ma-muted sm:justify-end">
                <span>{d.taille}</span>

                <Badge tone="green">
                  <Lock size={11} className="mr-1 inline" />
                  Chiffré
                </Badge>
              </div>
            </div>
          ))}
        </Card>
      )}

      {/* ================= HEARINGS ================= */}
      {tab === "Hearings" && (
        <Card className="overflow-hidden p-1.5 sm:p-2">
          {hearings.map((h) => (
            <div
              key={h.date}
              className="flex flex-col gap-2 border-b border-ch2ma-border p-3.5 last:border-0 sm:flex-row sm:items-center sm:justify-between sm:p-4"
            >
              <div className="min-w-0">
                <p className="text-[13px] font-medium text-ch2ma-text">
                  {h.type}
                </p>

                <p className="mt-1 break-words text-[12px] text-ch2ma-muted">
                  {h.tribunal} · {h.salle}
                </p>
              </div>

              <span className="shrink-0 text-[12px] font-semibold text-ch2ma-dark2">
                {h.date}
              </span>
            </div>
          ))}
        </Card>
      )}

      {/* ================= DEADLINES ================= */}
      {tab === "Deadlines" && (
        <Card className="overflow-hidden p-1.5 sm:p-2">
          {deadlines.map((d) => (
            <div
              key={d.type}
              className="flex flex-col gap-3 border-b border-ch2ma-border p-3.5 last:border-0 sm:flex-row sm:items-center sm:justify-between sm:p-4"
            >
              <div className="min-w-0">
                <p className="break-words text-[13px] text-ch2ma-text">
                  {d.type}
                </p>

                <p className="mt-1 text-[12px] text-ch2ma-muted">
                  Échéance : {d.date}
                </p>
              </div>

              <div className="shrink-0 self-start sm:self-auto">
                <Badge tone="alert">Urgent</Badge>
              </div>
            </div>
          ))}
        </Card>
      )}

      {/* ================= TASKS ================= */}
      {tab === "Tasks" && (
        <Card className="overflow-hidden p-1.5 sm:p-2">
          {tasks.map((t) => (
            <div
              key={t.titre}
              className="flex flex-col gap-2 border-b border-ch2ma-border p-3.5 last:border-0 sm:flex-row sm:items-center sm:justify-between sm:p-4"
            >
              <span className="break-words text-[13px] text-ch2ma-text">
                {t.titre}
              </span>

              <div className="shrink-0 self-start sm:self-auto">
                <Badge tone={t.statut === "En cours" ? "gold" : "muted"}>
                  {t.statut}
                </Badge>
              </div>
            </div>
          ))}
        </Card>
      )}

      {/* ================= NOTES ================= */}
      {tab === "Notes" && (
        <Card className="p-4 sm:p-6">
          <textarea
            placeholder="Ajouter une note interne..."
            rows={4}
            className="mb-5 w-full resize-none border border-ch2ma-border bg-ch2ma-cream px-3.5 py-3 text-[13px] text-ch2ma-text outline-none placeholder:text-ch2ma-muted focus:border-ch2ma-gold sm:px-4"
          />

          <ul className="space-y-4">
            {notes.map((n) => (
              <li
                key={n.date}
                className="border-l-2 border-ch2ma-border pl-3 sm:pl-4"
              >
                <p className="text-[12px] font-semibold text-ch2ma-dark2">
                  {n.auteur} · {n.date}
                </p>

                <p className="mt-1 break-words text-[13px] text-ch2ma-text">
                  {n.contenu}
                </p>
              </li>
            ))}
          </ul>
        </Card>
      )}

      {/* ================= CONTACTS ================= */}
      {tab === "Contacts" && (
        <Card className="overflow-hidden p-1.5 sm:p-2">
          {contacts.map((c) => {
            const Icon = moyenIcon[c.moyen];

            return (
              <div
                key={c.date}
                className="flex items-start gap-3 border-b border-ch2ma-border p-3.5 last:border-0 sm:gap-4 sm:p-4"
              >
                <Icon
                  size={16}
                  strokeWidth={1.7}
                  className="mt-0.5 shrink-0 text-ch2ma-gold"
                />

                <div className="min-w-0">
                  <p className="break-words text-[13px] font-medium text-ch2ma-text">
                    {c.personne}{" "}
                    <span className="font-normal text-ch2ma-muted">
                      — {c.date}
                    </span>
                  </p>

                  <p className="mt-1 break-words text-[13px] text-ch2ma-muted">
                    {c.resume}
                  </p>
                </div>
              </div>
            );
          })}
        </Card>
      )}

      {/* ================= BILLING ================= */}
      {tab === "Billing" && (
        <Card className="overflow-hidden p-1.5 sm:p-2">
          <div className="flex flex-col gap-3 p-3.5 sm:flex-row sm:items-center sm:justify-between sm:p-4">
            <span className="break-words text-[13px] text-ch2ma-text">
              Convention d'honoraires — 180 000 DA
            </span>

            <div className="shrink-0 self-start sm:self-auto">
              <Badge tone="gold">En attente de validation</Badge>
            </div>
          </div>
        </Card>
      )}

      {/* ================= TEAM ================= */}
      {tab === "Team" && (
        <Card className="overflow-hidden p-1.5 sm:p-2">
          {equipe.map((m) => (
            <div
              key={m.nom}
              className="flex items-start gap-3 border-b border-ch2ma-border p-3.5 last:border-0 sm:items-center sm:p-4"
            >
              <UsersIcon
                size={16}
                strokeWidth={1.7}
                className="mt-0.5 shrink-0 text-ch2ma-gold"
              />

              <div className="min-w-0">
                <p className="break-words text-[13px] font-medium text-ch2ma-text">
                  {m.nom}
                </p>

                <p className="mt-0.5 text-[12px] text-ch2ma-muted">{m.role}</p>
              </div>
            </div>
          ))}
        </Card>
      )}
    </div>
  );
}
