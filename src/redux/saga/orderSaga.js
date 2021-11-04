import { call, put, takeLatest } from 'redux-saga/effects';
// import orderAPI from '../../api/orderAPI';
// import customerAPI from '../../api/customerAPI';
import productAPI from '../../api/productAPI';
import { orderActions } from '../store/OrderSlice';

// function* submitOrder({ payload }) {
//     yield call(() => orderAPI.addOrder(payload));
// }

// function* fetchCustomer() {
//     const response = yield call(customerAPI.getCustomers);
//     const data = response.data;
//     
//     const value = Object.keys(data)
//         .map((e, index) => {
//             return { id: e, ...data[e], key: index + 1 };
//         })
//         .filter((e) => e.isDeleted === false);
//     yield put(orderActions.loadListCustomerSuccess(value));
// }

function* fetchProduct() {
    const response = yield call(productAPI.getProducts);
    const data = response.data;
    const value = Object.keys(data).filter((e) => data[e].isDeleted === false)
        .map((e, index) => {
            return { productId: e, ...data[e], key: index + 1 };
        })
        //  console.log(value);
    yield put(orderActions.loadListProductSuccess(value));
    const valueKey = value.reduce((prev, current) => {
            prev[current.productId] = current;
            return prev;
        }, {})
        //console.log(valueKey);
    yield put(orderActions.loadListProductKeySuccess(valueKey))
}

export default function* orderSaga() {
    // yield takeLatest(orderActions.loadListCustomer.type, fetchCustomer);
    yield takeLatest(orderActions.loadListProduct.type, fetchProduct);
}