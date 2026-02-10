import { useEffect, useState } from "react";

type GoldenRadiusProps = {
  className?: string;
};

const PATH_12 = "M17 0.5L12.5 0.5C5.87258 0.5 0.5 5.87258 0.5 12.5V16.9988";
const PATH_8 = "M17 0.5L8.5 0.5C4.08172 0.5 0.5 4.08172 0.5 8.5V16.9988";

const GoldenRadius = ({ className }: GoldenRadiusProps) => {
  const [wideScreen, setWideScreen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1536px)");
    setWideScreen(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setWideScreen(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const currentPath = wideScreen ? PATH_12 : PATH_8;

  const Corner = ({
    className,
    style,
  }: {
    className?: string;
    style?: React.CSSProperties;
  }) => (
    <svg
      width="17"
      height="17"
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`absolute w-[16.5px] h-[16.5px] pointer-events-none 
        stroke-brown-60 dark:stroke-brown-70 
        stroke-[2px] dark:stroke-[1px] 
        ${className || ""}`}
      style={style}
    >
      <path d={currentPath} />
    </svg>
  );

  return (
    <div
      className={`absolute inset-0 pointer-events-none z-12 ${className || ""}`}
    >
      {/* TOP LEFT */}
      <Corner className="-top-[2.2px] -left-[2.2px]" />

      {/* BOTTOM LEFT */}
      <Corner
        className="-bottom-[2.2px] -left-[2.2px]"
        style={{ transform: "scaleY(-1)" }}
      />

      {/* TOP RIGHT */}
      <Corner
        className="-top-[2.2px] -right-[2.2px]"
        style={{ transform: "scaleX(-1)" }}
      />

      {/* BOTTOM RIGHT */}
      <Corner
        className="-bottom-[2.2px] -right-[2.2px]"
        style={{ transform: "scale(-1, -1)" }}
      />
    </div>
  );
};

export default GoldenRadius;
