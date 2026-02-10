interface ArrowButtonProps {
  onClick?: () => void;
  isExpanded?: boolean;
  className?: string;
  label?: string;
}

export default function ArrowButton({
  onClick,
  isExpanded = false,
  className = "",
  label = "Toggle Menu",
}: ArrowButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className={`justify-center items-center w-10 h-10 rounded-full border-2 border-dashed transition-all duration-300
        ${
          isExpanded
            ? "bg-transparent text-dark-15/40 dark:text-white/60 border-dark-15/40 dark:border-white/20"
            : "bg-transparent text-dark-15/40 dark:text-white/80 border-dark-15/40 dark:border-white/20"
        } ${className}`}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`transition-transform duration-300 ${
          isExpanded ? "rotate-90" : "rotate-0"
        }`}
      >
        <path d="M9 18l6-6-6-6" />
      </svg>
    </button>
  );
}
