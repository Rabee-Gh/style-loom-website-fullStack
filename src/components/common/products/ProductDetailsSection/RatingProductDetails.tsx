import Star from "../../../../../public/assets/icons/general/star.svg";
import { useEffect, useRef, useState } from "react";
import RatingRowProductDetails from "./RatingRowProductDetails";

export default function RatingProductDetails() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [animatedWidths, setAnimatedWidths] = useState<number[]>([]);
  const [hasAnimated, setHasAnimated] = useState(false);

  const ratingsData = [
    { stars: 5, count: 10000 },
    { stars: 4, count: 5000 },
    { stars: 3, count: 3000 },
    { stars: 2, count: 2000 },
    { stars: 1, count: 1000 },
  ];

  const total = ratingsData.reduce((sum, r) => sum + r.count, 0);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setAnimatedWidths(ratingsData.map((r) => (r.count / total) * 100));
          setHasAnimated(true);
        }
      },
      { threshold: 0.3 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [hasAnimated, ratingsData, total]);

  return (
    <div className="Rating flex flex-col my-media:flex-row my-media:justify-between gap-[20px] my-media:gap-[30px] 2xl:gap-[50px] w-full">
      <div className="flex flex-row flex-wrap md:flex-col items-center gap-[20px] md:gap-[8px] 2xl:gap-[10px]">
        <p className="font-medium text-3xl md:text-[40px] 2xl:text-[50px] leading-[150%] font-mono dark:text-dark-primary-text text-dark-12">
          4.8
        </p>
        <div className="flex items-center gap-[4px] 2xl:gap-[5px]">
          {[...Array(5)].map((_, i) => (
            <img key={i} src={Star} alt="Star" className="w-[20px] 2xl:w-[24px]" />
          ))}
        </div>
        <p className="font-normal text-sm md:text-base 2xl:text-lg leading-[150%] font-roboto text-gray-50">
          49 Ratings
        </p>
      </div>
      <div
        ref={sectionRef}
        className="flex flex-col gap-[10px] md:gap-[12px] 2xl:gap-[16px] w-full my-media:w-[345px] 2xl:w-[411px]"
      >
        {ratingsData.map((r, index) => (
          <RatingRowProductDetails
            key={r.stars}
            stars={r.stars}
            percentage={animatedWidths[index] ?? 0}
          />
        ))}
      </div>
    </div>
  );
}