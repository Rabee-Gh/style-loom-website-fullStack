import { ICONS, UIcon } from "@/constants/icons";

interface ViewListGridToggleButtonProps {
  viewMode: "grid" | "list";
  onToggle: () => void;
  className?: string;
}

export default function ViewListGridToggleButton({
  viewMode,
  onToggle,
  className = "",
}: ViewListGridToggleButtonProps) {
  return (
    <button
      onClick={onToggle}
      className={`rounded transition-all duration-200 flex items-center justify-center border border-white/10 hover:bg-white/10 active:scale-95 ${className}`}
      title={
        viewMode === "grid" ? "Switch to List View" : "Switch to Grid View"
      }
      aria-label="Toggle View Mode"
    >
      {viewMode === "grid" ? (
        <UIcon
          icon={ICONS.ACTIONS.TOGGLE_LIST}
          className="w-5 h-5 grayscale contrast-200 brightness-200"
        />
      ) : (
        <UIcon
          icon={ICONS.ACTIONS.TOGGLE_GRID}
          className="w-5 h-5 grayscale contrast-200 brightness-200"
        />
      )}
    </button>
  );
}
