import { createSlice } from '@reduxjs/toolkit';
import { saveCartToLocalStorage, loadCartFromLocalStorage } from './utils/localStorage';

const initialState = loadCartFromLocalStorage() || {
  items: [],
  totalAmount: 0,
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);
      state.totalAmount += newItem.price;
      state.totalQuantity += 1;
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...newItem, quantity: 1 });
      }
      saveCartToLocalStorage(state);
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      if (existingItem) {
        state.totalAmount -= existingItem.price * existingItem.quantity;
        state.totalQuantity -= existingItem.quantity;
        state.items = state.items.filter(item => item.id !== id);
        saveCartToLocalStorage(state);
      }
    },
    incrementQuantity(state, action) {
      const id = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      if (existingItem) {
        existingItem.quantity += 1;
        state.totalAmount += existingItem.price;
        state.totalQuantity += 1;
        saveCartToLocalStorage(state);
      }
    },
    decrementQuantity(state, action) {
      const id = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity -= 1;
        state.totalAmount -= existingItem.price;
        state.totalQuantity -= 1;
        saveCartToLocalStorage(state);
      } else if (existingItem && existingItem.quantity === 1) {
        state.items = state.items.filter(item => item.id !== id);
        state.totalAmount -= existingItem.price;
        state.totalQuantity -= 1;
        saveCartToLocalStorage(state);
      }
    },
    clearCart(state) {
      state.items = [];
      state.totalAmount = 0;
      state.totalQuantity = 0;
      saveCartToLocalStorage(state);
    },
  },
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    clearToken: (state) => {
      state.token = null;
    },
  },
});
export const { setToken, clearToken } = authSlice.actions;
export const { addItemToCart, removeItemFromCart, incrementQuantity, decrementQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
