import { Reveal } from "@/components/common/Motion/Reveal";
import SectionHeader from "@/components/common/UI/SectionHeader";
import { IMAGES } from "@/constants/images";
import { fashionJourneyData } from "@/data/fashionJourneyData";

export default function Fashionjourney() {
  return (
    <div className="relative mx-auto max-w-[1596px] w-full rounded-xl custom-dashed font-(--font-roboto) mt-8 mb-30 sm:mb-20 overflow-hidden">
      <SectionHeader
        title="Navigating the StyleLoom Fashion Journey."
        subtitle="At StyleLoom, we've designed a straightforward shopping experience to make fashion accessible."
        imageSrc={IMAGES.ABSTRACT_DESIGN.ABSTRACT_DESIGN_3}
        position="top-1/2 -translate-y-1/2 -right-40"
        dimensions="xl:w-[361px]! 2xl:w-[446px]! h-auto"
        hasBorder={true}
        className="h-[221px] sm:h-[213px] lg:h-[273px]"
      />
      <div className="grid grid-cols-1 sm:grid-cols-4 fashion-grid relative">
        {fashionJourneyData.map((detail, index) => {
          return (
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
              <div className="p-[30px] sm:p-[20px] lg:p-[40px] 2xl:p-[50px] w-full h-auto">
                <p className="font-normal font-robotmono text-[16px] sm:text-lg 2xl:text-xl text-gray-40 mb-5 sm:mb-6 2xl:mb-[30px]">
                  Step 0{detail.num}
                </p>
                <h3 className="font-roboto font-medium dark:text-primary-bg text-dark-primary-bg mb-2.5 sm:mb-3 2xl:mb-[16px] leading-[150%] text-xl sm:text-[22px] 2xl:text-[28px]">
                  {detail.title}
                </h3>
                <p className="font-roboto font-normal text-sm sm:text-[16px] 2xl:text-lg text-gray-50 leading-[150%]">
                  {detail.description}
                </p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
