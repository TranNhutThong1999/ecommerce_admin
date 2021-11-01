import productAPI from '../../api/ProductAPI';
import { productActions } from './ProductSlice';
import { put, takeLatest, call } from 'redux-saga/effects'
import orderAPI from '../../api/OrderAPI';

function* editDataAPI({ payload }) {
    const value = {
        name: payload.name,
        description: payload.description,
        price: payload.price,
        quantity: payload.quantity
    }
    const { status } = yield call(() => productAPI.editOneProduct(payload.id, value))
    if (status === 200) {
        yield put(productActions.editDataSuccess(payload))
    } else {
        yield put(productActions.editDataFailed())
    }
}

function* addDataAPI({ payload }) {
    payload['isDeleted'] = false;
    const { status } = yield call(() => productAPI.addOneProduct(payload))
    if (status === 200) {
        yield put(productActions.addDataSuccess(payload));
    } else {
        yield put(productActions.addDataFailed());
    }
}

function* fetchAPI() {
    const response = yield call(productAPI.getProducts)
    if (response.status === 200) {
        const data = response.data;
        const products = [];
        for (const key in data) {
            products.push({
                id: key,
                ...data[key]
            })
        }
        yield put(productActions.loadDataSuccess(products))
    } else {
        yield put(productActions.loadDataFailed());
    }
}

function* deleteOrderByField() {

}

function* deleteDataAPI({ payload }) {
    const value = {
        isDeleted: true
    }

    const { status } = yield call(() => productAPI.editOneProduct(payload, value));
    //   yield call(() => orderAPI.removeOneOrder(payload));
    if (status === 200) {
        yield put(productActions.deleteDataSuccess(payload))

    } else {
        yield put(productActions.deleteDataFailed())
    }
}

export default function* customerSaga() {
    yield takeLatest(productActions.loadData.type, fetchAPI);
    yield takeLatest(productActions.addData.type, addDataAPI);
    yield takeLatest(productActions.editData.type, editDataAPI);
    yield takeLatest(productActions.deleteData.type, deleteDataAPI);
}