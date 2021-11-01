import Menu from './components/menu/Menu';
import {Fragment} from 'react';
import './App.css';
import { Route, Redirect, Switch } from 'react-router-dom';
import Customers from './pages/customer'
import Products from './pages/product';
import Orders from './pages/order'
function App() {
  return (
    
      <div className="main d-flex">
      <Menu />
      <Switch>
            <Route path="/" exact>
              <Redirect to="/customers"></Redirect>
            </Route>

            <Route path="/customers" component={Customers} />
            <Route path="/products" component={Products} />
            <Route path="/orders" component={Orders} />
            
            <Route path="*">
              <h1>404</h1>
            </Route>
        </Switch>
      </div>
    
   
  );
}

export default App;
