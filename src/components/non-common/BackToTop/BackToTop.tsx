import { ICONS } from "@/constants/icons";
import { useEffect, useState } from "react";

export default function BackToTop() {
  const [show, setShow] = useState<boolean>(false);
  useEffect(() => {
    const buttonShow = () => {
      const scrollPos =
        window.pageYOffset || document.documentElement.scrollTop;
      if (scrollPos > 100) {
        setShow(true);
      } else {
        setShow(false);
      }
    };
    window.addEventListener("scroll", buttonShow);
    return () => window.removeEventListener("scroll", buttonShow);
  }, []);

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div
      onClick={() => scrollTop()}
      className={`fixed bottom-26 right-6 xl:right-4 2xl:right-14 z-9999 
            flex flex-col justify-center items-center w-fit h-fit group
            transition-all duration-500 transform ${
              show
                ? "translate-x-0 opacity-100 scale-100"
                : "translate-x-24 opacity-0 scale-0 pointer-events-none"
            }`}
    >
      <button
        className="BackToTop 
                w-10 h-10 xl:w-12 xl:h-12 2xl:w-14 2xl:h-14 rounded-full border-2 border-dashed border-dark-12/20 bg-brown-60/40 group-hover:bg-brown-80
                flex items-center justify-center font-semibold shadow-sm shadow-amber-50/10 
                transition-all ease-in-out duration-500 overflow-hidden"
      >
        <img
          src={ICONS.ARROW.ARROW_UP}
          alt="Back To Top"
          className="w-5 h-5 xl:w-6 xl:h-6 2xl:w-7 2xl:h-7 transition-transform duration-300 arrow group-hover:text-gray-70"
        />
      </button>
    </div>
  );
}
