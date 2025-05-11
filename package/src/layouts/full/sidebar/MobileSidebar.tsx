
import { Sidebar } from "flowbite-react";
import SidebarContent from "./Sidebaritems";
import NavItems from "./NavItems";
import SimpleBar from "simplebar-react";
import React from "react";
import FullLogo from "../shared/logo/FullLogo";
import 'simplebar-react/dist/simplebar.min.css';
import Banner from "./Banner";
import { useLocation } from "react-router-dom";

const MobileSidebar = ({ onClose }: { onClose: () => void }) => {
  const location = useLocation();

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
                {SidebarContent &&
                  SidebarContent?.map((item, index) => (
                    <div className="caption mb-4" key={item.heading}>
                      <h5 className="text-gray-500 dark:text-white/70 font-semibold text-xs uppercase tracking-wider mb-3">
                        {item.heading}
                      </h5>
                      <div className="space-y-1">
                        {item.children?.map((child, idx) => (
                          <div key={`${child.id}-${idx}`} onClick={handleLinkClick}>
                            <NavItems
                              item={child}
                              isActive={location.pathname === child.url}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
              </Sidebar.ItemGroup>
            </Sidebar.Items>
          </Sidebar>

          <div className="mt-4">
            <Banner isFixed={false} />
          </div>
        </div>
      </SimpleBar>
    </div>
  );
};

export default MobileSidebar;
