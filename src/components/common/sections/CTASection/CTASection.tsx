import { MainButton } from "../../MainButton/MainButton";

interface CTASectionPropsType {
  title: string;
  description: string;
}
export default function CTASection(CTASectionProps: CTASectionPropsType) {
  const { title, description } = CTASectionProps;

  return (
    <section className="w-full mx-auto dark:bg-[var(--color-brown-70)] bg-[var(--color-brown-80)] dark:text-[var(--color-dark-primary-bg)] text-[var(--color-dark-primary-bg)] 2xl:p-25 xl:p-20 py-12.5 px-7.5  relative overflow-hidden rounded-xl h-85 flex items-center">
      <div className="lg:flex justify-between block z-2">
        <div className="w-[98%] xl:w-[78%] z-10">
          <h2 className="font-roboto font-medium  2xl:text-[58px] xl:text-[48px] text-[38px]  uppercase ">
            {title}
          </h2>
          <p className="2xl:text-[18px] xl:text-[16px] font-roboto text-[14px] font-normal 2x:mt-3 mt-3 text-[var(--color-dark-15)]">
            {description}
          </p>
        </div>
        <div className=" sm:w-full 2xl:w-[159px] mt-4 lg:absolute  top-3/7 left-[80%] z-2">
          <MainButton
            label="Shop Now"
            to="/products"
            hasFullWidthInCard={true}
            hasFullWidthInCallsection={true}
            hasDarkBack={true}
            arrowIcon={true}
            largerWidth={true}
            className="custom-dashed bg-dark-15/80! text-white/80!"
          />
        </div>
      </div>
      <img
        className="w-[306px] sm:w-[360px] xl:w-[524px] 2xl:w-[623px]
        absolute bottom-[50%] right-[-120px] 
        sm:bottom-[25%] sm:right-0 
        lg:bottom-[25%] lg:right-[-60px] 
        xl:bottom-0 xl:right-[-16px] 
        2xl:bottom-[-10%] 2xl:right-[-3%] 
        z-1"
        src="/assets/icons/abstract-design/abstract-design-1.svg"
        alt=""
      />
    </section>
  );
}
