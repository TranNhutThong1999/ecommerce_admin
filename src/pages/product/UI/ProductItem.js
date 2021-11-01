import './ProductItem.css'
import { useDispatch } from 'react-redux';
import { productActions } from '../ProductSlice'
import { useHistory } from 'react-router-dom';
const ProductItem = (props) => {
    const { id, index, name, price, description, quantity } = props;
    const history = useHistory();
  //  const listOrder = useSelector(state => state.orderSlice.products);

    const dispatch = useDispatch();
    // const findOrderId = () => {
    //     const result =[]
    //    for (let index = 0; index < listOrder.length; index++) {
    //        if (listOrder[index].productId === id) {
    //            result.push(listOrder[index].id);
    //        }
           
    //     }
    //     return result;
    // }
    const editProductHandler = () => {
        history.push(`/products/${id}`)
    }
    const deleteProductHandler = () => {
           dispatch(productActions.deleteData(id))
    }
    return (
        <tr className={(index+1) % 2 !==0 ? 'highlight': ''}>
            <th>{index+1}</th>
            <th>{name}</th>
            <th>${price}</th>
            <th>{description}</th>
            <th>{quantity}</th>
            <th>
                <button className="edit" onClick={editProductHandler}>Edit</button>
                <button className="delete" onClick={deleteProductHandler}>Delete</button>
            </th>
        </tr>
    )
};
export default ProductItem;