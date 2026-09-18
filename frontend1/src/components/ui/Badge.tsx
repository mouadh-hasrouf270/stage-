import type { ReactNode } from "react";

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
