import { Table, Popconfirm, message } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import customerAPI from '../../api/customerAPI';
import orderAPI from '../../api/OrderAPI';

const ListCustomer =()=>{
    const history = useHistory();
    const [listCustomer, setListCustomer]=useState();
    useEffect(()=>{
       fetchData();
    },[])
    const fetchData=async()=>{
        const response = await customerAPI.getCustomers();
        const data = response.data;
        const filter =Object.keys(data).filter(e=> data[e].isDeleted===false);
        setListCustomer(filter.map((e,index)=>{return {id:e , ...data[e], key:(index+1)}}));

    }

    const editDataHandler =(id)=>{
        history.push(`customer/${id}`)
    }
    const deleteDataHandler =(id) =>{
        customerAPI.editOneCustomer(id,{
            isDeleted:true
        })
      //  deleteOrderRelation();

        setListCustomer((prev)=>{
            const data = [...prev];
            return data.filter(item=> item.id!==id);
        })
        success()
    }
    // const deleteOrderRelation=()=>{
    //     orderAPI.edit
    // }
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
            title: 'Phone',
            dataIndex: 'phone',
        },
        {
            title: 'Age',
            dataIndex: 'age',
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
        },
        {
            title: 'Address',
            dataIndex: 'address',
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
    return(
        <Table columns={columns} dataSource={listCustomer} size="middle" />
    );
};
export default ListCustomer;