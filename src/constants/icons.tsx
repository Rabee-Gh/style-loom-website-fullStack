export const ICONS = {
  NAV: {
    OVERVIEW: "/assets/icons/ui/statistics-chart-button-icon.svg",
    PRODUCTS: "/assets/icons/ui/bag-smile-outline-button-icon.svg",
    HOME: "/assets/icons/ui/grid-button-icon.svg",
    CONTACT: "/assets/icons/ui/chat-round-dots-button-icon.png",
    CART: "/assets/icons/ui/cart-large-outline-button-icon.svg",
    LOGOUT: "public/assets/icons/ui/logout-outline-button-icon.svg",
    ACCOUNT: "/assets/icons/ui/user-circle-button-icon.svg",
  },
  ACTIONS: {
    ADD: "/assets/icons/ui/add-square-button-icon.svg",
    EDIT: "/assets/icons/ui/edit-button-icon.svg",
    DELETE: "/assets/icons/ui/trash-bin-button-icon.svg",
    EXPORT: "/assets/icons/ui/export-button-icon.svg",
    SELECT_ALL: "/assets/icons/ui/checklist-button-icon.svg",
    UNSELECT: "/assets/icons/ui/cart-cross-outline-button-icon.svg",
    FILTER: "/assets/icons/ui/filter-button-icon.svg",
    SEARCH: "/assets/icons/ui/magnifer-button-icon.svg",
    TOGGLE_LIST: "/assets/icons/ui/hamburger-menu-button-icon.svg",
    TOGGLE_GRID: "/assets/icons/ui/grid-outline-button-icon.svg",
  },
  UI: {
    BELL: "/assets/icons/ui/bell-button-icon.svg",
    BELL_BING: "/assets/icons/ui/bell-bing-button-icon.svg",
    MOON: "/assets/icons/ui/redo-right-square-button-icon.svg",
    SUN: "/assets/icons/ui/redo-right-square-outline-button-icon.svg",
    USER_CIRCLE: "/assets/icons/ui/user-circle-button-icon.svg",
    UP_ARROW: "/assets/icons/ui/course-up-button-icon.svg",
    DOWN_ARROW: "/assets/icons/ui/course-down-button-icon.svg",
    SUPER_ADMIN: "/assets/icons/ui/user/user-outline-button-icon.svg",
    WEBSITE: "/assets/icons/ui/website-button-icon.svg",
  },
  MEDIA_PLATFORM: {
    TWITTER: "/assets/icons/ui/media-platform-twitter-icon.svg",
    INSTAGRAM: "/assets/icons/ui/media-platform-instagram-icon.svg",
    BEHANCE: "/assets/icons/ui/media-platform-behance-icon.svg",
  },
  ARROW: {
    ARROW_UP: "/assets/icons/general/ArrowUp.svg",
  },
  THEME: {
    MOON: "/assets/icons/general/moon.svg",
    SUN: "/assets/icons/general/sun.svg",
  },
  // ONLY DATA
  SOCIAL: [
    { icon: "instagram", name: "IG" },
    { icon: "website", name: "WEB" },
    { icon: "twitter", name: "TW" },
    { icon: "behance", name: "BHC" },
  ],
};

// A SIMPLE COMPONENT TO RENDER AN ICON FROM THE ICONS REGISTRY
export const UIcon = ({
  icon,
  className = "w-5 h-5",
  gray = false,
}: {
  icon: string;
  className?: string;
  alt?: string;
  gray?: boolean;
}) => (
  <div
    className={`${className} ${gray ? "bg-gray-400 opacity-50" : "bg-current"}`}
    style={{
      maskImage: `url(${icon})`,
      WebkitMaskImage: `url(${icon})`,
      maskSize: "contain",
      WebkitMaskSize: "contain",
      maskRepeat: "no-repeat",
      WebkitMaskRepeat: "no-repeat",
      maskPosition: "center",
      WebkitMaskPosition: "center",
      display: "inline-block",
    }}
  />
);
