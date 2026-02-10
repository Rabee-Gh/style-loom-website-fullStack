import { RatingRowProductDetailsProps } from "@/type";
import Star from "../../../../../public/assets/icons/general/star.svg";

export default function RatingRowProductDetails({
  stars,
  percentage,
}: RatingRowProductDetailsProps) {
  return (
    <div className="flex items-center gap-[12px] md:gap-[16px] 2xl:gap-[20px] w-full">
      <img src={Star} alt="Star" className="w-[20px] 2xl:w-[24px]" />
      <span className="font-normal text-sm md:text-base 2xl:text-lg leading-[150%] font-roboto text-gray-50">
        0{stars}
      </span>
      <div className="flex-1 p-[6px] 2xl:p-[10px] rounded-[100px] border border-dark-15 bg-dark-10 overflow-hidden">
        <div
          className="h-[4px] 2xl:h-[8px] bg-brown-60 transition-all duration-1000 ease-in-out rounded-[100px]"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}