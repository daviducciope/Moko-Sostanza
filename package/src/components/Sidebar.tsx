"use client";

import { useState } from 'react';
import { Link } from 'react-router';
import { Icon } from '@iconify/react';
import { Sidebar as FlowbiteSidebar } from 'flowbite-react';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import useSidebarMenu from '../hooks/useSidebarMenu';
import { MenuItem } from '../constants/menus';
import FullLogo from '../layouts/full/shared/logo/FullLogo';

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
        className="flex items-center justify-between p-2 text-link hover:text-primary hover:bg-lightprimary rounded-xl cursor-pointer"
      >
        <div className="flex items-center gap-3">
          {item.icon && <Icon icon={item.icon} height={18} />}
          <span>{item.label}</span>
        </div>
        <Icon 
          icon={isOpen ? "solar:alt-arrow-up-line-duotone" : "solar:alt-arrow-down-line-duotone"} 
          height={18} 
        />
      </div>
      
      {isOpen && item.children && (
        <div className="pl-4 mt-1 sidebar-dropdown">
          {item.children.map((child, index) => (
            child.children ? 
              <NavCollapse key={index} item={child} /> :
              <FlowbiteSidebar.Item 
                key={index}
                as={Link}
                to={child.href || '#'}
                className="text-link hover:text-primary hover:bg-lightprimary rounded-xl"
              >
                <div className="flex items-center gap-3">
                  {child.icon && <Icon icon={child.icon} height={18} />}
                  <span>{child.label}</span>
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
    <aside className="w-64 h-full bg-white dark:bg-darkgray text-dark dark:text-white">
      <FlowbiteSidebar 
        className="fixed menu-sidebar bg-white dark:bg-darkgray top-[62px]"
        aria-label="Sidebar menu"
      >
        <div className="px-6 py-4 flex items-center sidebarlogo">
          <FullLogo />
        </div>
        
        <SimpleBar className="h-[calc(100vh_-_294px)]">
          <FlowbiteSidebar.Items className="px-5 mt-2">
            <FlowbiteSidebar.ItemGroup className="sidebar-nav hide-menu">
              {menuItems.map((section, index) => (
                <div className="caption" key={index}>
                  <h5 className="text-link dark:text-white/70 caption font-semibold leading-6 tracking-widest text-xs pb-2 uppercase">
                    {section.label}
                  </h5>
                  
                  {section.children?.map((item, idx) => (
                    item.children ? 
                      <NavCollapse key={idx} item={item} /> :
                      <FlowbiteSidebar.Item 
                        key={idx}
                        as={Link}
                        to={item.href || '#'}
                        className="text-link hover:text-primary hover:bg-lightprimary rounded-xl"
                      >
                        <div className="flex items-center gap-3">
                          {item.icon && <Icon icon={item.icon} height={18} />}
                          <span>{item.label}</span>
                        </div>
                      </FlowbiteSidebar.Item>
                  ))}
                </div>
              ))}
            </FlowbiteSidebar.ItemGroup>
          </FlowbiteSidebar.Items>
        </SimpleBar>
      </FlowbiteSidebar>
    </aside>
  );
};

export default Sidebar;
