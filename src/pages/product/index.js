import MainCard from '../../components/common/MainCard'
import ListProduct from './UI/ListProduct';
import { Route, Switch } from 'react-router';
import FormProduct from './UI/FormProduct';
const Products = () => {
    return (
             <MainCard nameContent="Products"> 
                <Switch>
                    <Route path="/products" exact>
                        <ListProduct/>
                    </Route>
                    <Route path="/products/new">
                        <FormProduct/>
                    </Route>
                    <Route path="/products/:productId">
                         <FormProduct/>
                    </Route>
                </Switch>
            </MainCard>
    )
};
export default Products;