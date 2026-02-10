import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { FilterType, Product, ProductState } from "@/type";
import { groupByCategory } from "@/utils/groupByCategory";
import { 
  fetchProducts, 
  addProductAsync, 
  updateProductAsync,
  deleteProductAsync,
  deleteMultipleProductsAsync,
  syncWithFirebase,
  listenToProducts
} from "../../thunks/productThunks";

const initialState: ProductState = {
    allProducts: [],
    activeType: "Women" as FilterType,
    filteredProducts: [],
    activeTypeForSections: "Women",
    filteredSections: [],
    selectedProductIds: [],
    viewMode: 'list',
    isDeleteHovered: false,
    currentPage: 0,
    listVisibleCount: 100,
    loading: false,
    error: null,
    lastSync: null,
};

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload;
        },
        
        setActiveType(state, action: PayloadAction<FilterType>) {
            state.activeType = action.payload;
            state.currentPage = 0;

            if (action.payload === "All") {
                state.filteredProducts = state.allProducts;
            } else {
                state.filteredProducts = state.allProducts
                    .filter(product => product.type === action.payload)
                    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            }
        },
        
        setFilteredSections(state, action: PayloadAction<FilterType>) {
            state.activeTypeForSections = action.payload;

            const products = action.payload === "All"
                ? state.allProducts
                : state.allProducts.filter(p => p.type === action.payload);
            const grouped = groupByCategory(products);

            state.filteredSections = grouped.map(group => ({
                category: group.category,
                products: group.products,
                showAll: false,
            }));
        },
        
        toggleProductSelection(state, action: PayloadAction<string>) {
            const id = action.payload;
            if (state.selectedProductIds.includes(id)) {
                state.selectedProductIds = state.selectedProductIds.filter(selectedId => selectedId !== id);
            } else {
                state.selectedProductIds.push(id);
            }
        },
        
        clearSelection(state) {
            state.selectedProductIds = [];
        },
        
        selectAll(state, action: PayloadAction<string[]>) {
            state.selectedProductIds = action.payload;
        },
        
        setViewMode(state, action: PayloadAction<'grid' | 'list'>) {
            state.viewMode = action.payload;
        },
        
        setDeleteHovered(state, action: PayloadAction<boolean>) {
            state.isDeleteHovered = action.payload;
        },
        
        loadMoreListItems(state) {
            state.listVisibleCount += 100;
        },

        setProductsFromRealtime(state, action: PayloadAction<Product[]>) {
            state.allProducts = action.payload;
            state.lastSync = new Date().toISOString();
            
            if (state.activeType === "All") {
                state.filteredProducts = action.payload;
            } else {
                state.filteredProducts = action.payload
                    .filter(product => product.type === state.activeType)
                    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            }
            
            console.log(`🔄 Real-time update: ${action.payload.length} products`);
        },

        resetProductsLocal(state) {
            state.allProducts = [];
            state.filteredProducts = [];
            state.selectedProductIds = [];
            state.loading = false;
            state.error = null;
        },

        updateProductLocal(state, action: PayloadAction<Product>) {
            const index = state.allProducts.findIndex(p => p.id === action.payload.id);
            if (index !== -1) {
                state.allProducts[index] = action.payload;
                
                const filteredIndex = state.filteredProducts.findIndex(p => p.id === action.payload.id);
                if (filteredIndex !== -1) {
                    state.filteredProducts[filteredIndex] = action.payload;
                }
            }
        },

        addProductLocal(state, action: PayloadAction<Product>) {
            state.allProducts.unshift(action.payload);
            
            if (state.activeType === 'All' || state.activeType === action.payload.type) {
                state.filteredProducts.unshift(action.payload);
                state.filteredProducts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            }
        },

        deleteProductLocal(state, action: PayloadAction<string>) {
            const id = action.payload;
            state.allProducts = state.allProducts.filter(p => p.id !== id);
            state.filteredProducts = state.filteredProducts.filter(p => p.id !== id);
            state.selectedProductIds = state.selectedProductIds.filter(selectedId => selectedId !== id);
        },

        setLastSync(state, action: PayloadAction<string>) {
            state.lastSync = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // ========== fetchProducts ==========
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.allProducts = action.payload;
                state.lastSync = new Date().toISOString();
                
                if (state.activeType === "All") {
                    state.filteredProducts = action.payload;
                } else {
                    state.filteredProducts = action.payload
                        .filter(product => product.type === state.activeType)
                        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                }
                console.log(`✅ Products loaded from Firebase Realtime DB: ${action.payload.length} items`);
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || 'Failed to load products from Firebase Realtime DB';
                console.error('❌ Failed to load products from Firebase Realtime DB:', action.payload);
            })
            
            // ========== addProductAsync ==========
            .addCase(addProductAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(addProductAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.lastSync = new Date().toISOString();
                
                const productExists = state.allProducts.some(p => 
                    p.id === action.payload.id || 
                    (p.ProductName === action.payload.ProductName && 
                     p.Pricevalue === action.payload.Pricevalue &&
                     p.type === action.payload.type)
                );
                
                if (!productExists) {
                    state.allProducts.unshift(action.payload);
                    
                    if (state.activeType === 'All' || state.activeType === action.payload.type) {
                        state.filteredProducts.unshift(action.payload);
                        state.filteredProducts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                    }
                    
                    console.log(`✅ Product added via Firebase Realtime DB: ${action.payload.ProductName} (ID: ${action.payload.id})`);
                } else {
                    console.log(`⚠️ Product already exists, not adding duplicate: ${action.payload.ProductName}`);
                }
            })
            .addCase(addProductAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || 'Failed to add product to Firebase Realtime DB';
                console.error('❌ Failed to add product to Firebase Realtime DB:', action.payload);
            })
            
            // ========== updateProductAsync ==========
            .addCase(updateProductAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateProductAsync.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.allProducts.findIndex(p => p.id === action.payload.id);
                if (index !== -1) {
                    state.allProducts[index] = action.payload;
                    state.lastSync = new Date().toISOString();
                    
                    const filteredIndex = state.filteredProducts.findIndex(p => p.id === action.payload.id);
                    if (filteredIndex !== -1) {
                        state.filteredProducts[filteredIndex] = action.payload;
                    }
                }
                console.log(`✅ Product updated via Firebase Realtime DB: ${action.payload.ProductName}`);
            })
            .addCase(updateProductAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || 'Failed to update product in Firebase Realtime DB';
                console.error('❌ Failed to update product in Firebase Realtime DB:', action.payload);
            })
            
            // ========== deleteProductAsync ==========
            .addCase(deleteProductAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteProductAsync.fulfilled, (state, action) => {
                state.loading = false;
                const id = action.payload;
                state.allProducts = state.allProducts.filter(p => p.id !== id);
                state.filteredProducts = state.filteredProducts.filter(p => p.id !== id);
                state.selectedProductIds = state.selectedProductIds.filter(selectedId => selectedId !== id);
                state.lastSync = new Date().toISOString();
                console.log(`✅ Product deleted via Firebase Realtime DB: ID ${id}`);
            })
            .addCase(deleteProductAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || 'Failed to delete product from Firebase Realtime DB';
                console.error('❌ Failed to delete product from Firebase Realtime DB:', action.payload);
            })
            
            // ========== deleteMultipleProductsAsync ==========
            .addCase(deleteMultipleProductsAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteMultipleProductsAsync.fulfilled, (state, action) => {
                state.loading = false;
                const ids = action.payload;
                state.allProducts = state.allProducts.filter(p => !ids.includes(p.id));
                state.filteredProducts = state.filteredProducts.filter(p => !ids.includes(p.id));
                state.selectedProductIds = state.selectedProductIds.filter(id => !ids.includes(id));
                state.lastSync = new Date().toISOString();
                console.log(`✅ ${ids.length} products deleted via Firebase Realtime DB`);
            })
            .addCase(deleteMultipleProductsAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || 'Failed to delete products from Firebase Realtime DB';
                console.error('❌ Failed to delete products from Firebase Realtime DB:', action.payload);
            })
            
            // ========== syncWithFirebase ==========
            .addCase(syncWithFirebase.pending, (state) => {
                state.loading = true;
            })
            .addCase(syncWithFirebase.fulfilled, (state, action) => {
                state.loading = false;
                state.allProducts = action.payload;
                state.lastSync = new Date().toISOString();
                
                if (state.activeType === "All") {
                    state.filteredProducts = action.payload;
                } else {
                    state.filteredProducts = action.payload
                        .filter(product => product.type === state.activeType)
                        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                }
                
                console.log(`✅ Sync completed: ${action.payload.length} products`);
            })
            .addCase(syncWithFirebase.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || 'Failed to sync with Firebase Realtime DB';
                console.error('❌ Failed to sync with Firebase Realtime DB:', action.payload);
            });
    },
});

export const { 
    setActiveType, 
    setFilteredSections, 
    toggleProductSelection, 
    clearSelection, 
    selectAll, 
    setViewMode, 
    setDeleteHovered, 
    setCurrentPage, 
    loadMoreListItems,
    setProductsFromRealtime,
    resetProductsLocal,
    updateProductLocal,
    addProductLocal,
    deleteProductLocal,
    setLastSync
} = productSlice.actions;

export { listenToProducts };

export default productSlice.reducer;