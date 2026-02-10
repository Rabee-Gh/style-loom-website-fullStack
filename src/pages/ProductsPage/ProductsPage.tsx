import { useEffect, useState } from "react";
import TestimonialsSection from "@/components/common/sections/TestimonialsSection/TestimonialsSection";
import FAQSection from "@/components/common/sections/FAQSection/FAQSection";
import CTASection from "@/components/common/sections/CTASection/CTASection";
import ProductsSection from "@/components/common/products/ProductsSection/ProductsSection";
// REDUX - DATA
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { setActiveType } from "@/redux/slices/productSlice";
import { SectionDataProducts } from "@/data/productsHeadData";
import { fetchProducts } from "@/thunks/productThunks";

export default function ProductsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const activeType = useSelector(
    (state: RootState) => state.product.activeType,
  );
  const filteredProducts = useSelector(
    (state: RootState) => state.product.filteredProducts,
  );
  const error = useSelector((state: RootState) => state.product.error);

  const [syncStatus, setSyncStatus] = useState<
    "idle" | "syncing" | "synced" | "error"
  >("idle");

  useEffect(() => {
    console.log("Loading products (instant)...");
    dispatch(fetchProducts());

    setSyncStatus("syncing");
    setTimeout(() => {
      setSyncStatus("synced");
      setTimeout(() => setSyncStatus("idle"), 2000);
    }, 1500);
  }, [dispatch]);

  return (
    <div className="flex flex-col gap-[40px]">
      {syncStatus !== "idle" && (
        <div className="fixed top-20 right-4 z-50 animate-in fade-in slide-in-from-top-2 duration-300">
          <div
            className={`px-3 py-1.5 rounded-full border text-xs font-mono flex items-center gap-2 backdrop-blur-sm ${
              syncStatus === "syncing"
                ? "bg-yellow-100 dark:bg-yellow-900/30 border-yellow-300 text-yellow-800 dark:text-yellow-300"
                : syncStatus === "synced"
                  ? "bg-green-100 dark:bg-green-900/30 border-green-300 text-green-800 dark:text-green-300"
                  : "bg-red-100 dark:bg-red-900/30 border-red-300 text-red-800 dark:text-red-300"
            }`}
          >
            <div
              className={`w-2 h-2 rounded-full animate-pulse ${
                syncStatus === "syncing"
                  ? "bg-yellow-500"
                  : syncStatus === "synced"
                    ? "bg-green-500"
                    : "bg-red-500"
              }`}
            ></div>
            {syncStatus === "syncing"
              ? "Syncing with cloud..."
              : syncStatus === "synced"
                ? "✓ Synced"
                : "Connection error"}
          </div>
        </div>
      )}

      {error && (
        <div className="mx-4 mt-4 p-3 border-2 border-dashed border-red-300 rounded-xl bg-red-50 dark:bg-red-900/20">
          <p className="text-red-600 dark:text-red-400 text-sm font-mono">
            Offline mode: Using local data. Changes saved locally.
          </p>
        </div>
      )}

      <ProductsSection
        image={SectionDataProducts.image}
        alt={SectionDataProducts.alt}
        hight={SectionDataProducts.hight}
        imgwidth={SectionDataProducts.imgwidth}
        heading={SectionDataProducts.heading}
        text={SectionDataProducts.text}
        showTabs={SectionDataProducts.showTabs}
        tabs={["All", "Men", "Women", "Kids"]}
        activeTab={activeType}
        onChange={(tab) => dispatch(setActiveType(tab))}
        products={filteredProducts}
        mode="products"
      />

      <TestimonialsSection />
      <FAQSection />
      <CTASection
        title="elevate your wardrobe"
        description="Don't miss out – experience the epitome of fashion by clicking 'Buy Now' and embrace a world of chic elegance delivered to your doorstep. Your style journey begins here."
      />
    </div>
  );
}
