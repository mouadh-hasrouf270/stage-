import type { ReactNode } from "react";

export default function Card({
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
