import { createBrowserRouter } from "react-router-dom";

// ==========================================================
// LAYOUTS
// ==========================================================
import PublicLayout from "../components/layout/PublicLayout";
import LawyerLayout from "../components/layout/LawyerLayout";
import AdminLayout from "../components/layout/AdminLayout";

// ==========================================================
// PUBLIC PAGES
// ==========================================================
import HomePage from "../features/public/pages/HomePage";
import BookingPage from "../features/appointments/pages/BookingPage";
import ContactPage from "../features/public/pages/ContactPage";

// ==========================================================
// AUTH PAGES
// ==========================================================
import LoginPage from "../features/auth/pages/LoginPage";
import SignupPartnerPage from "../features/auth/pages/SignupPartnerPage";
import ActivateAccountPage from "../features/auth/pages/ActivateAccountPage";
import ForgotPasswordPage from "../features/auth/pages/ForgotPasswordPage";
import ResetPasswordPage from "../features/auth/pages/ResetPasswordPage";

// ==========================================================
// LAWYER PAGES
// ==========================================================
import DashboardPage from "../features/dashboard/pages/DashboardPage";
import ClientsListPage from "../features/clients/pages/ClientsListPage";
import ClientDetailPage from "../features/clients/pages/ClientDetailPage";
import MattersListPage from "../features/matters/pages/MattersListPage";
import MatterDetailPage from "../features/matters/pages/MatterDetailPage";
import CalendarPage from "../features/calendar/pages/CalendarPage";
import TasksPage from "../features/tasks/pages/TasksPage";
import BillingPage from "../features/billing/pages/BillingPage";
import ProfilePage from "../features/profiles/ProfilePage";

// ==========================================================
// ADMIN PAGES
// ==========================================================
import AdminDashboardPage from "../features/dashboard/pages/AdminDashboardPage";
import AdminClientsListPage from "../features/clients/pages/AdminClientsListPage";
import AdminClientDetailPage from "../features/clients/pages/AdminClientDetailPage";
import AdminMattersListPage from "../features/matters/pages/AdminMattersListPage";
import AdminMatterDetailPage from "../features/matters/pages/AdminMatterDetailPage";
import AdminCalendarPage from "../features/calendar/pages/AdminCalendarPage";
import AdminTasksListPage from "../features/tasks/pages/AdminTasksListPage";
import AdminBillingPage from "../features/billing/pages/AdminBillingPage";
import AdminNotificationsPage from "../features/notifications/pages/AdminNotificationsPage";
import AdminMessagingPage from "../features/messaging/pages/AdminMessagingPage";
import AdminMilestonesPage from "../features/milestones/pages/AdminMilestonesPage";
import AdminAssistancePage from "../features/assistance/pages/AdminAssistancePage";
import TeamManagementPage from "../features/team/pages/TeamManagementPage";
import PartnersListPage from "../features/partners/pages/PartnersListPage";
import PartnerDetailPage from "../features/partners/pages/PartnerDetailPage";
import DelegationsPage from "../features/delegations/pages/DelegationsPage";
import AuditLogPage from "../features/audit/pages/AuditLogPage";
import SettingsPage from "../features/settings/pages/SettingsPage";

