import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Mail, Phone, MapPin } from "lucide-react";

import { PageHeader, Card, Badge } from "../../../components/ui/InternalUI";

const dossiersDuClient = [
  {
    id: "atlas-numidia",
    nom: "SARL Atlas Import c/ SPA Numidia",
    statut: "Actif",
  },
];

export default function ClientDetailPage() {
  const { id } = useParams();

  return (
    <div className="w-full">
      {/* Retour */}
      <Link
        to="/app/clients"
        className="mb-5 inline-flex items-center gap-2 text-[12px] font-semibold text-ch2ma-muted transition-colors hover:text-ch2ma-dark sm:mb-6"
      >
        <ArrowLeft size={14} strokeWidth={1.8} />
        Retour aux clients
      </Link>

      {/* Header */}
      <PageHeader
        eyebrow="Fiche client"
        title="SARL Atlas Import"
        subtitle={`Référence : ${id ?? "client"}`}
      />

      {/* Contenu */}
      <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
        {/* =================================================
            DOSSIERS
        ================================================= */}
        <Card className="min-w-0 p-4 sm:p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-[17px] text-ch2ma-text">
              Dossiers associés
            </h2>

            <span className="text-[11px] text-ch2ma-muted">
              {dossiersDuClient.length} dossier
              {dossiersDuClient.length > 1 ? "s" : ""}
            </span>
          </div>

          <ul className="divide-y divide-ch2ma-border">
            {dossiersDuClient.map((d) => (
              <li
                key={d.id}
                className="flex min-w-0 items-center justify-between gap-3 py-3.5 first:pt-0 last:pb-0"
              >
                <Link to={`/app/matters/${d.id}`} className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-medium text-ch2ma-text transition-colors hover:text-ch2ma-dark2 sm:text-[14px]">
                    {d.nom}
                  </p>

                  <p className="mt-1 text-[11px] text-ch2ma-muted sm:hidden">
                    Dossier juridique
                  </p>
                </Link>

                <div className="shrink-0">
                  <Badge tone="gold">{d.statut}</Badge>
                </div>
              </li>
            ))}
          </ul>
        </Card>

        {/* =================================================
            COORDONNÉES
        ================================================= */}
        <Card className="h-fit p-4 sm:p-5">
          <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-ch2ma-muted">
            Coordonnées
          </h3>

          <ul className="space-y-3 text-[13px] text-ch2ma-text">
            <li className="flex min-w-0 items-start gap-3">
              <Mail
                size={14}
                strokeWidth={1.8}
                className="mt-0.5 shrink-0 text-ch2ma-gold"
              />

              <a
                href="mailto:k.belkacem@atlasimport.dz"
                className="min-w-0 break-all transition-colors hover:text-ch2ma-gold"
              >
                k.belkacem@atlasimport.dz
              </a>
            </li>

            <li className="flex items-center gap-3">
              <Phone
                size={14}
                strokeWidth={1.8}
                className="shrink-0 text-ch2ma-gold"
              />

              <a
                href="tel:+213555123456"
                className="transition-colors hover:text-ch2ma-gold"
              >
                +213 5 55 12 34 56
              </a>
            </li>

            <li className="flex items-start gap-3">
              <MapPin
                size={14}
                strokeWidth={1.8}
                className="mt-0.5 shrink-0 text-ch2ma-gold"
              />

              <span>Khenchela, Algérie</span>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
