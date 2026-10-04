import { useState } from "react";
import type { FormEvent } from "react";
import PageHeader from "../../../components/ui/PageHeader";
import Card from "../../../components/ui/Card";
import Badge from "../../../components/ui/Badge";
import type { AssistanceRequest, InternalLawyerOption } from "../admin-types";

const internalLawyers: InternalLawyerOption[] = [
  { id: "l1", name: "Me. Amine Cherif" },
  { id: "l2", name: "Me. Lina Boudiaf" },
  { id: "l3", name: "Me. Hocine Meziane" },
];

// TODO: remplacer par un fetch réel (GET /api/assistance-requests)
const initialRequests: AssistanceRequest[] = [
  {
    id: "r1",
    partnerName: "Me. Rachid Amrani",
    matterTitle: "Succession Benali",
    message:
      "Je cherche un point sur la jurisprudence récente en matière de réserve héréditaire — un avis du cabinet serait utile avant l'audience.",
    submittedAt: "02/10/2026",
    status: "en_attente",
  },
];

export default function AdminAssistancePage() {
  const [requests, setRequests] =
    useState<AssistanceRequest[]>(initialRequests);
  const [replyDrafts, setReplyDrafts] = useState<Record<string, string>>({});

  function handleReply(e: FormEvent, requestId: string) {
    e.preventDefault();
    const content = replyDrafts[requestId];
    if (!content?.trim()) return;
    // TODO: POST /api/assistance-requests/:id/reply
    setRequests((prev) =>
      prev.map((r) => (r.id === requestId ? { ...r, status: "traitee" } : r)),
    );
    setReplyDrafts((prev) => ({ ...prev, [requestId]: "" }));
  }

  function handleAssign(requestId: string, lawyerId: string) {
    const lawyer = internalLawyers.find((l) => l.id === lawyerId);
    if (!lawyer) return;
    // TODO: PATCH /api/assistance-requests/:id { assignedLawyerId: lawyerId }
    setRequests((prev) =>
      prev.map((r) =>
        r.id === requestId
          ? { ...r, status: "traitee", assignedLawyerName: lawyer.name }
          : r,
      ),
    );
  }

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Super-administrateur"
        title="Demandes d'assistance"
        subtitle="Demandes envoyées par les avocats partenaires."
      />

      <div className="space-y-4">
        {requests.map((request) => (
          <Card key={request.id} className="space-y-4 p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-ch2ma-text">
                  {request.partnerName}
                </p>
                <p className="text-xs text-ch2ma-muted">
                  {request.matterTitle} · {request.submittedAt}
                </p>
              </div>
              <Badge tone={request.status === "traitee" ? "green" : "gold"}>
                {request.status === "traitee" ? "Traitée" : "En attente"}
              </Badge>
            </div>

            <p className="text-sm text-ch2ma-text">{request.message}</p>

            {request.assignedLawyerName && (
              <p className="text-xs text-ch2ma-muted">
                Assignée à {request.assignedLawyerName}
              </p>
            )}

            {request.status === "en_attente" && (
              <div className="space-y-3 border-t border-ch2ma-border pt-4">
                <form
                  onSubmit={(e) => handleReply(e, request.id)}
                  className="flex gap-3"
                >
                  <input
                    type="text"
                    value={replyDrafts[request.id] ?? ""}
                    onChange={(e) =>
                      setReplyDrafts((prev) => ({
                        ...prev,
                        [request.id]: e.target.value,
                      }))
                    }
                    placeholder="Répondre directement..."
                    className="flex-1 border border-ch2ma-border bg-transparent px-3 py-2 text-sm text-ch2ma-text focus:border-ch2ma-gold focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="bg-ch2ma-dark px-4 py-2 text-sm font-semibold text-ch2ma-cream hover:bg-ch2ma-dark/90"
                  >
                    Répondre
                  </button>
                </form>

                <div className="flex items-center gap-3">
                  <span className="text-xs text-ch2ma-muted">
                    ou assigner à :
                  </span>
                  <select
                    defaultValue=""
                    onChange={(e) =>
                      e.target.value && handleAssign(request.id, e.target.value)
                    }
                    className="border border-ch2ma-border bg-transparent px-2 py-1.5 text-sm text-ch2ma-text focus:border-ch2ma-gold focus:outline-none"
                  >
                    <option value="" disabled>
                      Choisir un avocat interne
                    </option>
                    {internalLawyers.map((lawyer) => (
                      <option key={lawyer.id} value={lawyer.id}>
                        {lawyer.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
