import { call, put, takeLatest } from 'redux-saga/effects';
import orderAPI from '../../api/orderAPI';
import customerAPI from '../../api/customerAPI';
import productAPI from '../../api/productAPI';
import { orderActions } from '../store/OrderSlice';

function* submitOrder({ payload }) {
    yield call(() => orderAPI.addOrder(payload));
}

function* fetchCustomer() {
    const response = yield call(customerAPI.getCustomers);
    const data = response.data;
    const value = Object.keys(data)
        .map((e, index) => {
            return { id: e, ...data[e], key: index + 1 };
        })
        .filter((e) => e.isDeleted === false);
    yield put(orderActions.loadListCustomerSuccess(value));
}

function* fetchProduct() {
    const response = yield call(productAPI.getProducts);
    const data = response.data;
    const value = Object.keys(data)
        .map((e, index) => {
            return { id: e, ...data[e], key: index + 1 };
        })
        .filter((e) => e.isDeleted === false);
    yield put(orderActions.loadListProductSuccess(value));
}

export default function* orderSaga() {
    yield takeLatest(orderActions.loadListCustomer.type, fetchCustomer);
    yield takeLatest(orderActions.loadListProduct.type, fetchProduct);
    yield takeLatest(orderActions.submitOrder.type, submitOrder);
}