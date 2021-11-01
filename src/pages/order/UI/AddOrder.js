import { useState } from 'react';
import AddListCustomer from './addCustomer/AddListCustomer';
import './AddOrder.css'
import AddOrderProduct from './addProduct/AddOrderProduct';
import AddListCart from './listCart/AddListCart.jsx'
const AddOrder = () => {
    const [cartItem, setCartItem] = useState({
        cart: [],
        total:0
    });
    
    return (
        <div className="add-order-list d-flex flex-direction-column full-width">
            <AddOrderProduct />
            <AddListCustomer/>
            <AddListCart/>
        </div>
    );
}
export default AddOrder;