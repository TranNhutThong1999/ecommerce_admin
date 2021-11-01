import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    orders: [],
    customerCart: {},
    cart: [],
    total: 0,
    loadDataFailed: false
}
const OrderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        loadData(state) {},
        loadDataSuccess(state, { payload }) {
            state.orders = payload;
        },
        loadDataFailed(state) {
            state.loadDataFailed = true;
        },
        addCart(state, { payload }) {
            const index = state.cart.findIndex((data) => data.id === payload.id);
            if (index > -1) {
                state.cart[index].quantity = state.cart[index].quantity + 1;
                state.total += state.cart[index].price;
            } else {
                state.cart.push(payload);
                state.total += payload.price;
            }
        },
        increase(state, { payload }) {
            const index = state.cart.findIndex((data) => data.id === payload);
            state.cart[index].quantity = state.cart[index].quantity + 1;
            state.total += state.cart[index].price;
        },
        decrease(state, { payload }) {
            const index = state.cart.findIndex((data) => data.id === payload);
            if (state.cart[index].quantity === 1) {
                state.total -= state.cart[index].price;
                state.cart = state.cart.filter(cart => cart.id !== payload);
            } else {
                state.cart[index].quantity = state.cart[index].quantity - 1;
                state.total -= state.cart[index].price;
            }
        },
        addCustomerCart(state, { payload }) {
            state.customerCart = payload;
        },
        removeCustomerCart(state) {
            state.customerCart = {
                id: '',
                name: '',
                address: '',
                phone: ''
            };
        },
        order() {},
        orderSuccess(state) {
            console.log("saga");
            state.cart = [];
            state.total = 0;
            state.customerCart = {};
        }
    }
});
export const orderActions = OrderSlice.actions;
export default OrderSlice.reducer