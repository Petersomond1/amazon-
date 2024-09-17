
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],
    totalAmount: 0,
    userInfo:[],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action) {
            const newItem = action.payload;
            const existingItem = state.items.find(item => item.id === newItem.id);

            if (!existingItem) {
                state.items.push({
                    ...newItem,
                    quantity: 1
                });
                state.totalAmount += newItem.price;
            } else {
                existingItem.quantity++;
                state.totalAmount += newItem.price;
            }
        },
        removeItem(state, action) {
            const id = action.payload;
            const existingItem = state.items.find(item => item.id === id);

            if (existingItem.quantity === 1) {
                state.items = state.items.filter(item => item.id !== id);
                state.totalAmount -= existingItem.price;
            } else {
                existingItem.quantity--;
                state.totalAmount -= existingItem.price;
            }
        },
        clearCart(state) {
            state.items = [];
            state.totalAmount = 0;
        }
    }
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;