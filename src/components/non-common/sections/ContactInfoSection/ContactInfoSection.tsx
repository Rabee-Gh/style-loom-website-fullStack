import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import ContactInfoCard from "./ContactInfoCard";
import SectionHeader from "../../../common/UI/SectionHeader";
import { IMAGES } from "@/constants/images";
import { Reveal } from "@/components/common/Motion/Reveal";

export default function ContactInfoSection() {
  const contactCards = useSelector(
    (state: RootState) => state.contactCardsSlice.cards,
  );

  return (
    <section className="relative w-full custom-dashed rounded-[10px] sm:rounded-[14px] lg:rounded-2xl 2xl:rounded-[20px] overflow-hidden">
      {/* SectionHeader */}
      <SectionHeader
        title="Your Partner in Every Step of Your Fashion Journey."
        subtitle="24/7 Assistance for Seamless Shopping and Unmatched Customer Satisfaction."
        imageSrc={IMAGES.ABSTRACT_DESIGN.ABSTRACT_DESIGN_6}
        dimensions="sm:-right-[100px] 2xl:-right-[120px] sm:-top-[40px] 2xl:-top-[40px] w-[414px] h-[416px] 2xl:w-[443px] 2xl:h-[446px]"
        hasBorder={false}
      />

      <div className="relative p-[30px] lg:p-10 2xl:p-[50px] custom-dashed-t custom-dashed-b">
        <h3 className="font-roboto font-medium uppercase text-xl lg:text-2xl 2xl:text-3xl">
          Contact Information
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 contact-info-grid">
        {contactCards.map((card, index) => (
          <Reveal
            key={card.id}
            variant="fade-up"
            distance={10}
            duration={0.5}
            delay={index * 0.15}
            ease="easeOut"
            once={false}
            className="custom-dashed-r custom-dashed-b"
          >
            <ContactInfoCard
              iconBg={card.iconBg}
              iconMain={card.iconMain}
              title={card.title}
              content={card.content}
            />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
