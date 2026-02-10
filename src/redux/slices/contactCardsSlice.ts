import { SHAPES } from "@/constants/shapes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ContactCard {
  id: number;
  iconBg: string;
  iconMain: string;
  title: string;
  content: string;
}

interface ContactCardsState {
  cards: ContactCard[];
}

const initialState: ContactCardsState = {
  cards: [
    {
      id: 1,
      iconBg: SHAPES.CONTACT.DECORATION.EMAIL,
      iconMain: SHAPES.CONTACT.ICONS.EMAIL,
      title: "Email",
      content: "support@StyleLoom.com",
    },
    {
      id: 2,
      iconBg: SHAPES.CONTACT.DECORATION.PHONE,
      iconMain: SHAPES.CONTACT.ICONS.PHONE,
      title: "Phone",
      content: "+1 (555) 123-4567",
    },
    {
      id: 3,
      iconBg: SHAPES.CONTACT.DECORATION.LOCATION,
      iconMain: SHAPES.CONTACT.ICONS.LOCATION,
      title: "Location",
      content: "Get Direction",
    },
  ],
};

const contactCardsSlice = createSlice({
  name: "contactCards",
  initialState,
  reducers: {
    updateCard(state, action: PayloadAction<ContactCard>) {
      const index = state.cards.findIndex((c) => c.id === action.payload.id);
      if (index !== -1) state.cards[index] = action.payload;
    },
    addCard(state, action: PayloadAction<ContactCard>) {
      state.cards.push(action.payload);
    },
    removeCard(state, action: PayloadAction<number>) {
      state.cards = state.cards.filter((c) => c.id !== action.payload);
    },
  },
});

export const { updateCard, addCard, removeCard } = contactCardsSlice.actions;
export default contactCardsSlice.reducer;
