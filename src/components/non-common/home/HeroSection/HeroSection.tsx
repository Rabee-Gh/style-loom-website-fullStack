import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { setHeroTab } from "../../../../redux/slices/HeroTabs";
import { useDispatch, useSelector } from "react-redux";
import FilterTabs from "@/components/common/FilterTabs/FilterTabs";
import { MainButton } from "@/components/common/MainButton/MainButton";
import { Reveal } from "@/components/common/Motion/Reveal";
import { IMAGES } from "@/constants/images";
export default function HeroSection() {
  const [firstNumber, setFirstNumber] = useState<number>(0);
  const [secNumber, setSecNumber] = useState<number>(0);
  const dispatch = useDispatch();
  const activeTab = useSelector(
    (state: RootState) => state.heroSlice.activeTab,
  );
  const tabDetails = useSelector(
    (state: RootState) => state.heroSlice.tabDetails,
  );

  const MAX_FIRST = 1500;
  const MAX_SECOND = 30;
  const DURATION = 1500; // ms
  const INTERVAL = 10;

  useEffect(() => {
    let start = 0;
    const steps = DURATION / INTERVAL;
    const interval = setInterval(() => {
      start++;

      setFirstNumber(
        Math.min(Math.round((MAX_FIRST / steps) * start), MAX_FIRST),
      );
      setSecNumber(
        Math.min(Math.round((MAX_SECOND / steps) * start), MAX_SECOND),
      );

      if (start >= steps) {
        clearInterval(interval);
      }
    }, INTERVAL);

    return () => clearInterval(interval);
  }, []);
  return (
    <section className="rounded-[16px] 2xl:rounded-[20px] custom-dashed overflow-hidden">
      {/* IMAGE AND BUTTON */}
      <div className="flex flex-col items-center justify-center relative">
        <img
          className="2xl:h-[624px] lg:h-[442px] md:h-[300px] h-[250px] w-full object-cover"
          src={IMAGES.HERO.IMAGE}
          alt="Hero Image"
        />
        <div
          className="flex flex-row items-center justify-center
          rounded-tl-[20px] rounded-tr-[20px] dark:bg-dark-primary-bg
          p-[10px] xl:p-[13px] 2xl:p-[20px] 
          bg-primary-bg absolute -bottom-[14%] xl:-bottom-[9%] 2xl:-bottom-[8.8%]"
        >
          <MainButton
            label="Shop Now"
            to="/products"
            className="w-[128px]! h-[49px]! 2xl:w-[159px]! 2xl:h-[63px]!
            rounded-[12px] custom-dashed"
            shopNowButton={true}
            hasBorder={true}
            hasDarkBack={true}
            inHeroSection={true}
            arrowIcon={true}
          />
        </div>
      </div>

      {/* TEXT AND NUMBERS */}
      <div className="grid sm:grid-cols-2 grid-cols-1 w-full hero-main-grid">
        {/* FILTER TABS */}
        <div
          className="2xl:px-[80px] xl:px-[60px] lg:px-[40px] lg:min-h-[450px] md:min-h-[420px]
        px-[20px] sm:py-[80px] pt-[50px] pb-[20px]"
        >
          <div className="flex flex-row lg:gap-6 md:gab-4 gap-3">
            <FilterTabs
              tabs={["All", "Men", "Women", "Kids"]}
              activeTab={activeTab}
              onChange={(tab) => dispatch(setHeroTab(tab))}
              type="Hero"
            />
          </div>

          <Reveal
            key={activeTab}
            variant="fade-up"
            distance={10}
            duration={1}
            ease="easeOut"
            once={false}
          >
            <div className="dark:text-primary-text 2xl:text-5xl lg:text-4xl text-[28px] font-medium uppercase 2xl:mt-[30px] lg:mt-[20px] mt-[16px] font-roboto">
              {tabDetails[activeTab].title}
            </div>
          </Reveal>

          <div className="overflow-y-auto text-gray-40 2xl:text-lg xl:text-base text-[12px] font-normal 2xl:mt-[30px] lg:mt-[20px] mt-[16px] font-roboto">
            {tabDetails[activeTab].description}
          </div>
        </div>
        {/* NUMBERS */}
        <div className="grid grid-cols-2 font-roboto hero-numbers-grid">
          <div className="flex flex-col justify-center items-start p-[30px] xl:p-[50px]">
            <div
              className="flex flex-row gap-[8px] items-center justify-center dark:text-primary-text text-dark-primary-bg
            text-[30px] xl:text-[34px] 2xl:text-[50px] font-medium"
            >
              <span>{firstNumber}</span>
              <span>+</span>
            </div>
            <div className="text-gray-50 font-normal text-[14px] xl:text-[16px] 2xl:text-[18px]">
              Fashion Products
            </div>
          </div>
          <div className="flex flex-col justify-center items-start p-[30px] xl:p-[50px]">
            <div
              className="flex flex-row gap-[8px] items-center justify-center text-dark-primary-bg dark:text-primary-text
            text-[30px] xl:text-[34px] 2xl:text-[50px] font-medium"
            >
              <span>{secNumber}</span>
              <span>+</span>
            </div>
            <div className="text-gray-50 font-normal text-[14px] xl:text-[16px] 2xl:text-[18px]">
              New arrivals every month.
            </div>
          </div>

          <div className="flex flex-col justify-center items-start p-[30px] xl:p-[50px]">
            <div
              className="flex flex-row items-center justify-center dark:text-primary-text text-dark-primary-bg
            text-[30px] xl:text-[34px] 2xl:text-[50px] font-medium"
            >
              <div className="">30</div>
              <span className="">%</span>
            </div>
            <div className="text-gray-50 font-normal text-[14px] xl:text-[16px] 2xl:text-[18px]">
              OFF on select items.
            </div>
          </div>

          <div className="flex flex-col justify-center items-start p-[30px] xl:p-[50px]">
            <div
              className="flex flex-row items-center justify-center dark:text-primary-text text-dark-primary-bg
            text-[30px] xl:text-[34px] 2xl:text-[50px] font-medium"
            >
              <div className="">95</div>
              <span className="">%</span>
            </div>
            <div className="text-gray-50 font-normal text-[14px] xl:text-[16px] 2xl:text-[18px]">
              Customer Satisfaction Rate
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
