import { useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../../../components/ui/PageHeader";
import Card from "../../../components/ui/Card";
import Badge from "../../../components/ui/Badge";
import type { AdminNotification, NotificationType } from "../admin-types";

const typeLabel: Record<NotificationType, string> = {
  rdv_public: "RDV",
  candidature_partenaire: "Candidature",
  dossier_retard: "Retard",
  assistance: "Assistance",
};

const typeTone: Record<NotificationType, "gold" | "alert"> = {
  rdv_public: "gold",
  candidature_partenaire: "gold",
  dossier_retard: "alert",
  assistance: "gold",
};

// TODO: remplacer par un fetch réel (GET /api/admin/notifications)
const initialNotifications: AdminNotification[] = [
  {
    id: "n1",
    type: "rdv_public",
    message: "Nouvelle demande de rendez-vous — Nadia Haddad",
    createdAt: "02/10/2026 16:12",
    read: false,
    to: "/admin/clients",
  },
  {
    id: "n2",
    type: "candidature_partenaire",
    message: "Nouvelle candidature — Me. Yasmine Haddad",
    createdAt: "02/10/2026 10:03",
    read: false,
    to: "/admin/partenaires",
  },
  {
    id: "n3",
    type: "dossier_retard",
    message: "Dossier en retard — Bail commercial Oran",
    createdAt: "01/10/2026 18:45",
    read: true,
    to: "/admin/dossiers",
  },
  {
    id: "n4",
    type: "assistance",
    message: "Demande d'assistance — Me. Rachid Amrani",
    createdAt: "01/10/2026 09:30",
    read: false,
    to: "/admin/assistance",
  },
];

export default function AdminNotificationsPage() {
  const [notifications, setNotifications] =
    useState<AdminNotification[]>(initialNotifications);
  const unreadCount = notifications.filter((n) => !n.read).length;

  function markAsRead(id: string) {
    // TODO: PATCH /api/admin/notifications/:id { read: true }
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  }

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Super-administrateur"
        title="Notifications"
        subtitle={`${unreadCount} non lue${unreadCount > 1 ? "s" : ""}.`}
      />

      <Card className="divide-y divide-ch2ma-border p-0">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`flex items-center justify-between gap-4 px-6 py-4 ${
              notification.read ? "" : "bg-ch2ma-gold/5"
            }`}
          >
            <div className="flex items-center gap-3">
              <Badge tone={typeTone[notification.type]}>
                {typeLabel[notification.type]}
              </Badge>
              <div>
                <p className="text-sm text-ch2ma-text">
                  {notification.message}
                </p>
                <p className="mt-0.5 text-xs text-ch2ma-muted">
                  {notification.createdAt}
                </p>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-4">
              {!notification.read && (
                <button
                  onClick={() => markAsRead(notification.id)}
                  className="text-xs font-medium text-ch2ma-muted hover:text-ch2ma-text"
                >
                  Marquer comme lue
                </button>
              )}
              <Link
                to={notification.to}
                className="text-sm font-medium text-ch2ma-gold hover:underline"
              >
                Voir →
              </Link>
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
}
