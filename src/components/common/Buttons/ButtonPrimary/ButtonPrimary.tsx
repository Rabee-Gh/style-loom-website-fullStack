import type { ReactNode, ButtonHTMLAttributes } from "react";

type ButtonPrimaryProps = {
  variant?: "primary" | "secondary";
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function ButtonPrimary({
  variant = "primary",
  children,
  className,
  ...props
}: ButtonPrimaryProps) {
  const base =
    "relative flex items-center justify-center rounded-[8px] py-0 px-4 bg-dark-12";

  const variants = {
    primary: "bg-black text-white hover:bg-gray-800",
    secondary: "bg-transparent text-black hover:bg-black hover:text-white",
  };

  return (
    <button
      className={`w-fit ${base} ${variants[variant]} ${className ?? ""}`}
      {...props}
    >
      {children}
    </button>
  );
}
