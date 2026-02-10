import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import {
  clearSelection,
  selectAll,
  setViewMode,
} from "@/redux/slices/productSlice";
import { ITEMS_PER_PAGE } from "@/components/common/products/ProductsSection/ProductsSection";
import { Product } from "@/type";
import { deleteMultipleProductsAsync } from "@/thunks/productThunks";

export const useAdminActions = () => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    selectedProductIds,
    filteredProducts,
    currentPage,
    viewMode,
    listVisibleCount,
  } = useSelector((state: RootState) => state.product);

  const selectedCount = selectedProductIds.length;

  // --- ACTIONS LOGIC ---
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
        `ARE YOU SURE? THIS IS PERMANENT! ${selectedCount} item${selectedCount !== 1 ? "s" : ""} will be deleted.`
      )
    ) {
      if (
        window.confirm(
          "FINAL WARNING: This action CANNOT be undone. Proceed with deleting all selected products?"
        )
      ) {
        try {
          await dispatch(deleteMultipleProductsAsync(selectedProductIds)).unwrap();
          alert(`✅ ${selectedCount} product(s) deleted successfully!`);
        } catch (error) {
          console.error("Error deleting products:", error);
          alert(" Failed to delete products. Please try again.");
        }
      }
    }
  };

  const handleExportCSV = () => {
    const selectedData = filteredProducts.filter((p: Product) =>
      selectedProductIds.includes(p.id)
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

  const handleClearSelection = () => dispatch(clearSelection());

  const handleToggleViewMode = () =>
    dispatch(setViewMode(viewMode === "grid" ? "list" : "grid"));

  return {
    selectedCount,
    viewMode,
    handleSelectAll,
    handleQuickDelete,
    handleExportCSV,
    handleClearSelection,
    handleToggleViewMode,
  };
};