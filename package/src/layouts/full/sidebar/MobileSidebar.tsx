
import { Sidebar } from "flowbite-react";
import SimpleBar from "simplebar-react";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";
import FullLogo from "../shared/logo/FullLogo";
import 'simplebar-react/dist/simplebar.min.css';
import Banner from "./Banner";
import useSidebarMenu from "../../../hooks/useSidebarMenu";
import { MenuItem } from "../../../constants/menus";

/**
 * Componente per renderizzare un elemento del menu mobile con sottomenu espandibili
 * Ottimizzato per dispositivi touch con target più grandi e animazioni fluide
 */
const MobileNavCollapse = ({ item, onLinkClick }: { item: MenuItem; onLinkClick: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="mb-2">
      {/* Header del menu con icona di espansione */}
      <div
        onClick={toggleCollapse}
        className="flex items-center justify-between p-3 text-gray-600 hover:text-primary hover:bg-gray-50 rounded-lg cursor-pointer transition-all duration-200 min-h-[48px]"
      >
        <div className="flex items-center gap-3">
          {item.icon && <Icon icon={item.icon} className="h-5 w-5 flex-shrink-0" />}
          <span className="font-semibold text-sm">{item.label}</span>
        </div>
        <Icon
          icon={isOpen ? "solar:alt-arrow-up-line-duotone" : "solar:alt-arrow-down-line-duotone"}
          className="h-4 w-4 transition-transform duration-200 flex-shrink-0"
        />
      </div>

      {/* Sottomenu espandibile con animazione */}
      {isOpen && item.children && (
        <div className="pl-4 mt-1 space-y-1 animate-in slide-in-from-top-2 duration-200">
          {item.children.map((child, index) => (
            child.children ? (
              // Sottomenu ricorsivo per menu a più livelli
              <MobileNavCollapse key={index} item={child} onLinkClick={onLinkClick} />
            ) : (
              // Link diretto
              <Sidebar.Item
                key={index}
                as={Link}
                to={child.href || '#'}
                onClick={onLinkClick}
                className={`text-gray-600 hover:text-primary hover:bg-gray-50 rounded-lg transition-all duration-200 min-h-[44px] ${
                  location.pathname === child.href ? 'bg-primary text-white hover:bg-primary hover:text-white' : ''
                }`}
              >
                <div className="flex items-center gap-3 py-1">
                  {child.icon && <Icon icon={child.icon} className="h-4 w-4 flex-shrink-0" />}
                  <span className="font-normal text-sm">{child.label}</span>
                </div>
              </Sidebar.Item>
            )
          ))}
        </div>
      )}
    </div>
  );
};

const MobileSidebar = ({ onClose }: { onClose: () => void }) => {
  const location = useLocation();
  const menuItems = useSidebarMenu(); // Utilizziamo lo stesso hook del desktop

  // Chiudi il drawer quando si clicca su un link
  const handleLinkClick = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="w-full h-full">
      <div className="px-4 py-3 border-b flex items-center justify-between">
        <FullLogo />
        <button
          type="button"
          onClick={onClose}
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
          </svg>
          <span className="sr-only">Chiudi menu</span>
        </button>
      </div>

      <SimpleBar className="h-[calc(100vh-70px)]">
        <div className="p-4">
          <Sidebar className="w-full bg-white dark:bg-darkgray border-0 shadow-none" aria-label="Menu di navigazione mobile">
            <Sidebar.Items>
              <Sidebar.ItemGroup className="sidebar-nav">
                {/* Renderizza il menu dinamico basato sul ruolo utente */}
                {menuItems.map((section, index) => (
                  <div className="caption mb-6" key={`${section.label}-${index}`}>
                    {/* Intestazione della sezione */}
                    <h5 className="text-gray-500 dark:text-white/70 font-semibold text-xs uppercase tracking-wider mb-4">
                      {section.label}
                    </h5>

                    {/* Elementi del menu */}
                    <div className="space-y-2">
                      {section.children?.map((item, idx) => (
                        item.children ? (
                          // Menu con sottomenu - usa MobileNavCollapse
                          <MobileNavCollapse
                            key={`${item.label}-${idx}`}
                            item={item}
                            onLinkClick={handleLinkClick}
                          />
                        ) : (
                          // Link diretto - renderizza come Sidebar.Item
                          <Sidebar.Item
                            key={`${item.label}-${idx}`}
                            as={Link}
                            to={item.href || '#'}
                            onClick={handleLinkClick}
                            className={`text-gray-600 hover:text-primary hover:bg-gray-50 rounded-lg transition-all duration-200 min-h-[48px] ${
                              location.pathname === item.href ? 'bg-primary text-white hover:bg-primary hover:text-white' : ''
                            }`}
                          >
                            <div className="flex items-center gap-3 py-1">
                              {item.icon && <Icon icon={item.icon} className="h-5 w-5 flex-shrink-0" />}
                              <span className="font-semibold text-sm">{item.label}</span>
                            </div>
                          </Sidebar.Item>
                        )
                      ))}
                    </div>
                  </div>
                ))}
              </Sidebar.ItemGroup>
            </Sidebar.Items>
          </Sidebar>

          {/* Banner fisso in fondo */}
          <div className="mt-6">
            <Banner isFixed={false} />
          </div>
        </div>
      </SimpleBar>
    </div>
  );
};

export default MobileSidebar;
