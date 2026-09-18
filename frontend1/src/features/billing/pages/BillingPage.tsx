import { Plus, FileText } from "lucide-react";
import { PageHeader, Card, Badge } from "../../../components/ui/InternalUI";

type Statut = "Brouillon" | "En attente de validation" | "Validé";

const devis: Array<{
  id: string;
  dossier: string;
  client: string;
  montant: string;
  date: string;
  statut: Statut;
}> = [
  {
    id: "DEV-2026-014",
    dossier: "Atlas Import c/ Numidia",
    client: "SARL Atlas Import",
    montant: "180 000 DA",
    date: "10 sept.",
    statut: "En attente de validation",
  },
  {
    id: "DEV-2026-013",
    dossier: "Succession Meziane",
    client: "Famille Meziane",
    montant: "95 000 DA",
    date: "05 sept.",
    statut: "Validé",
  },
];

const statutTone: Record<Statut, "gold" | "muted" | "green"> = {
  Brouillon: "muted",
  "En attente de validation": "gold",
  Validé: "green",
};

export default function BillingPage() {
  return (
    <div className="w-full min-w-0">
      <PageHeader
        eyebrow="Facturation"
        title="Devis et conventions d'honoraires"
        subtitle="La validation finale reste du ressort du Super-Admin."
        action={
          <button
            type="button"
            className="flex shrink-0 items-center gap-2 border border-ch2ma-dark bg-ch2ma-dark px-3 py-2.5 text-[12px] font-semibold text-white transition hover:bg-ch2ma-dark2 sm:px-4 sm:text-[13px]"
          >
            <Plus size={15} strokeWidth={1.8} />

            <span className="hidden sm:inline">Nouveau devis</span>

            <span className="sm:hidden">Nouveau</span>
          </button>
        }
      />

      {/* ================= DESKTOP / TABLET ================= */}
      <Card className="hidden overflow-hidden p-0 md:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-[13px]">
            <thead>
              <tr className="border-b border-ch2ma-border text-[11px] uppercase tracking-[0.12em] text-ch2ma-muted">
                <th className="px-5 py-3 font-medium">Référence</th>

                <th className="px-5 py-3 font-medium">Dossier</th>

                <th className="px-5 py-3 font-medium">Montant</th>

                <th className="px-5 py-3 font-medium">Créé le</th>

                <th className="px-5 py-3 font-medium">Statut</th>
              </tr>
            </thead>

            <tbody>
              {devis.map((d) => (
                <tr
                  key={d.id}
                  className="border-b border-ch2ma-border last:border-0 hover:bg-ch2ma-cream/60"
                >
                  <td className="px-5 py-4 font-medium text-ch2ma-text">
                    {d.id}
                  </td>

                  <td className="min-w-0 px-5 py-4">
                    <p className="truncate text-ch2ma-text">{d.dossier}</p>

                    <p className="mt-0.5 truncate text-[12px] text-ch2ma-muted">
                      {d.client}
                    </p>
                  </td>

                  <td className="px-5 py-4 font-medium text-ch2ma-text">
                    {d.montant}
                  </td>

                  <td className="px-5 py-4 text-ch2ma-muted">{d.date}</td>

                  <td className="px-5 py-4">
                    <Badge tone={statutTone[d.statut]}>{d.statut}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* ================= MOBILE ================= */}
      <div className="space-y-3 md:hidden">
        {devis.map((d) => (
          <Card
            key={d.id}
            className="p-4 transition-colors hover:border-ch2ma-gold/40"
          >
            {/* Header de la carte */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex min-w-0 items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-ch2ma-green text-ch2ma-dark">
                  <FileText size={16} strokeWidth={1.8} />
                </div>

                <div className="min-w-0">
                  <p className="text-[12px] font-semibold text-ch2ma-dark2">
                    {d.id}
                  </p>

                  <p className="mt-1 break-words text-[14px] font-medium leading-5 text-ch2ma-text">
                    {d.dossier}
                  </p>

                  <p className="mt-0.5 truncate text-[11px] text-ch2ma-muted">
                    {d.client}
                  </p>
                </div>
              </div>

              <div className="shrink-0">
                <Badge tone={statutTone[d.statut]}>{d.statut}</Badge>
              </div>
            </div>

            {/* Informations */}
            <div className="mt-4 grid grid-cols-2 gap-3 border-t border-ch2ma-border pt-3">
              <div className="min-w-0">
                <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-ch2ma-muted">
                  Montant
                </p>

                <p className="mt-1 text-[13px] font-semibold text-ch2ma-text">
                  {d.montant}
                </p>
              </div>

              <div className="min-w-0">
                <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-ch2ma-muted">
                  Créé le
                </p>

                <p className="mt-1 text-[13px] text-ch2ma-text">{d.date}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* État vide */}
      {devis.length === 0 && (
        <Card className="mt-3 p-8 text-center">
          <p className="text-[13px] font-medium text-ch2ma-text">Aucun devis</p>

          <p className="mt-1 text-[11px] text-ch2ma-muted">
            Aucun devis ou convention d'honoraires n'est disponible.
          </p>
        </Card>
      )}
    </div>
  );
}
