import './ListCustomers.css'
import CustomerItem from './CustomerItem';
import Border from '../../../components/common/Border';
import { useEffect } from 'react';
import { customerActions } from '../CustomerSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory} from 'react-router-dom';

const ListCucstomers = () => {
    const customerData = useSelector(state => state.customerSlice)
    const listCustomer = customerData.customers;
    const dispatch = useDispatch();
    const history = useHistory();
    
    useEffect(() => {
        console.log('effect run time')
        dispatch(customerActions.loadData())
    }, [])
    const clickButtonAddHandler = () => {
        history.push("/customers/new")
    }
    const renderCustomer = () => {
        if (listCustomer) {
            return listCustomer.map((customer, index)=>{
                return <CustomerItem
                    id={customer.id}
                    key={customer.id}
                    index={index}
                    name={customer.name}
                    gender={customer.gender}
                    address={customer.address}
                    age={customer.age}
                    phone={customer.phone}
                ></CustomerItem>
                })}
        }
    return (
                <Border className="list-customer">
                    <div className="button"><button className="add" onClick ={clickButtonAddHandler}>New</button></div>
                    <table>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Gender</th>
                            <th>Address</th>
                            <th>Age</th>
                            <th>Phone</th>
                            <th>Setting</th>
                        </tr>
                    {renderCustomer()}
                    </table>
                </Border>
    )
};
export default ListCucstomers;