import { useState } from "react";
import type { FormEvent } from "react";
import { UserPlus } from "lucide-react";
import PageHeader from "../../../components/ui/PageHeader";
import Card from "../../../components/ui/Card";
import Badge from "../../../components/ui/Badge";

interface InternalLawyer {
  id: string;
  name: string;
  email: string;
  activeMatters: number;
  status: "actif" | "desactive";
}

const initialTeam: InternalLawyer[] = [
  {
    id: "l1",
    name: "Me. Amine Cherif",
    email: "amine@ch2ma.dz",
    activeMatters: 9,
    status: "actif",
  },
  {
    id: "l2",
    name: "Me. Lina Boudiaf",
    email: "lina@ch2ma.dz",
    activeMatters: 6,
    status: "actif",
  },
  {
    id: "l3",
    name: "Me. Hocine Meziane",
    email: "hocine@ch2ma.dz",
    activeMatters: 0,
    status: "desactive",
  },
];

export default function TeamManagementPage() {
  const [team, setTeam] = useState<InternalLawyer[]>(initialTeam);
  const [isInviting, setIsInviting] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteName, setInviteName] = useState("");

  function handleInvite(e: FormEvent) {
    e.preventDefault();

    setTeam((prev) => [
      {
        id: crypto.randomUUID(),
        name: inviteName,
        email: inviteEmail,
        activeMatters: 0,
        status: "actif",
      },
      ...prev,
    ]);

    setInviteName("");
    setInviteEmail("");
    setIsInviting(false);
  }

  function toggleStatus(id: string) {
    setTeam((prev) =>
      prev.map((member) =>
        member.id === id
          ? {
              ...member,
              status: member.status === "actif" ? "desactive" : "actif",
            }
          : member,
      ),
    );
  }

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Administration"
        title="Équipe interne"
        subtitle="Avocats associés du cabinet."
        action={
          !isInviting && (
            <button
              onClick={() => setIsInviting(true)}
              className="flex items-center gap-2 bg-ch2ma-dark px-4 py-2.5 text-sm font-semibold text-ch2ma-cream hover:bg-ch2ma-dark/90"
            >
              <UserPlus size={16} />
              Inviter un avocat
            </button>
          )
        }
      />

      {isInviting && (
        <form
          onSubmit={handleInvite}
          className="space-y-5 border border-ch2ma-border bg-white p-6"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-medium text-ch2ma-text">
                Nom complet
              </span>

              <input
                type="text"
                value={inviteName}
                onChange={(e) => setInviteName(e.target.value)}
                required
                className="mt-2 w-full border border-ch2ma-border bg-transparent px-3 py-2 text-sm text-ch2ma-text focus:border-ch2ma-gold focus:outline-none"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-ch2ma-text">Email</span>

              <input
                type="email"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                required
                className="mt-2 w-full border border-ch2ma-border bg-transparent px-3 py-2 text-sm text-ch2ma-text focus:border-ch2ma-gold focus:outline-none"
              />
            </label>
          </div>

          <div className="flex justify-end gap-3 border-t border-ch2ma-border pt-5">
            <button
              type="button"
              onClick={() => setIsInviting(false)}
              className="px-5 py-2.5 text-sm font-medium text-ch2ma-muted hover:text-ch2ma-text"
            >
              Annuler
            </button>

            <button
              type="submit"
              className="bg-ch2ma-dark px-5 py-2.5 text-sm font-semibold text-ch2ma-cream hover:bg-ch2ma-dark/90"
            >
              Envoyer l'invitation
            </button>
          </div>
        </form>
      )}

      <Card className="overflow-hidden p-0">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-ch2ma-border text-xs uppercase tracking-wide text-ch2ma-muted">
            <tr>
              <th className="px-6 py-3 font-medium">Nom</th>

              <th className="px-6 py-3 font-medium">Email</th>

              <th className="px-6 py-3 font-medium">Dossiers actifs</th>

              <th className="px-6 py-3 font-medium">Statut</th>

              <th className="px-6 py-3 font-medium" />
            </tr>
          </thead>

          <tbody className="divide-y divide-ch2ma-border">
            {team.map((member) => (
              <tr key={member.id}>
                <td className="px-6 py-4 font-medium text-ch2ma-text">
                  {member.name}
                </td>

                <td className="px-6 py-4 text-ch2ma-muted">{member.email}</td>

                <td className="px-6 py-4 text-ch2ma-text">
                  {member.activeMatters}
                </td>

                <td className="px-6 py-4">
                  <Badge tone={member.status === "actif" ? "green" : "muted"}>
                    {member.status === "actif" ? "Actif" : "Désactivé"}
                  </Badge>
                </td>

                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => toggleStatus(member.id)}
                    className="text-sm font-medium text-ch2ma-gold hover:underline"
                  >
                    {member.status === "actif" ? "Désactiver" : "Réactiver"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
