import { useDispatch, useSelector } from "react-redux";
import Border from "../../../../components/common/Border";
import AddOrderItem from "./AddCartItem.jsx";
import './AddListCart.css'
import Form, { Field } from 'rc-field-form';
import { useEffect, useRef, useState } from "react";
import { orderActions } from '../../OrderSlice';
import { useHistory } from "react-router";
const AddListCart = () => {
  const dataOrder = useSelector(state => state.orderSlice);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const history = useHistory()
  const nameRef = useRef();
  const phoneRef = useRef();
  const addressRef = useRef();
  const onSubmitForm = (value) => {
  }
   console.log(dataOrder);
  useEffect(() => {
    if (dataOrder.customerCart.name) {
      nameRef.current.value = dataOrder.customerCart.name;
      phoneRef.current.value = dataOrder.customerCart.phone;
      addressRef.current.value = dataOrder.customerCart.address;
    } else {
      nameRef.current.value = '';
      phoneRef.current.value = '';
      addressRef.current.value = '';
    }
  }, [dataOrder.customerCart.name])

  const removeCustomerCartHandler = () => {
    dispatch(orderActions.removeCustomerCart())
  }
  
  const submitOrderHandler = (e) => {
    e.preventDefault();
    const date = new Date().toDateString();
    const value = {
      code: (Math.random() + 1).toString(36).substring(7),
      address: addressRef.current.value,
      information: `${nameRef.current.value} - ${phoneRef.current.value}`,
      products: dataOrder.cart.map(data => {
        return {
          id: data.id,
          price: data.price,
          quantity: data.quantity
        }}),
      total: dataOrder.total,
      customerId: dataOrder.customerCart.id,
      createTime: date

    }
    console.log(value);
    dispatch(orderActions.order(value))
  }
  const renderCartItem = () => {
    if (dataOrder.cart) {
      return dataOrder.cart.map((cart,index) => {
        return <AddOrderItem
              key={cart.id}
              id={cart.id}
              index={index}
              name={cart.name}
              price={cart.price}
              quantity={cart.quantity}
            />
      })
    }
  }
    return (
      <Border className="add-list-order">
        <h2>Cart</h2>
        <form onSubmit={submitOrderHandler}>
            <div className="customer">
              <div>
                  <label>Name</label>
                  <input type="text" ref={nameRef}/>
              </div>
              <div>
                  <label>Phone</label>
                  <input type="phone" ref={phoneRef} />
                </div>
              <div>
                  <label>Address</label>
                  <input type="text" ref={addressRef} />
             </div>
            <button type="button" onClick={removeCustomerCartHandler}>X</button>
          </div>
           <h3>total: {dataOrder.total}</h3>
          { dataOrder.cart &&<table>
            <tr>
              <td>ID</td>
              <td>Name</td>
              <td>Price</td>
              <td>Quantity</td>
              <td>Setting</td>
            </tr>
            {renderCartItem()}
          </table>}
            <div className="button">
              <button type="submit">Order</button>
              <button type="button" onClick={()=>history.push('/orders')}>Cancel</button>
          </div>
        </form>
    </Border>
    
    );
};
export default AddListCart;