import { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  FolderOpen,
  CalendarDays,
  ListChecks,
  Share2,
  Milestone,
  UserCog,
  ShieldCheck,
  Receipt,
  MessageSquare,
  LogOut,
  X,
  Menu,
} from "lucide-react";

import NotificationDropdown from "../../features/notifications/components/NotificationDropdown";

const mainNav = [
  {
    to: "/admin",
    label: "Tableau de bord",
    icon: LayoutDashboard,
    end: true,
  },
  { to: "/admin/clients", label: "Clients", icon: Users },
  { to: "/admin/dossiers", label: "Dossiers", icon: FolderOpen },
  { to: "/admin/calendrier", label: "Calendrier", icon: CalendarDays },
  { to: "/admin/taches", label: "Tâches", icon: ListChecks },
  { to: "/admin/delegations", label: "Délégations", icon: Share2 },
  { to: "/admin/jalons", label: "Jalons", icon: Milestone },
  { to: "/admin/partenaires", label: "Partenaires", icon: UserCog },
  { to: "/admin/audit", label: "Audit", icon: ShieldCheck },
  { to: "/admin/equipe", label: "Équipe", icon: Users },
  { to: "/admin/facturation", label: "Facturation", icon: Receipt },
];

/* =========================================================
   MESSAGES NON LUS
========================================================= */

const conversations = [
  {
    id: "c1",
    unreadCount: 2,
  },
  {
    id: "c2",
    unreadCount: 0,
  },
];

export default function AdminLayout() {
  const [menuOpen, setMenuOpen] = useState(false);

  /* Total des messages non lus */
  const unreadMessages = conversations.reduce(
    (total, conversation) => total + conversation.unreadCount,
    0,
  );

  /* Bloquer le scroll quand le menu mobile est ouvert */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <div className="flex min-h-screen bg-ch2ma-cream">
      {/* =====================================================
          OVERLAY MOBILE
      ====================================================== */}
      {menuOpen && (
        <button
          type="button"
          aria-label="Fermer le menu"
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      {/* =====================================================
          SIDEBAR
      ====================================================== */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50
          flex w-[270px] shrink-0 flex-col justify-between
          bg-ch2ma-dark px-5 py-6 text-ch2ma-cream
          transition-transform duration-300
          lg:static lg:w-64 lg:translate-x-0
          lg:px-6 lg:py-8
          ${menuOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div>
          {/* Logo */}
          <div className="mb-10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center border border-ch2ma-gold font-display text-xl text-ch2ma-gold">
                C
              </div>

              <span className="text-[11px] font-medium uppercase tracking-[0.34em] text-ch2ma-cream/80">
                CH2MA
              </span>
            </div>

            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="flex h-9 w-9 items-center justify-center text-ch2ma-cream/70 transition-colors hover:text-ch2ma-gold lg:hidden"
              aria-label="Fermer le menu"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-1">
            {mainNav.map(({ to, label, icon: Icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 border-l-2 px-3 py-2.5 text-[13px] transition-colors ${
                    isActive
                      ? "border-ch2ma-gold bg-white/5 text-ch2ma-gold"
                      : "border-transparent text-ch2ma-cream/70 hover:border-ch2ma-gold/40 hover:text-ch2ma-cream"
                  }`
                }
              >
                <Icon size={17} strokeWidth={1.7} />
                {label}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* User */}
        <div className="border-t border-white/10 pt-5">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ch2ma-gold/20 text-[13px] font-semibold text-ch2ma-gold">
              MC
            </div>

            <div className="min-w-0">
              <p className="truncate text-[13px] font-medium text-ch2ma-cream">
                Maître Chama
              </p>

              <p className="text-[11px] text-ch2ma-cream/50">
                Super-administratrice
              </p>
            </div>
          </div>

          <button
            type="button"
            className="flex items-center gap-2 text-[12px] text-ch2ma-cream/60 transition hover:text-ch2ma-gold"
          >
            <LogOut size={14} strokeWidth={1.8} />
            Déconnexion
          </button>
        </div>
      </aside>

      {/* =====================================================
          MAIN
      ====================================================== */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* =================================================
            HEADER
        ================================================= */}
        <header className="sticky top-0 z-30 flex h-[65px] items-center justify-between border-b border-ch2ma-border bg-white px-4 sm:px-6 lg:px-10">
          {/* Hamburger */}
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="flex h-9 w-9 items-center justify-center text-ch2ma-dark2 transition-colors hover:text-ch2ma-gold lg:hidden"
            aria-label="Ouvrir le menu"
          >
            <Menu size={21} strokeWidth={1.8} />
          </button>

          {/* Mobile logo */}
          <div className="ml-2 flex items-center lg:hidden">
            <span className="font-display text-[17px] tracking-wide text-ch2ma-dark">
              CH2MA
            </span>
          </div>

          {/* Right header */}
          <div className="ml-auto flex items-center gap-3 sm:gap-5">
            {/* =================================================
                MESSAGERIE + BADGE
            ================================================== */}
            <NavLink
              to="/admin/messagerie"
              className={({ isActive }) =>
                `relative flex h-9 w-9 items-center justify-center transition-colors ${
                  isActive
                    ? "text-ch2ma-dark2"
                    : "text-ch2ma-text hover:text-ch2ma-dark2"
                }`
              }
              aria-label="Messagerie"
            >
              <MessageSquare size={19} strokeWidth={1.8} />

              {/* Badge messages non lus */}
              {unreadMessages > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-ch2ma-gold px-1 text-[9px] font-bold leading-none text-ch2ma-dark">
                  {unreadMessages > 99 ? "99+" : unreadMessages}
                </span>
              )}
            </NavLink>

            {/* Notifications */}
            <NotificationDropdown />

            {/* Paramètres */}
            <NavLink
              to="/admin/parametres"
              className={({ isActive }) =>
                `flex items-center gap-2.5 border-l border-ch2ma-border pl-3 transition-colors sm:pl-5 ${
                  isActive
                    ? "text-ch2ma-dark2"
                    : "text-ch2ma-text hover:text-ch2ma-dark2"
                }`
              }
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ch2ma-gold/15 text-[12px] font-semibold text-ch2ma-gold">
                MC
              </div>

              <span className="hidden text-[13px] font-medium sm:block">
                Maître Chama
              </span>
            </NavLink>
          </div>
        </header>

        {/* =================================================
            PAGE CONTENT
        ================================================= */}
        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
