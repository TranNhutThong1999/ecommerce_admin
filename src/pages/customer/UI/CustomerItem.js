import './CustomerItem.css'
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { customerActions } from '../CustomerSlice';
const CustomerItem = (props) => {
    const {id, index, name, gender, address, age, phone } = props;
    const history = useHistory();
    const dispatch = useDispatch();
    const deleteDataHandler = () =>{
        dispatch(customerActions.deletedData(id))
    }
    return (
        <tr className={(index+1) % 2 !==0 ? 'highlight': ''}>
            <th>{index+1}</th>
            <th>{name}</th>
            <th>{gender}</th>
            <th>{address}</th>
            <th>{age}</th>
            <th>{phone}</th>
             <th>
                <button className="edit" onClick={()=>history.push(`/customers/${id}`)} >Edit</button>
                <button className="delete"onClick={deleteDataHandler} >Delete</button>
            </th>
        </tr>
    )
};
export default CustomerItem;