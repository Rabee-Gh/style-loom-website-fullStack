import { 
  ref, 
  set, 
  update, 
  remove, 
  get, 
  push, 
  query,
  orderByChild,
  onValue,
  DataSnapshot
} from 'firebase/database';
import { db } from '../firebase';
import { Product } from '@/type';

const PRODUCTS_PATH = 'products';

const snapshotToProducts = (snapshot: DataSnapshot): Product[] => {
  const products: Product[] = [];
  
  snapshot.forEach((childSnapshot) => {
    const productData = childSnapshot.val();
    const productId = childSnapshot.key || '';
    
    products.push({
      id: productId, 
      type: productData.type || 'Women',
      ProductImage: productData.ProductImage || '',
      category: productData.category || 'Womenswear',
      ProductName: productData.ProductName || '',
      Fitvalue: productData.Fitvalue || 'Regular Fit',
      Pricevalue: productData.Pricevalue || '$0.00',
      createdAt: productData.createdAt || new Date().toISOString(),
      image1: productData.image1 || '',
      image2: productData.image2 || '',
      image3: productData.image3 || '',
      MaterialImg: productData.MaterialImg || '',
      Status: productData.Status || 'In Stock',
      OriginStory: productData.OriginStory || '',
      Materials: productData.Materials || '',
      features: productData.features || [],
      designSummary: productData.designSummary || '',
      AvialableSize: productData.AvialableSize || ['S', 'M', 'L'],
    });
  });
  
  return products;
};

export const productService = {
  async getProducts(): Promise<Product[]> {
  try {
    console.log('🔥 Fetching products from Firebase Realtime DB...');
    const productsRef = ref(db, PRODUCTS_PATH);
    
    try {
      const q = query(productsRef, orderByChild('createdAt'));
      const snapshot = await get(q);
      
      if (snapshot.exists()) {
        const products = snapshotToProducts(snapshot);
        const sortedProducts = products.sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        console.log(`🔥 Retrieved ${sortedProducts.length} products (ordered by createdAt)`);
        return sortedProducts;
      }
    } catch (orderError: any) {
      console.log('⚠️ Cannot order by createdAt, fetching without order...');
      const snapshot = await get(productsRef);
      
      if (snapshot.exists()) {
        const products = snapshotToProducts(snapshot);
        console.log(`🔥 Retrieved ${products.length} products (unordered)`);
        return products;
      }
    }
    
    console.log('📭 No products found in Firebase');
    return [];
  } catch (error) {
    console.error('❌ Error fetching products from Firebase:', error);
    throw error;
  }
},

  listenToProducts(callback: (products: Product[]) => void): () => void {
    const productsRef = ref(db, PRODUCTS_PATH);
    const q = query(productsRef, orderByChild('createdAt'));
    
    const unsubscribe = onValue(q, (snapshot) => {
      if (snapshot.exists()) {
        const products = snapshotToProducts(snapshot);
        const sortedProducts = products.sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        callback(sortedProducts);
      } else {
        callback([]);
      }
    }, (error) => {
      console.error('❌ Listen error:', error);
      callback([]);
    });
    
    return unsubscribe;
  },

  async getProductById(id: string): Promise<Product | null> {
    try {
      const productRef = ref(db, `${PRODUCTS_PATH}/${id}`);
      const snapshot = await get(productRef);
      
      if (snapshot.exists()) {
        const productData = snapshot.val();
        return {
          id,
          type: productData.type || 'Women',
          ProductImage: productData.ProductImage || '',
          category: productData.category || 'Womenswear',
          ProductName: productData.ProductName || '',
          Fitvalue: productData.Fitvalue || 'Regular Fit',
          Pricevalue: productData.Pricevalue || '$0.00',
          createdAt: productData.createdAt || new Date().toISOString(),
          image1: productData.image1 || '',
          image2: productData.image2 || '',
          image3: productData.image3 || '',
          MaterialImg: productData.MaterialImg || '',
          Status: productData.Status || 'In Stock',
          OriginStory: productData.OriginStory || '',
          Materials: productData.Materials || '',
          features: productData.features || [],
          designSummary: productData.designSummary || '',
          AvialableSize: productData.AvialableSize || ['S', 'M', 'L'],
        };
      }
      return null;
    } catch (error) {
      console.error(`❌ Error fetching product ${id}:`, error);
      throw error;
    }
  },

  async addProduct(product: Omit<Product, 'id'>): Promise<string> {
    try {
      const productsRef = ref(db, PRODUCTS_PATH);
      const newProductRef = push(productsRef); 
      
      const productWithTimestamp = {
        ...product,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      await set(newProductRef, productWithTimestamp);
      const productId = newProductRef.key || '';
      console.log(`✅ Product added to Firebase Realtime DB: ${productId}`);
      return productId;
    } catch (error) {
      console.error('❌ Error adding product to Firebase:', error);
      throw error;
    }
  },

  async updateProduct(id: string, updates: Partial<Product>): Promise<void> {
    try {
      const productRef = ref(db, `${PRODUCTS_PATH}/${id}`);
      const updateData = {
        ...updates,
        updatedAt: new Date().toISOString(),
      };
      await update(productRef, updateData);
      console.log(`✅ Product updated in Firebase: ${id}`);
    } catch (error) {
      console.error(`❌ Error updating product ${id}:`, error);
      throw error;
    }
  },

  async deleteProduct(id: string): Promise<void> {
    try {
      const productRef = ref(db, `${PRODUCTS_PATH}/${id}`);
      await remove(productRef);
      console.log(`✅ Product deleted from Firebase: ${id}`);
    } catch (error) {
      console.error(`❌ Error deleting product ${id}:`, error);
      throw error;
    }
  },

  async deleteMultipleProducts(ids: string[]): Promise<void> {
    try {
      const updates: { [key: string]: null } = {};
      
      ids.forEach(id => {
        updates[`${PRODUCTS_PATH}/${id}`] = null;
      });
      
      await update(ref(db), updates);
      console.log(`✅ Deleted ${ids.length} products from Firebase`);
    } catch (error) {
      console.error('❌ Error deleting multiple products:', error);
      throw error;
    }
  },

  async getProductsCount(): Promise<number> {
    try {
      const productsRef = ref(db, PRODUCTS_PATH);
      const snapshot = await get(productsRef);
      
      if (snapshot.exists()) {
        return snapshot.size;
      }
      return 0;
    } catch (error) {
      console.error('❌ Error getting products count:', error);
      throw error;
    }
  },

  async checkConnection(): Promise<boolean> {
    try {
      const testRef = ref(db, '_connection_test');
      await set(testRef, { test: Date.now() });
      await remove(testRef);
      return true;
    } catch (error) {
      console.error('❌ Firebase Realtime DB connection error:', error);
      return false;
    }
  }
};