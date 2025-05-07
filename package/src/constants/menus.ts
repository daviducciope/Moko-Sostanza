/**
 * Definizione delle interfacce e dei menu per la sidebar del gestionale dentistico
 */

export interface MenuItem {
  label: string;
  icon: string;
  href?: string;
  children?: MenuItem[];
}

/**
 * Menu per il dentista
 */
export const dentistMenu: MenuItem[] = [
  {
    label: "HOME",
    icon: "",
    children: [
      {
        label: "Dashboard",
        icon: "solar:widget-add-line-duotone",
        href: "/"
      },
      {
        label: "Calendario",
        icon: "solar:calendar-mark-line-duotone",
        href: "/calendar"
      }
    ]
  },
  {
    label: "GESTIONE",
    icon: "",
    children: [
      {
        label: "Appuntamenti",
        icon: "solar:calendar-mark-line-duotone",
        children: [
          {
            label: "I miei appuntamenti",
            icon: "solar:clock-circle-outline",
            href: "/appointments"
          },
          {
            label: "Nuovo appuntamento",
            icon: "solar:add-square-outline",
            href: "/appointments/new"
          }
        ]
      },
      {
        label: "Pazienti",
        icon: "solar:users-group-rounded-line-duotone",
        children: [
          {
            label: "Elenco pazienti",
            icon: "solar:users-group-rounded-bold",
            href: "/patients"
          },
          {
            label: "Nuovo paziente",
            icon: "solar:add-circle-outline",
            href: "/patients/new"
          },
          {
            label: "Ricerca paziente",
            icon: "solar:magnifer-line-duotone",
            href: "/patients/search"
          }
        ]
      },
      {
        label: "Trattamenti",
        icon: "solar:stethoscope-outline",
        href: "/treatments"
      },
      {
        label: "Contabilità",
        icon: "solar:calculator-outline",
        children: [
          {
            label: "Fatturazione",
            icon: "solar:bill-list-outline",
            href: "/billing"
          },
          {
            label: "Fatture",
            icon: "solar:file-text-outline",
            href: "/billing/invoices"
          },
          {
            label: "Entrate",
            icon: "solar:money-bag-outline",
            href: "/accounting/income"
          },
          {
            label: "Spese",
            icon: "solar:card-outline",
            href: "/accounting/expenses"
          }
        ]
      },
      {
        label: "Magazzino",
        icon: "solar:box-outline",
        children: [
          {
            label: "Visualizza",
            icon: "solar:eye-outline",
            href: "/inventory"
          },
          {
            label: "Aggiungi",
            icon: "solar:add-circle-outline",
            href: "/inventory/add"
          },
          {
            label: "Modifica",
            icon: "solar:pen-outline",
            href: "/inventory/edit"
          }
        ]
      }
    ]
  },
  {
    label: "ALTRE",
    icon: "",
    children: [
      {
        label: "News",
        icon: "solar:document-text-outline",
        href: "/news"
      },
      {
        label: "Profilo",
        icon: "solar:user-outline",
        href: "/profile"
      },
      {
        label: "Impostazioni",
        icon: "solar:settings-outline",
        href: "/settings"
      }
    ]
  }
];

/**
 * Menu per la clinica
 */
export const clinicMenu: MenuItem[] = [
  {
    label: "HOME",
    icon: "",
    children: [
      {
        label: "Dashboard Generale",
        icon: "solar:widget-add-line-duotone",
        href: "/clinic"
      },
      {
        label: "Calendario",
        icon: "solar:calendar-mark-line-duotone",
        href: "/clinic/calendar"
      }
    ]
  },
  {
    label: "GESTIONE",
    icon: "",
    children: [
      {
        label: "Dottori",
        icon: "solar:user-id-outline",
        children: [
          {
            label: "Elenco",
            icon: "solar:user-id-bold-duotone",
            href: "/clinic/doctors"
          },
          {
            label: "Aggiungi",
            icon: "solar:add-circle-outline",
            href: "/clinic/doctors/add"
          }
        ]
      },
      {
        label: "Personale",
        icon: "solar:users-group-rounded-line-duotone",
        children: [
          {
            label: "Elenco",
            icon: "solar:user-id-broken",
            href: "/clinic/staff"
          },
          {
            label: "Presenze",
            icon: "solar:checklist-minimalistic-outline",
            href: "/clinic/staff/attendance"
          },
          {
            label: "Festività",
            icon: "solar:calendar-date-outline",
            href: "/clinic/staff/holidays"
          }
        ]
      },
      {
        label: "Reparti",
        icon: "solar:structure-broken",
        href: "/clinic/departments"
      },
      {
        label: "Stanze",
        icon: "solar:armchair-outline",
        href: "/clinic/rooms"
      },
      {
        label: "Trattamenti",
        icon: "solar:stethoscope-outline",
        href: "/clinic/treatments"
      },
      {
        label: "Magazzino",
        icon: "solar:box-outline",
        children: [
          {
            label: "Visualizza",
            icon: "solar:eye-outline",
            href: "/clinic/inventory"
          },
          {
            label: "Aggiungi",
            icon: "solar:add-circle-outline",
            href: "/clinic/inventory/add"
          },
          {
            label: "Modifica",
            icon: "solar:pen-outline",
            href: "/clinic/inventory/edit"
          }
        ]
      },
      {
        label: "Contabilità",
        icon: "solar:calculator-outline",
        children: [
          {
            label: "Entrate",
            icon: "solar:money-bag-outline",
            href: "/clinic/accounting/income"
          },
          {
            label: "Fatture",
            icon: "solar:file-text-outline",
            href: "/clinic/accounting/invoices"
          },
          {
            label: "Spese",
            icon: "solar:card-outline",
            href: "/clinic/accounting/expenses"
          }
        ]
      },
      {
        label: "Eventi",
        icon: "solar:calendar-mark-line-duotone",
        href: "/clinic/events"
      },
      {
        label: "Galleria",
        icon: "solar:gallery-outline",
        href: "/clinic/gallery"
      }
    ]
  },
  {
    label: "ALTRE",
    icon: "",
    children: [
      {
        label: "News",
        icon: "solar:document-text-outline",
        href: "/clinic/news"
      },
      {
        label: "Profilo",
        icon: "solar:user-outline",
        href: "/clinic/profile"
      },
      {
        label: "Impostazioni",
        icon: "solar:settings-outline",
        href: "/clinic/settings"
      }
    ]
  }
];
