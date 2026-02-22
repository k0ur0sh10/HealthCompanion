import { createHashRouter } from "react-router-dom";
import PatientOnboarding from "./pages/patient/PatientOnboarding";
import PatientHome from "./pages/patient/PatientHome";
import PatientMedications from "./pages/patient/PatientMedications";
import PatientAppointments from "./pages/patient/PatientAppointments";
import PatientMessages from "./pages/patient/PatientMessages";
import PatientSettings from "./pages/patient/PatientSettings";
import PatientWebDashboard from "./pages/patient/PatientWebDashboard";
import ProfessionalLogin from "./pages/professional/ProfessionalLogin";
import ProfessionalHome from "./pages/professional/ProfessionalHome";
import ProfessionalDashboard from "./pages/professional/ProfessionalDashboard";
import ProfessionalPatientDetail from "./pages/professional/ProfessionalPatientDetail";
import ProfessionalMessages from "./pages/professional/ProfessionalMessages";
import ProfessionalSettings from "./pages/professional/ProfessionalSettings";
import ProfessionalAnalytics from "./pages/professional/ProfessionalAnalytics";
import RoleSelector from "./pages/RoleSelector";
import PatientLogin from "./pages/patient/PatientLogin";
import NotFound from "./pages/NotFound";

export const router = createHashRouter([
  {
    path: "/",
    Component: RoleSelector,
  },
  {
    path: "/patient/onboarding",
    Component: PatientOnboarding,
  },
  {
    path: "/patient/login",
    Component: PatientLogin,
  },
  {
    path: "/patient/home",
    Component: PatientHome,
  },
  {
    path: "/patient/medications",
    Component: PatientMedications,
  },
  {
    path: "/patient/appointments",
    Component: PatientAppointments,
  },
  {
    path: "/patient/messages",
    Component: PatientMessages,
  },
  {
    path: "/patient/settings",
    Component: PatientSettings,
  },
  {
    path: "/patient/dashboard",
    Component: PatientWebDashboard,
  },
  {
    path: "/professional/login",
    Component: ProfessionalLogin,
  },
  {
    path: "/professional/home",
    Component: ProfessionalHome,
  },
  {
    path: "/professional/dashboard",
    Component: ProfessionalDashboard,
  },
  {
    path: "/professional/messages",
    Component: ProfessionalMessages,
  },
  {
    path: "/professional/settings",
    Component: ProfessionalSettings,
  },
  {
    path: "/professional/patient/:id",
    Component: ProfessionalPatientDetail,
  },
  {
    path: "/professional/analytics",
    Component: ProfessionalAnalytics,
  },
  {
    path: "*",
    Component: NotFound,
  },
]);