import { useState, useEffect, useMemo, useCallback } from "react";
import ReactPaginate from "react-paginate";
import type { Product, FilterType } from "@/type";
import FilterTabs from "../../FilterTabs/FilterTabs";
import ProductCard from "./ProductCard";
import CategoryContainer from "./CategoryContainer";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { useAuth } from "@/context/AuthContext";
import { Link } from "react-router-dom";
import {
  toggleProductSelection,
  setCurrentPage,
  loadMoreListItems,
} from "@/redux/slices/productSlice";
import { ProductMiniPreview } from "../../../dashboard/ProductMiniPreview/ProductMiniPreview";
import { ICONS, UIcon } from "@/constants/icons";
import { IMAGES } from "@/constants/images";
import { Reveal } from "../../Motion/Reveal";

interface ProductsSectionProps {
  image?: string;
  alt?: string;
  hight?: string;
  imgwidth?: string;
  heading: string;
  text: string;
  showTabs: boolean;
  tabs?: FilterType[];
  activeTab?: FilterType;
  onChange?: (tab: FilterType) => void;
  products: Product[];
  mode: "home" | "products";
}

// Constants
export const ITEMS_PER_PAGE = 6;
const CATEGORIES = [
  { key: "womenswear", title: "DRESS COLLECTION", dbCategory: "Womenswear" },
  { key: "accessories", title: "ACCESSORIES", dbCategory: "Accessories" },
  { key: "handbag", title: "BAGS AND HANDBAGS", dbCategory: "Hand Bag" },
  { key: "menswear", title: "MENSWEAR COLLECTION", dbCategory: "Menswear" },
  { key: "kidswear", title: "KIDS COLLECTION", dbCategory: "Kidswear" },
] as const;

