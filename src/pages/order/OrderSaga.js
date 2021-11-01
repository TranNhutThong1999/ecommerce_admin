import { call, put, takeLatest } from 'redux-saga/effects';
import orderAPI from '../../api/OrderAPI';
import customerAPI from '../../api/CustomerAPI';
import productAPI from '../../api/ProductAPI';
import { orderActions } from './OrderSlice';

function* submitOrderAPI({ payload }) {
    yield call(() => orderAPI.addOrder(payload))
    console.log("api");
    yield put(orderActions.orderSuccess())
}

function* fetchAPI() {
    try {
        const response = yield call(orderAPI.getOrders)
        const data = response.data;
        const orders = [];
        for (const key in data) {
            const value = {
                    id: key,
                    ...data[key]
                }
                // const responseCustomer = yield call(() => customerAPI.getOneCustomer(data[key].userId))
                // value['customer'] = responseCustomer.data;

            // const responseProduct = yield call(() => productAPI.getOneProduct(data[key].productId))
            // value['product'] = responseProduct.data;
            orders.push(value)
        }
        yield put(orderActions.loadDataSuccess(orders))
    } catch (error) {
        console.log('errr')
        yield put(orderActions.loadDataFailed())
    }
}

export default function* customerSaga() {

    yield takeLatest(orderActions.loadData.type, fetchAPI);
    yield takeLatest(orderActions.order.type, submitOrderAPI);
}