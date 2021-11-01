import { Route, Switch } from 'react-router';
import ListOrder from './list';
import New from './new';
const Order = () => {
    
    return (
        <Switch>
            <Route path="/order" exact component={ListOrder}/>
            <Route path="/order/new" component={New} />
        </Switch>
    );
};
export default Order;