export default function ProductsSection({
  image,
  alt,
  hight,
  imgwidth,
  heading,
  text,
  showTabs,
  tabs,
  activeTab,
  onChange,
  products,
  mode = "home",
}: ProductsSectionProps) {
  // State
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showAllGroups, setShowAllGroups] = useState<Record<string, boolean>>({
    womenswear: false,
    accessories: false,
    handbag: false,
    menswear: false,
    kidswear: false,
  });
  const currentPage = useSelector(
    (state: RootState) => state.product.currentPage,
  );
  const [showAllMobile, setShowAllMobile] = useState(false);
  const [hoveredProductId, setHoveredProductId] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    if (hoveredProductId !== null) {
      window.addEventListener("mousemove", handleGlobalMouseMove);
    }
    return () => window.removeEventListener("mousemove", handleGlobalMouseMove);
  }, [hoveredProductId]);

  // Redux & Auth
  const viewMode = useSelector((state: RootState) => state.product.viewMode);
  const selectedProductIds = useSelector(
    (state: RootState) => state.product.selectedProductIds,
  );
  const isDeleteHovered = useSelector(
    (state: RootState) => state.product.isDeleteHovered,
  );
  const listVisibleCount = useSelector(
    (state: RootState) => state.product.listVisibleCount,
  );
  const dispatch = useDispatch();
  const { isAdmin } = useAuth();
  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth;
      const wasSmall = windowWidth < 640;
      const isNowSmall = newWidth < 640;

      if (wasSmall !== isNowSmall) {
        setShowAllGroups((prev) => {
          const resetGroups = { ...prev };
          Object.keys(resetGroups).forEach((key) => {
            if (resetGroups[key]) resetGroups[key] = false;
          });
          return resetGroups;
        });

        if (!isNowSmall) {
          setShowAllMobile(false);
        }
      }

      setWindowWidth(newWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [windowWidth]);

  // Screen sizes
  const isMobile = windowWidth < 640;
  const isTablet = windowWidth >= 640 && windowWidth < 1024;

  // Filtered products
  const filteredProducts = useMemo(() => {
    if (!activeTab || activeTab === "All") return products;
    return products.filter(
      (product) =>
        product.type?.toLowerCase().trim() === activeTab.toLowerCase().trim(),
    );
  }, [products, activeTab]);

  const displayedHomeProducts = useMemo(() => {
    if (mode === "home" && isMobile && showAllMobile) {
      return filteredProducts;
    }

    return filteredProducts.slice(
      currentPage * ITEMS_PER_PAGE,
      (currentPage + 1) * ITEMS_PER_PAGE,
    );
  }, [filteredProducts, currentPage, isMobile, showAllMobile, mode]);

  // Get products by category - FIXED VERSION
  const getCategoryProducts = useCallback(
    (category: string) => {
      return filteredProducts.filter(
        (product) =>
          product.category?.toLowerCase().trim() ===
          category.toLowerCase().trim(),
      );
    },
    [filteredProducts],
  );

  // Pagination
  const pageCount = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  // Event handlers
  const handlePageClick = useCallback(
    (event: { selected: number }) => {
      dispatch(setCurrentPage(event.selected));
    },
    [dispatch],
  );

  const toggleShowAll = useCallback((categoryKey: string) => {
    setShowAllGroups((prev) => ({
      ...prev,
      [categoryKey]: !prev[categoryKey],
    }));
  }, []);

  const toggleShowAllMobile = useCallback(() => {
    setShowAllMobile((prev) => !prev);
  }, []);

  const handleTabChange = useCallback(
    (tab: FilterType) => {
      if (onChange) onChange(tab);
      dispatch(setCurrentPage(0));
      setShowAllMobile(false);
      setShowAllGroups({
        womenswear: false,
        accessories: false,
        handbag: false,
        menswear: false,
        kidswear: false,
      });
    },
    [onChange],
  );

  // Render category groups
  const renderCategoryGroups = useCallback(() => {
    if (activeTab === "All") {
      const categoriesToShow = CATEGORIES.filter(
        (cat) => getCategoryProducts(cat.dbCategory).length > 0,
      );

      return (
        <>
          {categoriesToShow.map((cat) => (
            <CategoryContainer
              key={cat.key}
              categoryKey={cat.key}
              title={cat.title}
              products={getCategoryProducts(cat.dbCategory)}
              showAll={showAllGroups[cat.key] || false}
              isMobile={isMobile}
              isTablet={isTablet}
              onToggleShowAll={toggleShowAll}
            />
          ))}
        </>
      );
    }

    const filteredCategories = CATEGORIES.filter(
      (cat) => getCategoryProducts(cat.dbCategory).length > 0,
    );

    if (filteredCategories.length === 0) {
      return (
        <div className="flex justify-center items-center py-20 border-dark-15 border-t-0">
          <p className="text-gray-40 text-lg font-roboto">
            No products found for this category.
          </p>
        </div>
      );
    }

    return (
      <>
        {filteredCategories.map((cat) => (
          <CategoryContainer
            key={cat.key}
            categoryKey={cat.key}
            title={cat.title}
            products={getCategoryProducts(cat.dbCategory)}
            showAll={showAllGroups[cat.key] || false}
            isMobile={isMobile}
            isTablet={isTablet}
            onToggleShowAll={toggleShowAll}
          />
        ))}
      </>
    );
  }, [
    activeTab,
    getCategoryProducts,
    showAllGroups,
    isMobile,
    isTablet,
    toggleShowAll,
  ]);

  // Header section
  const renderHeader = () => (
    <div
      className={`relative flex flex-col w-full gap-12 max-lg:overflow-x-auto 
      custom-dashed-b py-20 px-20 overflow-hidden
      max-2xl:gap-10 max-2xl:py-15 max-2xl:px-15
      max-lg:gap-8 max-lg:py-8 max-lg:px-5 ${hight || ""}`}
    >
      <div className="font-roboto flex flex-col gap-8 max-2xl:gap-6 max-lg:gap-5 z-12">
        <Reveal variant="blur" blurInitial={4} duration={2}>
          <h1 className="font-medium text-5xl leading-tight uppercase max-2xl:text-4xl max-lg:text-3xl text-dark-primary-bg dark:text-dark-primary-text">
            {heading}
          </h1>
        </Reveal>

        <p className="text-gray-40 font-normal text-lg leading-relaxed max-2xl:text-base max-lg:text-sm">
          {text}
        </p>
      </div>

      {image && (
        <Reveal
          className={`absolute -right-24 2xl:-right-46 top-1/2 -translate-y-1/2 w-[300px] h-[316px] 2xl:w-[425px] 2xl:h-[446px] -rotate-50 hidden sm:block lg:block z-10 ${imgwidth || ""}`}
          variant="fade-right"
          distance={120}
          rotateInitial={-180}
          duration={1.2}
          ease="backOut"
        >
          <img
            src={IMAGES.ABSTRACT_DESIGN.ABSTRACT_DESIGN_2}
            alt={alt || "Section decoration"}
            className="w-full h-auto"
          />
        </Reveal>
      )}

      {showTabs && tabs && activeTab && onChange && (
        <FilterTabs
          tabs={tabs}
          activeTab={activeTab}
          onChange={handleTabChange}
          type="Hero"
        />
      )}
    </div>
  );

  // Render LIST VIEW (Admin Only)
  const renderListView = (passedProducts?: Product[]) => {
    const productsToRender = passedProducts || displayedHomeProducts;

    return (
      <div className="w-full flex flex-col border-gray-100 dark:border-dark-15">
        <div className="flex flex-col w-full">
          {/* Table Header */}
          <div className="grid grid-cols-[30px_32px_1fr_70px] md:grid-cols-[40px_40px_2fr_1fr_0.8fr_0.8fr] items-center h-10 w-full bg-brown-80 dark:bg-dark-10 border-gray-200 dark:border-dark-15 pl-2 pr-4 font-mono text-[10px] md:text-xs font-bold text-dark-15/60 dark:text-gray-100 uppercase gap-2">
            <div className="text-center">#</div>
            <div>Img</div>
            <div>PRODUCT</div>
            <div className="hidden md:block">Category</div>
            <div className="hidden md:block">Fit</div>
            <div className="text-right">Price</div>
          </div>

          {productsToRender.map((product) => {
            const isSelected = selectedProductIds.includes(product.id);
            const pendingDeleteClass =
              isDeleteHovered && isSelected
                ? "opacity-50 line-through grayscale"
                : "bg-brown-70/20 dark:bg-brown-80/10";

            return (
              <div
                key={product.id}
                className={`group relative grid grid-cols-[30px_32px_1fr_70px] md:grid-cols-[40px_40px_2fr_1fr_0.8fr_0.8fr] items-center h-[42px] md:h-[48px] w-full border-dark-15/40 dark:border-white/20 hover:bg-brown-70/20 dark:hover:bg-brown-70/10 pl-2 pr-4 font-mono text-[10px] md:text-xs transition-colors gap-2 ${pendingDeleteClass}`}
              >
                <div
                  className="flex items-center justify-center cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(toggleProductSelection(product.id));
                  }}
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    readOnly
                    className="w-3 h-3 md:w-3.5 md:h-3.5 cursor-pointer accent-brown-60 rounded border-gray-300 pointer-events-none"
                    aria-label={`Select ${product.ProductName}`}
                  />
                </div>
                <div className="relative h-[28px] w-[28px] md:h-[32px] md:w-[32px]">
                  <img
                    src={product.ProductImage || IMAGES.PLACEHOLDER.PRODUCT}
                    onError={(e) => {
                      e.currentTarget.src = IMAGES.PLACEHOLDER.PRODUCT;
                    }}
                    alt={product.ProductName}
                    className="h-full w-full object-cover rounded shadow-sm"
                  />
                  {/* Overlay for delete hover */}
                  {isDeleteHovered && isSelected && (
                    <div className="absolute inset-0 bg-gray-500/30 rounded pointer-events-none z-10"></div>
                  )}
                </div>
                <div className="overflow-hidden">
                  <div className="w-fit max-w-full">
                    <Link
                      to={`/products/${product.id}`}
                      onMouseEnter={(e) => {
                        setHoveredProductId(product.id);
                        setMousePos({ x: e.clientX, y: e.clientY });
                      }}
                      onMouseLeave={() => setHoveredProductId(null)}
                      className={`hover:underline font-bold text-dark-12 dark:text-white block truncate ${isDeleteHovered && isSelected ? "pointer-events-none" : ""}`}
                      title={product.ProductName}
                    >
                      {product.ProductName}
                    </Link>
                  </div>

                  {hoveredProductId === product.id && !isDeleteHovered && (
                    <div
                      className="fixed z-99999 pointer-events-none transition-all duration-75 hidden lg:block"
                      style={{
                        left:
                          mousePos.x + window.innerWidth * 0.45 >
                          window.innerWidth
                            ? `${mousePos.x - window.innerWidth * 0.45}px`
                            : `${mousePos.x}px`,
                        top: `${Math.max(20, Math.min(mousePos.y, window.innerHeight - 520))}px`,
                      }}
                    >
                      <ProductMiniPreview product={product} />
                    </div>
                  )}
                </div>
                <div className="text-gray-500 dark:text-gray-400 truncate hidden md:block">
                  {product.category}
                </div>
                <div className="text-gray-500 dark:text-gray-400 truncate hidden md:block">
                  {product.Fitvalue}
                </div>
                <div className="text-right font-medium text-dark-12 dark:text-gray-200 truncate">
                  ${product.Pricevalue}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // RENDER CONTENT
  const renderContent = () => {
    // ADMIN LIST VIEW CHECK
    if (isAdmin && viewMode === "list") {
      const displayedListProducts = filteredProducts.slice(0, listVisibleCount);
      const hasMoreToLoad = filteredProducts.length > listVisibleCount;

      return (
        <div className="flex flex-col">
          <div className="flex flex-row items-center p-2 bg-brown-80/20">
            <h2 className="font-bold text-gray-50">Products Info:</h2>
            <label className="text-[12px] text-gray-70 ml-4">
              Total Products:{" "}
              <span className="">{filteredProducts.length}</span>
            </label>
          </div>
          {renderListView(displayedListProducts)}

          <div className="p-12 flex justify-center bg-dark-10/5 border-dark-15">
            <button
              onClick={() => dispatch(loadMoreListItems())}
              disabled={!hasMoreToLoad}
              className={`px-8 py-3 rounded-2xl font-mono text-sm transition-all flex items-center gap-3 ${
                hasMoreToLoad
                  ? "bg-dark-15 text-white border-white/20 hover:bg-dark-20 hover:border-white/40 active:scale-95 cursor-pointer shadow-xl"
                  : "bg-brown-80 text-gray-600 border-white/5 cursor-not-allowed grayscale opacity-50"
              }`}
            >
              <UIcon icon={ICONS.ACTIONS.ADD} className="w-4 h-4 opacity-50" />
              Load 100 More Products
            </button>
          </div>
        </div>
      );
    }

    if (mode === "home") {
      return (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 products-grid">
            {displayedHomeProducts.map((product, index) => (
              <Reveal
                key={product.id}
                variant="fade-up"
                distance={10}
                duration={0.5}
                delay={index * 0.15}
                ease="easeOut"
                once={false}
                className="custom-dashed-r custom-dashed-b"
              >
                <ProductCard
                  key={product.id}
                  product={product}
                  index={index}
                  totalCount={displayedHomeProducts.length}
                  isInGroup={false}
                />
              </Reveal>
            ))}
          </div>

          {/* Pagination */}
          {!isMobile && filteredProducts.length > ITEMS_PER_PAGE && (
            <div className="p-8 custom-dashed-t border-dark-15 rounded-2xl">
              <ReactPaginate
                previousLabel="Previous"
                nextLabel="Next"
                breakLabel="..."
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName="flex justify-center space-x-2"
                pageClassName="px-4 py-2 border-2 border-dashed border-dark-15 rounded cursor-pointer hover:bg-brown-70"
                activeClassName="!border-0 bg-brown-70 text-white"
                previousClassName="px-4 py-2 bg-brown-70/10 border-2 border-dashed border-dark-15 rounded cursor-pointer hover:bg-brown-70"
                nextClassName="px-4 py-2 bg-brown-70/10 border-2 border-dashed border-dark-15 rounded cursor-pointer hover:bg-brown-70"
              />
            </div>
          )}

          {/* View All for mobile */}
          {isMobile && filteredProducts.length > ITEMS_PER_PAGE && (
            <div className="">
              <button
                onClick={toggleShowAllMobile}
                className="w-full py-8 dark:text-gray-70 text-dark-primary-bg text-base font-mono flex items-center justify-center gap-2 rounded-2xl border-dark-15 "
                aria-label={showAllMobile ? "View Less" : "View All"}
              >
                {showAllMobile ? "View Less" : "View All"}
                <span className="ml-2.5 text-sm">
                  {showAllMobile ? (
                    <UIcon icon={ICONS.UI.UP_ARROW} className="w-4 h-4" />
                  ) : (
                    <UIcon icon={ICONS.UI.DOWN_ARROW} className="w-4 h-4" />
                  )}
                </span>
              </button>
            </div>
          )}
        </>
      );
    }

    return (
      <>
        {renderCategoryGroups()}
        {filteredProducts.length === 0 && (
          <div className="flex justify-center items-center py-20 border-dark-15 border-t-0">
            <p className="text-gray-40 text-lg font-roboto">
              No products found for this category.
            </p>
          </div>
        )}
      </>
    );
  };

  return (
    <section
      className={`custom-dashed rounded-2xl mb-25 max-2xl:mb-20 max-md:mb-12 ${mode !== "home" ? "md:rounded-b-[7px]" : ""}`}
    >
      {renderHeader()}
      {renderContent()}
    </section>
  );
}
