import { useEffect, useState } from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa6";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { TrendItem } from "@/data/trends";
import { Reveal } from "@/components/common/Motion/Reveal";

interface TrendsSectionProps {
  heading: string;
  description: string;
}

export default function TrendsSection({
  heading,
  description,
}: TrendsSectionProps) {
  const trends = useSelector((state: RootState) => state.trends.items);
  const [showAll, setShowAll] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const displayedItems = isMobile && !showAll ? trends.slice(0, 3) : trends;

  return (
    <section className="flex flex-col mb-[50px] xl:mb-[80px] 2xl:mb-[100px] custom-dashed rounded-2xl overflow-hidden">
      <div className="2xl:p-20 xl:p-15 py-7.5 px-5 custom-dashed-b">
        <h2 className="2xl:text-5xl text-[28px] xl:text-[38px] font-medium 2xl:mb-7.5 xl:mb-6 mb-5 uppercase">
          {heading}
        </h2>
        <p className="text-gray-40 text-sm 2xl:text-lg xl:text-base">
          {description}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 trends-grid">
        {displayedItems.map((item: TrendItem, index: number) => (
          <Reveal
            key={index}
            variant="fade-up"
            distance={20}
            duration={0.5}
            delay={index * 0.15}
            ease="easeOut"
            once={false}
            className="custom-dashed-r custom-dashed-b"
          >
            <div className="relative overflow-hidden p-7.5 xl:p-12.5 2xl:p-15 flex flex-col items-start text-left h-full">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="2xl:w-23.5 2xl:h-23.5 w-19 h-19 mb-6 xl:mb-10 2xl:mb-12.5"
              />
              <h3 className="font-medium text-lg 2xl:text-2xl xl:text-xl ">
                {item.title}
              </h3>
              <p className="text-color-gray-50 text-sm 2xl:text-lg xl:text-base 2xl:mt-4 xl:mt-3 mt-2.5 z-10 relative">
                {item.description}
              </p>
              <img
                className="absolute -top-7 right-1 2xl:top-0 2xl:-right-1.75 xl:right-1 xl:-top-6 w-41.5 h-41.5 xl:w-37.5 xl:h-41.5 2xl:w-46 2xl:h-51.25 pointer-events-none opacity-50 dark:opacity-100"
                src={item.imagePosition}
                alt="icon-bg"
              />
            </div>
          </Reveal>
        ))}
      </div>

      {isMobile && trends.length > 3 && (
        <div className="flex justify-center py-7.5 custom-dashed-t">
          <button
            onClick={() => setShowAll((prev) => !prev)}
            className="flex items-center gap-2.5 text-base font-normal font-robotmono text-color-gray-70 hover:text-color-gray-70"
          >
            {showAll ? (
              <>
                View Less
                <FaArrowUp className="text-lg" />
              </>
            ) : (
              <>
                View All
                <FaArrowDown className="text-lg" />
              </>
            )}
          </button>
        </div>
      )}
    </section>
  );
}
