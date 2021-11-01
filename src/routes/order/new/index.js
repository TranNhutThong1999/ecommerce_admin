import { Tabs, Form, Button, Input } from 'antd';
import { useHistory } from 'react-router';
import BorderLayout from '../../../components/common/BorderLayout';
import CustomerOrder from '../../../components/order/CustomerOrder';
import ProductOrder from '../../../components/order/ProductOrder';
import orderAPI from '../../../api/orderAPI'
import { SaveOutlined } from '@ant-design/icons';
const ListOrder = () => {
	const { TabPane } = Tabs;
	const history = useHistory();
	const [form] = Form.useForm();

	const submitFormHandler=(value)=>{
		
		const dataMain ={
			 code:Math.floor(100000 + Math.random() * 900000),
			 address: value.address,
			 createTime: new Date().getTime(),
			 customerId: value.customerId,
			 information: `${value.nameCustomer} - ${value.phone} `,
			 products: value.products,
			 total:total(value.products),
			 isDeleted:false		
		}
		addOrderAPI(dataMain)
		
	}
	const addOrderAPI = async(data)=>{
			await orderAPI.addOrder(data);
			history.push('/order')
	}
	const total = (productCart) => {
		if(productCart){
		  return productCart.reduce((x1, x2) => {
			  return x1 + x2.price * x2.quantity * ((100 - x2.discount) / 100);
		  }, 0);
		} return 0
	  };
	return (
		<BorderLayout>
			<Form form={form} name="ds"  onFinish={submitFormHandler} >
				<Tabs defaultActiveKey="1">
					<TabPane tab="Customer info" key="1">

						<CustomerOrder form={form} />
					</TabPane>
					<TabPane tab="Product" key="2">
						<Form.Item name="products">
							<ProductOrder form={form} />
						</Form.Item>
					</TabPane>
				</Tabs> 
				<Form.Item>
					<Button htmlType="submit"  icon={<SaveOutlined />}
					 style={{float:"right", margin:"2% 2% 2% 0"}}
					 danger
					 type="primary"
					>Submit</Button>
				</Form.Item>
				
			</Form>
		</BorderLayout>
	);
};
export default ListOrder;
