import { useAnimatedCounter } from "@/hooks/useAnimatedCounter";
import { ICONS, UIcon } from "@/constants/icons";

interface StatCardProps {
  label: string;
  value: number;
  icon: string;
  trend: string;
  isCurrency?: boolean;
}

export const StatCard = ({
  label,
  value,
  icon,
  trend,
  isCurrency = false,
}: StatCardProps) => {
  const animatedValue = useAnimatedCounter(value);

  const formattedValue = isCurrency
    ? animatedValue.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      })
    : animatedValue.toLocaleString();

  return (
    <div className="bg-brown-80/40 dark:bg-dark-15 p-6 rounded-2xl border-2 border-dashed border-dark-15 flex flex-col gap-4 group hover:bg-brown-80/50 dark:hover:bg-dark-20 transition-all shadow-sm dark:shadow-none">
      <div className="flex justify-between items-start">
        <div className="p-3 rounded-xl bg-brown-70 dark:bg-brown-80/20 group-hover:scale-110 transition-transform">
          <UIcon icon={icon} className="w-6 h-6" />
        </div>
        <div className="flex items-center gap-1 text-[10px] font-mono text-green-600 dark:text-green-500 bg-green-500/16 px-2 py-0.5 rounded-full">
          <UIcon
            icon={ICONS.UI.UP_ARROW}
            className="w-3 h-3 grayscale contrast-200 brightness-0 dark:brightness-200"
          />
          {trend}
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-dark-10 dark:text-gray-400 text-[10px] lg:text-xs font-mono uppercase tracking-widest leading-none mb-1">
          {label}
        </span>
        <span className="text-2xl font-bold text-dark-12 dark:text-white tracking-tight font-mono">
          {formattedValue}
        </span>
      </div>
    </div>
  );
};
