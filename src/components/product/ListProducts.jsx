import { Table, Popconfirm, message } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import productAPI from '../../api/productAPI';

const ListProduct = () => {
  const [listProduct, setListProduct]=useState();
  const history = useHistory();

  useEffect(()=>{
    fetchData();
  },[])

  const fetchData =async()=>{
    const response = await productAPI.getProducts();
    const data = response.data;
    const filter =Object.keys(data).filter(e=> data[e].isDeleted===false);
    setListProduct(filter.map((e,index)=>{return {id:e , ...data[e], key:(index+1)}}));
  }

  const editDataHandler =(id)=>{
      history.push(`/product/${id}`)
  }
  
  const deleteDataHandler =(id) =>{
    productAPI.editOneProduct(id,{
      isDeleted:true
    })
    setListProduct((prev)=>{
      const data = [...prev];
      return data.filter(item=> item.id!==id);
    })
    success()
  }
  const success = () => {
    message.success('Successfully');
  };
  const columns = [
    {
      title: 'ID',
      dataIndex: 'key',
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Price',
      dataIndex: 'price',
    },
    {
      title: 'Description',
      dataIndex: 'description',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
    },
    {
      title: 'Setting',
      dataIndex: 'setting',
      render: (_, record) => (
          <>
              <EditOutlined style={{ marginRight: 15, color: 'yellowgreen'}} onClick={()=>editDataHandler(record.id)} />
              <Popconfirm title="Sure to delete?" onConfirm={() => deleteDataHandler(record.id)}>
                  <DeleteOutlined/>
              </Popconfirm>
          </>
        )
    },
  ];
  return (
      <Table columns={columns} dataSource={listProduct} size="middle" />
  );

};
export default ListProduct;