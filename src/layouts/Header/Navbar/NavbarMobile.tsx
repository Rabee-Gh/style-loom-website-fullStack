import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import ThemeToggleButton from "@/components/common/ThemeToggleButton/ThemeToggleButton";
import { useAuth } from "@/context/AuthContext";
import { ICONS, UIcon } from "@/constants/icons";

type Props = {
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onOpenSidebar?: () => void;
};

const ItemNav = [
  {
    name: "Home",
    path: "/",
    icon: ICONS.NAV.HOME,
  },
  {
    name: "Products",
    path: "/products",
    icon: ICONS.NAV.PRODUCTS,
  },
  {
    name: "Contact",
    path: "/contact",
    icon: ICONS.NAV.CONTACT,
  },
];

const NavbarMobile = ({ setMenuOpen, onOpenSidebar }: Props) => {
  const { login, isAdmin } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <nav
      className="fixed inset-0 bg-primary-bg dark:bg-dark-primary-bg
      flex flex-col w-full z-10000 items-center justify-center transition-all"
    >
      {/* FIXED THEME TOGGLE AT TOP LEFT */}
      <div className="fixed top-6 left-6 z-10001">
        <ThemeToggleButton />
      </div>

      <div className="flex flex-col gap-18 items-start justify-center">
        <div className="flex flex-col gap-4">
          {ItemNav?.map((item, index) => {
            return (
              <NavLink
                key={index}
                to={item.path}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `text-2xl font-semibold font-mono flex items-center gap-4 ${
                    isActive
                      ? " text-dark-10 dark:text-white font-bold border-b border-dark-30"
                      : " text-neutral-500 "
                  }`
                }
              >
                <UIcon icon={item.icon} className="w-8 h-8" />
                {item.name}
              </NavLink>
            );
          })}

          {/* ADMIN BUTTON (MOBILE) */}
          <button
            onClick={() => {
              if (!isAdmin) {
                login();
              }
              navigate("/admin");
              setMenuOpen(false);
              if (onOpenSidebar) {
                onOpenSidebar();
              }
            }}
            className="text-2xl font-semibold font-mono text-neutral-500 hover:text-dark-10 dark:hover:text-white transition-colors text-left flex items-center gap-4"
          >
            <UIcon icon={ICONS.NAV.ACCOUNT} className="w-8 h-8" />
            Admin
          </button>
          <NavLink
            to="/cart"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              `text-2xl font-semibold font-mono flex items-center gap-4 ${
                isActive
                  ? " text-dark-10 dark:text-white font-bold border-b border-dark-30"
                  : " text-neutral-500 "
              }`
            }
          >
            <UIcon icon={ICONS.NAV.CART} className="w-8 h-8" />
            Cart
          </NavLink>

          {/* DISABLED LOGIN BUTTON */}
          <div className="text-2xl font-semibold font-mono text-neutral-300 dark:text-neutral-600 cursor-not-allowed opacity-50">
            Login
          </div>

          {/* DISABLED SIGN UP BUTTON */}
          <div className="text-2xl font-semibold font-mono text-neutral-300 dark:text-neutral-600 cursor-not-allowed opacity-50">
            Sign Up
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <button
            onClick={() => setMenuOpen(false)}
            className="text-neutral-500 text-[24px] cursor-pointer"
          >
            ✕
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavbarMobile;
