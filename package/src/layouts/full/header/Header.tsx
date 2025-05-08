import { useState, useEffect } from "react";
import { Navbar, Button } from "flowbite-react";
import { Icon } from "@iconify/react";
import { Drawer } from "flowbite-react";
import MobileSidebar from "../sidebar/MobileSidebar";

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

  return (
    <>
      <header
        className={`sticky top-0 z-[5] ${
          isSticky ? "bg-white dark:bg-dark shadow-md" : "bg-white"
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
                className="lg:hidden mr-2"
                onClick={() => setIsSidebarOpen(true)}
              >
                <Icon
                  icon="solar:hamburger-menu-line-duotone"
                  className="h-5 w-5"
                />
              </Button>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-2">
              <Button
                color="light"
                className="lg:hidden"
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

      {/* Mobile Left Sidebar */}
      <Drawer
        open={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        position="left"
        className="p-4"
      >
        <MobileSidebar />
      </Drawer>

      {/* Mobile Right Sidebar */}
      <Drawer
        open={isRightSidebarOpen}
        onClose={() => setIsRightSidebarOpen(false)}
        position="right"
        className="p-4"
      >
        {/* Inserisci qui il contenuto della sidebar destra mobile */}
      </Drawer>
    </>
  );
};

export default Header;
