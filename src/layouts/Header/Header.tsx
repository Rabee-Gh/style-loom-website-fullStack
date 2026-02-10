import { useState, useRef, useEffect, useCallback } from "react";
import NavbarLeft from "./Navbar/NavbarLeft";
import NavbarRight from "./Navbar/NavbarRight";
import NavbarMobile from "./Navbar/NavbarMobile";
import { useScrollHeader } from "@/hooks/useScrollHeader";
import { useClickOutside } from "@/hooks/useClickOutside";
import { NavLink } from "react-router-dom";
import ThemeToggleButton from "@/components/common/ThemeToggleButton/ThemeToggleButton";
import ArrowButton from "@/components/common/ArrowButton/ArrowButton";
import Logo from "@/components/common/Logo/Logo";

import AdminButton from "@/components/common/AdminButton/AdminButton";

interface HeaderProps {
  stickyOffset?: string;
}

export default function Header({ stickyOffset = "top-0" }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [expandedMode, setExpandedMode] = useState<boolean>(false);
  const { isVisible, setIsVisible, isScrolled } = useScrollHeader({
    isDisabled: expandedMode,
  });
  const headerRef = useRef<HTMLElement>(null);

  // CLOSE EXPANSION AND HIDE ON CLICK OUTSIDE
  const handleClose = useCallback(() => {
    setExpandedMode(false);
    if (isScrolled && !menuOpen) {
      setIsVisible(false);
    }
  }, [isScrolled, menuOpen, setIsVisible]);

  useClickOutside(headerRef, handleClose);

  // BODY SCROLL LOCK
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [menuOpen]);

  const expansionItems = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Login", path: "#", disabled: true },
    { name: "Sign Up", path: "#", disabled: true },
  ];

  return (
    <>
      <header
        ref={headerRef}
        className={`flex w-full items-stretch justify-between relative transition-all duration-300 ease-in-out
          px-[16px] sm:p-0
     ${isVisible ? "translate-y-0" : "-translate-y-full"}
     ${isScrolled ? `sticky ${stickyOffset} z-9998 backdrop-blur-md shadow-lg` : ""}`}
      >
        {/* LEFT DECORATIVE SQUARE */}
        <div className="hidden w-[80px] 2xl:w-[162px] relative sm:block">
          {/* VERTICAL LINE */}
          <div className="absolute right-0 bottom-[20px] h-[24px] w-px mr-[20px] border-r-2 border-dashed border-dark-20/40 dark:border-dark-20/80"></div>
          {/* HORIZONTAL LINE */}
          <div className="absolute bottom-0 right-[40px] w-[24px] h-px border-b-2 border-dashed border-dark-20/40 dark:border-dark-20/80"></div>
        </div>

        {/* MAIN HEADER CONTENT */}
        <div
          className="flex flex-col w-full h-auto min-h-full justify-center items-center flex-1
      border-b-2 border-dashed border-dark-20/40 dark:border-dark-20/80"
        >
          {/* TOP BAR */}
          <div className="flex flex-row w-full justify-between items-center py-6">
            <NavbarLeft
              onToggleExpansion={() => setExpandedMode(!expandedMode)}
              isExpanded={expandedMode}
            />

            {/* MORE BUTTON (MD ONLY) */}
            <ArrowButton
              onClick={() => setExpandedMode(!expandedMode)}
              isExpanded={expandedMode}
              label={
                expandedMode
                  ? "Collapse Header Details"
                  : "Expand Header Details"
              }
              className="hidden sm:flex lg:hidden"
            />

            <Logo dimensions="w-[150px] h-[28px]" />
            <NavbarRight setMenuOpen={setMenuOpen} />
          </div>

          {/* EXPANSION BAR */}
          <div
            className={`w-full overflow-hidden transition-all duration-300 ease-in-out flex flex-row items-center justify-center gap-6
              ${expandedMode ? "max-h-[80px] opacity-100 py-4 border-t-2 border-dashed border-dark-20/10 dark:border-dark-20/40" : "max-h-0 opacity-0"}
            `}
          >
            {/* NAVIGATION LINKS */}
            <AdminButton />
            {expansionItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={(e) => {
                  if (item.disabled) {
                    e.preventDefault();
                  } else {
                    setExpandedMode(false);
                  }
                }}
                className={({ isActive }) =>
                  `font-mono text-sm font-medium transition-colors ${
                    item.disabled
                      ? "text-neutral-300 dark:text-neutral-600 cursor-not-allowed opacity-50"
                      : isActive
                        ? "text-dark-15 dark:text-white font-bold"
                        : "text-neutral-500 hover:text-dark-15 dark:hover:text-white"
                  }
                  ${item.name === "Home" || item.name === "Products" ? "lg:hidden" : ""}
                  `
                }
              >
                {item.name}
              </NavLink>
            ))}

            {/* SEPARATOR */}
            <div className="h-4 w-px bg-dark-20/20 dark:bg-white/20 mx-2 md:hidden"></div>

            {/* ACTION BUTTONS */}
            <div className="flex items-center gap-4 md:hidden">
              <ThemeToggleButton isCircleWrapped={true} />

              <NavLink
                to="/cart"
                onClick={() => setExpandedMode(false)}
                className={({ isActive }) =>
                  `flex justify-center items-center w-8 h-8 rounded-full hover:bg-dark-15/10 dark:hover:bg-white/10 transition-all
                  ${isActive ? "text-dark-15 dark:text-white" : "text-neutral-500"}`
                }
              >
                {({ isActive }) => (
                  <div
                    className={`w-4 h-4 transition-all ${
                      isActive
                        ? "bg-dark-15 dark:bg-white"
                        : "bg-neutral-500 dark:bg-neutral-400"
                    }`}
                    style={{
                      maskImage: "url(/assets/icons/general/add-to-cart.svg)",
                      WebkitMaskImage:
                        "url(/assets/icons/general/add-to-cart.svg)",
                      maskSize: "contain",
                      WebkitMaskSize: "contain",
                      maskRepeat: "no-repeat",
                      WebkitMaskRepeat: "no-repeat",
                      maskPosition: "center",
                      WebkitMaskPosition: "center",
                    }}
                  />
                )}
              </NavLink>

              <NavLink
                to="/contact"
                onClick={() => setExpandedMode(false)}
                className={({ isActive }) =>
                  `px-4 py-1.5 rounded-[6px] text-xs font-mono font-medium border-2 transition-all
                  ${
                    isActive
                      ? "bg-dark-15 text-white border-dark-15"
                      : "border-dark-15/40 text-dark-15 dark:text-white dark:border-white/20 hover:bg-dark-15 hover:text-white hover:border-dark-15"
                  }`
                }
              >
                Contact
              </NavLink>
            </div>
          </div>
        </div>

        {/* RIGHT DECORATIVE SQUARE */}
        <div className="hidden w-[80px] 2xl:w-[162px] relative sm:block">
          {/* VERTICAL LINE */}
          <div className="absolute left-0 bottom-[20px] h-[24px] w-px ml-[20px] border-l-2 border-dashed border-dark-20/40 dark:border-dark-20/80"></div>
          {/* HORIZONTAL LINE */}
          <div className="absolute bottom-0 left-[40px] w-[24px] h-px border-b-2 border-dashed border-dark-20/40 dark:border-dark-20/80"></div>
        </div>
      </header>
      {menuOpen && <NavbarMobile setMenuOpen={setMenuOpen} />}
    </>
  );
}
