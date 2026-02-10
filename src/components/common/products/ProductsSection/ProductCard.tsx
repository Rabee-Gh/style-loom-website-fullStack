import { Link } from "react-router-dom";
import { MainButton } from "../../MainButton/MainButton";
import type { Product } from "@/type";
import { IMAGES } from "@/constants/images";

interface ProductCardProps {
  product: Product;
  index: number;
  totalCount: number;
  isInGroup?: boolean;
}

import { useAuth } from "@/context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { toggleProductSelection } from "@/redux/slices/productSlice";
import { RootState } from "@/redux/store";

export default function ProductCard({ product }: ProductCardProps) {
  const { isAdmin } = useAuth();
  const dispatch = useDispatch();
  const selectedProductIds = useSelector(
    (state: RootState) => state.product.selectedProductIds,
  );

  const isSelected = selectedProductIds.includes(product.id);

  const handleSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Prevent navigation when clicking checkbox
    e.stopPropagation();
    dispatch(toggleProductSelection(product.id));
  };
  const isDeleteHovered = useSelector(
    (state: RootState) => state.product.isDeleteHovered,
  );
  const pendingDeleteClass =
    isDeleteHovered && isSelected ? "opacity-50 line-through grayscale" : "";

  return (
    <div
      className={`relative flex items-center justify-center p-5 2xl:p-8 ${isSelected ? "bg-brown-90/40 ring-2 ring-brown-60 z-10" : ""} ${pendingDeleteClass}`}
    >
      {/* Admin Selection Checkbox */}
      {isAdmin && (
        <div
          className="absolute top-4 left-4 z-20"
          onClick={(e) => e.stopPropagation()}
        >
          <input
            type="checkbox"
            checked={isSelected}
            onChange={handleSelection}
            className="w-6 h-6 cursor-pointer accent-brown-60 rounded border-gray-300"
            aria-label={`Select ${product.ProductName} for editing`}
          />
        </div>
      )}

      <div
        className={`flex flex-col gap-5 md:gap-6 2xl:gap-8 h-full w-full ${pendingDeleteClass}`}
      >
        <div className="relative">
          <img
            src={product.ProductImage || IMAGES.PLACEHOLDER.PRODUCT}
            onError={(e) => {
              e.currentTarget.src = IMAGES.PLACEHOLDER.PRODUCT;
            }}
            alt={product.ProductName}
            className="w-full rounded-t-[50px] h-56 xl:h-72 2xl:h-96 object-cover"
            loading="lazy"
          />
          {/* Overlay for delete hover */}
          {isDeleteHovered && isSelected && (
            <div className="absolute inset-0 bg-gray-500/30 rounded-t-[50px] pointer-events-none z-10 transition-colors duration-300"></div>
          )}
        </div>

        <div className="flex flex-col gap-5 md:gap-4 2xl:gap-5">
          <div className="flex justify-between items-center">
            <span className="category custom-dashed py-2 px-3 2xl:py-2.5 2xl:px-4 rounded-full border border-dashed border-dark-15 bg-dark-10 text-sm 2xl:text-lg text-gray-70 font-mono">
              {product.category}
            </span>

            <div className="hidden sm:block">
              <MainButton
                label="Shop Now"
                to={`/products/${product.id}`}
                shopNowButton={true}
                hasBorder={true}
                hasDarkBack={true}
                arrowIcon={true}
                className={`custom-dashed bg-brown-70! dark:bg-dark-15! ${
                  isDeleteHovered && isSelected
                    ? "pointer-events-none opacity-50"
                    : ""
                }`}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2.5 2xl:gap-3.5">
            <h3 className="font-medium text-lg 2xl:text-2xl text-dark-primary-bg dark:text-primary-text font-roboto line-clamp-1">
              <Link to={`/products/${product.id}`}>{product.ProductName}</Link>
            </h3>

            <div className="flex gap-2.5 md:gap-4 2xl:gap-5 font-mono">
              <div className="flex items-center gap-1.5 md:gap-1 2xl:gap-2">
                <span className="text-sm 2xl:text-lg text-gray-50">Fit</span>
                <div className="w-1 h-1 rounded-full bg-dark-30"></div>
                <span className="font-medium text-sm md:text-base 2xl:text-xl text-dark-primary-bg dark:text-gray-80">
                  {product.Fitvalue}
                </span>
              </div>

              <div className="flex items-center gap-1.5 md:gap-1 2xl:gap-2">
                <span className="text-sm 2xl:text-lg text-gray-50">Price</span>
                <div className="w-1 h-1 rounded-full bg-dark-30"></div>
                <span className="font-medium text-sm md:text-base 2xl:text-xl text-dark-primary-bg dark:text-gray-80">
                  {product.Pricevalue}
                </span>
              </div>
            </div>
          </div>

          <div className="block sm:hidden w-full">
            <MainButton
              to={`/products/${product.id}`}
              hasBorder={true}
              hasFullWidthInCard={true}
              hasDarkBack={true}
              arrowIcon={true}
              label="Shop Now"
              className={`custom-dashed bg-brown-70! dark:bg-dark-15! ${
                isDeleteHovered && isSelected
                  ? "pointer-events-none opacity-50"
                  : ""
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
