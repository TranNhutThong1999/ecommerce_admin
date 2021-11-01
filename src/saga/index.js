import { all } from 'redux-saga/effects'
import customerSaga from '../pages/customer/CustomerSaga'
import productSaga from '../pages/product/ProductSaga';
import orderSaga from '../pages/order/OrderSaga';
export default function* rootSaga() {
    yield all([customerSaga(), productSaga(), orderSaga()])
}