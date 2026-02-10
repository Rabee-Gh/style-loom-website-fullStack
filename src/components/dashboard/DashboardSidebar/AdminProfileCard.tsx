import { ICONS, UIcon } from "@/constants/icons";
import { IoShieldCheckmark } from "react-icons/io5";

export const AdminProfileCard = () => {
  return (
    <div
      className="p-4 mx-4 mb-4 bg-brown-80 dark:bg-dark-15
    rounded-[4px] border border-dashed border-brown-60 dark:border-dark-15
    flex items-center gap-4 group transition-all
    dark:hover:bg-dark-20/80 shadow-sm dark:shadow-none"
    >
      <div className="relative">
        <div
          className="w-12 h-12 rounded-full overflow-hidden
        border-2 border-brown-60 shadow-lg transition-transform
        bg-brown-70 dark:bg-dark-20 flex items-center justify-center p-1"
        >
          <UIcon
            icon={ICONS.UI.USER_CIRCLE}
            className="w-full h-full object-contain"
            alt="Admin Avatar"
          />
        </div>
        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-[3px] border-white dark:border-dark-15 flex items-center justify-center">
          <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
        </div>
      </div>

      <div className="flex flex-col gap-0.5 overflow-hidden">
        <h4 className="text-[16px] font-roboto font-bold text-dark-12 dark:text-white uppercase truncate">
          Admin User
        </h4>
        <div className="flex items-center gap-[2px] font-mono text-brown-40/60 dark:text-brown-60 text-[10px] uppercase tracking-tighter">
          <IoShieldCheckmark className="text-xl" />
          <span className="text-sm text-dark-60">Super Admin</span>
        </div>
      </div>
    </div>
  );
};
