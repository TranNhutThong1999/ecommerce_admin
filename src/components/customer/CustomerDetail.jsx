import { Form, Input, InputNumber, Button, message, Radio  } from 'antd';
import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import customerAPI from '../../api/customerAPI';
const layout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 8,
    },
};
const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
    };
const CustomerDetail=()=>{
    const history = useHistory();
    const param = useParams();
    const [form] = Form.useForm();
    
    useEffect(()=>{
        if(param.customerId){
            fetchData(param.customerId)
        }
    },[])

    const fetchData = async (id) => {
        const response = await customerAPI.getOneCustomer(id);
        const customer = response.data;
        form.setFieldsValue({
            name: customer.name,
            age: customer.age,
            phone: customer.phone,
            address:customer.address,
            gender:customer.gender
        })
    }

    const onFinish=({name, phone, age, address, gender})=>{
        const value ={
            name, phone, age, address, gender, isDeleted:false
        }
        if (param.customerId) {
            customerAPI.editOneCustomer(param.customerId, value);
            success()
            return;
        }
        customerAPI.addOneCustomer(value)
        success()
        form.setFieldsValue({
            name:'',
                age:0,
                gender:'Female',
                address:'',
                phone:''
          })
    }
    const success = () => {
        message.success('Successfully');
    };

    const cancelButtonHandler=()=>{
        history.push('/customer');
    }
    return(
        <Form {...layout} name="nest-messages" 
            onFinish={onFinish} 
            validateMessages={validateMessages} 
            style={{width:"50%", margin:"auto", marginTop:"2%"}}
            form ={form}
            initialValues={{
                name:'',
                age:0,
                gender:'Female',
                address:'',
                phone:''
            }}
            >
            <Form.Item
                name={'name'}
                label="Name"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name={'phone'}
                label="Phone"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <InputNumber  />
            </Form.Item>
            <Form.Item
                name={'age'}
                label="Age"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <InputNumber  />
            </Form.Item>
            <Form.Item
                name={'gender'}
                label="Gender"
            >
                <Radio.Group>
                    <Radio value={'Female'}>Female</Radio>
                    <Radio value={'Male'}>Male</Radio>
                </Radio.Group>
            </Form.Item>
            <Form.Item
                name={'address'}
                label="Address"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input.TextArea />
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 6 }}>
            <Button type="primary" htmlType="submit">
                Submit
            </Button>
            <Button type="warning" htmlType="button" onClick={cancelButtonHandler}>
                Cancel
            </Button>
            </Form.Item>
      </Form>
    );
};
export default CustomerDetail;