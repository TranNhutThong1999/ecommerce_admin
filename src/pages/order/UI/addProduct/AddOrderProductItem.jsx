import { useDispatch } from 'react-redux';
import Border from '../../../../components/common/Border';
import './AddOrderProductItem.css';
import { orderActions } from '../../OrderSlice'
const AddOrderProductItem = (props) => {
    const { id, index, name, price, quantity } = props;
    const dispatch = useDispatch();
    const addProductHandler = () => {
        const value = {
            id,
            name,
            price,
            quantity:1
        }
        dispatch(orderActions.addCart(value))
    }
    return (
            <tr>
                <th>{(index + 1)}</th>
                <th>{name}</th>
                <th>{price}</th>
                <th>
                    <button onClick={addProductHandler}>Add</button>
                </th>
            </tr>
     
    );
}
export default AddOrderProductItem;