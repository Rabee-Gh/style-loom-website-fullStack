import { configureStore } from "@reduxjs/toolkit";
import heroSlice from "../slices/HeroTabs";
import testmonialsReducer from "../testmonials";
import faqReducer from "../questions";
import themeReducer from "../slices/DarkButton";
import contactCardsReducer from "../slices/contactCardsSlice";
import productReducer from "../slices/productSlice";
import trendsReducer from "../slices/trendsSlice";

export const store = configureStore({
  reducer: {
    heroSlice: heroSlice,
    testmonials: testmonialsReducer,
    theme: themeReducer,
    product: productReducer,
    faq: faqReducer,
    contactCardsSlice: contactCardsReducer,
    trends: trendsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;