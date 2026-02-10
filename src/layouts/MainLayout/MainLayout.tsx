import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { ICONS, UIcon } from "@/constants/icons";
import {
  clearSelection,
  selectAll,
  setViewMode,
} from "@/redux/slices/productSlice";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import BackToTop from "@/components/non-common/BackToTop/BackToTop";
import { useAuth } from "@/context/AuthContext";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar/DashboardSidebar";
import CRUDBar from "@/components/dashboard/CRUDBar";
import { FaXmark } from "react-icons/fa6";
import { ITEMS_PER_PAGE } from "@/components/common/products/ProductsSection/ProductsSection";
import { Product } from "@/type";
import { deleteMultipleProductsAsync } from "@/thunks/productThunks";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import { listenToProducts } from "@/redux/slices/productSlice";
export default function MainLayout() {
  useKeyboardShortcuts();
  const { isAdmin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (isAdmin) {
      // Start listening to real-time updates
      const unsubscribe = dispatch(listenToProducts());

      return () => {
        if (unsubscribe) unsubscribe();
      };
    }
  }, [isAdmin, dispatch]);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const {
    selectedProductIds,
    filteredProducts,
    currentPage,
    viewMode,
    listVisibleCount,
  } = useSelector((state: RootState) => state.product);
  const selectedCount = selectedProductIds.length;

  const handleSelectAll = () => {
    if (viewMode === "list") {
      const visibleItems = filteredProducts.slice(0, listVisibleCount);
      const ids = visibleItems.map((p: Product) => p.id);
      dispatch(selectAll(ids));
    } else {
      const startIndex = currentPage * ITEMS_PER_PAGE;
      const itemsOnPage = filteredProducts.slice(
        startIndex,
        startIndex + ITEMS_PER_PAGE,
      );
      const ids = itemsOnPage.map((p: Product) => p.id);
      dispatch(selectAll(ids));
    }
  };

  const handleQuickDelete = async () => {
    if (selectedCount === 0) {
      alert("Please select products to delete.");
      return;
    }

    if (
      window.confirm(
        `ARE YOU SURE? THIS IS PERMANENT! ${selectedCount} item${selectedCount !== 1 ? "s" : ""} will be deleted.`,
      )
    ) {
      if (
        window.confirm(
          "FINAL WARNING: This action CANNOT be undone. Proceed with deleting all selected products?",
        )
      ) {
        try {
          setIsDeleting(true);
          await dispatch(
            deleteMultipleProductsAsync(selectedProductIds),
          ).unwrap();
          alert(`✅ ${selectedCount} product(s) deleted successfully!`);
        } catch (error) {
          console.error("Error deleting products:", error);
          alert("Failed to delete products. Please try again.");
        } finally {
          setIsDeleting(false);
        }
      }
    }
  };

  const handleExportCSV = () => {
    const selectedData = filteredProducts.filter((p: Product) =>
      selectedProductIds.includes(p.id),
    );
    if (selectedData.length === 0) return;

    const headers = [
      "ID",
      "Name",
      "Category",
      "Price",
      "Type",
      "Fit",
      "Created At",
    ];
    const rows = selectedData.map((p: Product) => [
      p.id,
      `"${p.ProductName}"`,
      `"${p.category}"`,
      `"${p.Pricevalue}"`,
      `"${p.type}"`,
      `"${p.Fitvalue}"`,
      `"${p.createdAt}"`,
    ]);

    const csvContent = [headers, ...rows].map((e) => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `styleloom_export_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    const hasRedirected = sessionStorage.getItem("adminHasRedirected");
    if (isAdmin && location.pathname === "/" && !hasRedirected) {
      sessionStorage.setItem("adminHasRedirected", "true");
      navigate("/products", { replace: true });
    }
  }, [isAdmin, location.pathname, navigate]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsSidebarOpen(false);
  }, [location.pathname]);

  if (isAdmin) {
    return (
      <div className="flex bg-primary-bg dark:bg-dark-primary-bg dark:text-white min-h-screen transition-colors duration-300 relative">
        <DashboardSidebar
          isMobileOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        <div className="flex-1 flex flex-col lg:ml-64 relative min-w-0">
          <CRUDBar onMobileMenuToggle={() => setIsSidebarOpen(true)} />
          <div className="flex flex-col gap-10">
            <main className="w-full max-w-7xl mx-auto px-4 lg:px-8">
              <Outlet />
            </main>
            <BackToTop />
          </div>

          {/* Floating Utility Bar */}
          {location.pathname.startsWith("/products") && (
            <div className="fixed bottom-6 right-0 left-0 lg:left-64 z-[9998] pointer-events-none px-4">
              <div className="max-w-5xl mx-auto flex justify-center">
                <div className="bg-white/90 dark:bg-dark-12/90 backdrop-blur-md border border-dashed border-gray-200 dark:border-white/10 p-2.5 px-4 lg:p-3 lg:px-6 rounded-2xl shadow-2xl flex items-center gap-3 lg:gap-4 pointer-events-auto transform animate-in slide-in-from-bottom-8 duration-500 scale-95 sm:scale-100">
                  <div className="flex flex-col pr-2 border-r border-gray-200 dark:border-white/10">
                    <span className="text-[9px] lg:text-[10px] font-mono text-gray-500 uppercase tracking-widest leading-none">
                      Admin Tools
                    </span>
                    <span className="text-dark-12 dark:text-white text-[10px] lg:text-xs font-bold font-mono">
                      {selectedCount} item{selectedCount !== 1 ? "s" : ""}{" "}
                      selected
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 lg:gap-2">
                    {/* SELECT ALL */}
                    <button
                      onClick={handleSelectAll}
                      title="Select All on Current Batch"
                      className="w-9 h-9 lg:w-11 lg:h-11 flex items-center justify-center rounded-xl bg-brown-60 text-white hover:bg-brown-80 dark:bg-white/5 dark:text-gray-400 dark:hover:text-white dark:hover:bg-white/10 transition-all active:scale-90 cursor-pointer"
                    >
                      <UIcon
                        icon={ICONS.ACTIONS.SELECT_ALL}
                        className="w-4 h-4 lg:w-5 lg:h-5"
                      />
                    </button>

                    {/* UNSELECT ALL */}
                    <button
                      onClick={() => dispatch(clearSelection())}
                      disabled={selectedCount === 0}
                      title="Clear Selection"
                      className={`w-9 h-9 lg:w-11 lg:h-11 flex items-center justify-center rounded-xl transition-all active:scale-90 ${
                        selectedCount > 0
                          ? "bg-brown-60 text-white hover:bg-brown-80 dark:bg-white/5 dark:text-gray-400 dark:hover:text-white dark:hover:bg-white/10 cursor-pointer"
                          : "bg-brown-80/20 text-dark-12/30 dark:bg-white/5 dark:text-gray-700 cursor-not-allowed grayscale"
                      }`}
                    >
                      <FaXmark className="text-sm lg:text-lg" />
                    </button>

                    <div className="h-4 w-px bg-gray-200 dark:bg-white/10 mx-0.5 lg:mx-1"></div>

                    {/* EXPORT CSV */}
                    <button
                      onClick={handleExportCSV}
                      disabled={selectedCount === 0}
                      title="Export Selected to CSV"
                      className={`w-9 h-9 lg:w-11 lg:h-11 flex items-center justify-center rounded-xl transition-all active:scale-90 ${
                        selectedCount > 0
                          ? "bg-brown-60 text-white hover:bg-brown-80 dark:bg-white/5 dark:text-blue-400 dark:hover:text-blue-300 dark:hover:bg-blue-500/10 cursor-pointer"
                          : "bg-brown-80/20 text-dark-12/30 cursor-not-allowed grayscale"
                      }`}
                    >
                      <UIcon
                        icon={ICONS.ACTIONS.EXPORT}
                        className="w-4 h-4 lg:w-5 lg:h-5"
                      />
                    </button>

                    {/* QUICK DELETE */}
                    <button
                      onClick={handleQuickDelete}
                      disabled={selectedCount === 0 || isDeleting}
                      title="Quick Delete Selected"
                      className={`w-9 h-9 lg:w-11 lg:h-11 flex items-center justify-center rounded-xl transition-all active:scale-90 ${
                        selectedCount > 0 && !isDeleting
                          ? "bg-brown-60 text-white hover:bg-brown-80 dark:bg-white/5 dark:text-red-500 dark:hover:text-red-400 dark:hover:bg-red-500/10 cursor-pointer"
                          : "bg-brown-80/20 text-dark-12/30 cursor-not-allowed grayscale"
                      }`}
                    >
                      {isDeleting ? (
                        <span className="text-xs">Deleting...</span>
                      ) : (
                        <UIcon
                          icon={ICONS.ACTIONS.DELETE}
                          className="w-4 h-4 lg:w-5 lg:h-5"
                        />
                      )}
                    </button>

                    <div className="h-4 w-px bg-gray-200 dark:bg-white/10 mx-0.5 lg:mx-1"></div>

                    {/* TOGGLE VIEW MODE */}
                    <button
                      onClick={() =>
                        dispatch(
                          setViewMode(viewMode === "grid" ? "list" : "grid"),
                        )
                      }
                      title={`Switch to ${
                        viewMode === "grid" ? "List" : "Grid"
                      } View`}
                      className="w-9 h-9 lg:w-11 lg:h-11 rounded-xl bg-brown-60 dark:bg-brown-60 text-white dark:text-white hover:bg-brown-80 dark:hover:bg-brown-70 transition-all active:scale-90 shadow-lg shadow-brown-60/10 cursor-pointer flex items-center justify-center"
                    >
                      <UIcon
                        icon={
                          viewMode === "grid"
                            ? ICONS.ACTIONS.TOGGLE_LIST
                            : ICONS.ACTIONS.TOGGLE_GRID
                        }
                        className="w-4 h-4 lg:w-5 lg:h-5 grayscale contrast-200 brightness-150"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-[40px]">
      <Header />
      <main className="flex flex-col w-full justify-between px-4 sm:px-12 sm:pb-12 lg:px-[80px] 2xl:px-40.5">
        <Outlet />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
