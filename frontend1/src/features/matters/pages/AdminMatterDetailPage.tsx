import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Building2,
  Calendar,
  FileText,
  FolderKanban,
  Gavel,
  Mail,
  Paperclip,
  Phone,
  Plus,
  Scale,
  User,
  UserCog,
  X,
} from "lucide-react";
import PageHeader from "../../../components/ui/PageHeader";
import Card from "../../../components/ui/Card";
import Badge from "../../../components/ui/Badge";

type ContactEntry = {
  id: string;
  type: "appel" | "email" | "courrier";
  direction: "entrant" | "sortant";
  contact: string;
  subject: string;
  date: string;
  time: string;
  by: string;
};

type DocEntry = {
  name: string;
  size: string;
  date: string;
};

// TODO: remplacer par un fetch réel (GET /api/matters/:id)
const contacts: ContactEntry[] = [
  {
    id: "1",
    type: "appel",
    direction: "entrant",
    contact: "Philippe Durand",
    subject: "Demande d'information sur conclusions",
    date: "12 sept. 2025",
    time: "10:30",
    by: "Me. Amine Cherif",
  },
  {
    id: "2",
    type: "email",
    direction: "sortant",
    contact: "Avocat adverse — Me Lefort",
    subject: "Transmission pièces communicatories",
    date: "11 sept. 2025",
    time: "16:45",
    by: "Me. Amine Cherif",
  },
  {
    id: "3",
    type: "appel",
    direction: "sortant",
    contact: "Greffe T.C. Nanterre",
    subject: "Confirmation audience du 18 sept.",
    date: "10 sept. 2025",
    time: "09:15",
    by: "Me. Amine Cherif",
  },
  {
    id: "4",
    type: "courrier",
    direction: "entrant",
    contact: "Expert comptable Marlin",
    subject: "Rapport financier demandé",
    date: "08 sept. 2025",
    time: "—",
    by: "Cabinet",
  },
  {
    id: "5",
    type: "email",
    direction: "entrant",
    contact: "Philippe Durand",
    subject: "Accord sur stratégie procédurale",
    date: "05 sept. 2025",
    time: "14:20",
    by: "Me. Amine Cherif",
  },
];

const timelineEvents = [
  { date: "12 sept. 2025", label: "Conclusions en cours de rédaction" },
  { date: "05 sept. 2025", label: "Audience de mise en état" },
  { date: "28 août 2025", label: "Conclusions adverses reçues" },
  { date: "15 août 2025", label: "Conclusions introductives déposées" },
  { date: "02 août 2025", label: "Assignation délivrée" },
];

const relatedDocs: DocEntry[] = [
  { name: "Assignation Durand.pdf", size: "1.2 Mo", date: "02 août 2025" },
  { name: "Conclusions adverses.pdf", size: "890 Ko", date: "28 août 2025" },
  { name: "Rapport expert.pdf", size: "2.4 Mo", date: "08 sept. 2025" },
];

const contactIcons = {
  appel: Phone,
  email: Mail,
  courrier: FileText,
};

