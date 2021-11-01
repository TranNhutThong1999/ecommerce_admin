import './ListOrder.css';
import Border from '../../../components/common/Border'
import OrderItem from './OrderItem';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { orderActions } from '../OrderSlice';
import { useHistory } from 'react-router-dom';
const ListOrder = () => {
    const dataStore = useSelector(state => state.orderSlice);
    const listOrder = dataStore.orders;
    const history = useHistory();
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(orderActions.loadData())
    }, [])
    
    const renderOrders = () => {
        if (listOrder) {
            return listOrder.map((order, index) => {
                return <OrderItem
                    key={order.id}
                    index={index}
                    order={order}
                ></OrderItem>
                 })
            }
       
    }
    const clickNewBtnHandler = () => {
        history.push('/orders/new')
    }
    return (
        <Border className="list-order">
            <div className="button float-right">
                 <button onClick={clickNewBtnHandler}>New</button>
           </div>
            <table>
                <tr>
                    <th>ID</th>
                    <th>Code</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Order time</th>
                    <th>Delivery time</th>
                    <th>Setting</th>
                </tr>
                {renderOrders()}
            </table>
        </Border>
    );
}
export default ListOrder;