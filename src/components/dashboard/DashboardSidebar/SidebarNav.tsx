import { NavLink } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa6";
import { ReactNode } from "react";

interface Page {
  name: string;
  path: string;
  icon: ReactNode;
  shortcutKey: string[];
}

interface SidebarNavProps {
  isNavOpen: boolean;
  setIsNavOpen: (val: boolean) => void;
  activePage: Page;
  pages: Page[];
}

export const SidebarNav = ({
  isNavOpen,
  setIsNavOpen,
  activePage,
  pages,
}: SidebarNavProps) => {
  return (
    <div className="flex flex-col gap-2 p-4">
      <label className="text-[16px] font-mono text-gray-500 uppercase tracking-widest pl-1">
        Navigation
      </label>
      <button
        onClick={() => setIsNavOpen(!isNavOpen)}
        className="w-full flex items-center justify-between px-4 py-2.5 bg-brown-80 dark:bg-dark-15 border border-dashed border-dark-15 rounded-md text-dark-10 dark:text-white font-mono transition-all hover:bg-gray-100 dark:hover:bg-dark-20 active:scale-[0.98]"
      >
        <div className="flex items-center gap-3">
          <span className="text-lg text-brown-60 dark:text-gray-400">
            {activePage.icon}
          </span>
          <span>{activePage.name}</span>
        </div>
        <FaChevronDown
          className={`transition-transform duration-300 ${isNavOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isNavOpen && (
        <div
          className="mt-2 flex flex-col gap-1.5 p-1
        bg-white dark:bg-dark-15 border border-dashed border-dark-15
        rounded-md animate-in fade-in slide-in-from-top-2 duration-200"
        >
          {pages.map((page) => (
            <NavLink
              key={page.name}
              to={page.path}
              onClick={() => setIsNavOpen(false)}
              className={({ isActive }) =>
                `px-4 py-2 rounded-sm font-mono transition-colors flex items-center gap-3 ${
                  isActive
                    ? "bg-brown-80 dark:bg-dark-primary-bg text-dark-10 dark:text-white font-bold"
                    : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-dark-20 hover:text-dark-10 dark:hover:text-white"
                }`
              }
            >
              <span className="text-xl">{page.icon}</span>
              <span className="flex flex-row w-full items-center justify-between">
                <span>{page.name}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {/* 0 IS FOR LOWERCASE SHORTCUT KEY */}
                  {page.shortcutKey[0]}
                </span>
              </span>
            </NavLink>
          ))}
        </div>
      )}
      <p className="text-[12px] text-gray-500 dark:text-gray-400/40 pl-2">
        use o, p, h, c, t for quick navigation
      </p>
    </div>
  );
};
