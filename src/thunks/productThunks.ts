import { createAsyncThunk } from '@reduxjs/toolkit';
import { productService } from '@/firebase/productService';
import { Product } from '@/type';
import { ProductsCardsData } from '@/data/ProductsCardsData';

const LOCAL_STORAGE_KEY = 'styleloom_products_realtime_v1';

const saveBackupToLocalStorage = (products: Product[]) => {
  try {
    const dataToSave = {
      version: 'v1',
      timestamp: new Date().toISOString(),
      data: products,
      count: products.length,
    };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(dataToSave));
    console.log('💾 Saved to localStorage:', products.length, 'products');
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

const loadFromLocalStorage = (): Product[] | null => {
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!saved) return null;
    
    const parsed = JSON.parse(saved);
    
    if (parsed.version !== 'v1' || !Array.isArray(parsed.data)) {
      return null;
    }
    
    console.log('📦 Loaded from localStorage:', parsed.data.length, 'products');
    return parsed.data;
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return null;
  }
};

export const fetchProducts = createAsyncThunk(
  'product/fetchProducts',
  async () => {
    try {
      console.log('🔥 Fetching products from Firebase Realtime DB...');
      
      const firebaseProducts = await productService.getProducts();
      
      if (firebaseProducts.length > 0) {
        console.log('✅ Successfully fetched from Firebase Realtime DB:', firebaseProducts.length, 'products');
        saveBackupToLocalStorage(firebaseProducts);
        return firebaseProducts;
      }
      
      console.log('⚠️ Firebase Realtime DB is empty, checking localStorage...');
      const localProducts = loadFromLocalStorage();
      
      if (localProducts && localProducts.length > 0) {
        console.log('📦 Using data from localStorage');
        return localProducts;
      }
      
      console.log('📝 Using default data');
      const defaultProducts: Product[] = ProductsCardsData.map(product => ({
        ...product,
        id: product.id.toString(), 
      }));
      
      saveBackupToLocalStorage(defaultProducts);
      return defaultProducts;
      
    } catch (error) {
      console.error('❌ Error fetching from Firebase Realtime DB:', error);
      
      const localProducts = loadFromLocalStorage();
      if (localProducts && localProducts.length > 0) {
        console.log('📦 Using localStorage data due to Firebase error');
        return localProducts;
      }
      
      console.log('📝 Using default data due to Firebase error');
      const defaultProducts: Product[] = ProductsCardsData.map(product => ({
        ...product,
        id: product.id.toString(),
      }));
      return defaultProducts;
    }
  }
);

export const addProductAsync = createAsyncThunk(
  'product/addProductAsync',
  async (newProduct: Omit<Product, 'id'>, { rejectWithValue, getState }) => {
    try {
      console.log('➕ Adding product to Firebase Realtime DB...');
      
      const productId = await productService.addProduct(newProduct);
      
      const addedProduct: Product = {
        ...newProduct,
        id: productId,
        createdAt: newProduct.createdAt || new Date().toISOString(),
      };
      
      console.log('✅ Product added to Firebase Realtime DB:', productId);
      
      const state = getState() as any;
      const currentProducts = state.product.allProducts;
      
      const productExists = currentProducts.some((p: Product) => 
        p.id === productId || 
        (p.ProductName === newProduct.ProductName && 
         p.Pricevalue === newProduct.Pricevalue)
      );
      
      if (!productExists) {
        const updatedProducts = [addedProduct, ...currentProducts];
        saveBackupToLocalStorage(updatedProducts);
      } else {
        console.log('⚠️ Product already exists, skipping localStorage update');
      }
      
      return addedProduct;
      
    } catch (error) {
      console.error('❌ Error adding product to Firebase Realtime DB:', error);
      return rejectWithValue('Failed to add product to Firebase Realtime DB');
    }
  }
);

