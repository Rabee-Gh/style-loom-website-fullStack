import { IMAGES } from "@/constants/images";

export interface TrendItem {
  title: string;
  description: string;
  imageUrl: string;
  imagePosition: string;
}

export const trendsData: TrendItem[] = [
  {
    title: "Passionate Craftsmanship",
    description:
      "Every garment at StyleLoom is crafted with passion, reflecting our commitment to quality and innovation.",
    imagePosition: IMAGES.TRENDS.PASSIONATE_CRAFTSMANSHIP.BG,
    imageUrl: IMAGES.TRENDS.PASSIONATE_CRAFTSMANSHIP.ICON,
  },
  {
    title: "Fashion Forward",
    description:
      "We're more than a brand; we're trendsetters, curating styles that empower and inspire confidence.",
    imagePosition: IMAGES.TRENDS.FASHION_FORWARD.BG,
    imageUrl: IMAGES.TRENDS.FASHION_FORWARD.ICON,
  },
  {
    title: "Customer-Centric Approach",
    description:
      "At StyleLoom, our customers are at the heart of everything we do. Your satisfaction is our measure of success.",
    imagePosition: IMAGES.TRENDS.CUSTOMER_CENTRIC_APPROACH.BG,
    imageUrl: IMAGES.TRENDS.CUSTOMER_CENTRIC_APPROACH.ICON,
  },
  {
    title: "Global Inspiration",
    description:
      "Influenced by global trends, we bring you a diverse and dynamic collection, embodying the spirit of fashion from around the world.",
    imagePosition: IMAGES.TRENDS.GLOBAL_INSPIRATION.BG,
    imageUrl: IMAGES.TRENDS.GLOBAL_INSPIRATION.ICON,
  },
  {
    title: "Empowering Your Style",
    description:
      "Beyond clothing, StyleLoom is a lifestyle. Join us on a journey of self-expression and empowerment through fashion.",
    imagePosition: IMAGES.TRENDS.EMPOWERING_YOUR_STYLE.BG,
    imageUrl: IMAGES.TRENDS.EMPOWERING_YOUR_STYLE.ICON,
  },
  {
    title: "Sustainable Practices",
    description:
      "StyleLoom is committed to sustainability, integrating eco-friendly practices into our production process.",
    imagePosition: IMAGES.TRENDS.SUSTAINABLE_PRACTICES.BG,
    imageUrl: IMAGES.TRENDS.SUSTAINABLE_PRACTICES.ICON,
  },
];
