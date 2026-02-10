import { useAuth } from "@/context/AuthContext";
import { MainButton } from "@/components/common/MainButton/MainButton";
import { FaUserShield } from "react-icons/fa6";

export default function AdminButton() {
  const { isAdmin, login, logout } = useAuth();

  const handleToggle = () => {
    if (isAdmin) {
      logout();
    } else {
      login();
    }
  };

  return (
    <MainButton
      onClick={handleToggle}
      hasBorder={false}
      hasCustomDashed={false}
      className="relative h-auto! w-auto! px-[12px] 2xl:px-[14px] py-[12px] 2xl:py-[14px]
      justify-center items-center gap-2 text-[14px] 2xl:text-[18px]
      bg-primary-bg/10 dark:bg-dark-15/40 text-dark-12! dark:text-white!
      border-2 border-dashed border-dark-20/40 dark:border-dark-20/80
      flex hover:-translate-y-0.5 hover:shadow-lg rounded-[12px] 2xl:rounded-[8px]"
    >
      <FaUserShield className="w-[24px] h-[24px] text-dark-15 dark:text-white" />
    </MainButton>
  );
}
