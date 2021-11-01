import { Tabs, Form, Button, Input } from 'antd';
import { useHistory } from 'react-router';
import BorderLayout from '../../../components/common/BorderLayout';
import CustomerOrder from '../../../components/order/CustomerOrder';
import ProductOrder from '../../../components/order/ProductOrder';
import { useDispatch } from 'react-redux';
import { orderActions } from '../../../redux/store/OrderSlice';
import { useSelector } from 'react-redux';
import { SaveOutlined } from '@ant-design/icons';
const ListOrder = () => {
	const dataStore = useSelector(state => state.orderSlice);
	const { TabPane } = Tabs;
	const history = useHistory();
	const [form] = Form.useForm();
	const dispatch = useDispatch();

	const submitFormHandler=(value)=>{
		const dataProduct = dataStore.order.productsCart;
		const dataProductConvert = dataProduct.map(item => {return {id:item.productId, quantity:item.quantity, price:item.price}});
		const dataCustomer =dataStore.order.customerCart;
		const dataMain ={
			code:Math.floor(100000 + Math.random() * 900000),
			address: dataCustomer.address,
			createTime: new Date().getTime(),
			customerId: dataCustomer.id,
			information: `${dataCustomer.name} - ${dataCustomer.phone} `,
			products: dataProductConvert,
			total: dataStore.order.total,
			isDeleted:false
			
		}
		dispatch(orderActions.submitOrder(dataMain));
		dispatch(orderActions.resetCart())
	}
	return (
		<BorderLayout>
			<Form form={form} name="ds"  onFinish={submitFormHandler} >
				<Tabs defaultActiveKey="1">
					<TabPane tab="Customer info" key="1">
						<CustomerOrder form={form} />
					</TabPane>
					<TabPane tab="Product" key="2">
						<ProductOrder form={form} />
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
