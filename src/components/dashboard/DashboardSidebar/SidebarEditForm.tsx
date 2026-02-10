import { Product } from "@/type";
import { ImageUploadBox } from "../../common/ImageUploadBox/ImageUploadBox";

interface SidebarEditFormProps {
  isMuted: boolean;
  selectedCount: number;
  formData: Partial<Product>;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void;
  handleSave: () => void;
  handleImageChange?: (key: keyof Product, val: string) => void;
  isSaving?: boolean;
}

export const SidebarEditForm = ({
  isMuted,
  selectedCount,
  formData,
  handleChange,
  handleSave,
  handleImageChange,
  isSaving = false,
}: SidebarEditFormProps) => {
  return (
    <div
      className={`p-4 flex flex-col gap-4 ${isMuted ? "opacity-50" : "opacity-100"}`}
    >
      <h3 className="font-bold font-mono text-lg border-b border-dashed border-dark-15 pb-2 text-dark-10 dark:text-white">
        {selectedCount > 0
          ? selectedCount > 1
            ? "Multiple Selected"
            : "Edit Product"
          : "Select to Edit"}
      </h3>

      {!isMuted && (
        <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-mono text-gray-50 dark:text-gray-400">
              Name
            </label>
            <input
              name="ProductName"
              value={formData.ProductName}
              onChange={handleChange}
              className="p-2 border border-dark-15 border-dashed rounded bg-white dark:bg-dark-15 text-dark-10 dark:text-white text-sm focus:ring-1 focus:ring-brown-60 outline-none"
              placeholder="Product Name"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-mono text-gray-50 dark:text-gray-400">
              Price
            </label>
            <input
              name="Pricevalue"
              type="number"
              step="0.01"
              value={formData.Pricevalue}
              onChange={handleChange}
              className="p-2 border border-dark-15 border-dashed rounded bg-white dark:bg-dark-15 text-dark-10 dark:text-white text-sm focus:ring-1 focus:ring-brown-60 outline-none"
              placeholder="0.00"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="product-category"
              className="text-sm font-mono text-gray-50 dark:text-gray-400"
            >
              Category
            </label>
            <select
              id="product-category"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="p-2 border border-dark-15 border-dashed rounded bg-white dark:bg-dark-15 text-dark-10 dark:text-white text-sm focus:ring-1 focus:ring-brown-60 outline-none"
            >
              <option value="Women">Women</option>
              <option value="Men">Men</option>
              <option value="Kids">Kids</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-mono text-gray-50 dark:text-gray-400">
              Description
            </label>
            <textarea
              name="designSummary"
              value={formData.designSummary}
              onChange={handleChange}
              rows={3}
              className="p-2 border border-dark-15 border-dashed rounded bg-white dark:bg-dark-15 text-dark-10 dark:text-white text-sm resize-none focus:ring-1 focus:ring-brown-60 outline-none"
              placeholder="Short description..."
            />
          </div>

          <div className="flex flex-col gap-2 mt-2">
            <h4 className="text-xs font-mono uppercase text-gray-400 border-b border-dashed border-dark-15 pb-1 mb-2">
              Media Assets
            </h4>

            <ImageUploadBox
              label="Main Image"
              value={formData.ProductImage}
              onChange={(val) =>
                handleImageChange && handleImageChange("ProductImage", val)
              }
              heightClass="h-24"
            />

            <div className="grid grid-cols-3 gap-2">
              <ImageUploadBox
                label="1"
                value={formData.image1 || ""}
                onChange={(val) =>
                  handleImageChange && handleImageChange("image1", val)
                }
                heightClass="h-16"
              />
              <ImageUploadBox
                label="2"
                value={formData.image2 || ""}
                onChange={(val) =>
                  handleImageChange && handleImageChange("image2", val)
                }
                heightClass="h-16"
              />
              <ImageUploadBox
                label="3"
                value={formData.image3 || ""}
                onChange={(val) =>
                  handleImageChange && handleImageChange("image3", val)
                }
                heightClass="h-16"
              />
            </div>
          </div>

          <button
            onClick={handleSave}
            disabled={isSaving}
            className={`mt-4 w-full py-2 bg-brown-80/80 dark:bg-brown-60 text-white font-mono rounded hover:bg-brown-80 dark:hover:bg-brown-70 transition-colors shadow-lg active:scale-[0.98] flex items-center justify-center gap-2 ${
              isSaving ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isSaving ? (
              <>
                <span className="animate-spin">⟳</span>
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      )}
    </div>
  );
};
