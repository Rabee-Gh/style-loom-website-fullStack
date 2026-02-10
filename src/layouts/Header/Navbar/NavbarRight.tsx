import ThemeToggleButton from "@/components/common/ThemeToggleButton/ThemeToggleButton";
import { NavLink } from "react-router-dom";
import NavMobileButton from "./NavMobileButton";

// DESKTOP NAVBAR (XL, 2XL)
// RIGHT NAVBAR
// SEE ./NavbarLeft.tsx FOR THE LEFT NAVBAR
// SEE ./NavbarMobile.tsx FOR THE MOBILE NAVBAR

export type Props = {
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function NavbarRight({ setMenuOpen }: Props) {
  // IS-ACTIVE/NOT-ACTIVE STYLES
  const isActiveClassName =
    "border-0 bg-brown-60 dark:bg-dark-20/40 shadow-sm text-white";
  const isNotActiveClassName = "dark:hover:bg-white/5 dark:border-dark-20/40";
  const isActiveContactButton = "bg-brown-50/80! dark:bg-brown-60 text-white";
  const isNotActiveContactButton =
    "bg-brown-60 dark:bg-brown-60 dark:hover:bg-white/5 dark:border-dark-15";

  return (
    <nav className="w-fit flex flex-row justify-between items-center">
      <div
        className="hidden md:flex 2xl:flex justify-start items-center
      w-fit"
      >
        <div className=" flex justify-start items-center gap-[14px]">
          {/* THEME TOGGLE BUTTON */}
          <ThemeToggleButton isCircleWrapped={true} />
          {/* CART BUTTON */}
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `p-[16px] 2xl:p-[20px] flex justify-center items-center
            rounded-[12px] 2xl:rounded-[8px] hover:shadow-lg
            ${
              isActive
                ? isActiveClassName
                : `border-2 border-dashed border-dark-20/40! dark:border-gray-40/40! hover:border-dark-30! dark:hover:border-white/35! ${isNotActiveClassName}`
            }`
            }
          >
            {({ isActive }) => (
              <div
                className={`w-4 h-4 transition-all ${
                  isActive
                    ? "bg-white dark:bg-white"
                    : "bg-dark-30 dark:bg-white"
                }`}
                style={{
                  maskImage: "url(/assets/icons/general/add-to-cart.svg)",
                  WebkitMaskImage: "url(/assets/icons/general/add-to-cart.svg)",
                  maskSize: "contain",
                  WebkitMaskSize: "contain",
                  maskRepeat: "no-repeat",
                  WebkitMaskRepeat: "no-repeat",
                  maskPosition: "center",
                  WebkitMaskPosition: "center",
                }}
                aria-label="Cart"
              />
            )}
          </NavLink>
          {/* CONTACT BUTTON */}
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `px-[30px] py-[14px] 2xl:px-[30px] 2xl:py-[18px] flex justify-center items-center
             text-primary-text dark:text-white rounded-[12px] hover:shadow-lg
              font-mono font-medium ${
                isActive ? isActiveContactButton : isNotActiveContactButton
              }`
            }
          >
            Contact
          </NavLink>
        </div>
      </div>
      {/* MOBILE MENU BUTTON */}
      <div className="sm:hidden">
        <NavMobileButton setMenuOpen={setMenuOpen} />
      </div>
    </nav>
  );
}