export default function AdminMatterDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<
    "apercu" | "contacts" | "documents" | "timeline"
  >("apercu");
  const [previewDoc, setPreviewDoc] = useState<DocEntry | null>(null);

  if (!id) {
    return <p className="text-sm text-ch2ma-muted">Dossier introuvable.</p>;
  }

  return (
    <>
      <Link
        to="/admin/dossiers"
        className="mb-5 flex items-center gap-2 text-[12px] font-semibold text-ch2ma-muted transition hover:text-ch2ma-text"
      >
        <ArrowLeft size={15} strokeWidth={1.8} /> Retour aux dossiers
      </Link>

      <PageHeader
        eyebrow="Dossier"
        title="Durand c/ Sté Marlin"
        subtitle="Réf. CH2MA-2025-014 · Tribunal de Commerce de Nanterre"
        action={<Badge tone="green">Actif</Badge>}
      />

      <div className="mb-6 flex gap-1 border-b border-ch2ma-border">
        {(
          [
            { id: "apercu", label: "Aperçu" },
            { id: "contacts", label: "Journal de contacts" },
            { id: "documents", label: "Documents" },
            { id: "timeline", label: "Chronologie" },
          ] as const
        ).map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={[
              "border-b-2 px-4 py-3 text-[13px] font-medium transition cursor-pointer",
              activeTab === tab.id
                ? "border-ch2ma-gold text-ch2ma-text"
                : "border-transparent text-ch2ma-muted hover:text-ch2ma-text",
            ].join(" ")}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "apercu" && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Colonne principale */}
          <div className="space-y-6 lg:col-span-2">
            {/* Informations du dossier */}
            <Card className="p-6">
              <h3 className="mb-5 font-display text-[18px] text-ch2ma-text">
                Informations du dossier
              </h3>

              <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                {[
                  { icon: User, label: "Client", value: "Philippe Durand" },
                  {
                    icon: Building2,
                    label: "Partie adverse",
                    value: "Sté Marlin SAS",
                  },
                  { icon: Scale, label: "Juridiction", value: "T.C. Nanterre" },
                  { icon: Gavel, label: "Nature", value: "Litige commercial" },
                  {
                    icon: Calendar,
                    label: "Prochaine audience",
                    value: "18 sept. 2025",
                  },
                  {
                    icon: FolderKanban,
                    label: "Référence interne",
                    value: "CH2MA-2025-014",
                  },
                  {
                    icon: UserCog,
                    label: "Avocat en charge",
                    value: "Me. Amine Cherif",
                  },
                ].map((info, i) => {
                  const Icon = info.icon;

                  return (
                    <div key={i} className="flex items-start gap-4 p-2">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-ch2ma-green text-ch2ma-dark">
                        <Icon size={16} strokeWidth={1.6} />
                      </div>

                      <div className="min-w-0 pt-0.5">
                        <p className="text-[11px] uppercase tracking-[0.1em] text-ch2ma-muted">
                          {info.label}
                        </p>

                        <p className="mt-1 text-[14px] font-semibold text-ch2ma-text">
                          {info.value}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* Notes internes */}
            <Card className="p-6">
              <h3 className="mb-4 font-display text-[18px] text-ch2ma-text">
                Notes internes
              </h3>

              <p className="text-[14px] leading-7 text-ch2ma-muted">
                Notes internes concernant le dossier et les prochaines actions à
                effectuer.
              </p>
            </Card>
          </div>

          {/* Colonne droite */}
          <div className="space-y-6">
            {/* Prochaine échéance */}
            <Card className="p-6">
              <h3 className="mb-5 font-display text-[16px] text-ch2ma-text">
                Prochaine échéance
              </h3>

              <div className="border-l-2 border-ch2ma-gold pl-5">
                {/* contenu */}
              </div>
            </Card>

            {/* Documents récents */}
            <Card className="p-6">
              <h3 className="mb-5 font-display text-[16px] text-ch2ma-text">
                Documents récents
              </h3>

              <div className="space-y-4">
                {relatedDocs.map((doc, i) => (
                  <div
                    key={i}
                    onClick={() => setPreviewDoc(doc)}
                    className="flex cursor-pointer items-center gap-3"
                  >
                    <FileText
                      size={16}
                      strokeWidth={1.5}
                      className="shrink-0 text-ch2ma-gold"
                    />
                    <div className="min-w-0">
                      <p className="truncate text-[13px] font-medium text-ch2ma-text hover:text-ch2ma-gold">
                        {doc.name}
                      </p>
                      <p className="text-[11px] text-ch2ma-muted">
                        {doc.size} · {doc.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      )}

      {activeTab === "contacts" && (
        <Card className="p-0">
          <div className="flex items-center justify-between px-6 py-5">
            <h3 className="font-display text-[18px] text-ch2ma-text">
              Journal de contacts
            </h3>
          </div>
          <div className="border-t border-ch2ma-border">
            {contacts.map((c, i) => {
              const Icon = contactIcons[c.type];
              return (
                <div
                  key={c.id}
                  className={`flex items-start gap-4 px-6 py-4 ${
                    i < contacts.length - 1
                      ? "border-b border-ch2ma-border"
                      : ""
                  }`}
                >
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center ${
                      c.direction === "entrant"
                        ? "bg-ch2ma-green text-ch2ma-dark"
                        : "bg-ch2ma-gold/10 text-ch2ma-gold"
                    }`}
                  >
                    <Icon size={16} strokeWidth={1.6} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-[13px] font-semibold text-ch2ma-text">
                        {c.contact}
                      </p>
                      <span className="text-[10px] uppercase tracking-[0.1em] text-ch2ma-muted">
                        {c.direction === "entrant" ? "Entrant" : "Sortant"} ·{" "}
                        {c.type}
                      </span>
                    </div>
                    <p className="mt-0.5 text-[13px] text-ch2ma-muted">
                      {c.subject}
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-[12px] font-semibold text-ch2ma-text">
                      {c.date}
                    </p>
                    <p className="text-[11px] text-ch2ma-muted">
                      {c.time} · {c.by}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {activeTab === "documents" && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {relatedDocs.map((doc, i) => (
            <Card key={i} className="p-6 transition hover:border-ch2ma-gold">
              <div
                onClick={() => setPreviewDoc(doc)}
                className="flex cursor-pointer items-start gap-3"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-ch2ma-green text-ch2ma-dark">
                  <FileText size={18} strokeWidth={1.5} />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-[14px] font-semibold text-ch2ma-text">
                    {doc.name}
                  </p>
                  <p className="mt-0.5 text-[12px] text-ch2ma-muted">
                    {doc.size} · ajouté le {doc.date}
                  </p>
                  <span className="mt-2 flex items-center gap-1 text-[12px] font-semibold text-ch2ma-gold hover:text-ch2ma-dark2">
                    <Paperclip size={13} strokeWidth={1.8} /> Voir le document
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {activeTab === "timeline" && (
        <Card className="p-0">
          <div className="px-6 py-5">
            <h3 className="font-display text-[18px] text-ch2ma-text">
              Chronologie procédurale
            </h3>
          </div>
          <div className="border-t border-ch2ma-border px-6 py-6">
            <div className="space-y-0">
              {timelineEvents.map((event, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-ch2ma-dark text-ch2ma-cream">
                      <FileText size={13} strokeWidth={1.8} />
                    </div>
                    {i < timelineEvents.length - 1 && (
                      <div className="w-px flex-1 bg-ch2ma-border" />
                    )}
                  </div>
                  <div className="pb-6">
                    <p className="text-[14px] font-semibold text-ch2ma-text">
                      {event.label}
                    </p>
                    <p className="mt-0.5 text-[12px] text-ch2ma-muted">
                      {event.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}

      {/* Modale de prévisualisation document */}
      {previewDoc && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={() => setPreviewDoc(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg bg-white"
          >
            <div className="flex items-center justify-between border-b border-ch2ma-border px-6 py-4">
              <h3 className="truncate text-[14px] font-semibold text-ch2ma-text">
                {previewDoc.name}
              </h3>
              <button
                type="button"
                onClick={() => setPreviewDoc(null)}
                className="text-ch2ma-muted hover:text-ch2ma-text"
                aria-label="Fermer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex flex-col items-center gap-3 px-6 py-10 text-center">
              <FileText
                size={40}
                strokeWidth={1.3}
                className="text-ch2ma-gold"
              />
              <p className="text-[12px] text-ch2ma-muted">
                {previewDoc.size} · ajouté le {previewDoc.date}
              </p>
              {/* TODO: remplacer par un vrai aperçu (iframe PDF ou image) une
                  fois le Coffre-Fort branché sur GET /api/documents/:id/url */}
              <p className="mt-2 text-[12px] text-ch2ma-muted">
                Aperçu non disponible pour l'instant — fichier stocké dans le
                Coffre-Fort.
              </p>
            </div>

            <div className="flex justify-end gap-3 border-t border-ch2ma-border px-6 py-4">
              <button
                type="button"
                onClick={() => setPreviewDoc(null)}
                className="px-4 py-2 text-[13px] font-medium text-ch2ma-muted hover:text-ch2ma-text cursor-pointer"
              >
                Fermer
              </button>
              <button
                type="button"
                className="bg-ch2ma-dark px-4 py-2 text-[13px] font-semibold text-ch2ma-cream hover:bg-ch2ma-dark/90"
              >
                Télécharger
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
