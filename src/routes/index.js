import { Route, Switch } from "react-router-dom";
import Product from './product';
import Order from './order';
import Customer from './customer';
const Router = () => {
    return (
        <Switch>
            <Route path="/customer" component={Customer}></Route>
            <Route path="/order" component= {Order}></Route>
            <Route path="/product" component={Product}></Route>
        </Switch>
    );
};
export default Router;