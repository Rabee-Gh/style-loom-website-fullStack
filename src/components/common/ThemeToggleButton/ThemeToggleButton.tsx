import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { toggleTheme } from "@/redux/slices/DarkButton";
import { useEffect } from "react";

interface ThemeToggleButtonProps {
  isCircleWrapped?: boolean;
}

export default function ThemeToggleButton({
  isCircleWrapped = false,
}: ThemeToggleButtonProps) {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.mode);
  const checked = theme === "dark";

  const handleToggle = () => {
    dispatch(toggleTheme());
  };

  const mode = useSelector((state: RootState) => state.theme.mode);
  useEffect(() => {
    if (mode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [mode]);

  return (
    <label
      className={`relative grid place-items-center cursor-pointer transition-all duration-300 ${
        isCircleWrapped
          ? "w-10 h-10 rounded-full border-2 border-dashed border-dark-20/40 dark:border-gray-40/40 bg-transparent hover:border-brown-100 dark:hover:border-white/30 hover:bg-brown-60/5"
          : "w-6 h-6 bg-transparent"
      }`}
      aria-label="Toggle light/dark theme"
      title="Toggle light/dark theme"
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={handleToggle}
        className="sr-only"
      />

      <div
        className={`absolute grid place-items-center transition-transform duration-500 ${
          checked ? "scale-100 rotate-0" : "scale-0"
        }`}
      >
        <div
          className={`${isCircleWrapped ? "w-5 h-5" : "w-6 h-6"} bg-brown-60 dark:bg-white`}
          style={{
            maskImage: "url(/assets/icons/general/moon.svg)",
            WebkitMaskImage: "url(/assets/icons/general/moon.svg)",
            maskSize: "contain",
            WebkitMaskSize: "contain",
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
            maskPosition: "center",
            WebkitMaskPosition: "center",
          }}
        />
      </div>

      <div
        className={`absolute grid place-items-center transition-transform duration-500 ${
          checked ? "scale-0" : "scale-100 rotate-0"
        }`}
      >
        <div
          className={`${isCircleWrapped ? "w-5 h-5" : "w-6 h-6"} bg-brown-60 dark:bg-white`}
          style={{
            maskImage: "url(/assets/icons/general/sun.svg)",
            WebkitMaskImage: "url(/assets/icons/general/sun.svg)",
            maskSize: "contain",
            WebkitMaskSize: "contain",
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
            maskPosition: "center",
            WebkitMaskPosition: "center",
          }}
        />
      </div>
    </label>
  );
}
