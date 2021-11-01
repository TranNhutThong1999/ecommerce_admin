import { configureStore } from "@reduxjs/toolkit";
import customerSlice from "../pages/customer/CustomerSlice";
import createSagaMiddleware from 'redux-saga';
import rootSaga from "../saga";
import productSlice from '../pages/product/ProductSlice'
import orderSlice from '../pages/order/OrderSlice'
const sagaMiddleware = createSagaMiddleware();
export default configureStore({
    reducer: {
        customerSlice,
        productSlice,
        orderSlice
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(sagaMiddleware)
    }
})
sagaMiddleware.run(rootSaga);