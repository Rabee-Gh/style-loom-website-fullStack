import { Product } from "@/type";
import { FaImage } from "react-icons/fa6";
import { ImageUploadBox } from "../../common/ImageUploadBox/ImageUploadBox";

interface MediaAssetsFieldsProps {
  formData: Partial<Product>;
  onImageChange: (key: keyof Product, val: string) => void;
}

export const MediaAssetsFields = ({
  formData,
  onImageChange,
}: MediaAssetsFieldsProps) => {
  return (
    <div className="col-span-12 lg:col-span-5 flex flex-col h-full">
      <div className="bg-white dark:bg-dark-10 p-6 rounded-xl border-2 border-dashed border-gray-200 dark:border-dark-30 h-full flex flex-col gap-6 shadow-sm">
        <h3 className="font-mono font-bold text-sm text-gray-400 uppercase flex items-center gap-2">
          <FaImage /> Media Assets
        </h3>

        {/* MAIN IMAGE - PROMINENT */}
        <div>
          <ImageUploadBox
            label="Star Product Image (Main)"
            value={formData.ProductImage}
            onChange={(val) => onImageChange("ProductImage", val)}
            heightClass="h-20"
          />
        </div>

        {/* GALLERY GRID */}
        <div className="grid grid-cols-3 gap-4">
          <ImageUploadBox
            label="Gallery 1"
            value={formData.image1}
            onChange={(val) => onImageChange("image1", val)}
            heightClass="h-24"
          />
          <ImageUploadBox
            label="Gallery 2"
            value={formData.image2}
            onChange={(val) => onImageChange("image2", val)}
            heightClass="h-24"
          />
          <ImageUploadBox
            label="Gallery 3"
            value={formData.image3}
            onChange={(val) => onImageChange("image3", val)}
            heightClass="h-24"
          />
        </div>

        <div className="pt-4 border-t border-gray-100 dark:border-white/5 mt-auto">
          <button
            type="submit"
            className="w-full py-3.5 bg-brown-60 hover:bg-brown-70 text-white font-mono font-bold uppercase tracking-widest transition-all rounded-lg shadow-lg hover:shadow-xl active:scale-[0.98] flex items-center justify-center gap-2"
          >
            Apply & Save
          </button>
        </div>
      </div>
    </div>
  );
};
