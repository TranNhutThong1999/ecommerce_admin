import { call, put, takeLatest } from 'redux-saga/effects';
import customerAPI from '../../api/CustomerAPI';
import { customerActions } from './CustomerSlice'

function* deleteDataAPI({ payload }) {
    const value = {
        isDeleted: true
    }
    yield call(() => customerAPI.editOneCustomer(payload, value))
    yield put(customerActions.deleteDataSuccess(payload))
}

function* editDataAPI({ payload }) {
    const value = {
        name: payload.name,
        address: payload.address,
        gender: payload.gender,
        age: payload.age
    }
    yield call(() => customerAPI.editOneCustomer(payload.id, value))
    yield put(customerActions.editDataSuccess(payload))
}

function* addDataAPI({ payload }) {
    payload['isDeleted'] = false;
    yield call(() => customerAPI.addOneCustomer(payload))
    yield put(customerActions.addDataSuccess(payload))
}

function* fetchAPI() {
    try {
        const response = yield call(customerAPI.getCustomers)
        const data = response.data;
        const customers = [];
        for (const key in data) {
            customers.push({
                id: key,
                ...data[key]
            })
        }
        yield put(customerActions.loadDataSuccess(customers))
    } catch (error) {
        yield put(customerActions.loadDataFailed())
    }
}

export default function* customerSaga() {
    yield takeLatest(customerActions.loadData.type, fetchAPI);
    yield takeLatest(customerActions.addData.type, addDataAPI);
    yield takeLatest(customerActions.editData.type, editDataAPI);
    yield takeLatest(customerActions.deletedData.type, deleteDataAPI);
}