import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    listCustomer: [],
    listProduct: [],
    order: {
        customerCart: null,
        productsCart: [],
        total: 0,
    },
    editingKey: '',
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
        addCustomerOrder(state, { payload }) {
            state.order.customerCart = payload;
        },
        addProductCartDefault(state) {
            state.order.productsCart.push({
                key: state.order.productsCart.length + 1,
                productId: null,
                productName: '',
                price: 0,
                quantity: 1,
                discount: 0,
            });
        },
        chooseProduct(state, { payload }) {
            const indexListProduct = state.listProduct.findIndex(
                (e) => e.id === payload.id
            );
            const product = state.listProduct[indexListProduct];
            state.order.productsCart[payload.index - 1].productId = payload.id;
            state.order.productsCart[payload.index - 1].price = product.price;
            state.order.productsCart[payload.index - 1].productName =
                product.name;
            state.order.total = total(state.order.productsCart);
        },
        changeQuantity(state, { payload }) {
            state.order.productsCart[payload.index - 1].quantity =
                payload.quantity;
            state.order.total = total(state.order.productsCart);
        },
        removeProductCart(state, { payload }) {
            const data = state.order.productsCart.filter(
                (e) => e.productId === payload
            );
            console.log(data.length);
            if (data.length === 2) {
                state.order.productsCart = state.order.productsCart.filter(
                    (e) => e.key !== data[1].key
                );
            } else if (data.length === 1) {
                state.order.productsCart = state.order.productsCart.filter(
                    (e) => e.productId !== payload
                );
            }
            state.order.total = total(state.order.productsCart);
        },
        changeDiscount(state, { payload }) {
            state.order.productsCart[payload.index - 1].discount =
                payload.discount;
            state.order.total = total(state.order.productsCart);
        },
        setEditingKey(state, { payload }) {
            state.editingKey = payload;
        },
        setDefaultEditingKey(state) {
            state.editingKey = '';
        },
        setAddressCustomerOrder(state, { payload }) {
            state.order.customerCart.address = payload;
            console.log(payload);
        },
        submitOrder() {},
        resetCart(state) {
            state.order.customerCart = null;
            state.order.productsCart = [];
            state.order.total = 0;
        },
    },
});
const total = (productCart) => {
    return productCart.reduce((x1, x2) => {
        return x1 + x2.price * x2.quantity * ((100 - x2.discount) / 100);
    }, 0);
};
export const orderActions = OrderSlice.actions;
export default OrderSlice.reducer;