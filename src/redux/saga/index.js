import { all } from 'redux-saga/effects';
import orderSaga from './orderSaga';
export default function* rootSaga() {
    yield all([orderSaga()]);
}