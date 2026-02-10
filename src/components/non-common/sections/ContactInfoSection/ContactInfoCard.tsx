import { MainButton } from "@/components/common/MainButton/MainButton";
import { Link } from "react-router-dom";

interface ContactInfoCardProps {
  iconBg: string;
  iconMain: string;
  title: string;
  content: string;
}

const ContactInfoCard: React.FC<ContactInfoCardProps> = ({
  iconBg,
  iconMain,
  title,
  content,
}) => {
  return (
    <div
      className="relative w-full z-10 overflow-hidden flex flex-col items-center
    p-[30px] xl:p-[50px] 2xl:p-[60px] gap-6 lg:gap-10 2xl:gap-[50px]"
    >
      {/* UPPER ABSOLUTE SHAPE */}
      <img
        src={iconBg}
        alt={`${title}-bg`}
        className="absolute top-0 right-0 w-[80px] xl:w-[136px] 2xl:w-[164px]"
      />
      {/* CARD ICON */}
      <img src={iconMain} alt={title} className="w-[76px] 2xl:w-[94px]" />
      <div className="w-full flex flex-col items-center gap-[10px] lg:gap-3 2xl:gap-4">
        <p className="text-center font-roboto font-medium text-[18px] md:text-xl 2xl:text-2xl dark:text-white">
          {title}
        </p>
        <MainButton
          className="w-full! custom-dashed dark:bg-dark-12 bg-brown-80 py-[14px] 2xl:py-[18px]"
          hasBorder={true}
        >
          <Link
            to="/contact"
            className="font-roboto text-[14px] 2xl:text-[18px] group relative
            w-full h-full
            text-center text-gray-50"
          >
            {content}
          </Link>
        </MainButton>
      </div>
    </div>
  );
};

export default ContactInfoCard;
