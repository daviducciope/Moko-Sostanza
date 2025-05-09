import { useState, useEffect } from "react";
import { Navbar, Button } from "flowbite-react";
import { Icon } from "@iconify/react";
import MobileSidebar from "../sidebar/MobileSidebar";
import MobileRightSidebar from "../sidebar/MobileRightSidebar";

const Header = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Chiudi i drawer quando la finestra viene ridimensionata a desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) { // lg breakpoint
        setIsSidebarOpen(false);
        setIsRightSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Gestione della chiusura del menu di sinistra
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  // Gestione della chiusura del menu di destra
  const closeRightSidebar = () => {
    setIsRightSidebarOpen(false);
  };

  // Previene la propagazione del click all'interno del menu
  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <>
      <header
        className={`sticky top-0 z-[5] ${
          isSticky ? "bg-white dark:bg-dark shadow-md" : "bg-white dark:bg-darkgray"
        }`}
      >
        <Navbar
          fluid
          className="bg-transparent dark:bg-transparent py-2 px-4 md:px-6"
        >
          <div className="flex items-center justify-between w-full">
            {/* Left side */}
            <div className="flex items-center">
              <Button
                color="light"
                size="sm"
                className="lg:hidden mr-2 p-2"
                onClick={() => setIsSidebarOpen(true)}
              >
                <Icon
                  icon="solar:hamburger-menu-line-duotone"
                  className="h-5 w-5"
                />
              </Button>
              <span className="text-sm font-medium lg:hidden">MOKO SOSTANZA Dental CRM</span>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-2">
              <Button
                color="light"
                size="sm"
                className="lg:hidden p-2"
                onClick={() => setIsRightSidebarOpen(true)}
              >
                <Icon
                  icon="solar:widget-add-line-duotone"
                  className="h-5 w-5"
                />
              </Button>
            </div>
          </div>
        </Navbar>
      </header>

      {/* Mobile Left Sidebar - Implementazione manuale del drawer */}
      {isSidebarOpen && (
        <div className="lg:hidden">
          {/* Overlay per chiudere il drawer quando si clicca fuori */}
          <div
            className="fixed inset-0 bg-gray-900/50 dark:bg-gray-900/80 z-40 drawer-overlay-enter"
            onClick={closeSidebar}
            aria-hidden="true"
          ></div>

          {/* Drawer content */}
          <div
            className="fixed top-0 left-0 z-50 h-screen w-[280px] max-w-[85%] bg-white dark:bg-gray-800 overflow-y-auto drawer-left-enter shadow-xl"
            onClick={handleMenuClick}
          >
            <MobileSidebar onClose={closeSidebar} />
          </div>
        </div>
      )}

      {/* Mobile Right Sidebar - Implementazione manuale del drawer */}
      {isRightSidebarOpen && (
        <div className="lg:hidden">
          {/* Overlay per chiudere il drawer quando si clicca fuori */}
          <div
            className="fixed inset-0 bg-gray-900/50 dark:bg-gray-900/80 z-40 drawer-overlay-enter"
            onClick={closeRightSidebar}
            aria-hidden="true"
          ></div>

          {/* Drawer content */}
          <div
            className="fixed top-0 right-0 z-50 h-screen w-[280px] max-w-[85%] bg-white dark:bg-gray-800 overflow-y-auto drawer-right-enter shadow-xl"
            onClick={handleMenuClick}
          >
            <MobileRightSidebar onClose={closeRightSidebar} />
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
