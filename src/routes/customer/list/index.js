import BorderLayout from "../../../components/common/BorderLayout";
import ListCustomer from "../../../components/customer/ListCustomer";
import { Button } from 'antd';
import { useHistory } from "react-router";
const List =()=>{
    const history =useHistory();
    const clickButtonHandler=()=>{
        history.push('/customer/new');
    }
    return(
        <BorderLayout>
            <Button type="primary" style={{marginBottom:"1%", marginLeft:"1%"}} onClick={clickButtonHandler}>New</Button>
            <ListCustomer/>
        </BorderLayout>
    );
};
export default List;