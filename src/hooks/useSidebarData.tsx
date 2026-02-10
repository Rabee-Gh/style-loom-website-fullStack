import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "@/context/AuthContext";
import { RootState, AppDispatch } from "@/redux/store";
import { Product } from "@/type";
import { ICONS, UIcon } from "@/constants/icons";
import { updateProductAsync } from "@/thunks/productThunks";
import { updateProductLocal } from "@/redux/slices/productSlice";

// PAGES PATH CONSTANT
export const PAGES = [
  {
    name: "Products",
    path: "/products",
    icon: <UIcon icon={ICONS.NAV.PRODUCTS} />,
    shortcutKey: ["p", "P", "ح"],
  },
  {
    name: "Overview",
    path: "/overview",
    icon: <UIcon icon={ICONS.NAV.OVERVIEW} />,
    shortcutKey: ["o", "O", "خ"],
  },
  {
    name: "Home",
    path: "/",
    icon: <UIcon icon={ICONS.NAV.HOME} />,
    shortcutKey: ["h", "H", "ا"],
  },
  {
    name: "Contact",
    path: "/contact",
    icon: <UIcon icon={ICONS.NAV.CONTACT} />,
    shortcutKey: ["c", "C", "ؤ"],
  },
  {
    name: "Cart",
    path: "/cart",
    icon: <UIcon icon={ICONS.NAV.CART} />,
    shortcutKey: ["t", "T", "ف"],
  },
];

export const useSidebarLogic = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const dispatch = useDispatch<AppDispatch>();

  const selectedProductIds = useSelector(
    (state: RootState) => state.product.selectedProductIds,
  );
  const allProducts = useSelector(
    (state: RootState) => state.product.allProducts,
  );

  const [formData, setFormData] = useState<Partial<Product>>({
    ProductName: "",
    designSummary: "",
    Pricevalue: "",
    category: "",
    type: "Women",
  });

  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const selectedCount = selectedProductIds.length;
  const isMuted = selectedCount !== 1;
  const isProductsPage = location.pathname.includes("products");

  const activePage =
    PAGES.find((p) =>
      p.path === "/"
        ? location.pathname === "/"
        : location.pathname.startsWith(p.path),
    ) || PAGES[0];

  useEffect(() => {
    if (selectedCount === 1) {
      const targetId = selectedProductIds[0];
      const product = allProducts.find((p) => p.id === targetId);
      if (product) {
        setFormData({ ...product });
      }
    } else {
      setFormData({
        ProductName: "",
        designSummary: "",
        Pricevalue: "",
        category: "",
        type: "Women",
      });
    }
  }, [selectedProductIds, allProducts, selectedCount]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!formData.ProductName || !formData.Pricevalue) {
      alert("Name and Price are required!");
      return;
    }

    if (selectedCount !== 1) {
      alert("Please select exactly ONE product to edit.");
      return;
    }

    const productId = selectedProductIds[0];
    const productToUpdate = {
      ...formData,
      id: productId,
    } as Product;

    try {
      setIsSaving(true);

      const { id, ...updates } = productToUpdate;
      await dispatch(updateProductAsync({ id, updates })).unwrap();

      dispatch(updateProductLocal(productToUpdate));

      alert("✅ Product updated successfully!");
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleImageChange = (key: keyof Product, val: string) => {
    setFormData((prev) => ({ ...prev, [key]: val }));
  };

  return {
    formData,
    isNavOpen,
    setIsNavOpen,
    selectedCount,
    isMuted,
    activePage,
    isProductsPage,
    handleChange,
    handleImageChange,
    handleSave,
    handleLogout,
    pages: PAGES,
    isSaving,
  };
};
