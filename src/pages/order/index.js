import { Route, Switch } from 'react-router';
import MainCard from '../../components/common/MainCard';
import AddOrder from './UI/AddOrder';
import ListOrder from './UI/ListOrder';
const Orders = () => {
    return (
        <MainCard nameContent="Orders">
            <Switch>
                <Route path="/orders" exact>
                    <ListOrder/>
                </Route>
                <Route path="/orders/new">
                    <AddOrder />
                </Route>
            </Switch>
        </MainCard>
    )
};
export default Orders;