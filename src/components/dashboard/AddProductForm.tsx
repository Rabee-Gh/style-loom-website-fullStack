import { useState } from "react";
import { Product } from "@/type";
import { FaXmark } from "react-icons/fa6";
import { ProductInfoFields } from "./AddProductForm/ProductInfoFields";
import { MediaAssetsFields } from "./AddProductForm/MediaAssetsFields";

interface AddProductFormProps {
  onClose: () => void;
  onSave: (product: Product) => void;
}

const DEFAULT_FORM: Partial<Product> = {
  ProductName: "",
  Pricevalue: "",
  category: "Womenswear",
  type: "Women",
  Fitvalue: "Regular Fit",
  ProductImage: "",
  designSummary: "",
  image1: "",
  image2: "",
  image3: "",
  Status: "In Stock",
  OriginStory: "Crafted with care...",
  Materials: "Cotton Blend",
  features: [],
  MaterialImg: "/assets/images/evening-gown/evening-gown-4.webp",
};

export default function AddProductForm({
  onClose,
  onSave,
}: AddProductFormProps) {
  const [formData, setFormData] = useState<Partial<Product>>({
    ...DEFAULT_FORM,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (key: keyof Product, val: string) => {
    setFormData((prev) => ({ ...prev, [key]: val }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.ProductName || !formData.Pricevalue) {
      alert("Please fill in at least Name and Price.");
      return;
    }
    onSave(formData as Product);
  };

  const inputClass =
    "w-full p-2.5 border border-dark-15 rounded-md bg-white dark:bg-dark-10 dark:text-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-dark-primary-bg/20 transition-all";
  const labelClass =
    "block text-xs font-mono text-gray-500 mb-1.5 uppercase tracking-wider";

  return (
    <div className="w-full h-full lg:h-auto overflow-y-auto lg:overflow-visible bg-white/95 dark:bg-dark-15/95 backdrop-blur-xl border-b-2 border-dark-15 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300 fixed inset-0 lg:relative z-50 lg:z-auto">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6 lg:py-10 relative h-full lg:h-auto overflow-y-auto lg:overflow-visible">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 lg:top-6 lg:right-6 p-2 lg:p-3 hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-400 hover:text-red-500 rounded-full transition-all active:scale-90"
          title="Close Form"
        >
          <FaXmark className="text-xl lg:text-2xl" />
        </button>

        <h2 className="text-lg lg:text-[22px] font-bold font-mono mb-6 lg:mb-8 text-dark-12 dark:text-white flex items-center gap-3">
          <span className="w-1.5 lg:w-2 h-6 lg:h-8 bg-brown-60 rounded-full"></span>
          New Product Entry
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-12 gap-6">
          <ProductInfoFields
            formData={formData}
            handleChange={handleChange}
            inputClass={inputClass}
            labelClass={labelClass}
          />
          <MediaAssetsFields
            formData={formData}
            onImageChange={handleImageChange}
          />
        </form>
      </div>
    </div>
  );
}
