import { NavLink } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import ArrowButton from "@/components/common/ArrowButton/ArrowButton";

// DESKTOP NAVBAR (MD, XL)
// LEFT NAVBAR
// SEE ./NavbarRight.tsx FOR THE RIGHT NAVBAR
// SEE ./NavbarMobile.tsx FOR THE MOBILE NAVBAR

const baseNavItems = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Products",
    path: "/products",
  },
];

type Props = {
  onToggleExpansion?: () => void;
  isExpanded?: boolean;
};

export default function NavbarLeft({ onToggleExpansion, isExpanded }: Props) {
  const { isAdmin } = useAuth();

  // IS-ACTIVE/NOT-ACTIVE STYLES
  const isActiveClassName =
    "px-[24px] 2xl:px-[30px] bg-brown-70 dark:bg-dark-12 shadow-sm text-white";
  const isNotActiveClassName =
    "border-2 border-dashed border-dark-20/40 dark:border-dark-20/40";

  const linkClass = (isActive: boolean) =>
    `px-[20px] 2xl:px-[24px] py-[14px] 2xl:py-[18px] justify-center items-center
    text-[14px] 2xl:text-[18px] flex font-mono
    rounded-[12px] 2xl:rounded-[8px] hover:-translate-y-0.5 hover:shadow-lg ${
      isActive ? isActiveClassName : isNotActiveClassName
    }`;

  return (
    <nav className="hidden lg:flex w-fit flex-row justify-between items-center">
      <div className="lg:flex hidden justify-between items-center">
        <div className="flex justify-start items-center gap-[14px]">
          {/* BASE NAVIGATION - ALWAYS VISIBLE */}
          {baseNavItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) => linkClass(isActive)}
            >
              {item.name}
            </NavLink>
          ))}

          {/* ARROW BUTTON (lg and upwards) */}
          {!isAdmin && (
            <ArrowButton
              onClick={onToggleExpansion}
              isExpanded={isExpanded}
              label={isExpanded ? "Show Less" : "Show More"}
              className="hidden lg:flex"
            />
          )}
        </div>
      </div>
    </nav>
  );
}
