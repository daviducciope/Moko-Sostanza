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
            label: "Nuova Fattura",
            icon: "solar:add-square-outline",
            href: "/billing/new"
          },
          {
            label: "Elenco Fatture",
            icon: "solar:file-text-outline",
            href: "/billing/invoices"
          },
          {
            label: "Ricerca Fattura",
            icon: "solar:eye-outline",
            href: "/billing/search"
          },
          {
            label: "Reportistica",
            icon: "solar:chart-line-duotone",
            href: "/accounting/reports"
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
        label: "Appuntamenti",
        icon: "solar:calendar-mark-line-duotone",
        children: [
          {
            label: "Tutti gli appuntamenti",
            icon: "solar:clock-circle-outline",
            href: "/clinic/appointments"
          },
          {
            label: "Nuovo appuntamento",
            icon: "solar:add-square-outline",
            href: "/clinic/appointments/new"
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
            href: "/clinic/patients"
          },
          {
            label: "Nuovo paziente",
            icon: "solar:add-circle-outline",
            href: "/clinic/patients/new"
          },
          {
            label: "Ricerca paziente",
            icon: "solar:eye-outline",
            href: "/clinic/patients/search"
          }
        ]
      },
      {
        label: "Dottori",
        icon: "solar:user-id-outline",
        children: [
          {
            label: "Elenco dottori",
            icon: "solar:user-id-bold-duotone",
            href: "/clinic/doctors"
          },
          {
            label: "Nuovo dottore",
            icon: "solar:add-circle-outline",
            href: "/clinic/doctors/new"
          },
          {
            label: "Ricerca dottore",
            icon: "solar:eye-outline",
            href: "/clinic/doctors/search"
          }
        ]
      },
      {
        label: "Personale",
        icon: "solar:users-group-rounded-line-duotone",
        children: [
          {
            label: "Elenco personale",
            icon: "solar:user-id-broken",
            href: "/clinic/staff"
          },
          {
            label: "Nuovo dipendente",
            icon: "solar:add-circle-outline",
            href: "/clinic/staff/new"
          },
          {
            label: "Ricerca dipendente",
            icon: "solar:eye-outline",
            href: "/clinic/staff/search"
          },
          {
            label: "Presenze",
            icon: "solar:checklist-minimalistic-outline",
            href: "/clinic/staff/attendance"
          }
        ]
      },      {
        label: "Reparti",
        icon: "solar:structure-broken", 
        children: [
          {
            label: "Lista Reparti",
            icon: "solar:list-linear",
            href: "/clinic/departments"
          },
          {
            label: "Nuovo Reparto",
            icon: "solar:add-circle-outline",
            href: "/clinic/departments/new"
          }
        ]
      },
      {
        label: "Stanze",
        icon: "solar:armchair-outline",
        children: [
          {
            label: "Lista Stanze",
            icon: "solar:list-linear",
            href: "/clinic/rooms"
          },
          {
            label: "Nuova Stanza",
            icon: "solar:add-circle-outline",
            href: "/clinic/rooms/new"
          }
        ]
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
            label: "Elenco Prodotti",
            icon: "solar:eye-outline",
            href: "/clinic/inventory"
          },
          {
            label: "Nuovo Prodotto",
            icon: "solar:add-circle-outline",
            href: "/clinic/inventory/add"
          }
        ]
      },
      {
        label: "Contabilità",
        icon: "solar:calculator-outline",
        children: [
          {
            label: "Nuova Fattura",
            icon: "solar:add-square-outline",
            href: "/clinic/billing/new"
          },
          {
            label: "Elenco Fatture",
            icon: "solar:file-text-outline",
            href: "/clinic/billing/invoices"
          },
          {
            label: "Ricerca Fattura",
            icon: "solar:eye-outline",
            href: "/clinic/billing/search"
          },
          {
            label: "Reportistica",
            icon: "solar:chart-line-duotone",
            href: "/clinic/accounting/reports"
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
