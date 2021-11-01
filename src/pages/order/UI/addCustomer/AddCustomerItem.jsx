import { useDispatch } from 'react-redux';
import Border from '../../../../components/common/Border';
import './AddCustomerItem.css';
import { orderActions } from '../../OrderSlice';
const AddCustomerItem = (props) => {
    const { id, index, name, gender, address, phone } = props;
    const dispatch = useDispatch();
    const addCustomerCartHandler = () => {
        const value = {
            id,
            name,
            address,
            phone
        }
        dispatch(orderActions.addCustomerCart(value))
    }
    return (
            <tr>
                <th>{(index + 1)}</th>
                <th>{name}</th>
                <th>{gender}</th>
                <th>{address}</th>
                <th>{phone}</th>
                <th>
                    <button onClick ={addCustomerCartHandler}>Add</button>
                </th>
            </tr>
     
    );
};
export default AddCustomerItem;