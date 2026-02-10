import { ShopNowButtonProps } from "@/type";
import { NavLink } from "react-router-dom";
import GoldenRadius from "../UI/GoldenRadius/GoldenRadius";

export function MainButton({
  to,
  label,
  className,
  isPrimaryButtton,
  cartCheckoutButton,
  shopNowButton,
  hasBorder,
  hasCustomDashed,
  hasFullWidthInCard,
  hasFullWidthInCallsection,
  inHeroSection,
  hasDarkBack,
  arrowIcon,
  largerWidth,
  shopBagIcon,
  addtocart,
  children,
  onClick,
}: ShopNowButtonProps) {
  const widthClass = inHeroSection
    ? "w-[128px]"
    : hasFullWidthInCard
      ? "w-full"
      : hasFullWidthInCallsection
        ? "lg:w-[128px] w-full"
        : "w-[128px]";

  // BUTTON RULES

  const customDashed = hasCustomDashed ? "custom-dashed" : "";

  const primaryButtton = isPrimaryButtton
    ? "ml-4 px-2 py-1 text-xs font-mono rounded bg-dark-15 text-white/80"
    : "";

  const asCartCheckoutButton = cartCheckoutButton
    ? "bg-brown-70 text-white dark:bg-brown-60 hover:dark:bg-amber-300 hover:text-dark-primary-bg hover:border border-very-dark-gray"
    : "";

  const asShopNowButton = shopNowButton
    ? "bg-brown-80 dark:bg-dark-10 hover:bg-brown-70 hover:text-dark-primary-bg hover:border border-very-dark-gray"
    : "";

  const hasBorderClass = hasBorder ? "" : "";
  const backgroundClass = hasDarkBack
    ? "dark:bg-dark-12 dark:text-white"
    : "bg-brown-70 text-primary-bg";
  const largerWidthClass = largerWidth
    ? "2xl:w-[181px] sm:w-[134px] w-[149px]"
    : hasFullWidthInCallsection
      ? "lg:w-[128px] w-full"
      : "2xl:w-[159px] sm:w-[128px]";

  const content = (
    <>
      {shopBagIcon && (
        <div className="pr-[10px] text-base">
          <img src="/public/assets/icons/general/shop-now.svg" alt="shop-now" />
        </div>
      )}
      {addtocart && (
        <div className="pl-[6px] text-base">
          <img src="/assets/icons/general/add-to-cart.svg" alt="add-to-cart" />
        </div>
      )}
      {label || children}
      {arrowIcon && (
        <div className="pl-[6px]">
          <img src="/assets/icons/general/shop-arrow.svg" alt="shop-arrow" />
        </div>
      )}

      {hasBorder && <GoldenRadius />}
    </>
  );

  const classes = `relative flex flex-row custom-dashed z-10 items-center justify-center ${customDashed} 2xl:h-[63px] h-[49px] rounded-[8px] 2xl:rounded-[14px] text-sm 2xl:text-lg font-normal font-roboto cursor-pointer
        ${hasBorderClass}
        ${widthClass} ${backgroundClass} ${largerWidthClass} ${asShopNowButton} ${asCartCheckoutButton} ${primaryButtton} ${className || ""}`;

  if (to) {
    return (
      <NavLink to={to} className={classes}>
        {content}
      </NavLink>
    );
  }

  return (
    <button type="button" onClick={onClick} className={classes}>
      {content}
    </button>
  );
}
