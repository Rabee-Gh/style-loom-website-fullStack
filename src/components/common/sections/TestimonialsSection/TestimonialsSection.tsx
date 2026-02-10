import { FaArrowDown, FaArrowUp } from "react-icons/fa6";
import { useSelector } from "react-redux";
import type { RootState } from "../../../../redux/store";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import ArrowShape from "../../../non-common/ArrowShape/ArrowShape";
import RatingStars from "../../testimonials/RatingStars/RatingStars";
import SectionHeader from "../../UI/SectionHeader";
import { ICONS, UIcon } from "@/constants/icons";
import { IMAGES } from "@/constants/images";
import { Reveal } from "../../Motion/Reveal";

function TestimonialsSection() {
  const { testmonials } = useSelector((state: RootState) => state.testmonials);
  const [showTestimonials, setShowTestimonials] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 640);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const itemsPerPage = 6;

  useEffect(() => {
    const resizeWindow = () => {
      setIsMobile(window.innerWidth < 640);
    };
    window.addEventListener("resize", resizeWindow);
    return () => {
      window.removeEventListener("resize", resizeWindow);
    };
  }, []);

  const functionShowTestimonials = () => {
    setShowTestimonials((prev) => !prev);
  };
  const displayedTestimonials =
    isMobile && !showTestimonials
      ? testmonials.slice(0, 3)
      : testmonials.slice(
          currentPage * itemsPerPage,
          (currentPage + 1) * itemsPerPage,
        );
  const displayedTestmonialsInMobile =
    isMobile && !showTestimonials ? testmonials.slice(0, 3) : testmonials;
  const pageCount = Math.ceil(testmonials.length / itemsPerPage);

  const handlePageClick = (event: { selected: number }) => {
    setCurrentPage(event.selected);
  };
  return (
    <section
      className="relative flex flex-col mb-[50px] xl:mb-[80px] 2xl:mb-[100px]
    font-roboto custom-dashed rounded-[16px]"
    >
      <SectionHeader
        title="The StyleLoom Testimonial Collection."
        subtitle="At StyleLoom, our customers are the heartbeat of our brand."
        imageSrc={IMAGES.ABSTRACT_DESIGN.ABSTRACT_DESIGN_4}
        hasBorder={true}
        position="-right-20 2xl:-right-30 top-1/2 -translate-y-1/2"
        dimensions="h-[316px] w-[316px] 2xl:h-[446px] 2xl:w-[446px]"
        className="2xl:h-[273px] lg:h-[213px] items-center justify-center"
      />
      <div className="relative">
        <div className="grid lg:grid-cols-3 sm:grid-cols-2 testimonials-grid">
          {(!isMobile
            ? displayedTestimonials
            : displayedTestmonialsInMobile
          ).map((testmonial, index) => {
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
                <div className="flex flex-col justify-center 2xl:h-[358px] lg:h-[312px] 2xl:p-[60px] xl:p-[50px] p-[30px] h-full">
                  <div className="flex flex-col items-start justify-start 2xl:gap-[40px] xl:gap-[30px] gap-[25px]">
                    <div className="flex flex-row w-full items-center justify-between">
                      <div className="flex flex-row items-center justify-between">
                        <div>
                          <img
                            className="2xl:w-[80px] 2xl:h-[80px] xl:w-[60px] xl:h-[60px] w-[50px] h-[50px] rounded-full"
                            src={testmonial.image}
                            alt="member photo"
                          />
                        </div>
                        <div className="ml-[12px]">
                          <div className="text-primarybg font-medium 2xl:text-xl xl:text-lg text-base cursor-pointer">
                            {testmonial.name}
                          </div>
                          <div className="mt-[4px] text-gray-40 font-normal 2xl:text-lg xl:text-base text-sm">
                            {testmonial.country}
                          </div>
                        </div>
                      </div>
                      <div>
                        <UIcon
                          icon={ICONS.MEDIA_PLATFORM.TWITTER}
                          className="text-brown-70 w-[25px] h-[21px] 2xl:w-[30px] 2xl:h-[25px]"
                          alt="twitter"
                        />
                      </div>
                    </div>
                    <RatingStars rate={5} />
                    <div className="text-gray-50 2xl:text-lg xl:text-base text-sm">
                      {testmonial.desc}
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {!isMobile && testmonials.length > itemsPerPage && (
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            breakLabel={"..."}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={"flex justify-center p-[30px] space-x-1"}
            pageClassName={
              "pagination-item px-4 py-2 border-1 font-roboto custom-dashed rounded hover:bg-brown-70 hover:border-0"
            }
            pageLinkClassName={"px-0 py-0"}
            previousClassName={"pagination-item flex justify-center"}
            previousLinkClassName={
              "px-4 py-2 border-1 font-roboto custom-dashed rounded hover:bg-brown-70 hover:border-0"
            }
            nextClassName={"pagination-item flex justify-center"}
            nextLinkClassName={
              "px-4 py-2 border-1 font-roboto custom-dashed rounded hover:bg-brown-70 hover:border-0"
            }
            breakClassName={"pagination-item"}
            breakLinkClassName={"px-4 py-2 font-roboto custom-dashed rounded"}
            activeClassName={"!border-0 bg-brown-70 text-white"}
          />
        )}
        <ArrowShape className="absolute top-1/2 -translate-y-1/2 right-0" />
        <ArrowShape className="absolute top-1/2 -translate-y-1/2 left-0 transform scale-x-[-1]" />
        <div className="sm:hidden custom-dashed-t text-gray-70 flex flex-row items-center justify-center font-robotmono px-[20px] py-[30px]">
          <button
            className="flex flex-row items-center justify-center text-base font-normal"
            onClick={functionShowTestimonials}
          >
            {showTestimonials ? "View Less" : "View All"}
            <span className="ml-[10px] text-sm">
              {showTestimonials ? <FaArrowUp /> : <FaArrowDown />}
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;
