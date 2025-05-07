export interface ChildItem {
  id?: number | string;
  name?: string;
  icon?: any;
  children?: ChildItem[];
  item?: any;
  url?: any;
  color?: string;
  isPro?:boolean
}

export interface MenuItem {
  heading?: string;
  name?: string;
  icon?: any;
  id?: number;
  to?: string;
  items?: MenuItem[];
  children?: ChildItem[];
  url?: any;
  isPro?:boolean
}

import { uniqueId } from "lodash";

const SidebarContent: MenuItem[] = [
  {
    heading: "HOME",
    children: [
      {
        name: "Dashboard",
        icon: "solar:widget-add-line-duotone",
        id: uniqueId(),
        url: "/",
        isPro: false,
      },
      {
        name: "Calendario",
        icon: "solar:calendar-mark-line-duotone",
        id: uniqueId(),
        url: "/calendar",
        isPro: false,
      },
    ],
  },
  {
    heading: "GESTIONE",
    children: [
      {
        name: "Pazienti",
        icon: "solar:users-group-rounded-line-duotone",
        id: uniqueId(),
        url: "/patients",
        isPro: false,
      },
      {
        name: "Appuntamenti",
        icon: "solar:calendar-mark-line-duotone",
        id: uniqueId(),
        url: "/appointments",
        isPro: false,
      },
      {
        name: "Trattamenti",
        icon: "solar:stethoscope-outline",
        id: uniqueId(),
        url: "/treatments",
        isPro: false,
      },
      {
        id: uniqueId(),
        name: "Fatturazione",
        icon: "solar:bill-list-outline",
        url: "/billing",
        isPro: false,
      },
      {
        id: uniqueId(),
        name: "Personale",
        icon: "solar:user-id-outline",
        url: "/staff",
        isPro: false,
      },
      {
        id: uniqueId(),
        name: "Reportistica",
        icon: "solar:chart-line-duotone",
        url: "/reports",
        isPro: false,
      },
    ],
  },
];

export default SidebarContent;
