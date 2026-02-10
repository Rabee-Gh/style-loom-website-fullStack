
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TrendItem, trendsData } from "@/data/trends";

interface TrendsState {
  items: TrendItem[];
}

const initialState: TrendsState = {
  items: trendsData,
};

const trendsSlice = createSlice({
  name: "trends",
  initialState,
  reducers: {
    updateTrend(state, action: PayloadAction<TrendItem>) {
      const index = state.items.findIndex(
        (item) => item.title === action.payload.title
      );
      if (index !== -1) state.items[index] = action.payload;
    },
    addTrend(state, action: PayloadAction<TrendItem>) {
      state.items.push(action.payload);
    },
    removeTrend(state, action: PayloadAction<string>) {
      state.items = state.items.filter(
        (item) => item.title !== action.payload
      );
    },
  },
});

export const { updateTrend, addTrend, removeTrend } = trendsSlice.actions;
export default trendsSlice.reducer;
