import { useEffect } from "react";
import HeroSection from "@/components/non-common/home/HeroSection/HeroSection";
import ProductsSection from "@/components/common/products/ProductsSection/ProductsSection";
import TrendsSection from "@/components/non-common/home/TrendsSection/TrendsSection";
import TestimonialsSection from "@/components/common/sections/TestimonialsSection/TestimonialsSection";
import FAQSection from "@/components/common/sections/FAQSection/FAQSection";
import CTASection from "@/components/common/sections/CTASection/CTASection";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { setActiveType } from "@/redux/slices/productSlice";
import { baseSectionData } from "@/data/productsHeadData";
import FashionjourneySection from "@/components/non-common/home/FashionjourneySection/FashionjourneySection";
import { fetchProducts } from "@/thunks/productThunks";

export default function HomePage() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    console.log(" HomePage: Loading products...");
    dispatch(fetchProducts());
  }, [dispatch]);

  const activeType = useSelector(
    (state: RootState) => state.product.activeType,
  );
  const filteredProducts = useSelector(
    (state: RootState) => state.product.filteredProducts,
  );

  return (
    <div className="flex flex-col gap-[50px] xl:gap-[80px] 2xl:gap-[100px]">
      <HeroSection />
      <TrendsSection
        heading="Crafting Trends, Inspiring Confidence"
        description="Explore a world of fashion at StyleLoom, where trends meet affordability."
      />
      <FashionjourneySection />
      <ProductsSection
        image={baseSectionData.image}
        alt={baseSectionData.alt}
        hight={baseSectionData.hight}
        imgwidth={baseSectionData.imgwidth}
        heading={baseSectionData.heading}
        text={baseSectionData.text}
        showTabs={baseSectionData.showTabs}
        tabs={["All", "Men", "Women", "Kids"]}
        activeTab={activeType}
        onChange={(tab) => dispatch(setActiveType(tab))}
        products={filteredProducts}
        mode="home"
      />
      <TestimonialsSection />
      <FAQSection />
      <CTASection
        title="elevate your wardrobe"
        description="Don't miss out – experience the epitome of fashion by clicking 'Buy Now' and embrace a world of chic elegance delivered to your doorstep. Your style journey begins here."
      />
    </div>
  );
}
