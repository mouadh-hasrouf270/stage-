import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

export function PageHeader({
  eyebrow,
  title,
  subtitle,
  action,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-ch2ma-gold">
          {eyebrow}
        </p>
        <h1 className="font-display text-[32px] leading-tight tracking-[-0.8px] text-ch2ma-text sm:text-[36px]">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-2 text-[14px] text-ch2ma-muted">{subtitle}</p>
        )}
      </div>
      {action}
    </div>
  );
}

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`border border-ch2ma-border bg-white ${className}`}>
      {children}
    </div>
  );
}

export function StatCard({
  label,
  value,
  icon: Icon,
  className = "",
}: {
  label: string;
  value: string;
  icon: LucideIcon;
  className?: string;
}) {
  return (
    <div
      className={`flex h-full min-h-0 w-full flex-col justify-between rounded-2xl border border-ch2ma-border bg-white p-5 transition-shadow group-hover:shadow-sm ${className}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[12px] font-medium text-ch2ma-muted">{label}</p>

          <p className="mt-2 text-3xl font-semibold tracking-tight text-ch2ma-dark">
            {value}
          </p>
        </div>

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ch2ma-green text-ch2ma-dark">
          <Icon size={19} strokeWidth={1.8} />
        </div>
      </div>
    </div>
  );
}
type BadgeTone = "gold" | "muted" | "green" | "alert";

const badgeTones: Record<BadgeTone, string> = {
  gold: "bg-ch2ma-gold/10 text-ch2ma-dark2 border-ch2ma-gold/30",
  muted: "bg-ch2ma-border/40 text-ch2ma-muted border-ch2ma-border",
  green: "bg-ch2ma-green text-ch2ma-dark border-ch2ma-green",
  alert: "bg-red-50 text-red-700 border-red-200",
};

export function Badge({
  tone = "muted",
  children,
}: {
  tone?: BadgeTone;
  children: ReactNode;
}) {
  return (
    <span
      className={`inline-flex items-center border px-2.5 py-1 text-[11px] font-semibold ${badgeTones[tone]}`}
    >
      {children}
    </span>
  );
}
