import { Route, Switch } from "react-router-dom";
import List from './list';
import New from './new';
const Product = () => {
    return (
        <Switch>
            <Route path="/product" exact component={List}/>
            <Route path="/product/new" component={New} />
            <Route path="/product/:productId" component={New} />
        </Switch>
    );
};
export default Product;