// ==========================================================
// ROUTER
// ==========================================================
export const router = createBrowserRouter([
  // ========================================================
  // PUBLIC
  // ========================================================
  {
    element: <PublicLayout />,

    children: [
      {
        index: true,
        element: <HomePage />,
      },

      {
        path: "rendez-vous",
        element: <BookingPage />,
      },

      {
        path: "contact",
        element: <ContactPage />,
      },

      // ====================================================
      // AUTHENTICATION
      // ====================================================
      {
        path: "auth/login",
        element: <LoginPage />,
      },

      {
        path: "auth/signup",
        element: <SignupPartnerPage />,
      },

      {
        path: "auth/activate-account",
        element: <ActivateAccountPage />,
      },

      {
        path: "auth/forgot-password",
        element: <ForgotPasswordPage />,
      },

      {
        path: "auth/reset-password",
        element: <ResetPasswordPage />,
      },
    ],
  },

  // ========================================================
  // AVOCAT INTERNE
  // ========================================================
  {
    path: "/app",
    element: <LawyerLayout />,

    // TODO: protéger avec un guard (rôle LAWYER)
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },

      {
        path: "clients",
        element: <ClientsListPage />,
      },

      {
        path: "clients/:id",
        element: <ClientDetailPage />,
      },

      {
        path: "matters",
        element: <MattersListPage />,
      },

      {
        path: "matters/:id",
        element: <MatterDetailPage />,
      },

      {
        path: "calendar",
        element: <CalendarPage />,
      },

      {
        path: "tasks",
        element: <TasksPage />,
      },

      {
        path: "billing",
        element: <BillingPage />,
      },

      {
        path: "profile",
        element: <ProfilePage />,
      },
    ],
  },

  // ========================================================
  // ADMINISTRATION / MAÎTRE CHAMA
  // ========================================================
  {
    path: "/admin",
    element: <AdminLayout />,

    // TODO: protéger avec un guard (rôle SUPER_ADMIN)
    children: [
      // Dashboard admin
      {
        index: true,
        element: <AdminDashboardPage />,
      },

      // ----------------------------------------------------
      // CLIENTS (tous, scope admin)
      // ----------------------------------------------------
      {
        path: "clients",
        element: <AdminClientsListPage />,
      },

      {
        path: "clients/:id",
        element: <AdminClientDetailPage />,
      },

      // ----------------------------------------------------
      // DOSSIERS (tous, scope admin)
      // ----------------------------------------------------
      {
        path: "dossiers",
        element: <AdminMattersListPage />,
      },

      {
        path: "dossiers/:id",
        element: <AdminMatterDetailPage />, // page existante, réutilisée telle quelle
      },

      // ----------------------------------------------------
      // CALENDRIER
      // ----------------------------------------------------
      {
        path: "calendrier",
        element: <AdminCalendarPage />,
      },

      // ----------------------------------------------------
      // TÂCHES
      // ----------------------------------------------------
      {
        path: "taches",
        element: <AdminTasksListPage />,
      },

      // ----------------------------------------------------
      // FACTURATION
      // ----------------------------------------------------
      {
        path: "facturation",
        element: <AdminBillingPage />,
      },

      // ----------------------------------------------------
      // NOTIFICATIONS
      // ----------------------------------------------------
      {
        path: "notifications",
        element: <AdminNotificationsPage />,
      },

      // ----------------------------------------------------
      // MESSAGERIE
      // ----------------------------------------------------
      {
        path: "messagerie",
        element: <AdminMessagingPage />,
      },

      // ----------------------------------------------------
      // JALONS
      // ----------------------------------------------------
      {
        path: "jalons",
        element: <AdminMilestonesPage />,
      },

      // ----------------------------------------------------
      // ASSISTANCE
      // ----------------------------------------------------
      {
        path: "assistance",
        element: <AdminAssistancePage />,
      },

      // ----------------------------------------------------
      // ÉQUIPE INTERNE
      // ----------------------------------------------------
      {
        path: "equipe",
        element: <TeamManagementPage />,
      },

      // ----------------------------------------------------
      // PARTENAIRES
      // ----------------------------------------------------
      {
        path: "partenaires",
        element: <PartnersListPage />,
      },

      {
        path: "partenaires/:id",
        element: <PartnerDetailPage />,
      },

      // ----------------------------------------------------
      // DÉLÉGATIONS
      // ----------------------------------------------------
      {
        path: "delegations",
        element: <DelegationsPage />,
      },

      // ----------------------------------------------------
      // JOURNAL D'AUDIT
      // ----------------------------------------------------
      {
        path: "audit",
        element: <AuditLogPage />,
      },

      // ----------------------------------------------------
      // PARAMÈTRES
      // ----------------------------------------------------
      {
        path: "parametres",
        element: <SettingsPage />,
      },
    ],
  },

  // ========================================================
  // AVOCAT EXTERNE / PARTENAIRE
  // ========================================================
  // À ajouter plus tard
  //
  // {
  //   path: "/portail",
  //   element: <PartnerLayout />,
  //   children: [
  //     ...
  //   ],
  // },
]);
