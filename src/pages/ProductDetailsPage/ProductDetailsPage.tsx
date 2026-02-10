import ProductDetailsSection from "@/components/common/products/ProductDetailsSection/ProductDetailsSection";
import TestimonialsSection from "@/components/common/sections/TestimonialsSection/TestimonialsSection";
import FAQSection from "@/components/common/sections/FAQSection/FAQSection";
import CTASection from "@/components/common/sections/CTASection/CTASection";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { productService } from "@/firebase/productService";

export default function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState<any>(null);

  const reduxProduct = useSelector((state: RootState) =>
    state.product.allProducts.find((p) => p.id === id),
  );

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        navigate("/products");
        return;
      }

      setIsLoading(true);

      if (reduxProduct) {
        setProduct(reduxProduct);
        setIsLoading(false);
        return;
      }

      try {
        const firebaseProduct = await productService.getProductById(id);
        
        if (firebaseProduct) {
          setProduct(firebaseProduct);
        } else {
          console.error(`Product with ID ${id} not found`);
          navigate("/products");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        navigate("/products");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate, reduxProduct]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brown-60"></div>
        <p className="ml-4 text-gray-500">Loading product details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <p className="text-gray-500">Product not found</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-[40px]">
      <ProductDetailsSection {...product} />
      <TestimonialsSection />
      <FAQSection />
      <CTASection
        title="elevate your wardrobe"
        description="Don't miss out – experience the epitome of fashion by clicking 'Buy Now' and embrace a world of chic elegance delivered to your doorstep. Your style journey begins here."
      />
    </div>
  );
}