import { IMAGES } from "@/constants/images";
import { DataContact } from "@/components/non-common/sections/PolicySection/PolicySection";

export const returnPolicyData: DataContact[] = [
  {
    image: IMAGES.RETURN_POLICY.ELIGIBILITY,
    title: "Eligibility",
    paragraph:
      "Items must be unused, with tags attached, and returned within 30 days of delivery.",
  },
  {
    image: IMAGES.RETURN_POLICY.PROCESS,
    title: "Process",
    paragraph:
      "Initiate returns through our Return Center for a smooth and efficient process.",
  },
  {
    image: IMAGES.RETURN_POLICY.REFUND,
    title: "Refund",
    paragraph:
      "Expect a refund to your original payment method within 7-10 business days.",
  },
];

export const cancellationPolicyData: DataContact[] = [
  {
    image: IMAGES.CANCELLATION_POLICY.WINDOW,
    title: "Cancellation Window",
    paragraph:
      "Orders can be canceled within 24 hours of placement for a full refund.",
  },
  {
    image: IMAGES.CANCELLATION_POLICY.PROCESS,
    title: "Cancellation Process",
    paragraph:
      "Visit our Order Management section to cancel your order effortlessly.",
  },
  {
    image: IMAGES.CANCELLATION_POLICY.TIMELINE,
    title: "Refund Timeline",
    paragraph:
      "Refunds for canceled orders are processed within 5-7 business days.",
  },
];
