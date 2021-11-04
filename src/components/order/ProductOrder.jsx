import EditTable from "./editTable/EditTable";
import { useState, useEffect } from "react";
import SelectForm from './editTable/SelectForm';
import { InputNumber } from 'antd';
import useProductList from "./editTable/useProductList"
import { useDispatch, useSelector } from "react-redux";
import { orderActions } from "../../redux/store/OrderSlice";

const ProductOrder=({form, onChange, editableForm})=>{
  const [productCart, setProductCart]=useState([]);
  const dataStore = useSelector(state => state.orderSlice);
  const ListProduct = dataStore.listProduct;
  const dispatch =useDispatch();

  useEffect(()=>{
    dispatch(orderActions.loadListProduct());
  },[]);

  const renderProductCart=()=>{
    return productCart.map((item, index) => {return {...item, key:index+1}})
  }

  const totalOrder = () => {
      if(productCart.length> 0){
        return productCart.reduce((x1, x2) => {
            return x1 + x2.price * (x2?.amount ? x2.amount:1) * ((100 - (x2?.discount ? x2.discount : 0)) / 100);
        }, 0);
      } return 0
  }

  const {findPrice} =useProductList()

  const totolProduct =(price, amount, discount)=>{
    const avg = price * (amount? amount : 1) * ((100-(discount? discount: 0))/100);
    return isNaN(avg) ? 0: avg
  }

  const onChangeHandler=(value)=>{
      setProductCart(value)
      onChange(value)
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'key',
      width: '5%',
    },
    {
      title: 'Product',
      dataIndex: 'productId',
      width: '35%',
      editable:true,
      type:<SelectForm dataOption={ListProduct} />,
      rules:[{
        required: true, message:'Required'
      },
      {
        validator:async (rule, value)=>{
          const products = productCart.find(e=> e.productId === value);
          if(products){
            throw new Error("Duplicated")
          }
        }
      }
      ],
      render:(_,record)=>{
        return record.name
      }
      },
    {
      title: 'Price',
      dataIndex: 'price',
      width: '20%',
      custom:(values)=>{
        return findPrice(values.productId)
      }
      },
    {
      title: 'Amount',
      dataIndex: 'amount',
      width: '10%',
      editable: true,
      type:<InputNumber min={1}/>,
      rules:[{
        required: true, message:'Required'
      }]
      },
    {
      title: 'Discount',
      dataIndex: 'discount',
      width: '10%',
      editable: true,
      type:<InputNumber min={0} /> ,
      rules:[{
        required: true, message:'Required'
      }]
      },
    {
      title: 'Total',
      dataIndex: 'total',
      width: '40%',
      editable:true,
      showValue:true,
      custom:(values)=>{
        return totolProduct(findPrice(values.productId), values.amount, values.discount)
      },
      render:(_,record)=>{
        return totolProduct(record.price, record.amount, record.discount)
      }
    }  
];

  return (
        <>
          <h3 style={{marginTop:"2%"}}> Total: {totalOrder()}</h3>
          <EditTable  
            columns={columns} 
            dataSource={renderProductCart()} 
            onChangeHandler={onChangeHandler}
            editableForm={editableForm}
            mode={'single'}
            />
        </>
  );
};
export default ProductOrder;