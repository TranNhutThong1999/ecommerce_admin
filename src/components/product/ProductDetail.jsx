import { Form, Input, InputNumber, Button, message  } from 'antd';
import { useEffect } from 'react';
import productAPI from '../../api/productAPI';
import { useHistory, useParams } from 'react-router';
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


const ProductDetail =()=>{
  const history = useHistory();
  const param = useParams();
  const [form] = Form.useForm();

  useEffect(()=>{
    if(param.productId){
      fetchData(param.productId)
    }
  },[param.productId]);

  const fetchData = async (id) => {
    const response = await productAPI.getOneProduct(id);
    const product = response.data;
    //setDefaultValue()
    form.setFieldsValue({
        name: product.name,
        description: product.description,
        price: product.price,
        quantity:product.quantity
    })
  }

  const onFinish = ({name, price, description, quantity}) => {
    const data = {
      name, 
      price, 
      description,
      quantity,
      isDeleted: false
    }
    if (param.productId) {
      productAPI.editOneProduct(param.productId,data);
      success()
      return;
    }
    productAPI.addOneProduct(data);
    success()
    form.setFieldsValue({
      name:'',
      price:0,
      quantity:1,
      description:''
    })
  };
  const success = () => {
    message.success('Successfully');
};
  const cancelButtonHandler =()=>{
    history.push("/product");
  }
  
 
    return (
      <>
          <Form {...layout} name="nest-messages" 
            onFinish={onFinish} 
            validateMessages={validateMessages} 
            style={{width:"50%", margin:"auto", marginTop:"2%"}}
            form ={form}
            initialValues={{
              name:'',
              price:0,
              quantity:1,
              description:''
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
                  name={'price'}
                  label="Price"
                  rules={[
                    {
                        required: true,
                    },
                  ]}
              >
                <InputNumber  />
            </Form.Item>
            <Form.Item
                  name={'quantity'}
                  label="Quantity"
                  rules={[
                    {
                        required: true,
                    },
                  ]}
              >
                <InputNumber  />
            </Form.Item>
            <Form.Item
                  name={'description'}
                  label="Description"
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
      </>
    );
};
export default ProductDetail;