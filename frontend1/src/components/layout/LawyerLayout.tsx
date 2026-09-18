import { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  FolderOpen,
  CalendarDays,
  ListChecks,
  Receipt,
  LogOut,
  X,
  Menu,
} from "lucide-react";

import NotificationDropdown from "../../features/notifications/components/NotificationDropdown";

const mainNav = [
  {
    to: "/app",
    label: "Tableau de bord",
    icon: LayoutDashboard,
    end: true,
  },
  {
    to: "/app/clients",
    label: "Clients",
    icon: Users,
  },
  {
    to: "/app/matters",
    label: "Dossiers",
    icon: FolderOpen,
  },
  {
    to: "/app/calendar",
    label: "Calendrier",
    icon: CalendarDays,
  },
  {
    to: "/app/tasks",
    label: "Tâches",
    icon: ListChecks,
  },
  {
    to: "/app/billing",
    label: "Facturation",
    icon: Receipt,
  },
];

export default function LawyerLayout() {
  const [menuOpen, setMenuOpen] = useState(false);

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
              SB
            </div>

            <div className="min-w-0">
              <p className="truncate text-[13px] font-medium text-ch2ma-cream">
                Maître Sami Benali
              </p>

              <p className="text-[11px] text-ch2ma-cream/50">Avocat associé</p>
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
            {/* Notifications */}
            <NotificationDropdown />

            {/* Profile */}
            <NavLink
              to="/app/profile"
              className={({ isActive }) =>
                `flex items-center gap-2.5 border-l border-ch2ma-border pl-3 transition-colors sm:pl-5 ${
                  isActive
                    ? "text-ch2ma-dark2"
                    : "text-ch2ma-text hover:text-ch2ma-dark2"
                }`
              }
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ch2ma-gold/15 text-[12px] font-semibold text-ch2ma-gold">
                SB
              </div>

              <span className="hidden text-[13px] font-medium sm:block">
                Me Sami Benali
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
