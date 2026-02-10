export interface FilterTabsProps<T extends string> {
  tabs: T[];
  activeTab: T;
  type?: "Hero"|"faq";
  onChange: (tab: T) => void;
}
export interface ShopNowButtonProps {
  to?:string;
  label?:string;
  className?: string;
  isPrimaryButtton?: boolean;
  onClick?: () => void;
  cartCheckoutButton?:boolean;
  shopNowButton?:boolean;
  hasBorder?: boolean;
  hasCustomDashed?: boolean;
  hasFullWidthInCard?: boolean;
  hasFullWidthInCallsection?: boolean;
  inHeroSection?: boolean;
  hasDarkBack?: boolean;
  arrowIcon?: boolean;
  largerWidth?: boolean;
  shopBagIcon?: boolean;
  addtocart?:boolean;
  children?: React.ReactNode;
}

//question section

export type FaqType = "Ordering" | "Shipping" | "Returns" | "Support";
export type FilterFaqType = FaqType | "All";

export interface FaqItem {
  id: number;
  categorey: FaqType;
  question: string;
  answer: string;
}

export interface FAQ {
  id: number;
  categorey: string;
  question: string;
  answer: string;
}

export interface QuestionsCardsProps {
  filteredFaqs?: FAQ[];
}

/////////////////
export type TabDetail = { title: string; description: string };
export type TabDetailsMap = { [key in FilterType]: TabDetail };
export type FilterType = ProductType | "All";
export type ProductType = "Women" | "Men" | "Kids";

// PRODUCTS
// Types we use in Products
export interface Product {
    id: string; 
    type: ProductType;
    ProductImage: string;
    category: string;
    ProductName: string;
    Fitvalue: string;
    Pricevalue: string;
    createdAt: string;
    designSummary: string;
    Status: string;
    image1: string;
    image2: string;
    image3: string;
    OriginStory: string;
    Materials: string;
    MaterialImg: string;
    features: string[];
    AvialableSize: string[];
}

//////////////ProductDetail////////////////////
export interface RowForProductDetailsProps {
    isTitle?: boolean;
    isFeature?: boolean;
    Title?: string;
    features?: string[];
    isLeftSide?: boolean;
    SubTitle?: string;
    isDescription?: boolean;
    Description?: string;
    isMaterial?: boolean;
    MaterialImg?: string;
    isPrice?: boolean;
    Price?: string;
    isAvialableSize?: boolean;
    AvialableSize?: string[];
    isRating?: boolean;
    isGab16?: boolean;
}
export interface RatingRowProductDetailsProps{
     stars: number;
    percentage: number; 
}
export interface ProductCardProps {
    ProductImage: string;
    category: string;
    ProductName: string;
    Fitvalue: string;
    Pricevalue: string;
    id?: string; 
    type?: ProductType;
    createdAt?: string;
}

export interface GroupedCategory {
    category: string;
    products: ProductCardProps[];
}

// For firebase
export interface ProductState {
    allProducts: Product[];
    activeType: FilterType;
    filteredProducts: Product[];
    activeTypeForSections: FilterType;
    filteredSections: Section[];
    selectedProductIds: string[]; 
    viewMode: 'grid' | 'list';
    isDeleteHovered: boolean;
    currentPage: number;
    listVisibleCount: number;
    loading?: boolean; 
    error?: string | null; 
    lastSync?: string | null;
}

export interface Section {
    category: string;
    products: ProductCardProps[];
    showAll: boolean;
}
// END - PRODUCTS