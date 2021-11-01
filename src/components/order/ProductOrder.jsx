import React, { useEffect } from 'react';
import { Table, Form, Select, InputNumber, Popconfirm, Typography, Button } from 'antd';
import { useSelector } from 'react-redux';
import { orderActions } from '../../redux/store/OrderSlice';
import { useDispatch } from 'react-redux';

const ProductOrder = ({form}) => {    
    const dataStore = useSelector(state => state.orderSlice);
    const ListProduct= dataStore.listProduct;
    const productsCart= dataStore.order.productsCart;
    const editingKey= dataStore.editingKey;
    const dispatch = useDispatch();
    const { Option } = Select;

    const isEditing = (record) => record.key === editingKey;
    const productChangehandler=(value)=>{
          const data ={
            index: editingKey,
            id:value
          }
          dispatch(orderActions.chooseProduct(data))
    }

    const setEditingKey =(value)=>{
      dispatch(orderActions.setEditingKey(value));
    }

    const setDefaultEditingKey =(key)=>{
      if(form.getFieldError('product'+key).length === 0){
        dispatch(orderActions.setDefaultEditingKey());
      }
    }
    
    useEffect(()=>{
      dispatch(orderActions.loadListProduct());
    },[]);
    
    const renderProductCart=()=>{
        return productsCart.map(item => {return {...item, total: (item.price*item.quantity*((100-item.discount)/100))}})
    }

    const renderOptions=()=>{
      return ListProduct.map(item=> 
        <Option key={item.key} value={item.id} >{item.name}</Option>)
    }

    const clickButtonNewHandler=()=>{
      dispatch(orderActions.addProductCartDefault());
      setEditingKey(productsCart.length+1)
    }

    const clickButtonDeleteHandler = (value) => {
        dispatch(orderActions.removeProductCart(value));
        dispatch(orderActions.setDefaultEditingKey());
    };
  
    const changeValueOfQuantityHandler=(value)=>{
      dispatch(orderActions.changeQuantity({index:editingKey, quantity: value}));
    }

    const changeValueOfDiscountHandler=(value)=>{
      dispatch(orderActions.changeDiscount({index:editingKey, discount: value}))
    }
    
    const columns = [
        {
          title: 'ID',
          dataIndex: 'key',
          width: '5%',
        },
        {
        title: 'Product',
        dataIndex: 'productName',
        width: '35%',
        render:(text, record)=>{
          return isEditing(record) ?
          <Form.Item  
            name={`product${record.key}`}
            rules={[
              {
                required: true,
                message: 'Please select product!',
              },
              {
                validator:async (rule, value) => {
                  const index =  productsCart.filter(e=>e.productId === value);
                  console.log(index);
                  if(index.length > 1){
                    throw new Error('Product be selected');
                  }
                }
              }

            ]}>
            <Select
              showSearch
              style={{ width: "100%" }}
              placeholder="Select a product"
              optionFilterProp="children"
              onChange={productChangehandler}
              onBlur={()=>setDefaultEditingKey(record.key)}
              value={record.productId}
                        // filterOption={filterOption}
                        
              >
                {renderOptions()}
            </Select>
          </Form.Item>:
          <div onClick={()=>setEditingKey(record.key)}>{record.productName ? record.productName: 'Select a product' }</div>
            }
          },
        {
          title: 'Price',
          dataIndex: 'price',
          width: '20%',
          editable: true,
          },
        {
          title: 'Quantity',
          dataIndex: 'quantity',
          width: '10%',
          render:(text, record)=>{
            return isEditing(record) ?
                <InputNumber max={100} min={1} 
                onBlur={setDefaultEditingKey}
                onChange={changeValueOfQuantityHandler}
                defaultValue={record.quantity}
                /> : <div onClick={()=>setEditingKey(record.key)}>{record.quantity}</div>
            }
          },
        {
          title: 'Discount',
          dataIndex: 'discount',
          width: '10%',
          render:(text, record)=>{
            return isEditing(record) ?
              <InputNumber  max={100} min={0}
              onBlur={setDefaultEditingKey}
              onChange={changeValueOfDiscountHandler}
              defaultValue={record.discount}/> :
              <div onClick={()=>setEditingKey(record.key)}>{record.discount}</div>
            }
          },
        {
            title: 'Total',
            dataIndex: 'total',
            width: '40%',
            editable: true,
          },
          
        {
          title: 'operation',
          dataIndex: 'operation',
          render: (_, record) => {
              return(
                <Popconfirm title="Sure to cancel?" onConfirm={() => clickButtonDeleteHandler(record.productId)}>
                  <Typography.Link disabled={editingKey && editingKey!==record.key? true : false}>
                      Delete
                  </Typography.Link>
                </Popconfirm>
              );
          },
        },
    ];
    // const mergedColumns = columns.map((col) => {
    //     if (!col.editable) {
    //     return col;
    //     }

    //     return {
    //     ...col,
    //     onCell: (record) => ({
    //         record,
    //         inputType: col.dataIndex === 'age' ? 'number' : 'text',
    //         dataIndex: col.dataIndex,
    //         title: col.title,
    //         editing: isEditing(record),
    //     }),
    //     };
    // });
    return (
        <>
          <Button type="primary" onClick={clickButtonNewHandler} disabled={editingKey || productsCart.length !==0 && productsCart[productsCart.length-1].productId ==='' ? true: false}>New</Button>
          <h3 style={{marginTop:"2%"}}> Total: {dataStore.order.total}</h3>
          <Table
              bordered
              dataSource={renderProductCart()}
              columns={columns}
              rowClassName="editable-row"
              // pagination={{
              // onChange: cancel,
              // }}
          />
        </>
    );
};

export default ProductOrder;