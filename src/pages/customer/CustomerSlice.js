import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    customers: [],
    loadDataFailed: false,
    resultAction: {
        display: false,
        status: false
    }
}

const customerSlice = createSlice({
    name: 'customer',
    initialState: initialState,
    reducers: {
        loadData(state) {},
        loadDataSuccess(state, { payload }) {
            state.customers = payload.filter(data => data.isDeleted === false);
        },
        loadDataFailed(state) {
            state.loadDataFailed = true;
        },
        addData() {},
        addDataSuccess(state, { payload }) {
            state.customers.push(payload);
            state.resultAction = {
                display: true,
                status: true
            }
        },
        setDefaultResultMessage(state) {
            state.resultAction = {
                display: false
            }
        },
        editData() {},
        editDataSuccess(state, { payload }) {
            const index = state.customers.findIndex((e) => e.id === payload.id);
            state.customers[index] = payload;
            state.resultAction = {
                display: true,
                status: true
            };
        },
        deletedData() {},
        deleteDataSuccess(state, { payload }) {
            state.customers = state.customers.filter(data => data.id !== payload)
        }


    }
});
export const customerActions = customerSlice.actions;
export default customerSlice.reducer;