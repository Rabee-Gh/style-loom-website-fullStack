import Logo from "@/components/common/Logo/Logo";
import CategoriesBarSection from "@/components/common/sections/CategoriesBarSection/CategoriesBarSection";
import { Link } from "react-router-dom";

const socialIcons = ["instagram", "website", "twitter", "behance"];
const homeLinks = ["Why Us", "About Us", "Testimonials", "FAQ's"];
const productLinks = ["Menswear", "Womenswear", "Kidswear"];
const categories = [
  "Tank Top",
  "T-Shirt",
  "Long-Sleeve T-Shirt",
  "Raglan Sleeve Shirt",
  "Crop Top",
  "V-Neck Shirt",
  "Muscle Shirt",
];
export default function Footer() {
  return (
    <footer className="flex flex-col">
      <CategoriesBarSection categories={categories} speed={25} />
      <section className="flex flex-col">
        <div
          className="px-4 sm:px-12 lg:px-[80px] 2xl:px-40.5
          flex flex-col gap-[30px] py-[50px] xl:[80px] 2xl:py-[100px]
          lg:flex-row lg:justify-between lg:items-center
        "
        >
          <Logo dimensions="xl:w-[630px] 2xl:w-[788px]" />
          <div className="flex gap-4 2xl:gap-5">
            {socialIcons.map((icon) => (
              <div
                key={icon}
                className="flex items-center justify-center
                w-12 h-12 lg:w-14 lg:h-14 2xl:w-[66px] 2xl:h-[66px]
                rounded-lg 2xl:rounded-xl bg-brown-80"
              >
                <img
                  src={`/assets/icons/footer/${icon}.svg`}
                  alt={icon}
                  className="w-6 xl:w-7 2xl:w-[34px] transition-transform duration-300 ease-out
                  group-hover:rotate-6 group-hover:scale-110"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="custom-dashed-b h-px w-full opacity-50" />
        <div
          className=" 
          px-4 sm:px-12 lg:px-[80px] 2xl:px-40.5
          pb-[40px] xl:py-[60px] 2xl:py-[80px]
          grid grid-cols-1 lg:grid-cols-3 gap-[30px]
          lg:gap-[50px] 2xl:gap-20
        "
        >
          <div className="flex flex-col gap-5 lg:gap-6 2xl:gap-[30px]">
            <h3 className="font-medium dark:text-white lg:text-lg 2xl:text-[22px]">
              Home
            </h3>

            <ul className="flex items-center gap-2.5 lg:gap-3 2xl:gap-4 flex-wrap">
              {homeLinks.map((item, index) => (
                <li key={item} className="flex items-center gap-2.5">
                  <Link
                    to=""
                    className="
                    font-mono text-sm lg:text-base 2xl:text-xl
                    leading-relaxed text-gray-40
                  "
                  >
                    {item}
                  </Link>
                  {index < homeLinks.length - 1 && (
                    <span className="w-1.5 h-1.5 rounded-full bg-dark-15" />
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-5 lg:gap-6 2xl:gap-[30px]">
            <h3 className="font-medium dark:text-white lg:text-lg 2xl:text-[22px]">
              Products
            </h3>

            <ul className="flex items-center gap-2.5 lg:gap-3 2xl:gap-4 flex-wrap">
              {productLinks.map((item, index) => (
                <li key={item} className="flex items-center gap-2.5">
                  <Link
                    to=""
                    className="
                    font-mono text-sm lg:text-base 2xl:text-xl
                    leading-relaxed text-gray-40
                  "
                  >
                    {item}
                  </Link>
                  {index < productLinks.length - 1 && (
                    <span className="w-1.5 h-1.5 rounded-full bg-dark-15" />
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-5 lg:gap-6 2xl:gap-[30px]">
            <h3 className="font-medium dark:text-white lg:text-lg 2xl:text-[22px]">
              Subscribe to Newsletter
            </h3>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                e.currentTarget.reset();
              }}
            >
              <div
                className="
                flex items-center justify-between
                py-[14px] px-5
                2xl:py-4.5 2xl:px-6
                rounded-[7px] dark:bg-dark-12 bg-brown-80
              "
              >
                <input
                  type="email"
                  placeholder="Your Email"
                  className="
                w-full font-mono text-sm lg:text-base 2xl:text-xl
                  leading-relaxed text-gray-40 focus:outline-none
                "
                />
                <button type="submit">
                  <img
                    src="/assets/icons/general/arrow.svg"
                    alt="arrow"
                    className="w-5 2xl:w-6 cursor-pointer hover:rotate-270 transition-all"
                  />
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="custom-dashed-b h-px w-full opacity-50" />
        <div
          className="
          px-4 sm:px-12 lg:px-[80px] 2xl:px-40.5
          py-[30px] xl:[40px] 2xl:py-[50px]
          flex flex-col gap-5
          md:flex-row md:justify-between md:items-center
        "
        >
          <p
            className="
            font-mono text-sm lg:text-base 2xl:text-xl
            leading-relaxed text-gray-40
          "
          >
            © 2026 StyleLoom. All rights reserved. Focal X Academy v9, Team-X3
          </p>

          <div className="flex items-center gap-4">
            <Link
              to=""
              className="
              pr-2.5 border-r border-dark-15
              font-mono text-sm lg:text-base 2xl:text-xl
              leading-relaxed text-gray-40
            "
            >
              Terms & Conditions
            </Link>
            <Link
              to=""
              className="
              pl-2.5
              font-mono text-sm lg:text-base 2xl:text-xl
              leading-relaxed text-gray-40
            "
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </section>
    </footer>
  );
}