export const updateProductAsync = createAsyncThunk(
  'product/updateProductAsync',
  async ({ id, updates }: { id: string; updates: Partial<Product> }, { rejectWithValue, getState }) => {
    try {
      console.log('✏️ Updating product in Firebase Realtime DB:', id);
      
      await productService.updateProduct(id, updates);
      console.log('✅ Product updated in Firebase Realtime DB:', id);
      
      const state = getState() as any;
      const currentProducts = state.product.allProducts;
      const productIndex = currentProducts.findIndex((p: Product) => p.id === id);
      
      if (productIndex === -1) {
        return rejectWithValue('Product not found in local state');
      }
      
      const updatedProduct = {
        ...currentProducts[productIndex],
        ...updates,
      };
      
      const updatedProducts = [...currentProducts];
      updatedProducts[productIndex] = updatedProduct;
      saveBackupToLocalStorage(updatedProducts);
      
      return updatedProduct;
      
    } catch (error) {
      console.error('❌ Error updating product in Firebase Realtime DB:', error);
      return rejectWithValue('Failed to update product in Firebase Realtime DB');
    }
  }
);

export const deleteProductAsync = createAsyncThunk(
  'product/deleteProductAsync',
  async (id: string, { rejectWithValue, getState }) => {
    try {
      console.log('🗑️ Deleting product from Firebase Realtime DB:', id);
      
      await productService.deleteProduct(id);
      console.log('✅ Product deleted from Firebase Realtime DB:', id);
      
      const state = getState() as any;
      const currentProducts = state.product.allProducts;
      const updatedProducts = currentProducts.filter((p: Product) => p.id !== id);
      saveBackupToLocalStorage(updatedProducts);
      
      return id;
      
    } catch (error) {
      console.error('❌ Error deleting product from Firebase Realtime DB:', error);
      return rejectWithValue('Failed to delete product from Firebase Realtime DB');
    }
  }
);

export const deleteMultipleProductsAsync = createAsyncThunk(
  'product/deleteMultipleProductsAsync',
  async (ids: string[], { rejectWithValue, getState }) => {
    try {
      console.log('🗑️ Deleting multiple products from Firebase Realtime DB:', ids.length);
      
      await productService.deleteMultipleProducts(ids);
      console.log('✅ Products deleted from Firebase Realtime DB:', ids.length);
      
      const state = getState() as any;
      const currentProducts = state.product.allProducts;
      const updatedProducts = currentProducts.filter((p: Product) => !ids.includes(p.id));
      saveBackupToLocalStorage(updatedProducts);
      
      return ids;
      
    } catch (error) {
      console.error('❌ Error deleting products from Firebase Realtime DB:', error);
      return rejectWithValue('Failed to delete products from Firebase Realtime DB');
    }
  }
);

export const syncWithFirebase = createAsyncThunk(
  'product/syncWithFirebase',
  async (_, { rejectWithValue }) => {
    try {
      console.log('🔄 Syncing with Firebase Realtime DB...');
      
      const firebaseProducts = await productService.getProducts();
      
      if (firebaseProducts.length > 0) {
        console.log('🔄 Updating local data from Firebase Realtime DB');
        saveBackupToLocalStorage(firebaseProducts);
        return firebaseProducts;
      }
      
      console.log('✅ Sync completed - no new data in Firebase');
      return [];
      
    } catch (error) {
      console.error('❌ Error syncing with Firebase Realtime DB:', error);
      return rejectWithValue('Failed to sync with Firebase Realtime DB');
    }
  }
);

export const listenToProducts = () => {
  return (dispatch: any, getState: any) => {
    const unsubscribe = productService.listenToProducts((products) => {
      const currentProducts = getState().product.allProducts;
      
      if (JSON.stringify(currentProducts) !== JSON.stringify(products)) {
        dispatch({
          type: 'product/setProductsFromRealtime',
          payload: products,
        });
      }
    });
    
    return unsubscribe;
  };
};