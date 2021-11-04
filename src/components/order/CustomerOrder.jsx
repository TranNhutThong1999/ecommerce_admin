import { Select, Space, Divider, Row, Col, Descriptions, Input, Form, DatePicker } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import BorderLayout from '../common/BorderLayout';
import customerAPI from '../../api/customerAPI';


const CustomerOrder =({form})=>{
    const { Option } = Select;
    const [listCustomer, setListCustomer]= useState([]);
    const [customer, setCustomer] =useState();
    
    useEffect(()=>{
        fetchCustomers()
    },[])
    const fetchCustomers =async()=>{
        const response = await customerAPI.getCustomers();
        const data = response.data;
        const filter =Object.keys(data).filter(e=> data[e].isDeleted===false);
        setListCustomer(filter.map((e,index)=>{return {id:e , ...data[e], key:(index+1)}}));
    }

    const changeValueSelectedHandler =(value) => {
        const index = listCustomer.findIndex(data => data.id ===value);
        setCustomer(listCustomer[index])
        form.setFieldsValue({
            address: listCustomer[index].address,
            phone:listCustomer[index].phone,
            nameCustomer:listCustomer[index].name
        })
       
    }      
    const renderOptions=()=>{
       return listCustomer.map((item, index) => 
       <Option  key={index} 
                value={item.id}
                >
                <Row>
                    <Col style={{textAlign:"center"}} span={8}>{item.id}</Col>
                    <Col style={{textAlign:"center"}} span={8}>{item.name}</Col>
                    <Col style={{textAlign:"center"}} span={8}>{item.phone}</Col>
                </Row>
        
       </Option>)
       
    }
    const filterOption=(input, option) =>{
        if(listCustomer[option.key]){
            return  listCustomer[option.key].id.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
            listCustomer[option.key].name.toLowerCase().indexOf(input.toLowerCase()) >= 0  
            // ||
            // listCustomer[option.key].phone+"".toLowerCase().indexOf(input.toLowerCase()) > 0
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
                    {/* <Form.Item hidden={true} name="phone"> <Input /></Form.Item>
                    <Form.Item hidden={true} name="nameCustomer"> <Input /></Form.Item> */}
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
                            <Descriptions title="Date"  style={{width:"50%"}}> 
                            
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
                                            <Input />
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