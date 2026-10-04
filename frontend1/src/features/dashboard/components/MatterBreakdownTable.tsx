import Card from "../../../components/ui/Card";
import type { MatterBreakdownRow } from "../types";

interface MatterBreakdownTableProps {
  title: string;
  rows: MatterBreakdownRow[];
}

export default function MatterBreakdownTable({
  title,
  rows,
}: MatterBreakdownTableProps) {
  return (
    <Card className="overflow-hidden p-0">
      <div className="border-b border-ch2ma-border px-5 py-3">
        <h3 className="text-sm font-semibold text-ch2ma-text">{title}</h3>
      </div>
      <table className="w-full text-left text-sm">
        <thead className="border-b border-ch2ma-border text-xs uppercase tracking-wide text-ch2ma-muted">
          <tr>
            <th className="px-5 py-2.5 font-medium">Avocat</th>
            <th className="px-5 py-2.5 font-medium">Actifs</th>
            <th className="px-5 py-2.5 font-medium">En attente</th>
            <th className="px-5 py-2.5 font-medium">Clôturés</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-ch2ma-border">
          {rows.map((row) => (
            <tr key={row.id}>
              <td className="px-5 py-3 text-ch2ma-text">{row.name}</td>
              <td className="px-5 py-3 text-ch2ma-text">{row.active}</td>
              <td className="px-5 py-3 text-ch2ma-text">{row.pending}</td>
              <td className="px-5 py-3 text-ch2ma-muted">{row.closed}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
