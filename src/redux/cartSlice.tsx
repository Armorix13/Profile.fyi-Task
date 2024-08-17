import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type CartItem = {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
};

type CartState = {
    items: CartItem[];
};

const initialState: CartState = {
    items: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action: PayloadAction<Omit<CartItem, 'quantity'>>) {
            const existingItem = state.items.find(item => item.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }
        },
        clearCart(state) {
            state.items = [];
        },
    },
});

export const { addToCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
