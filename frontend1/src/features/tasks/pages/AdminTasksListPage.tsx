import { useMemo, useState } from "react";
import PageHeader from "../../../components/ui/PageHeader";
import Card from "../../../components/ui/Card";
import Badge from "../../../components/ui/Badge";
import type {
  AdminTask,
  InternalLawyerOption,
  TaskPriority,
  TaskStatus,
} from "../admin-types";

const internalLawyers: InternalLawyerOption[] = [
  { id: "l1", name: "Me. Amine Cherif" },
  { id: "l2", name: "Me. Lina Boudiaf" },
  { id: "l3", name: "Me. Hocine Meziane" },
];

const priorityLabel: Record<TaskPriority, string> = {
  haute: "Haute",
  normale: "Normale",
  basse: "Basse",
};

const priorityTone: Record<TaskPriority, "alert" | "gold" | "muted"> = {
  haute: "alert",
  normale: "gold",
  basse: "muted",
};

const statusLabel: Record<TaskStatus, string> = {
  a_faire: "À faire",
  en_cours: "En cours",
  terminee: "Terminée",
};

// TODO: remplacer par un fetch réel (GET /api/tasks — toutes, scope admin)
const initialTasks: AdminTask[] = [
  {
    id: "t1",
    title: "Préparer le mémoire",
    matterTitle: "Succession Benali",
    lawyerId: "l1",
    lawyerName: "Me. Amine Cherif",
    dueDate: "2026-10-07",
    priority: "haute",
    status: "en_cours",
  },
  {
    id: "t2",
    title: "Relancer le client pour pièces",
    matterTitle: "SCI Oran Centre — Bail commercial",
    lawyerId: "l2",
    lawyerName: "Me. Lina Boudiaf",
    dueDate: "2026-10-10",
    priority: "normale",
    status: "a_faire",
  },
  {
    id: "t3",
    title: "Classer le dossier clôturé",
    matterTitle: "Contentieux fournisseur — 2024",
    lawyerId: "l1",
    lawyerName: "Me. Amine Cherif",
    dueDate: "2026-10-03",
    priority: "basse",
    status: "terminee",
  },
];

export default function AdminTasksListPage() {
  const [tasks, setTasks] = useState<AdminTask[]>(initialTasks);
  const [lawyerFilter, setLawyerFilter] = useState("tous");
  const [statusFilter, setStatusFilter] = useState("tous");

  const filtered = useMemo(
    () =>
      tasks.filter((task) => {
        if (lawyerFilter !== "tous" && task.lawyerId !== lawyerFilter)
          return false;
        if (statusFilter !== "tous" && task.status !== statusFilter)
          return false;
        return true;
      }),
    [tasks, lawyerFilter, statusFilter],
  );

  function reassign(taskId: string, lawyerId: string) {
    // TODO: PATCH /api/tasks/:id { lawyerId }
    const lawyer = internalLawyers.find((l) => l.id === lawyerId);
    if (!lawyer) return;
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId
          ? { ...t, lawyerId: lawyer.id, lawyerName: lawyer.name }
          : t,
      ),
    );
  }

  function changeStatus(taskId: string, status: TaskStatus) {
    // TODO: PATCH /api/tasks/:id { status }
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status } : t)),
    );
  }

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Super-administrateur"
        title="Tâches"
        subtitle="Toutes les tâches du cabinet, tous avocats confondus."
      />

      <div className="flex flex-wrap gap-3">
        <select
          value={lawyerFilter}
          onChange={(e) => setLawyerFilter(e.target.value)}
          className="border border-ch2ma-border bg-transparent px-3 py-2 text-sm text-ch2ma-text focus:border-ch2ma-gold focus:outline-none"
        >
          <option value="tous">Tous les avocats</option>
          {internalLawyers.map((lawyer) => (
            <option key={lawyer.id} value={lawyer.id}>
              {lawyer.name}
            </option>
          ))}
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-ch2ma-border bg-transparent px-3 py-2 text-sm text-ch2ma-text focus:border-ch2ma-gold focus:outline-none"
        >
          <option value="tous">Tous les statuts</option>
          {(Object.keys(statusLabel) as TaskStatus[]).map((status) => (
            <option key={status} value={status}>
              {statusLabel[status]}
            </option>
          ))}
        </select>
      </div>

      <Card className="overflow-hidden p-0">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-ch2ma-border text-xs uppercase tracking-wide text-ch2ma-muted">
            <tr>
              <th className="px-6 py-3 font-medium">Tâche</th>
              <th className="px-6 py-3 font-medium">Dossier</th>
              <th className="px-6 py-3 font-medium">Échéance</th>
              <th className="px-6 py-3 font-medium">Priorité</th>
              <th className="px-6 py-3 font-medium">Avocat</th>
              <th className="px-6 py-3 font-medium">Statut</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ch2ma-border">
            {filtered.map((task) => (
              <tr key={task.id}>
                <td className="px-6 py-4 text-ch2ma-text">{task.title}</td>
                <td className="px-6 py-4 text-ch2ma-muted">
                  {task.matterTitle}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-ch2ma-muted">
                  {task.dueDate}
                </td>
                <td className="px-6 py-4">
                  <Badge tone={priorityTone[task.priority]}>
                    {priorityLabel[task.priority]}
                  </Badge>
                </td>
                <td className="px-6 py-4">
                  <select
                    value={task.lawyerId}
                    onChange={(e) => reassign(task.id, e.target.value)}
                    className="border border-ch2ma-border bg-transparent px-2 py-1.5 text-sm text-ch2ma-text focus:border-ch2ma-gold focus:outline-none"
                  >
                    {internalLawyers.map((lawyer) => (
                      <option key={lawyer.id} value={lawyer.id}>
                        {lawyer.name}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-6 py-4">
                  <select
                    value={task.status}
                    onChange={(e) =>
                      changeStatus(task.id, e.target.value as TaskStatus)
                    }
                    className="border border-ch2ma-border bg-transparent px-2 py-1.5 text-sm text-ch2ma-text focus:border-ch2ma-gold focus:outline-none"
                  >
                    {(Object.keys(statusLabel) as TaskStatus[]).map(
                      (status) => (
                        <option key={status} value={status}>
                          {statusLabel[status]}
                        </option>
                      ),
                    )}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
