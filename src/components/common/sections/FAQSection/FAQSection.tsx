import QuestionsCards from "./QuestionsCards";
import FilterTabs from "../../FilterTabs/FilterTabs";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setActiveTab } from "@/redux/questions";
import SectionHeader from "../../UI/SectionHeader";
import { IMAGES } from "@/constants/images";
export default function FAQSection() {
  const dispatch = useDispatch();
  const activeTab = useSelector((state: RootState) => state.faq.activeTab);
  const filteredFaqs = useSelector(
    (state: RootState) => state.faq.filteredFaqs,
  );

  return (
    <section className="font-roboto flex flex-col custom-dashed rounded-[16px] mb-[100px] max-2xl:mb-[80px] max-md:mb-[50px] overflow-hidden">
      <SectionHeader
        title="Have Questions? We Have Answers."
        subtitle="Ease into the world of StyleLoom with clarity. Our FAQs cover a spectrum of topics."
        imageSrc={IMAGES.ABSTRACT_DESIGN.ABSTRACT_DESIGN_3}
        position="-top-13 -right-25"
        dimensions="w-32 sm:w-50 lg:w-80 h-auto"
        hasBorder={true}
        extraComponent={
          <FilterTabs
            tabs={["All", "Ordering", "Shipping", "Returns", "Support"]}
            activeTab={activeTab}
            onChange={(tab) => dispatch(setActiveTab(tab))}
            type="faq"
          />
        }
      />

      <QuestionsCards filteredFaqs={filteredFaqs} />
    </section>
  );
}
