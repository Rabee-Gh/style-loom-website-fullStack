import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { clearSelection, setViewMode } from "@/redux/slices/productSlice";
import { ICONS, UIcon } from "@/constants/icons";
import ViewListGridToggleButton from "../common/ViewListGridToggleButton/ViewListGridToggleButton";
import AddProductForm from "./AddProductForm";
import { Product } from "@/type";
import { useDeleteHover } from "./FloatingUtilityBar";
import {
  addProductAsync,
  deleteMultipleProductsAsync,
  syncWithFirebase,
} from "@/thunks/productThunks";

interface CRUDBarProps {
  onMobileMenuToggle?: () => void;
}

export default function CRUDBar({ onMobileMenuToggle }: CRUDBarProps) {
  const dispatch = useDispatch<AppDispatch>();
  const selectedProductIds = useSelector(
    (state: RootState) => state.product.selectedProductIds,
  );
  const lastSync = useSelector((state: RootState) => state.product.lastSync);
  const { onDeleteEnter, onDeleteLeave } = useDeleteHover();
  const viewMode = useSelector((state: RootState) => state.product.viewMode);
  const loading = useSelector((state: RootState) => state.product.loading);

  const [showAddForm, setShowAddForm] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const selectedCount = selectedProductIds.length;

  const handleDelete = async () => {
    if (selectedCount > 0) {
      if (
        window.confirm(
          `Are you sure you want to delete ${selectedCount} product(s)?`,
        )
      ) {
        try {
          await dispatch(
            deleteMultipleProductsAsync(selectedProductIds),
          ).unwrap();
          dispatch(clearSelection());
          alert(
            `✅ ${selectedCount} product(s) deleted successfully from Firebase!`,
          );
        } catch (error) {
          console.error("Error deleting products:", error);
          alert(
            "❌ Failed to delete products from Firebase. Please try again.",
          );
        }
      }
    } else {
      alert("Please select a product to delete.");
    }
  };

  const handleSaveNewProduct = async (newProduct: Product) => {
    if (isAdding) return;

    try {
      setIsAdding(true);

      const { id, ...productWithoutId } = newProduct;

      const result = await dispatch(addProductAsync(productWithoutId)).unwrap();

      setShowAddForm(false);
      alert(
        `✅ Product "${result.ProductName}" added successfully to Firebase!`,
      );
    } catch (error) {
      console.error("Error adding product:", error);
      alert("❌ Failed to add product to Firebase. Please try again.");
    } finally {
      setIsAdding(false);
    }
  };

  const handleSyncWithFirebase = async () => {
    try {
      setIsSyncing(true);
      await dispatch(syncWithFirebase()).unwrap();
      alert("✅ Successfully synced with Firebase!");
    } catch (error) {
      console.error("Error syncing with Firebase:", error);
      alert("❌ Failed to sync with Firebase. Please check your connection.");
    } finally {
      setIsSyncing(false);
    }
  };

  const crudButtonClass =
    "flex items-center gap-2 px-3 py-2 lg:px-4 lg:py-2 text-white rounded font-mono text-xs lg:text-sm transition-all dark:bg-dark-15 dark:hover:bg-white/40 dark:active:bg-white/20";

  const handleCreate = () => {
    if (isAdding) return;
    dispatch(clearSelection());
    setShowAddForm(!showAddForm);
  };

  const location = useLocation();
  const isProductsPage = location.pathname.includes("products");

  return (
    <>
      <div className="fixed top-0 left-0 lg:left-64 right-0 h-16 bg-primary-bg/80 dark:bg-dark-primary-bg/80 backdrop-blur-md dark:text-white z-9999 border-b-2 border-dark-15 border-dashed lg:border-solid flex items-center justify-between px-4 lg:px-8 shadow-sm transition-all">
        <div className="flex items-center gap-4">
          <button
            onClick={onMobileMenuToggle}
            className="lg:hidden p-2 text-dark-10 dark:text-gray-400 hover:bg-dark-15/10 dark:hover:bg-white/5 rounded-lg active:scale-95"
            title="Open Menu"
          >
            <UIcon icon={ICONS.ACTIONS.TOGGLE_LIST} className="w-6 h-6" />
          </button>
          <div className="font-mono text-sm sm:text-base lg:text-xl font-bold truncate text-dark-10 dark:text-white max-w-[100px] sm:max-w-none">
            Dashboard
          </div>
          {lastSync && (
            <div className="hidden md:flex items-center gap-1">
              <span className="text-xs text-gray-500">Last sync:</span>
              <span className="text-xs text-green-500">
                {new Date(lastSync).toLocaleTimeString()}
              </span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 lg:gap-6">
          <div
            className={`flex items-center bg-dark-15 text-white dark:bg-dark-15 rounded gap-1 border border-dark-15/40 border-dashed transition-opacity duration-300 ${!isProductsPage ? "opacity-30 pointer-events-none grayscale" : "opacity-100"}`}
          >
            <ViewListGridToggleButton
              viewMode={viewMode}
              onToggle={() =>
                dispatch(setViewMode(viewMode === "grid" ? "list" : "grid"))
              }
              className="w-6 h-6 lg:w-8 lg:h-8"
            />
          </div>

          <div className="h-8 w-px bg-dark-15 border-l border-dashed mx-1 hidden sm:block"></div>

          <div className="flex gap-2 lg:gap-4">
            {/* Sync Button */}
            <button
              onClick={handleSyncWithFirebase}
              disabled={isSyncing || loading}
              className={`${crudButtonClass} bg-green-600/80 hover:bg-green-700 dark:bg-green-800 ${isSyncing || loading ? "opacity-70 cursor-not-allowed" : ""}`}
              title="Sync with Firebase"
            >
              {isSyncing || loading ? (
                <>{isSyncing ? "Syncing..." : "Loading..."}</>
              ) : (
                <>
                  <svg
                    className="w-4 h-4 lg:w-5 lg:h-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" />
                  </svg>
                  <span className="hidden sm:inline">Sync</span>
                </>
              )}
            </button>

            <button
              onClick={handleCreate}
              disabled={!isProductsPage || isAdding || loading}
              className={`${crudButtonClass} bg-dark-15/80 hover:bg-dark-15 dark:bg-dark-15 ${showAddForm ? "ring-2 ring-white/50" : ""} ${!isProductsPage ? "opacity-30 cursor-not-allowed grayscale" : ""}`}
              title={
                isProductsPage
                  ? isAdding
                    ? "Adding product..."
                    : "Create New Product"
                  : "Available on Products page"
              }
            >
              {isAdding ? (
                <>Adding...</>
              ) : (
                <>
                  <UIcon
                    icon={ICONS.ACTIONS.ADD}
                    className="w-4 h-4 lg:w-5 lg:h-5 grayscale contrast-200 brightness-200"
                  />
                </>
              )}
            </button>

            <button
              onClick={handleDelete}
              disabled={!isProductsPage || selectedCount === 0 || loading}
              onMouseEnter={onDeleteEnter}
              onMouseLeave={onDeleteLeave}
              className={`${crudButtonClass} ${!isProductsPage || selectedCount === 0 ? "bg-red-500/30 opacity-30 cursor-not-allowed grayscale" : "bg-dark-15/80 hover:bg-dark-15"}`}
              title={
                !isProductsPage
                  ? "Available on Products page"
                  : selectedCount > 0
                    ? `Delete ${selectedCount} Product(s) from Firebase`
                    : "Delete Selection"
              }
            >
              <UIcon
                icon={ICONS.ACTIONS.DELETE}
                className="w-4 h-4 lg:w-5 lg:h-5 grayscale contrast-200 brightness-200"
              />
            </button>
          </div>
        </div>
      </div>

      {showAddForm && (
        <div className="fixed top-16 left-0 lg:left-64 right-0 z-10003 animate-in slide-in-from-top duration-300">
          <AddProductForm
            onClose={() => setShowAddForm(false)}
            onSave={handleSaveNewProduct}
          />
        </div>
      )}
    </>
  );
}
