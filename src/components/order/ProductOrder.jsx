import React, { useEffect, useState } from 'react';
import { Table, Form, Select, InputNumber, Popconfirm, Typography, Button } from 'antd';
import productAPI from '../../api/productAPI'
import SelectForm from './SelectForm';

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  dataOption,
  productCart,
  ...restProps
}) => {
  const inputNode = inputType==='select' ? <SelectForm dataOption={dataOption} /> : <InputNumber min="0" />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
            {
              validator: async (rule, value) => {
                if(rule.field ==="productId"){
                  const index = productCart.findIndex(e=> value!== '' & e.productId === value );                
                  if(index !== -1){
                    throw new Error("Product exists")
                  }
                }
              }    
            }
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const ProductOrder = ({form, onChange}) => {    
    const [products, setProducts]=useState([]);
    const [productCart, setProductCart]=useState([]);
    const [editingKey, setEditingKey] =useState();
    const isEditing = (record) => record.key === editingKey;

    const total = () => {
      if(productCart){
        return productCart.reduce((x1, x2) => {
            return x1 + x2.price * x2.quantity * ((100 - x2.discount) / 100);
        }, 0);
      } return 0
    };

    const edit = (record) => {
      setEditingKeyHandler(record.key)
    };
 
    const save=  (record)=>{
      const key = Object.keys(productCart[0]);
      console.log(key);
        form.validateFields(key).then(values =>{
            const dataForm =form.getFieldValue();
            console.log(dataForm);
            const product = products.filter(e=>e.id === dataForm.productId);
          
            const data ={
            productId: product[0].id,
            price: product[0].price,
            discount: dataForm.discount,
            quantity: dataForm.quantity
          }
          setProductCart(prev=>{
            let tranfer = [...prev];
            tranfer = tranfer.filter((e,index)=> index !== tranfer.length-1);
            return [...tranfer, data]
          })

          setDefaultEditingKey()
          
      }).catch(err=>{
        console.log("err");
        console.log(productCart);
        return;
      })
    }
      onChange(productCart)
    const setEditingKeyHandler =(value)=>{
        setEditingKey(value)
    }

    const setDefaultEditingKey =()=>{
        setEditingKey('');
    }

    const clickButtonNewHandler=()=>{
      setEditingKeyHandler(productCart.length+1)
      setProductCart(pre=>{
        return [...pre, {
            productId:'',
            price:0,
            quantity:1,
            discount:0,
            total:0
        }]
      })
      form.setFieldsValue({
        productId:'',
        price:0,
        quantity:1,
        discount:0,
        total:0
      });
      setEditingKeyHandler(productCart.length+1)
    }

    useEffect(()=>{
      loadDataProduct();
    },[]);
    
    const loadDataProduct=async()=>{
      const response = await productAPI.getProducts();
      const data = response.data;
      const filter =Object.keys(data).filter(e=> data[e].isDeleted===false);
      setProducts(filter.map((e,index)=>{return {id:e , ...data[e], key:(index+1)}}));
    }
    const renderProductCart=()=>{
        return productCart.map((item, index) => {return {...item, key:index+1, total: (item.price*item.quantity*((100-item.discount)/100))}})
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
          editable:true
          },
        {
          title: 'Price',
          dataIndex: 'price',
          width: '20%',
          },
        {
          title: 'Quantity',
          dataIndex: 'quantity',
          width: '10%',
          editable: true,
          },
        {
          title: 'Discount',
          dataIndex: 'discount',
          width: '10%',
          editable: true,
          },
        {
            title: 'Total',
            dataIndex: 'total',
            width: '40%',
        },
          
        {
            title: 'operation',
            dataIndex: 'operation',
            width: '40%',
            render: (_, record) => {
              const editable = isEditing(record);
              return editable ? (
                <span>
                  <a
                    onClick={() => save(record)}
                    style={{
                      marginRight: 8,
                    }}
                  >
                    Save
                  </a>
                  <Popconfirm title="Sure to cancel?" onConfirm={setDefaultEditingKey}>
                    <a>Cancel</a>
                  </Popconfirm>
                </span>
              ) : (
                <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                  Edit
                </Typography.Link>
              );
            },
          },
    ];
    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
        return col;
        }

        return {
        ...col,
        onCell: (record) => ({
            record,
            inputType: col.dataIndex === 'productId' ? 'select' : 'number',
            dataIndex: col.dataIndex,
            title: col.title,
            editing: isEditing(record),
            dataOption: products,
            productCart:productCart
        }),
        };
    });
    return (
        <>
          <Button type="primary" onClick={clickButtonNewHandler} disabled={editingKey ? true: false}>New</Button>
          <h3 style={{marginTop:"2%"}}> Total: {total()}</h3>
          <Table
              components={{
                body: {
                  cell: EditableCell,
                },
              }}
              bordered
              dataSource={renderProductCart()}
              columns={mergedColumns}
              rowClassName="editable-row"
              // pagination={{
              // onChange: cancel,
              // }}
          />
        </>
    );
};

export default ProductOrder;