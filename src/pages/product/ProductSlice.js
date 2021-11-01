import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
    loadDataFailed: false,
    deleteDataFailed: false,
    resultAction: {
        display: false,
        status: true
    }
}
const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        loadData() {},
        loadDataSuccess(state, { payload }) {
            state.products = payload.filter(data => data.isDeleted === false);
        },
        loadDataFailed(state) {
            state.loadDataFailed = true
        },
        deleteData() {},
        deleteDataSuccess(state, { payload }) {
            state.products = state.products.filter(product => product.id !== payload);
        },
        deleteDataFailed(state) {
            state.deleteDataFailed = true
        },
        addData() {},
        addDataSuccess(state, { payload }) {
            state.products.push(payload);
            state.resultAction = {
                display: true,
                status: true
            };
        },
        addDataFailed(state) {
            state.resultAction = {
                display: true,
                status: false
            };
        },
        editData() {},
        editDataSuccess(state, { payload }) {
            const index = state.products.findIndex((e) => e.id === payload.id);
            state.products[index] = payload;
            state.resultAction = {
                display: true,
                status: true
            };
        },
        editDataFailed(state) {
            state.resultAction = {
                display: true,
                status: false
            };
        },
        setDefaultResultMessage(state) {
            state.resultAction = {
                display: false
            }
        }

    }
});
export const productActions = productSlice.actions;
export default productSlice.reducer;