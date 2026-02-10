import type { ReactNode, ButtonHTMLAttributes } from "react";
import ButtonCornerStyle from "./ButtonCornerStyle";

type ButtonPrimaryStyledProps = {
  variant?: "primary" | "secondary";
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function ButtonPrimaryStyled({
  variant = "primary",
  children,
  className,
  ...props
}: ButtonPrimaryStyledProps) {
  const base =
    "relative flex items-center justify-center rounded-[8px] p-4 bg-dark-12";

  const variants = {
    primary: "bg-black text-white hover:bg-gray-800",
    secondary: "bg-transparent text-black hover:bg-black hover:text-white",
  };

  return (
    <button
      className={`w-fit ${base} ${variants[variant]} ${className ?? ""}`}
      {...props}
    >
      <ButtonCornerStyle />
      {children}
    </button>
  );
}
