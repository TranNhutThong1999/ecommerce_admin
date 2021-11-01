import { Route, Switch } from "react-router";
import List from './list';
import New from './new'
const Customer = () => {
    return ( 
        <Switch>
            <Route path="/customer"exact component={List}  />
            <Route path="/customer/new" component={New}  />
            <Route path="/customer/:customerId" component={New}  />
        </Switch>
    );
};
export default Customer;