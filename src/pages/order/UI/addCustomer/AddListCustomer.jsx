import Border from '../../../../components/common/Border';
import './AddListCustomer.css';
import AddCustomerItem from './AddCustomerItem.jsx';
import { useRef, useState } from 'react';
import customerAPI from '../../../../api/CustomerAPI';
const AddListCustomer = () => {
    const [dataSearch, setDataSearch] = useState([]);

    const ref = useRef()
    const searchHandler = (e) => {
        e.preventDefault();
        fetchAPI(ref.current.value);
    }
    const fetchAPI = async (key) => {
        const response = await customerAPI.findByPhone(key);
        const data = response.data;
        for (const key in data) {
            const value = {
                id: key,
                ...data[key]
            }
        setDataSearch([
            value
        ])
        }
     
    }
    const renderItem = () => {
        return dataSearch.map((data, index) => {
            return <AddCustomerItem
                        key={data.id}
                        id={data.id}
                        index={index}
                        name={data.name}
                        address={data.address}
                        gender={data.gender}
                        phone={data.phone}    
            />
        })
    }
    return (
          <Border className="customer-search">
                <div className="title">
                    <h3>Customer</h3>
                </div>
            <div className="search">
                <form className="d-flex" onSubmit={searchHandler}>
                    <input ref={ref} type="text"/>             
                    <button type="submit">search</button>
                </form>
            </div>
            {dataSearch.length>0  &&<div className="content">
                <table>
                    <tr>
                        <td>ID</td>
                        <td>Name</td>
                        <td>Gender</td>
                        <td>Address</td>
                        <td>phone</td>
                        <td>Setting</td>
                    </tr>
                    {renderItem()}
                </table>
            </div>}
            </Border>
    );
};
export default AddListCustomer;