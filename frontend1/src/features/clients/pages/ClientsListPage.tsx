import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Plus, Mail, BriefcaseBusiness } from "lucide-react";

import { PageHeader, Card, Badge } from "../../../components/ui/InternalUI";

const clients = [
  {
    id: "atlas-import",
    nom: "SARL Atlas Import",
    contact: "Karim Belkacem",
    email: "k.belkacem@atlasimport.dz",
    dossiers: 1,
  },
  {
    id: "benziane",
    nom: "M. Benziane",
    contact: "Amine Benziane",
    email: "a.benziane@mail.dz",
    dossiers: 1,
  },
  {
    id: "famille-meziane",
    nom: "Famille Meziane",
    contact: "Yacine Meziane",
    email: "y.meziane@mail.dz",
    dossiers: 1,
  },
  {
    id: "sci-hamdi",
    nom: "SCI Hamdi",
    contact: "Nadia Hamdi",
    email: "contact@scihamdi.dz",
    dossiers: 1,
  },
];

export default function ClientsListPage() {
  const [recherche, setRecherche] = useState("");

  const filtres = clients.filter((c) =>
    `${c.nom} ${c.contact} ${c.email}`
      .toLowerCase()
      .includes(recherche.toLowerCase()),
  );

  return (
    <div className="w-full">
      {/* =================================================
          HEADER
      ================================================= */}
      <PageHeader
        eyebrow="Clients"
        title={`${clients.length} clients`}
        action={
          <button
            type="button"
            className="flex shrink-0 items-center gap-2 border border-ch2ma-dark bg-ch2ma-dark px-3 py-2.5 text-[12px] font-semibold text-white transition hover:bg-ch2ma-dark2 sm:px-4 sm:text-[13px]"
          >
            <Plus size={15} strokeWidth={1.8} />
            <span className="hidden xs:inline sm:inline">Nouveau client</span>
            <span className="sm:hidden">Nouveau</span>
          </button>
        }
      />

      {/* =================================================
          RECHERCHE
      ================================================= */}
      <div className="relative mb-5 w-full max-w-md">
        <Search
          size={15}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-ch2ma-muted"
        />

        <input
          value={recherche}
          onChange={(e) => setRecherche(e.target.value)}
          placeholder="Rechercher un client..."
          className="h-10 w-full border border-ch2ma-border bg-white pl-9 pr-3 text-[13px] text-ch2ma-text outline-none transition-colors placeholder:text-ch2ma-muted focus:border-ch2ma-gold"
        />
      </div>

      {/* =================================================
          VERSION DESKTOP / TABLET
      ================================================= */}
      <Card className="hidden overflow-hidden p-0 md:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-left text-[13px]">
            <thead>
              <tr className="border-b border-ch2ma-border text-[11px] uppercase tracking-[0.12em] text-ch2ma-muted">
                <th className="px-5 py-3 font-medium">Client</th>

                <th className="px-5 py-3 font-medium">Contact</th>

                <th className="px-5 py-3 font-medium">Email</th>

                <th className="px-5 py-3 font-medium">Dossiers</th>
              </tr>
            </thead>

            <tbody>
              {filtres.map((c) => (
                <tr
                  key={c.id}
                  className="border-b border-ch2ma-border last:border-0 hover:bg-ch2ma-cream/60"
                >
                  {/* Client */}
                  <td className="px-5 py-4">
                    <Link
                      to={`/app/clients/${c.id}`}
                      className="font-medium text-ch2ma-text transition-colors hover:text-ch2ma-dark2"
                    >
                      {c.nom}
                    </Link>
                  </td>

                  {/* Contact */}
                  <td className="px-5 py-4 text-ch2ma-muted">{c.contact}</td>

                  {/* Email */}
                  <td className="px-5 py-4 text-ch2ma-muted">{c.email}</td>

                  {/* Dossiers */}
                  <td className="px-5 py-4">
                    <Badge tone="gold">{c.dossiers}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* =================================================
          VERSION MOBILE
      ================================================= */}
      <div className="space-y-3 md:hidden">
        {filtres.map((c) => (
          <Card
            key={c.id}
            className="p-4 transition-colors hover:border-ch2ma-gold/40"
          >
            {/* Nom + badge */}
            <div className="flex items-start justify-between gap-3">
              <Link to={`/app/clients/${c.id}`} className="min-w-0 flex-1">
                <p className="truncate text-[14px] font-semibold text-ch2ma-text">
                  {c.nom}
                </p>

                <p className="mt-1 text-[11px] text-ch2ma-muted">{c.contact}</p>
              </Link>

              <div className="shrink-0">
                <Badge tone="gold">{c.dossiers}</Badge>
              </div>
            </div>

            {/* Informations */}
            <div className="mt-4 space-y-2 border-t border-ch2ma-border pt-3">
              <div className="flex min-w-0 items-center gap-2">
                <Mail
                  size={13}
                  className="shrink-0 text-ch2ma-gold"
                  strokeWidth={1.8}
                />

                <a
                  href={`mailto:${c.email}`}
                  className="truncate text-[12px] text-ch2ma-muted hover:text-ch2ma-dark2"
                >
                  {c.email}
                </a>
              </div>

              <div className="flex items-center gap-2">
                <BriefcaseBusiness
                  size={13}
                  className="shrink-0 text-ch2ma-gold"
                  strokeWidth={1.8}
                />

                <span className="text-[12px] text-ch2ma-muted">
                  {c.dossiers} dossier
                  {c.dossiers > 1 ? "s" : ""}
                </span>
              </div>
            </div>
          </Card>
        ))}

        {/* Aucun résultat */}
        {filtres.length === 0 && (
          <Card className="p-8 text-center">
            <p className="text-[13px] font-medium text-ch2ma-text">
              Aucun client trouvé
            </p>

            <p className="mt-1 text-[11px] text-ch2ma-muted">
              Essayez avec un autre nom ou une autre adresse email.
            </p>
          </Card>
        )}
      </div>

      {/* Aucun résultat desktop */}
      {filtres.length === 0 && (
        <div className="hidden md:block">
          <Card className="mt-3 p-8 text-center">
            <p className="text-[13px] font-medium text-ch2ma-text">
              Aucun client trouvé
            </p>

            <p className="mt-1 text-[11px] text-ch2ma-muted">
              Essayez avec un autre nom ou une autre adresse email.
            </p>
          </Card>
        </div>
      )}
    </div>
  );
}
