import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    listCustomer: [],
    listProduct: [],
    listProductKey: []
};
const OrderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        loadListCustomer() {},
        loadListCustomerSuccess(state, { payload }) {
            state.listCustomer = payload;
        },
        loadListProduct() {},
        loadListProductSuccess(state, { payload }) {
            state.listProduct = payload;
        },
        loadListProductKeySuccess(state, { payload }) {
            state.listProductKey = payload;
        },
    },
});
export const orderActions = OrderSlice.actions;
export default OrderSlice.reducer;