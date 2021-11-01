import { Select, Space, Divider, Row, Col, Descriptions, Input, Form, Button } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import {orderActions} from '../../redux/store/OrderSlice';
import BorderLayout from '../common/BorderLayout';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

const CustomerOrder =({form})=>{
    const { Option } = Select;
    const dispatch = useDispatch()
    const dataStore = useSelector(state => state.orderSlice);
    const listCustomer = dataStore.listCustomer;
    const customer = dataStore.order.customerCart;
    
    useEffect(()=>{
        dispatch(orderActions.loadListCustomer());
    },[])

    const changeValueSelectedHandler =(value) => {
        const index = listCustomer.findIndex(data => data.id ===value);
        dispatch(orderActions.addCustomerOrder(listCustomer[index]))
        form.setFieldsValue({address:listCustomer[index].address});
    }      
    const changeAddressHandler=(e)=>{
            if(form.getFieldError('address').length===0){
              dispatch(orderActions.setAddressCustomerOrder(e.target.value));
            }
    }

    const renderOptions=()=>{
       return listCustomer.map((item, index) => 
       <Option  key={index} 
                value={item.id}
                >
            <Space split={<Divider type="vertical" style={{backgroundColor:"red"}} />} >
                <div>{item.id}</div>
                <div>{item.name}</div>
                <div>{item.phone}</div>
            </Space>
       </Option>)
    }
    const filterOption=(input, option) =>{
        if(listCustomer[option.key]){
            return  listCustomer[option.key].id.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
            listCustomer[option.key].name.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
            listCustomer[option.key].phone.toLowerCase().indexOf(input.toLowerCase()) >= 0;
        }  
    }
    return (
        <BorderLayout >
            <Row>
                <Col span={12}>
                <Form.Item  
                    name={'customerId'}
                    rules={[
                    {
                        required: true,
                        message: 'Please select customer!',
                    },

                    ]}>
                    <Select
                        showSearch
                        style={{ width: "100%" }}
                        placeholder="Select a customer"
                        optionFilterProp="children"
                        onChange={changeValueSelectedHandler}
                        filterOption={filterOption}
                    >
                        {renderOptions()}
                    </Select>
                    </Form.Item>
                    {customer && <Row style={{marginTop:"5%"}}>
                        <Col span={16} style={{display:"flex", flexWrap:"wrap"}}>
                            <Descriptions title="ID" style={{width:"50%"}}> 
                                <Descriptions.Item>{customer.id}</Descriptions.Item>
                            </Descriptions>
                            <Descriptions title="Name"  style={{width:"50%"}}> 
                                <Descriptions.Item>{customer.name}</Descriptions.Item>
                            </Descriptions>
                            <Descriptions title="Phone"  style={{width:"50%"}}> 
                                <Descriptions.Item>{customer.phone}</Descriptions.Item>
                            </Descriptions>
                            <Descriptions title="Gender"  style={{width:"50%"}}> 
                                <Descriptions.Item>{customer.gender}</Descriptions.Item>
                            </Descriptions>
                            <Descriptions title="Age"  style={{width:"50%"}}> 
                                <Descriptions.Item>{customer.age}</Descriptions.Item>
                            </Descriptions>
                            <Descriptions title="Address" style={{width:"50%"}}> 
                                <Descriptions.Item> {customer.address}</Descriptions.Item>
                            </Descriptions> 
                        </Col>
                        <Col span={8}>
                            <Descriptions title="Delivery Address"> 
                                <Descriptions.Item> 
                                        <Form.Item name="address"
                                         rules={[
                                            {
                                              required: true,
                                              message: 'Address can not be null',
                                            },
                                          ]}>
                                            <Input onChange={changeAddressHandler}/>
                                        </Form.Item>
                                </Descriptions.Item>
                            </Descriptions>  
                        </Col>
                       
                    </Row>}
                </Col>
            </Row>
            {/* <Button
                style={{float:"right", margin:"2% 2% 2% 0"}}
                type="primary"
                icon={<SaveOutlined />}
                onClick={() => {alert(form.getFieldValue('address'))}}
                >
                Save
            </Button> */}
        </BorderLayout>
    );
};
export default CustomerOrder;