import BorderLayout from '../../../components/common/BorderLayout';
import ListOrder from '../../../components/order/ListOrder';
import { Button } from 'antd';
import { useHistory } from 'react-router';
const List = () => {
    const history =useHistory();
    const clickButtonHandler = () => {
		history.push('/order/new');
	};
    return ( 
        <BorderLayout>
            <Button type="primary" style={{marginBottom:"1%", marginLeft:"1%"}} onClick={clickButtonHandler}>New</Button>
            <ListOrder/>
        </BorderLayout>
    )
};
export default List;