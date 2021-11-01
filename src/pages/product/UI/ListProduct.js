import './ListProduct.css'
import Border from '../../../components/common/Border';
import ProductItem from './ProductItem';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { productActions } from '../ProductSlice';
import { useHistory } from 'react-router-dom';
const ListProduct = () => {
    const history = useHistory();
    const dataStore = useSelector(state => state.productSlice);
    const listProduct = dataStore.products;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(productActions.loadData())
    }, [])
    
    const clickButtonAddHandler = () => {
        history.push("/products/new")
    }
    const renderProduct =()=>{
        if (listProduct) {
          return listProduct.map((product, index)=>{
              return <ProductItem
                id={product.id}
                key={product.id}
                index={index}
                name={product.name}
                description={product.description}
                price={product.price}
                quantity={product.quantity}
            ></ProductItem>
            })
         }  
    }

    return (
                <Border className="list-product" >
                    <div className="button"><button className="add" onClick ={clickButtonAddHandler}>New</button></div>
                        <table>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Description</th>
                                <th>Quantity</th>
                                <th>Setting</th>
                            </tr>
                            {renderProduct()}
                            </table>
                        </Border>
           
    )
};
export default ListProduct;