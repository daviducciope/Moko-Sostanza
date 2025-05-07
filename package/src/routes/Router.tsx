// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import  { lazy } from 'react';
import { Navigate, createBrowserRouter } from "react-router";
import Loadable from 'src/layouts/full/shared/loadable/Loadable';




/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));

// Dashboard
const Dashboard = Loadable(lazy(() => import('../views/dashboards/Dashboard')));

// Dental Management Pages
const Patients = Loadable(lazy(() => import('../views/patients/Patients')));
const NewPatient = Loadable(lazy(() => import('../views/patients/NewPatient')));
const ViewPatient = Loadable(lazy(() => import('../views/patients/ViewPatient')));
const EditPatient = Loadable(lazy(() => import('../views/patients/EditPatient')));
const Appointments = Loadable(lazy(() => import('../views/appointments/Appointments')));
const Treatments = Loadable(lazy(() => import('../views/treatments/Treatments')));
const NewTreatment = Loadable(lazy(() => import('../views/treatments/NewTreatment')));
const Billing = Loadable(lazy(() => import('../views/billing/Billing')));
const NewInvoice = Loadable(lazy(() => import('../views/billing/NewInvoice')));
const CalendarView = Loadable(lazy(() => import('../views/calendar/Calendar')));

// Clinic Management Pages
const ClinicDashboard = Loadable(lazy(() => import('../views/clinic/ClinicDashboard')));
const ClinicTreatments = Loadable(lazy(() => import('../views/clinic/ClinicTreatments')));

// utilities
const Typography = Loadable(lazy(() => import("../views/typography/Typography")));
const Table = Loadable(lazy(() => import("../views/tables/Table")));
const Form = Loadable(lazy(() => import("../views/forms/Form")));
const Shadow = Loadable(lazy(() => import("../views/shadows/Shadow")));
const Alert = Loadable(lazy(() => import("../views/alerts/Alerts")));

// icons
const Solar = Loadable(lazy(() => import("../views/icons/Solar")));

// authentication
const Login = Loadable(lazy(() => import('../views/auth/login/Login')));
const Register = Loadable(lazy(() => import('../views/auth/register/Register')));
const SamplePage = Loadable(lazy(() => import('../views/sample-page/SamplePage')));
const Error = Loadable(lazy(() => import('../views/auth/error/Error')));

const Router = [
  {
    path: '/',
    element: <FullLayout />,
    children: [
      // Dentist routes
      { path: '/', exact: true, element: <Dashboard/> },
      { path: '/patients', exact: true, element: <Patients/> },
      { path: '/patients/new', exact: true, element: <NewPatient /> },
      { path: '/patients/search', exact: true, element: <Patients/> },
      { path: '/patients/view/:id', exact: true, element: <ViewPatient /> },
      { path: '/patients/edit/:id', exact: true, element: <EditPatient /> },
      { path: '/appointments', exact: true, element: <Appointments/> },
      { path: '/appointments/new', exact: true, element: <Appointments/> },
      { path: '/treatments', exact: true, element: <Treatments/> },
      { path: '/treatments/new', exact: true, element: <NewTreatment /> },
      { path: '/billing/invoices', exact: true, element: <Billing/> },
      { path: '/billing/new', exact: true, element: <NewInvoice/> },
      { path: '/billing/search', exact: true, element: <Billing/> },
      { path: '/accounting/reports', exact: true, element: <SamplePage /> },
      { path: '/calendar', exact: true, element: <CalendarView/> },
      { path: '/book-appointment', exact: true, element: <Appointments/> },
      { path: '/inventory', exact: true, element: <SamplePage /> },
      { path: '/inventory/add', exact: true, element: <SamplePage /> },
      { path: '/inventory/edit', exact: true, element: <SamplePage /> },
      { path: '/news', exact: true, element: <SamplePage /> },
      { path: '/profile', exact: true, element: <SamplePage /> },
      { path: '/settings', exact: true, element: <SamplePage /> },

      // Clinic routes
      { path: '/clinic', exact: true, element: <ClinicDashboard/> },
      { path: '/clinic/calendar', exact: true, element: <CalendarView/> },
      { path: '/clinic/doctors', exact: true, element: <SamplePage /> },
      { path: '/clinic/doctors/add', exact: true, element: <SamplePage /> },
      { path: '/clinic/staff', exact: true, element: <SamplePage /> },
      { path: '/clinic/staff/attendance', exact: true, element: <SamplePage /> },
      { path: '/clinic/staff/holidays', exact: true, element: <SamplePage /> },
      { path: '/clinic/departments', exact: true, element: <SamplePage /> },
      { path: '/clinic/rooms', exact: true, element: <SamplePage /> },
      { path: '/clinic/treatments', exact: true, element: <ClinicTreatments /> },
      { path: '/clinic/inventory', exact: true, element: <SamplePage /> },
      { path: '/clinic/inventory/add', exact: true, element: <SamplePage /> },
      { path: '/clinic/inventory/edit', exact: true, element: <SamplePage /> },
      { path: '/clinic/accounting/income', exact: true, element: <SamplePage /> },
      { path: '/clinic/accounting/invoices', exact: true, element: <SamplePage /> },
      { path: '/clinic/accounting/expenses', exact: true, element: <SamplePage /> },
      { path: '/clinic/events', exact: true, element: <SamplePage /> },
      { path: '/clinic/gallery', exact: true, element: <SamplePage /> },
      { path: '/clinic/news', exact: true, element: <SamplePage /> },
      { path: '/clinic/profile', exact: true, element: <SamplePage /> },
      { path: '/clinic/settings', exact: true, element: <SamplePage /> },

      // UI components (for development)
      { path: '/ui/typography', exact: true, element: <Typography/> },
      { path: '/ui/table', exact: true, element: <Table/> },
      { path: '/ui/form', exact: true, element: <Form/> },
      { path: '/ui/alert', exact: true, element: <Alert/> },
      { path: '/ui/shadow', exact: true, element: <Shadow/> },
      { path: '/icons/solar', exact: true, element: <Solar /> },
      { path: '/sample-page', exact: true, element: <SamplePage /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
  {
    path: '/',
    element: <BlankLayout />,
    children: [
      { path: '/auth/login', element: <Login /> },
      { path: '/auth/register', element: <Register /> },
      { path: '404', element: <Error /> },
      { path: '/auth/404', element: <Error /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  }
  ,
];

const router = createBrowserRouter(Router)

export default router;
