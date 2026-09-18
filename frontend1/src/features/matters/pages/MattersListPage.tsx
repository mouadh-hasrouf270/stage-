import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, BriefcaseBusiness } from "lucide-react";

import { PageHeader, Card, Badge } from "../../../components/ui/InternalUI";

type Statut = "Actif" | "En attente" | "Clôturé";

const dossiers: Array<{
  id: string;
  nom: string;
  client: string;
  type: string;
  echeance: string;
  statut: Statut;
}> = [
  {
    id: "atlas-numidia",
    nom: "SARL Atlas Import c/ SPA Numidia",
    client: "SARL Atlas Import",
    type: "Commercial",
    echeance: "Aujourd'hui",
    statut: "Actif",
  },
  {
    id: "benziane-cnas",
    nom: "Benziane c/ CNAS",
    client: "M. Benziane",
    type: "Administratif",
    echeance: "Demain",
    statut: "Actif",
  },
  {
    id: "succession-meziane",
    nom: "Succession Meziane",
    client: "Famille Meziane",
    type: "Civil",
    echeance: "28 sept.",
    statut: "En attente",
  },
  {
    id: "sci-hamdi",
    nom: "SCI Hamdi — bail commercial",
    client: "SCI Hamdi",
    type: "Civil",
    echeance: "—",
    statut: "Actif",
  },
];

const statutTone: Record<Statut, "gold" | "muted" | "green"> = {
  Actif: "gold",
  "En attente": "muted",
  Clôturé: "green",
};

const filtres: Array<Statut | "Tous"> = [
  "Tous",
  "Actif",
  "En attente",
  "Clôturé",
];

export default function MattersListPage() {
  const [filtre, setFiltre] = useState<Statut | "Tous">("Tous");

  const [recherche, setRecherche] = useState("");

  const resultats = dossiers.filter(
    (d) =>
      (filtre === "Tous" || d.statut === filtre) &&
      `${d.nom} ${d.client} ${d.type}`
        .toLowerCase()
        .includes(recherche.toLowerCase()),
  );

  return (
    <div className="w-full min-w-0">
      <PageHeader
        eyebrow="Mes dossiers"
        title={`${dossiers.length} dossiers assignés`}
      />

      {/* Filtres + recherche */}
      <div className="mb-5 space-y-3 sm:mb-6">
        {/* Filtres */}
        <div className="-mx-1 overflow-x-auto px-1">
          <div className="flex min-w-max gap-2">
            {filtres.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFiltre(f)}
                className={`shrink-0 border px-3.5 py-1.5 text-[12px] font-medium transition ${
                  filtre === f
                    ? "border-ch2ma-dark bg-ch2ma-dark text-white"
                    : "border-ch2ma-border text-ch2ma-muted hover:border-ch2ma-dark hover:text-ch2ma-dark"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Recherche */}
        <div className="relative w-full sm:max-w-sm lg:ml-auto">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-ch2ma-muted"
          />

          <input
            value={recherche}
            onChange={(e) => setRecherche(e.target.value)}
            placeholder="Rechercher un dossier..."
            className="h-10 w-full border border-ch2ma-border bg-white pl-9 pr-3 text-[13px] text-ch2ma-text outline-none placeholder:text-ch2ma-muted focus:border-ch2ma-gold"
          />
        </div>
      </div>

      {/* =====================================================
          DESKTOP / TABLET
      ====================================================== */}
      <Card className="hidden overflow-hidden p-0 md:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-[13px]">
            <thead>
              <tr className="border-b border-ch2ma-border text-[11px] uppercase tracking-[0.12em] text-ch2ma-muted">
                <th className="px-5 py-3 font-medium">Dossier</th>

                <th className="px-5 py-3 font-medium">Type</th>

                <th className="px-5 py-3 font-medium">Prochaine échéance</th>

                <th className="px-5 py-3 font-medium">Statut</th>
              </tr>
            </thead>

            <tbody>
              {resultats.map((d) => (
                <tr
                  key={d.id}
                  className="border-b border-ch2ma-border last:border-0 hover:bg-ch2ma-cream/60"
                >
                  <td className="min-w-0 px-5 py-4">
                    <Link
                      to={`/app/matters/${d.id}`}
                      className="block max-w-[360px] truncate font-medium text-ch2ma-text transition-colors hover:text-ch2ma-dark2"
                    >
                      {d.nom}
                    </Link>

                    <p className="mt-0.5 truncate text-[12px] text-ch2ma-muted">
                      {d.client}
                    </p>
                  </td>

                  <td className="px-5 py-4 text-ch2ma-muted">{d.type}</td>

                  <td className="px-5 py-4 text-ch2ma-muted">{d.echeance}</td>

                  <td className="px-5 py-4">
                    <Badge tone={statutTone[d.statut]}>{d.statut}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {resultats.length === 0 && (
          <div className="p-8 text-center">
            <p className="text-[13px] font-medium text-ch2ma-text">
              Aucun dossier trouvé
            </p>

            <p className="mt-1 text-[11px] text-ch2ma-muted">
              Essayez avec un autre terme de recherche.
            </p>
          </div>
        )}
      </Card>

      {/* =====================================================
          MOBILE
      ====================================================== */}
      <div className="space-y-3 md:hidden">
        {resultats.map((d) => (
          <Card
            key={d.id}
            className="p-4 transition-colors hover:border-ch2ma-gold/40"
          >
            {/* Nom + statut */}
            <div className="flex items-start gap-3">
              <Link to={`/app/matters/${d.id}`} className="min-w-0 flex-1">
                <p className="break-words text-[14px] font-semibold leading-5 text-ch2ma-text">
                  {d.nom}
                </p>

                <p className="mt-1 truncate text-[11px] text-ch2ma-muted">
                  {d.client}
                </p>
              </Link>

              <div className="shrink-0">
                <Badge tone={statutTone[d.statut]}>{d.statut}</Badge>
              </div>
            </div>

            {/* Informations */}
            <div className="mt-4 grid grid-cols-2 gap-3 border-t border-ch2ma-border pt-3">
              <div className="min-w-0">
                <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-ch2ma-muted">
                  Type
                </p>

                <p className="mt-1 truncate text-[12px] text-ch2ma-text">
                  {d.type}
                </p>
              </div>

              <div className="min-w-0">
                <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-ch2ma-muted">
                  Échéance
                </p>

                <p className="mt-1 truncate text-[12px] text-ch2ma-text">
                  {d.echeance}
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-3 flex items-center gap-2 border-t border-ch2ma-border pt-3">
              <BriefcaseBusiness
                size={13}
                strokeWidth={1.8}
                className="shrink-0 text-ch2ma-gold"
              />

              <span className="text-[11px] text-ch2ma-muted">
                Dossier juridique
              </span>
            </div>
          </Card>
        ))}

        {resultats.length === 0 && (
          <Card className="p-8 text-center">
            <p className="text-[13px] font-medium text-ch2ma-text">
              Aucun dossier trouvé
            </p>

            <p className="mt-1 text-[11px] text-ch2ma-muted">
              Essayez avec un autre terme de recherche.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}
