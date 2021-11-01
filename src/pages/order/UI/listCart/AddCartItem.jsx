import { useDispatch } from 'react-redux';
import './AddCartItem.css';
import { orderActions } from '../../OrderSlice';

const AddCartItem = (props) => {
    const dispatch = useDispatch();
    const { id, index, name, price, quantity } = props;
    const increaseQuantity = (e) => {
        e.preventDefault();
        dispatch(orderActions.increase(id))
    }
    const decreaseQuantity = (e) => {
        e.preventDefault();
        dispatch(orderActions.decrease(id))
    }
    return (
            <tr>
                <th>{(index + 1)}</th>
                <th>{name}</th>
                <th>{price}</th>
                <th>{quantity}</th>
                <th>
                <button onClick={increaseQuantity}>+</button>
                <button onClick={decreaseQuantity} >-</button>
                </th>
            </tr>
     
    );
};
export default AddCartItem;