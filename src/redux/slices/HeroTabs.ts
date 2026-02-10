import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { FilterType, TabDetailsMap, TabDetail } from "../../type";

interface HeroState {
  activeTab: FilterType;
  tabDetails: TabDetailsMap;
}

const initialState: HeroState = {
  activeTab: "All",
  tabDetails: {
    All: {
      title: "Elevate Your Style with StyleLoom",
      description:
        "Explore a world of fashion at StyleLoom, where trends meet affordability. Immerse yourself in the latest styles and seize exclusive promotions.",
    },
    Men: {
      title: "Transform Your Look with StyleLoom",
      description:
        "Discover the ultimate fashion destination at StyleLoom, where style meets savings. Dive into the latest trends and enjoy special offers tailored just for you.",
    },
    Women: {
      title: "Unleash Your Creativity with StyleLoom",
      description:
        "Step into StyleLoom, the hub of contemporary fashion, where affordability meets chic design. Browse our exclusive collections and take advantage of unbeatable deals.",
    },
    Kids: {
      title: "Enhance Your Wardrobe with StyleLoom",
      description:
        "Join the fashion movement at StyleLoom, where innovation meets elegance. Explore our curated selections and enjoy exclusive offers that elevate your wardrobe.",
    },
  },
};

const heroSlice = createSlice({
  name: "hero",
  initialState,
  reducers: {
    setHeroTab(state, action: PayloadAction<FilterType>) {
      state.activeTab = action.payload;
    },
    updateTabDetail(
      state,
      action: PayloadAction<{ tab: FilterType; detail:TabDetail }>
    ) {
      state.tabDetails[action.payload.tab] = action.payload.detail;
    },
  },
});
export const { setHeroTab, updateTabDetail } = heroSlice.actions;
export default heroSlice.reducer;
