import { message, Table, Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router';
import { useEffect, useState } from 'react';
import orderAPI from '../../api/OrderAPI';

const ListOrder=()=>{
    const [listOrder, setListOrder]= useState([]);
    const history= useHistory();
    useEffect(()=>{
        fetchAPI();
    },[]);
    const fetchAPI=async()=>{
      const response = await orderAPI.getOrders();
      const data = response.data;
      const filter =Object.keys(data).filter(e=> data[e].isDeleted===false);
      setListOrder(filter.map((e,index)=>{
        return {id:e , ...data[e], key:(index+1)}}));
    }
    const deleteDataHandler =(id) =>{
      deleteOrder(id);
    }
    const deleteOrder =async(id)=>{
      const value ={
        isDeleted:true
      }
      await orderAPI.editOrder(id, value);
      fetchAPI();
      console.log(listOrder);
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
          title: 'Code',
          dataIndex: 'code',
        },
        {
          title: 'Information',
          dataIndex: 'information',
        },
        {
          title: 'Create time',
          dataIndex: 'createTime',
        },
        {
          title: 'Total',
          dataIndex: 'total',
        },
        {
            title: 'Setting',
            dataIndex: 'setting',
            render: (_, record) => (
                <>
                    {/* <EditOutlined style={{ marginRight: 15, color: 'yellowgreen'}} onClick={()=>editDataHandler(record.id)} /> */}
                    <Popconfirm title="Sure to delete?" onConfirm={() => deleteDataHandler(record.id)}>
                        <DeleteOutlined/>
                    </Popconfirm>
                </>
              )
          }
    ]
    return(
        <Table columns={columns} dataSource={listOrder} size="middle" />
    );
};
export default ListOrder;