import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export const useIsDark = () => {
  const theme = useSelector((state: RootState) => state.theme.mode);
  return theme === "dark";
};
