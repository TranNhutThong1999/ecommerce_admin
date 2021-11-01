import './Menu.css'
import logo from './../../logo.svg'
import { NavLink } from 'react-router-dom';
const Menu = (props)=>{
    return(
        <div className="menu">
            <div className="container">
                <div className="title d-flex justify-content-center">
                    <img src={logo} alt="" />
                    <h3> E-commerce Admin</h3>
                    </div>
                <div className="menu-items d-flex flex-direction-column align-items-center">
                    <NavLink to="/customers" activeClassName="active"  className="item ">
                        <div className="item-content d-flex">
                            <img src={logo} alt="" />
                                <h3>Customers</h3>
                                </div>      
                        </NavLink>
                    <NavLink to="/orders" activeClassName="active" className="item">
                        <div className="item-content d-flex">
                                <img src={logo} alt="" />
                                    <h3>Orders</h3>
                                    </div>   
                        </NavLink>
                    <NavLink to="/products" activeClassName="active"  className="item">
                        <div className="item-content d-flex">
                                <img src={logo} alt="" />
                                    <h3>Product</h3>
                                    </div> 
                        </NavLink>
        
                </div>
            </div>
        </div>
    )
};
export default Menu;