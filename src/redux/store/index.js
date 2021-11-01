import { configureStore } from '@reduxjs/toolkit';
import orderSlice from './OrderSlice';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../saga';
const sagaMiddleware = createSagaMiddleware();

export default configureStore({
    reducer: {
        orderSlice,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(sagaMiddleware);
    },
});
sagaMiddleware.run(rootSaga);