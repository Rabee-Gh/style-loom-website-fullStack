import { Product } from "@/type";

interface ProductInfoFieldsProps {
  formData: Partial<Product>;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void;
  inputClass: string;
  labelClass: string;
}

export const ProductInfoFields = ({
  formData,
  handleChange,
  inputClass,
  labelClass,
}: ProductInfoFieldsProps) => {
  return (
    <div className="col-span-12 lg:col-span-7 flex flex-col gap-8">
      {/* GROUP 1: BASIC IDENTITY */}
      <div className="bg-gray-50 dark:bg-white/5 p-6 rounded-xl border border-gray-100 dark:border-white/10">
        <h3 className="font-mono font-bold text-sm text-gray-400 mb-4 uppercase">
          Basic Information
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="sm:col-span-2">
            <label htmlFor="ProductName" className={labelClass}>
              Product Name
            </label>
            <input
              id="ProductName"
              name="ProductName"
              value={formData.ProductName}
              onChange={handleChange}
              className={inputClass}
              placeholder="e.g. Classic Trench Coat"
            />
          </div>
          <div>
            <label htmlFor="Pricevalue" className={labelClass}>
              Price
            </label>
            <input
              id="Pricevalue"
              name="Pricevalue"
              type="number"
              step="0.01"
              value={formData.Pricevalue}
              onChange={handleChange}
              className={inputClass}
              placeholder="e.g. 120.00"
            />
          </div>
          <div>
            <label htmlFor="Fitvalue" className={labelClass}>
              Fit Type
            </label>
            <input
              id="Fitvalue"
              name="Fitvalue"
              value={formData.Fitvalue}
              onChange={handleChange}
              className={inputClass}
              placeholder="e.g. Regular Fit"
            />
          </div>
        </div>
      </div>

      {/* GROUP 2: CATEGORIZATION & DETAILS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="category" className={labelClass}>
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="Womenswear">Womenswear</option>
            <option value="Menswear">Menswear</option>
            <option value="Kidswear">Kidswear</option>
            <option value="Accessories">Accessories</option>
            <option value="Hand Bag">Hand Bag</option>
          </select>
        </div>
        <div>
          <label htmlFor="type" className={labelClass}>
            Collection Type
          </label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="Women">Women</option>
            <option value="Men">Men</option>
            <option value="Kids">Kids</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="designSummary" className={labelClass}>
            Description
          </label>
          <textarea
            id="designSummary"
            name="designSummary"
            rows={4}
            value={formData.designSummary}
            onChange={handleChange}
            className={inputClass}
            placeholder="Detailed product story and features..."
          />
        </div>
      </div>
    </div>
  );
};
