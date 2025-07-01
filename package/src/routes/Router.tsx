import { lazy } from 'react';
import { Navigate, createBrowserRouter } from "react-router-dom";
import Loadable from '../components/shared/Loadable';




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
const ViewInvoice = Loadable(lazy(() => import('../views/billing/ViewInvoice')));
const Reports = Loadable(lazy(() => import('../views/accounting/Reports')));
const Inventory = Loadable(lazy(() => import('../views/inventory/Inventory')));
const AddProduct = Loadable(lazy(() => import('../views/inventory/AddProduct')));
const EditProduct = Loadable(lazy(() => import('../views/inventory/EditProduct')));
const Doctors = Loadable(lazy(() => import('../views/doctors/Doctors')));
const NewDoctor = Loadable(lazy(() => import('../views/doctors/NewDoctor')));
const ViewDoctor = Loadable(lazy(() => import('../views/doctors/ViewDoctor')));
const EditDoctor = Loadable(lazy(() => import('../views/doctors/EditDoctor')));
const Staff = Loadable(lazy(() => import('../views/staff/Staff')));
const NewStaff = Loadable(lazy(() => import('../views/staff/NewStaff')));
const ViewStaff = Loadable(lazy(() => import('../views/staff/ViewStaff')));
const EditStaff = Loadable(lazy(() => import('../views/staff/EditStaff')));
const Attendance = Loadable(lazy(() => import('../views/staff/Attendance')));
const CalendarView = Loadable(lazy(() => import('../views/calendar/Calendar')));

// Clinic Management Pages
const ClinicDashboard = Loadable(lazy(() => import('../views/clinic/ClinicDashboard')));
const ClinicTreatments = Loadable(lazy(() => import('../views/clinic/ClinicTreatments')));
const Departments = Loadable(lazy(() => import('../views/departments/Departments')));
const NewDepartment = Loadable(lazy(() => import('../views/departments/NewDepartment')));
const Rooms = Loadable(lazy(() => import('../views/rooms/Rooms')));
const NewRoom = Loadable(lazy(() => import('../views/rooms/NewRoom')));

// Profile and Settings
const Profile = Loadable(lazy(() => import('../views/profile/Profile')));
const Settings = Loadable(lazy(() => import('../views/settings/Settings')));

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
      { path: '/billing/invoices/:id', exact: true, element: <ViewInvoice/> },
      { path: '/billing/new', exact: true, element: <NewInvoice/> },
      { path: '/billing/search', exact: true, element: <Billing/> },
      { path: '/accounting/reports', exact: true, element: <Reports /> },
      { path: '/calendar', exact: true, element: <CalendarView/> },
      { path: '/book-appointment', exact: true, element: <Appointments/> },
      { path: '/inventory', exact: true, element: <Inventory /> },
      { path: '/inventory/add', exact: true, element: <AddProduct /> },
      { path: '/inventory/edit/:id', exact: true, element: <EditProduct /> },

      { path: '/profile', exact: true, element: <Profile /> },
      { path: '/settings', exact: true, element: <Settings /> },

      // Clinic routes
      { path: '/clinic', exact: true, element: <ClinicDashboard/> },
      { path: '/clinic/calendar', exact: true, element: <CalendarView/> },
      { path: '/clinic/appointments', exact: true, element: <Appointments/> },
      { path: '/clinic/appointments/new', exact: true, element: <Appointments/> },
      { path: '/clinic/patients', exact: true, element: <Patients/> },
      { path: '/clinic/patients/new', exact: true, element: <NewPatient/> },
      { path: '/clinic/patients/search', exact: true, element: <Patients/> },
      { path: '/clinic/patients/view/:id', exact: true, element: <ViewPatient/> },
      { path: '/clinic/patients/edit/:id', exact: true, element: <EditPatient/> },
      { path: '/clinic/doctors', exact: true, element: <Doctors /> },
      { path: '/clinic/doctors/new', exact: true, element: <NewDoctor /> },
      { path: '/clinic/doctors/search', exact: true, element: <Doctors /> },
      { path: '/clinic/doctors/view/:id', exact: true, element: <ViewDoctor /> },
      { path: '/clinic/doctors/edit/:id', exact: true, element: <EditDoctor /> },
      { path: '/clinic/staff', exact: true, element: <Staff /> },
      { path: '/clinic/staff/new', exact: true, element: <NewStaff /> },
      { path: '/clinic/staff/search', exact: true, element: <Staff /> },
      { path: '/clinic/staff/view/:id', exact: true, element: <ViewStaff /> },
      { path: '/clinic/staff/edit/:id', exact: true, element: <EditStaff /> },      { path: '/clinic/staff/attendance', exact: true, element: <Attendance /> },
      { path: '/clinic/departments', exact: true, element: <Departments /> },
      { path: '/clinic/departments/new', exact: true, element: <NewDepartment /> },
      { path: '/clinic/rooms', exact: true, element: <Rooms /> },
      { path: '/clinic/rooms/new', exact: true, element: <NewRoom /> },
      { path: '/clinic/treatments', exact: true, element: <ClinicTreatments /> },
      { path: '/clinic/inventory', exact: true, element: <Inventory /> },
      { path: '/clinic/inventory/add', exact: true, element: <AddProduct /> },
      { path: '/clinic/inventory/edit/:id', exact: true, element: <EditProduct /> },
      { path: '/clinic/billing/invoices', exact: true, element: <Billing /> },
      { path: '/clinic/billing/new', exact: true, element: <NewInvoice /> },
      { path: '/clinic/billing/search', exact: true, element: <Billing /> },
      { path: '/clinic/billing/invoices/:id', exact: true, element: <ViewInvoice /> },
      { path: '/clinic/accounting/reports', exact: true, element: <Reports /> },
      { path: '/clinic/events', exact: true, element: <SamplePage /> },
      { path: '/clinic/gallery', exact: true, element: <SamplePage /> },

      { path: '/clinic/profile', exact: true, element: <Profile /> },
      { path: '/clinic/settings', exact: true, element: <Settings /> },

      // UI components (for development)
      { path: '/ui/typography', exact: true, element: <Typography/> },
      { path: '/ui/table', exact: true, element: <Table/> },
      { path: '/ui/form', exact: true, element: <Form/> },
      { path: '/ui/alert', exact: true, element: <Alert/> },
      { path: '/ui/shadow', exact: true, element: <Shadow/> },
      { path: '/icons/solar', exact: true, element: <Solar /> },
      { path: '/sample-page', exact: true, element: <SamplePage /> },
      // Catch-all per route non trovate
      { path: '*', element: <Navigate to="/auth/404" replace /> },
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
      // Catch-all anche per layout blank
      { path: '*', element: <Navigate to="/auth/404" replace /> },
    ],
  }
  ,
];

const router = createBrowserRouter(Router)

export default router;
