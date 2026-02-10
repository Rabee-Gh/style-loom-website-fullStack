import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { FilterFaqType, FaqItem } from "../../type";

interface FaqState {
  activeTab: FilterFaqType;
  allFaqs: FaqItem[];
  filteredFaqs: FaqItem[];
}

const initialFaqs: FaqItem[] = [
  // Ordering
  {
    id: 1,
    categorey: "Ordering",
    question: "How can I place an order on StyleLoom?",
    answer:
      "Ordering is easy! Simply browse our website, add items to your cart, and proceed to checkout. Follow the prompts to enter your details and complete your purchase.",
  },
  {
    id: 2,
    categorey: "Ordering",
    question: "What payment methods do you accept?",
    answer:
      "We accept a variety of payment methods, including credit/debit cards, net banking, and select digital wallets. Choose the option that suits you best during checkout.",
  },
  {
    id: 3,
    categorey: "Ordering",
    question: "How can I track my order?",
    answer:
      "nce your order is dispatched, you'll receive a tracking number via email. Use this number to track your package in real-time on our website.",
  },
  {
    id: 4,
    categorey: "Ordering",
    question: "Can I modify or cancel my order after placing it?",
    answer:
      "Unfortunately, once an order is confirmed, modifications or cancellations may not be possible. Please review your order carefully before completing the purchase.",
  },
  {
    id: 5,
    categorey: "Ordering",
    question: "Enhance Your Wardrobe with StyleLoom",
    answer:
      "Join the fashion movement at StyleLoom, where innovation meets elegance. Explore our curated selections and enjoy exclusive offers that elevate your wardrobe.",
  },
  {
    id: 6,
    categorey: "Ordering",
    question: "How can I place an order on StyleLoom?",
    answer:
      "Ordering is easy! Simply browse our website, add items to your cart, and proceed to checkout. Follow the prompts to enter your details and complete your purchase.",
  },

  // Shipping
  {
    id: 7,
    categorey: "Shipping",
    question: "What are the available shipping methods?",
    answer:
      "We offer standard, express, and overnight shipping options. Choose the one that suits your needs during checkout.",
  },
  {
    id: 8,
    categorey: "Shipping",
    question: "How can I change my shipping address?",
    answer:
      "If your order has not yet shipped, you can update your shipping address by contacting our customer support team.",
  },
  {
    id: 9,
    categorey: "Shipping",
    question: "Do you provide tracking information?",
    answer:
      "Yes, you will receive tracking information via email as soon as your order is shipped.",
  },
  {
    id: 10,
    categorey: "Shipping",
    question: "What should I do if my package is lost?",
    answer:
      "If your package is lost, please contact our support team. We will help you locate it or process a replacement.",
  },
  {
    id: 11,
    categorey: "Shipping",
    question: "Are there shipping fees?",
    answer:
      "Shipping fees apply based on your location and the shipping method selected. Free shipping is available for orders over a certain amount.",
  },
  {
    id: 12,
    categorey: "Shipping",
    question: "Can I ship to multiple addresses?",
    answer:
      "Currently, you can only ship to one address per order. If you need to ship to multiple addresses, please place separate orders.",
  },

  // Returns
  {
    id: 13,
    categorey: "Returns",
    question: "What is your return policy?",
    answer:
      "We accept returns within 30 days of delivery. Items must be unused and in original packaging for a full refund.",
  },
  {
    id: 14,
    categorey: "Returns",
    question: "How do I return an item?",
    answer:
      "To return an item, fill out the return form included in your package and send it back to us with the original receipt.",
  },
  {
    id: 15,
    categorey: "Returns",
    question: "Will I be refunded for shipping costs on returns?",
    answer:
      "Shipping costs are non-refundable unless the return is due to our error. You will receive a refund for the item cost.",
  },
  {
    id: 16,
    categorey: "Returns",
    question: "Can I exchange an item?",
    answer:
      "Exchanges can be handled through our customer service. Please contact us within 30 days of receiving your order.",
  },
  {
    id: 17,
    categorey: "Returns",
    question: "What if I receive a wrong item?",
    answer:
      "If you receive the wrong item, please contact our support team within 7 days, and we will arrange for a replacement.",
  },
  {
    id: 18,
    categorey: "Returns",
    question: "How long does it take to process a return?",
    answer:
      "Returns are processed within 5-7 business days after we receive your returned item.",
  },

  // Support
  {
    id: 19,
    categorey: "Support",
    question: "How can I contact customer support?",
    answer:
      "You can reach our customer support via email, phone, or through the live chat feature on our website.",
  },
  {
    id: 20,
    categorey: "Support",
    question: "What are the hours of support?",
    answer:
      "Our support team is available from 8 AM to 8 PM, Monday to Saturday.",
  },
  {
    id: 21,
    categorey: "Support",
    question: "Where can I find your FAQs?",
    answer:
      "Our FAQs are available on our website under the 'Help' section. You can find answers to common questions there.",
  },
  {
    id: 22,
    categorey: "Support",
    question: "How do I report an issue with my order?",
    answer:
      "To report an issue, please contact our support team with your order number and details of the problem.",
  },
  {
    id: 23,
    categorey: "Support",
    question: "Can I leave feedback about my experience?",
    answer:
      "Yes, we encourage feedback! You can leave comments on our website or contact us directly.",
  },
  {
    id: 24,
    categorey: "Support",
    question: "How do I unsubscribe from emails?",
    answer:
      "You can unsubscribe from our emails by clicking the 'unsubscribe' link at the bottom of any email we send.",
  },
];

const initialState: FaqState = {
  activeTab: "Shipping",
  allFaqs: initialFaqs,
  filteredFaqs: initialFaqs.filter((faq) => faq.categorey === "Shipping"),
};

const faqSlice = createSlice({
  name: "faq",
  initialState,
  reducers: {
    setActiveTab(state, action: PayloadAction<FilterFaqType>) {
      state.activeTab = action.payload;
      state.filteredFaqs =
        action.payload === "All"
          ? state.allFaqs
          : state.allFaqs.filter((faq) => faq.categorey === action.payload);
    },
  },
});

export const { setActiveTab } = faqSlice.actions;
export default faqSlice.reducer;
