import ListProduct from "../../../components/product/ListProducts";
import { Button } from 'antd';
import { useHistory } from "react-router";
import BorderLayout from "../../../components/common/BorderLayout";
const List = () => {
    const history = useHistory();
    const clickButtonHandler =()=>{
        history.push("/product/new");
    }
    return (
        <BorderLayout>
            <Button type="primary" style={{marginBottom:"1%", marginLeft:"1%"}} onClick={clickButtonHandler}>New</Button>
            <ListProduct/>
        </BorderLayout>
    );

};
export default List;