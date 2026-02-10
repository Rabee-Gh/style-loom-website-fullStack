import { useEffect } from "react";
import { useSidebarLogic } from "@/hooks/useSidebarData.tsx";
import { SidebarNav } from "./SidebarNav";
import { SidebarEditForm } from "./SidebarEditForm";
import { AdminProfileCard } from "./AdminProfileCard";
import { useAuth } from "@/context/AuthContext";
import ThemeToggleButton from "../../common/ThemeToggleButton/ThemeToggleButton";
import { ICONS, UIcon } from "@/constants/icons";
import Logo from "@/components/common/Logo/Logo";

// UPDATED: 2026-02-05 13:28

interface DashboardSidebarProps {
  isMobileOpen?: boolean;
  onClose?: () => void;
}

export default function DashboardSidebar({
  isMobileOpen = false,
  onClose,
}: DashboardSidebarProps) {
  const { isAdmin } = useAuth();

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  const {
    formData,
    isNavOpen,
    setIsNavOpen,
    selectedCount,
    isMuted,
    activePage,
    isProductsPage,
    handleChange,
    handleImageChange,
    handleSave,
    handleLogout,
    pages,
  } = useSidebarLogic();

  return (
    <>
      {/* MOBILE OVERLAY */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-10001 lg:hidden animate-in fade-in duration-300"
          onClick={onClose}
        />
      )}

      <div
        className={`fixed inset-y-0 left-0 w-64 bg-brown-100/80 dark:bg-dark-10
          border-r-2 border-dark-15 border-dashed lg:border-solid
          flex flex-col z-10002 overflow-y-auto overflow-x-hidden scroll-area shadow-2xl transition-all duration-300 overscroll-contain ${
            isMobileOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }`}
      >
        <div className="flex flex-col flex-1">
          <div className="p-5 bg-brown-80 dark:bg-dark-15 border-b-2 border-dark-15 border-dashed flex items-center justify-between">
            <Logo dimensions="w-[120px]" />
            <div className="flex gap-3 items-center">
              <button
                title="Notifications"
                className="text-gray-400 hover:text-dark-12 dark:hover:text-white transition-colors relative"
              >
                <UIcon icon={ICONS.UI.BELL} className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <ThemeToggleButton isCircleWrapped={false} />
            </div>
          </div>

          {/* PROFILE SECTION */}
          <div className="py-6 border-b border-brown-70 border-dashed">
            <AdminProfileCard />
          </div>

          {/* NAVIGATION SECTION */}
          <div className="border-b border-dark-15 border-dashed">
            <SidebarNav
              isNavOpen={isNavOpen}
              setIsNavOpen={setIsNavOpen}
              activePage={activePage}
              pages={pages}
            />
          </div>

          {/* EDIT FORM SECTION */}
          {isProductsPage && (
            <div className="border-b border-dark-15 border-dashed pb-10">
              <SidebarEditForm
                isMuted={isMuted}
                selectedCount={selectedCount}
                formData={formData}
                handleChange={handleChange}
                handleSave={handleSave}
                handleImageChange={handleImageChange}
              />
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2 items-start justify-end px-4 py-6">
          <p className="text-[14px] text-dark-12/60 dark:text-white/20">
            Admin status: {isAdmin ? "ON" : "OFF"}
          </p>
          <button
            onClick={handleLogout}
            className="px-4 py-2.5 rounded-md font-mono text-left
            transition-all
            flex items-center justify-center gap-2 group border-2 border-dashed border-brown-70/40 dark:border-white/10"
          >
            <UIcon
              icon={ICONS.NAV.LOGOUT}
              className="w-4 h-4 text-dark-12 dark:text-white transition-transform group-hover:-translate-x-1"
            />
            <span className="text-dark-12 dark:text-white/80 transition-transform">
              Logout
            </span>
          </button>
        </div>
      </div>
    </>
  );
}
