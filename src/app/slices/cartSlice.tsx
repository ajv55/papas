import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
    description: string;
  }

  interface CartState {
    items?: CartItem[];
    totalQuantity?: number;
    totalPrice?: number;
    isCartOpen?: boolean
  }

const initialState: CartState = {
    items: [],
    isCartOpen: false,
    totalQuantity: 0,
    totalPrice: 0,
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setIsCartOpen: (state, action) => {
            state.isCartOpen = action.payload
        },
        setItems: (state, action) => {
            state.items = action.payload
        },
        addItem: (state: any, action: PayloadAction<CartItem>) => {
            const existingItem = state?.items.find((item: any) => item.id === action.payload.id);
            state.totalQuantity++;
            state.totalPrice += action.payload.price;
      
            if (existingItem) {
              existingItem.quantity++;
            } else {
              state.items.push({ ...action.payload, quantity: 1 });
            }
          },
          removeItem: (state: any, action: PayloadAction<string>) => {
            const existingItem = state.items.find((item: any) => item.id === action.payload);
            if (existingItem) {
              state.totalQuantity--;
              state.totalPrice -= existingItem.price;
      
              if (existingItem.quantity === 1) {
                state.items = state.items.filter((item: any) => item.id !== action.payload);
              } else {
                existingItem.quantity--;
              }
            }
          },
          resetCart(state) {
            state.items = [];
            state.totalPrice = 0;
          },
          updateQuantity: (state: any, action: PayloadAction<{ id: string; quantity: number }>) => {
            const { id, quantity } = action.payload;
            const existingItem = state.items.find((item: any) => item.id === id);
            if (existingItem) {
              state.totalPrice += (quantity - existingItem.quantity) * existingItem.price;
              existingItem.quantity = quantity;
            }
          },
    }
});

export const {setItems, setIsCartOpen, addItem, removeItem, resetCart, updateQuantity} = cartSlice.actions;

export default cartSlice.reducer;