import type { PartnerApplication } from "../types";

interface ApplicationReviewCardProps {
  application: PartnerApplication;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

export default function ApplicationReviewCard({
  application,
  onApprove,
  onReject,
}: ApplicationReviewCardProps) {
  return (
    <div className="border border-ch2ma-border bg-white p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-ch2ma-text">
            {application.name}
          </p>
          <p className="mt-1 text-xs text-ch2ma-muted">
            Candidature du {application.submittedAt}
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {application.specialties.map((s) => (
              <span
                key={s}
                className="border border-ch2ma-border px-2 py-0.5 text-xs text-ch2ma-muted"
              >
                {s}
              </span>
            ))}
          </div>
          <p className="mt-3 max-w-xl text-sm text-ch2ma-muted">
            {application.bio}
          </p>
        </div>

        <div className="flex shrink-0 gap-2">
          <button
            onClick={() => onReject(application.id)}
            className="border border-ch2ma-border px-4 py-2 text-sm font-medium text-ch2ma-muted hover:border-ch2ma-text hover:text-ch2ma-text"
          >
            Rejeter
          </button>
          <button
            onClick={() => onApprove(application.id)}
            className="bg-ch2ma-dark px-4 py-2 text-sm font-semibold text-ch2ma-cream hover:bg-ch2ma-dark/90"
          >
            Approuver
          </button>
        </div>
      </div>
    </div>
  );
}
