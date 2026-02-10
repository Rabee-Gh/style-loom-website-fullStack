import { Reveal } from "../Motion/Reveal";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  imageSrc?: string;
  extraComponent?: React.ReactNode;
  children?: React.ReactNode;
  position?: string;
  dimensions?: string;
  hasBorder?: boolean;
  className?: string;
  isRelative?: boolean;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  imageSrc,
  extraComponent,
  children,
  position,
  dimensions,
  hasBorder,
  isRelative = true,
  className = "",
}) => {
  const borderClass = hasBorder ? "custom-dashed-b" : "";

  // DEFAULT PADDING: ONLY APPLIED IF NO PADDING CLASS IS PROVIDED IN className
  const defaultPadding =
    "py-[30px] px-[20px] lg:pl-[60px] lg:pr-[250px] lg:py-[60px] 2xl:pl-[80px] 2xl:pr-[300px] 2xl:py-[80px]";
  const hasCustomPadding =
    className.includes("p-") ||
    className.includes("py-") ||
    className.includes("px-");

  return (
    <div
      className={`flex flex-col items-start justify-start ${isRelative ? "relative" : ""} bg-none xl:bg-no-repeat xl:bg-right xl:bg-contain overflow-hidden ${borderClass} ${!hasCustomPadding ? defaultPadding : ""} ${className}`}
    >
      {imageSrc && (
        <Reveal
          variant="fade-right"
          distance={120}
          rotateInitial={-180}
          duration={1.2}
          className={`${position || "right-0 top-0"} ${dimensions || "lg:w-[316px]"} absolute hidden lg:block`}
        >
          <img
            src={imageSrc}
            alt="section background"
            className="w-full h-auto rounded-xl"
          />
        </Reveal>
      )}

      <Reveal variant="blur" blurInitial={4} duration={2}>
        <h2
          className="font-roboto font-medium uppercase leading-none text-[28px]
      mb-[20px] xl:mb-[24px] 2xl-[30px] lg:text-[38px] 2xl:text-[48px] text-dark-primary-bg dark:text-dark-primary-text"
        >
          {title}
        </h2>
      </Reveal>

      {subtitle && (
        <p
          className="font-roboto text-gray-40 leading-[150%] text-[14px] lg:text-[18px]
         mb-[30px] xl:mb-[40px] 2xl-[50px]"
        >
          {subtitle}
        </p>
      )}
      {extraComponent && <div>{extraComponent}</div>}

      {children && <div className="mt-8 lg:mt-10 2xl:mt-12">{children}</div>}
    </div>
  );
};

export default SectionHeader;
