import PolicySection from "@/components/non-common/sections/PolicySection/PolicySection";
import TestimonialsSection from "@/components/common/sections/TestimonialsSection/TestimonialsSection";
import FAQSection from "@/components/common/sections/FAQSection/FAQSection";
import CTASection from "@/components/common/sections/CTASection/CTASection";
import ContactInfoSection from "@/components/non-common/sections/ContactInfoSection/ContactInfoSection";
import { returnPolicyData, cancellationPolicyData } from "@/data/contactsData";

export default function ContactPage() {
  return (
    <div className="flex flex-col gap-[80px]">
      <ContactInfoSection />
      {/* RETURN POLICY SECTION */}
      <PolicySection
        header="RETURN POLICY"
        buttonDescription="Read Return Policy"
        data={returnPolicyData}
      />
      {/* CANCELATION POLICY SECTION */}
      <PolicySection
        header="CANCELLATION POLICY"
        buttonDescription="Read Cancellation Policy"
        data={cancellationPolicyData}
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
