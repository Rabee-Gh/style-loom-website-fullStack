import { useDispatch } from "react-redux";
import { setDeleteHovered } from "@/redux/slices/productSlice";
import { ICONS, UIcon } from "@/constants/icons";
import { FaXmark } from "react-icons/fa6";

export const useDeleteHover = () => {
  const dispatch = useDispatch();
  return {
    onDeleteEnter: () => dispatch(setDeleteHovered(true)),
    onDeleteLeave: () => dispatch(setDeleteHovered(false)),
  };
};

interface FloatingUtilityBarProps {
  selectedCount: number;
  viewMode: "grid" | "list";
  onSelectAll: () => void;
  onClearSelection: () => void;
  onExportCSV: () => void;
  onQuickDelete: () => void;
  onToggleViewMode: () => void;
}

const FloatingUtilityBar = ({
  selectedCount,
  viewMode,
  onSelectAll,
  onClearSelection,
  onExportCSV,
  onQuickDelete,
  onToggleViewMode,
}: FloatingUtilityBarProps) => {
  const { onDeleteEnter, onDeleteLeave } = useDeleteHover();

  return (
    <div className="fixed bottom-6 right-0 left-0 lg:left-64 z-9998 pointer-events-none px-4 flex justify-center">
      <div
        className="w-[98%] sm:w-auto sm:min-w-[500px] max-w-5xl bg-primary-bg/90 dark:bg-dark-primary-bg/90 backdrop-blur-md
        border-2 border-dashed border-dark-15 p-2 px-3 lg:p-2.5 lg:px-4 rounded-2xl shadow-2xl flex items-center justify-between
        gap-2 pointer-events-auto transform animate-in slide-in-from-bottom-8 duration-500 scale-95 sm:scale-100"
      >
        <div className="flex flex-col pr-2 border-r border-gray-200 dark:border-white/10">
          <span className="text-[9px] lg:text-[10px] font-mono text-brown-80 uppercase tracking-widest leading-none">
            Admin Tools
          </span>
          <span className="text-dark-12 dark:text-white text-[10px] lg:text-xs font-bold font-mono">
            {selectedCount} item{selectedCount !== 1 ? "s" : ""} selected
          </span>
        </div>

        <div className="flex items-center gap-1.5 lg:gap-2">
          {/* SELECT ALL */}
          <button
            onClick={onSelectAll}
            title="Select All on Current Batch"
            className="w-9 h-9 lg:w-11 lg:h-11 flex items-center justify-center rounded-xl bg-brown-60 text-white hover:bg-brown-80 dark:bg-white/5 dark:text-gray-400 transition-all active:scale-90 cursor-pointer"
          >
            <UIcon
              icon={ICONS.ACTIONS.SELECT_ALL}
              className="w-4 h-4 lg:w-5 lg:h-5"
            />
          </button>

          {/* UNSELECT ALL */}
          <button
            onClick={onClearSelection}
            disabled={selectedCount === 0}
            title="Clear Selection"
            className={`w-9 h-9 lg:w-11 lg:h-11 flex items-center justify-center rounded-xl transition-all active:scale-90 ${
              selectedCount > 0
                ? "bg-brown-60 text-white hover:bg-brown-80 dark:bg-white/5 cursor-pointer"
                : "bg-brown-80/20 text-dark-12/30 dark:bg-white/5 dark:text-gray-700 cursor-not-allowed grayscale"
            }`}
          >
            <FaXmark className="text-sm lg:text-lg" />
          </button>

          <div className="h-4 w-px bg-gray-200 dark:bg-white/10 mx-0.5 lg:mx-1"></div>

          {/* EXPORT CSV */}
          <button
            onClick={onExportCSV}
            disabled={selectedCount === 0}
            title="Export Selected to CSV"
            className={`w-9 h-9 lg:w-11 lg:h-11 flex items-center justify-center rounded-xl transition-all active:scale-90 ${
              selectedCount > 0
                ? "bg-brown-60 text-white hover:bg-brown-80 dark:bg-white/5 cursor-pointer"
                : "bg-brown-80/20 text-dark-12/30 dark:bg-white/5 dark:text-gray-700 cursor-not-allowed grayscale opacity-50"
            }`}
          >
            <UIcon
              icon={ICONS.ACTIONS.EXPORT}
              className="w-4 h-4 lg:w-5 lg:h-5"
            />
          </button>

          {/* QUICK DELETE */}
          <button
            onClick={onQuickDelete}
            onMouseEnter={onDeleteEnter}
            onMouseLeave={onDeleteLeave}
            disabled={selectedCount === 0}
            title="Quick Delete Selected"
            className={`w-9 h-9 lg:w-11 lg:h-11 flex items-center justify-center rounded-xl transition-all active:scale-90 ${
              selectedCount > 0
                ? "bg-brown-60 text-white hover:bg-brown-80 dark:bg-white/5 dark:text-red-500 dark:hover:text-red-400 dark:hover:bg-red-500/10 cursor-pointer"
                : "bg-brown-80/20 text-dark-12/30 dark:bg-white/5 dark:text-gray-700 cursor-not-allowed grayscale opacity-50"
            }`}
          >
            <UIcon
              icon={ICONS.ACTIONS.DELETE}
              className="w-4 h-4 lg:w-5 lg:h-5"
            />
          </button>

          <div className="h-4 w-px bg-gray-200 dark:bg-white/10 mx-0.5 lg:mx-1"></div>

          {/* TOGGLE VIEW MODE */}
          <button
            onClick={onToggleViewMode}
            title={`Switch to ${viewMode === "grid" ? "List" : "Grid"} View`}
            className="w-9 h-9 lg:w-11 lg:h-11 flex items-center justify-center rounded-xl bg-brown-60 dark:bg-brown-60 text-white dark:text-white hover:bg-brown-80 dark:hover:bg-brown-70 transition-all active:scale-90 shadow-lg shadow-brown-60/10 cursor-pointer"
          >
            <UIcon
              icon={
                viewMode === "grid"
                  ? ICONS.ACTIONS.TOGGLE_LIST
                  : ICONS.ACTIONS.TOGGLE_GRID
              }
              className="w-4 h-4 lg:w-5 lg:h-5 grayscale contrast-200 brightness-150"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FloatingUtilityBar;
