"use client";

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { Sidebar as FlowbiteSidebar } from 'flowbite-react';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import useSidebarMenu from '../hooks/useSidebarMenu';
import { MenuItem } from '../constants/menus';
import FullLogo from '../layouts/full/shared/logo/FullLogo';
import Banner from '../layouts/full/sidebar/Banner';

/**
 * Componente per renderizzare un elemento del menu con sottomenu
 */
const NavCollapse = ({ item }: { item: MenuItem }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="mb-2">
      <div
        onClick={toggleCollapse}
        className="flex items-center justify-between p-3 text-gray-600 hover:text-primary hover:bg-gray-50 rounded-lg cursor-pointer transition-all duration-200"
      >
        <div className="flex items-center gap-3">
          {item.icon && <Icon icon={item.icon} className="h-5 w-5" />}
          <span className="font-medium">{item.label}</span>
        </div>
        <Icon
          icon={isOpen ? "solar:alt-arrow-up-line-duotone" : "solar:alt-arrow-down-line-duotone"}
          className="h-4 w-4 transition-transform duration-200"
        />
      </div>

      {isOpen && item.children && (
        <div className="pl-4 mt-1 space-y-1">
          {item.children.map((child, index) => (
            child.children ?
              <NavCollapse key={index} item={child} /> :
              <FlowbiteSidebar.Item
                key={index}
                as={Link}
                to={child.href || '#'}
                className="text-gray-600 hover:text-primary hover:bg-gray-50 rounded-lg transition-all duration-200"
              >
                <div className="flex items-center gap-3">
                  {child.icon && <Icon icon={child.icon} className="h-5 w-5" />}
                  <span className="font-medium">{child.label}</span>
                </div>
              </FlowbiteSidebar.Item>
          ))}
        </div>
      )}
    </div>
  );
};

/**
 * Componente principale della sidebar
 */
const Sidebar = () => {
  const menuItems = useSidebarMenu();

  return (
    <aside className="w-64 h-full">
      <FlowbiteSidebar
        className="fixed menu-sidebar"
        aria-label="Sidebar menu"
      >
        <div className="sidebarlogo border-b border-gray-200">
          <FullLogo />
        </div>

        <SimpleBar className="h-[calc(100vh-210px)]"> {/* Altezza aggiustata per il banner fisso */}
          <FlowbiteSidebar.Items className="p-4 pb-24"> {/* Aggiunto padding bottom per evitare che il contenuto finisca sotto il banner */}
            <FlowbiteSidebar.ItemGroup className="sidebar-nav">
              {menuItems.map((section, index) => (
                <div key={index} className="caption">
                  <h5 className="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                    {section.label}
                  </h5>
                  <div className="space-y-1">
                    {section.children?.map((item, idx) => (
                      item.children ?
                        <NavCollapse key={idx} item={item} /> :
                        <FlowbiteSidebar.Item
                          key={idx}
                          as={Link}
                          to={item.href || '#'}
                          className="text-gray-600 hover:text-primary hover:bg-gray-50 rounded-lg transition-all duration-200"
                        >
                          <div className="flex items-center gap-3">
                            {item.icon && <Icon icon={item.icon} className="h-5 w-5" />}
                            <span className="font-medium">{item.label}</span>
                          </div>
                        </FlowbiteSidebar.Item>
                    ))}
                  </div>
                </div>
              ))}
            </FlowbiteSidebar.ItemGroup>
          </FlowbiteSidebar.Items>
        </SimpleBar>
        <Banner />
      </FlowbiteSidebar>
    </aside>
  );
};

export default Sidebar;
