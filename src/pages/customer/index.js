import { Route, Switch } from 'react-router';
import ListCustomers from './UI/ListCustomers';
import FormCustomer from './UI/FormCustomer';
import MainCard from '../../components/common/MainCard'
import { useRouteMatch } from 'react-router';
const Customers = () => {
    const match = useRouteMatch();
    return (
            <MainCard nameContent="Customer">
                <Switch>
                    <Route path={match.path} exact>
                        <ListCustomers/>
                </Route>
                <Route path={`${match.path}/new`} >
                    <FormCustomer/>
                </Route>
                <Route path={`${match.path}/:customerId`}>
                        <FormCustomer/>
                    </Route>
                </Switch>
            </MainCard>
    )
};
export default Customers;