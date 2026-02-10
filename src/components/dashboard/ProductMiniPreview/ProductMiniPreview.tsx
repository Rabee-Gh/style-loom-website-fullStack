import { Product } from "@/type";

interface ProductMiniPreviewProps {
  product: Product;
}

export const ProductMiniPreview = ({ product }: ProductMiniPreviewProps) => {
  return (
    <div
      className="flex flex-col rounded-[12px] border border-dashed border-white/30
    bg-dark-12 text-white overflow-hidden shadow-2xl w-[45vw] max-h-[80vh] overflow-y-auto transform origin-top-left scale-[0.9] 2xl:scale-100"
    >
      {/* HEADER SECTION MINIATURIZED */}
      <div className="flex flex-col gap-2 p-4 border-b border-dashed border-white/20">
        <div className="flex justify-between items-start gap-4">
          <div className="flex flex-col gap-1">
            <h2 className="font-medium text-lg font-roboto leading-tight">
              {product.ProductName}
            </h2>
            <div className="flex items-center gap-2">
              <p className="text-[10px] text-gray-400 font-roboto line-clamp-1">
                {product.designSummary}
              </p>
              <p className="text-[9px] text-green-400 py-0.5 px-2 bg-green-950 rounded-full shrink-0">
                {product.Status}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="w-16 h-6 bg-dark-15 border border-white/10 rounded-full flex items-center justify-center text-[8px]">
              Add to Cart
            </div>
            <div className="w-16 h-6 bg-brown-60 rounded-full flex items-center justify-center text-[8px]">
              Shop Now
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        {/* IMAGES SECTION MINIATURIZED */}
        <div className="flex gap-2 p-3 border-b border-dashed border-white/20">
          <div className="flex-1">
            <img
              src={product.image1}
              alt="image1"
              className="w-full h-32 object-cover rounded-md"
            />
          </div>
          <div className="flex flex-col gap-2 w-1/3">
            <img
              src={product.image2}
              alt="image2"
              className="h-[60px] object-cover rounded-md"
            />
            <img
              src={product.image3}
              alt="image3"
              className="h-[60px] object-cover rounded-md"
            />
          </div>
        </div>

        {/* DETAILS SECTION MINIATURIZED - GRID FOR 2 COLUMNS */}
        <div className="grid grid-cols-2 text-[10px]">
          {/* LEFT COLUMN */}
          <div className="flex flex-col border-r border-dashed border-white/20">
            <div className="p-3 border-b border-dashed border-white/20 bg-white/5 font-bold">
              Materials, Care and origin
            </div>
            <div className="p-3 border-b border-dashed border-white/20">
              <p className="text-gray-400 mb-1">Join Life</p>
              <p className="line-clamp-3 text-[9px]">{product.OriginStory}</p>
            </div>
            <div className="p-3">
              <p className="text-gray-400 mb-1">Materials</p>
              <p className="line-clamp-2 text-[9px] mb-2">
                {product.Materials}
              </p>
              <img
                src={product.MaterialImg}
                alt="material"
                className="w-full h-20 object-cover rounded-md"
              />
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="flex flex-col">
            <div className="p-3 border-b border-dashed border-white/20 bg-white/5 font-bold">
              Features
            </div>
            <div className="p-3 border-b border-dashed border-white/20">
              <ul className="list-disc pl-4 flex flex-col gap-0.5 text-[9px]">
                {product.features?.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </div>
            <div className="p-3 border-b border-dashed border-white/20">
              <p className="text-gray-400 mb-1 font-bold">Price</p>
              <p className="text-lg font-bold text-amber-400">
                {product.Pricevalue}
              </p>
            </div>
            <div className="p-3">
              <p className="text-gray-400 mb-1">Available Sizes</p>
              <div className="flex flex-wrap gap-1">
                {product.AvialableSize?.map((s) => (
                  <span
                    key={s}
                    className="px-2 py-0.5 bg-dark-15 rounded-full text-[8px]"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
