import { useEffect, useRef, useState } from "react";
import { Bell, Check, X } from "lucide-react";
import { initialNotifications, type Notification } from "../data/notifications";

export default function NotificationDropdown() {
  const [notifOpen, setNotifOpen] = useState(false);
  const [showAllNotifications, setShowAllNotifications] = useState(false);
  const [notifications, setNotifications] =
    useState<Notification[]>(initialNotifications);

  const notifRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(
    (notification) => !notification.lu,
  ).length;

  const closeNotifications = () => {
    setNotifOpen(false);
    setShowAllNotifications(false);
  };

  const handleNotificationClick = () => {
    setNotifOpen((current) => !current);
    setShowAllNotifications(false);
  };

  const handleShowAll = () => {
    setShowAllNotifications(true);
  };

  const handleMarkAllAsRead = () => {
    setNotifications((currentNotifications) =>
      currentNotifications.map((notification) => ({
        ...notification,
        lu: true,
      })),
    );
  };

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        closeNotifications();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={notifRef} className="relative">
      {/* BOUTON NOTIFICATION */}
      <button
        type="button"
        onClick={handleNotificationClick}
        className={`relative flex h-9 w-9 items-center justify-center transition-colors ${
          notifOpen
            ? "text-ch2ma-gold"
            : "text-ch2ma-muted hover:text-ch2ma-gold"
        }`}
        aria-label="Notifications"
        aria-expanded={notifOpen}
      >
        <Bell size={19} strokeWidth={1.7} />

        {unreadCount > 0 && (
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-ch2ma-gold" />
        )}
      </button>

      {/* PETIT PANNEAU */}
      {notifOpen && !showAllNotifications && (
        <div
          className="
            fixed left-4 right-4 top-[76px] z-50
            overflow-hidden rounded-2xl
            border border-ch2ma-border
            bg-white shadow-xl
            sm:absolute sm:left-auto sm:right-0
            sm:top-[calc(100%+10px)]
            sm:w-80
          "
        >
          <div className="flex items-center justify-between border-b border-ch2ma-border px-4 py-3">
            <div>
              <p className="text-[13px] font-semibold text-ch2ma-text">
                Notifications
              </p>

              {unreadCount > 0 && (
                <p className="mt-0.5 text-[11px] text-ch2ma-muted">
                  {unreadCount} non lue{unreadCount > 1 ? "s" : ""}
                </p>
              )}
            </div>

            {unreadCount > 0 && (
              <button
                type="button"
                onClick={handleMarkAllAsRead}
                className="text-[11px] font-medium text-ch2ma-gold transition-colors hover:text-ch2ma-dark2"
              >
                Tout lire
              </button>
            )}
          </div>

          <div className="max-h-[280px] overflow-y-auto">
            {notifications.filter((notification) => !notification.lu).length >
            0 ? (
              notifications
                .filter((notification) => !notification.lu)
                .slice(0, 3)
                .map((notification) => (
                  <button
                    key={notification.id}
                    type="button"
                    className="flex w-full items-start gap-3 border-b border-ch2ma-border px-4 py-3 text-left transition-colors hover:bg-ch2ma-cream"
                  >
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-ch2ma-gold" />

                    <div className="min-w-0 flex-1">
                      <p className="text-[12px] font-medium leading-5 text-ch2ma-text">
                        {notification.titre}
                      </p>

                      <p className="mt-1 text-[10px] text-ch2ma-muted">
                        {notification.date}
                      </p>
                    </div>
                  </button>
                ))
            ) : (
              <div className="px-4 py-8 text-center">
                <p className="text-[12px] text-ch2ma-muted">
                  Aucune nouvelle notification
                </p>
              </div>
            )}
          </div>

          <div className="border-t border-ch2ma-border bg-ch2ma-cream/40 p-2">
            <button
              type="button"
              onClick={handleShowAll}
              className="w-full rounded-xl px-3 py-2.5 text-[11px] font-semibold text-ch2ma-dark transition-colors hover:bg-white"
            >
              Voir toutes les notifications
            </button>
          </div>
        </div>
      )}

      {/* GRAND PANNEAU */}
      {notifOpen && showAllNotifications && (
        <div
          className="
            fixed left-4 right-4 top-[76px] z-50
            overflow-hidden rounded-2xl
            border border-ch2ma-border
            bg-white shadow-xl
            sm:absolute sm:left-auto sm:right-0
            sm:top-[calc(100%+10px)]
            sm:w-[420px]
          "
        >
          <div className="flex items-center justify-between border-b border-ch2ma-border px-4 py-4 sm:px-5">
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-ch2ma-muted">
                Notifications
              </p>

              <p className="mt-1 text-[11px] text-ch2ma-muted">
                Toutes vos notifications récentes
              </p>
            </div>

            <button
              type="button"
              onClick={closeNotifications}
              className="flex h-8 w-8 items-center justify-center rounded-full text-ch2ma-muted transition-colors hover:bg-ch2ma-cream hover:text-ch2ma-dark2"
              aria-label="Fermer"
            >
              <X size={17} strokeWidth={1.7} />
            </button>
          </div>

          <div className="flex items-center justify-between gap-3 border-b border-ch2ma-border px-4 py-3 sm:px-5">
            <span className="text-[11px] text-ch2ma-muted">
              {unreadCount > 0
                ? `${unreadCount} notification${
                    unreadCount > 1 ? "s" : ""
                  } non lue${unreadCount > 1 ? "s" : ""}`
                : "Aucune notification non lue"}
            </span>

            {unreadCount > 0 && (
              <button
                type="button"
                onClick={handleMarkAllAsRead}
                className="flex shrink-0 items-center gap-1.5 text-[11px] font-medium text-ch2ma-gold transition-colors hover:text-ch2ma-dark2"
              >
                <Check size={13} />

                <span className="hidden sm:inline">Tout marquer comme lu</span>

                <span className="sm:hidden">Tout lire</span>
              </button>
            )}
          </div>

          <div className="max-h-[60vh] overflow-y-auto">
            {notifications.map((notification) => (
              <button
                key={notification.id}
                type="button"
                className={`flex w-full gap-3 border-b border-ch2ma-border px-4 py-4 text-left transition-colors hover:bg-ch2ma-cream/50 sm:px-5 ${
                  !notification.lu ? "bg-ch2ma-cream/30" : "bg-white"
                }`}
              >
                <div className="mt-1.5 w-2 shrink-0">
                  {!notification.lu && (
                    <span className="block h-2 w-2 rounded-full bg-ch2ma-gold" />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="break-words text-[13px] leading-5 text-ch2ma-text">
                    {notification.titre}
                  </p>

                  <p className="mt-1 text-[11px] text-ch2ma-muted">
                    {notification.date}
                  </p>
                </div>
              </button>
            ))}
          </div>

          <div className="border-t border-ch2ma-border bg-ch2ma-cream/30 px-5 py-3">
            <button
              type="button"
              onClick={closeNotifications}
              className="w-full text-center text-[11px] font-medium text-ch2ma-muted transition-colors hover:text-ch2ma-dark2"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
