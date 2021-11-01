import './OrderItem.css';
const OrderItem = (props) => {
    const { code, createTime, deliveryTime, products } = props.order
    const calcPrice = () => {
        return products.reduce((x1, x2) => {
            return x1 + x2.price;
        },0)
    }
     const calcQuantity = () => {
         return products.reduce((x1, x2) => {
            return x1 + x2.quantity;
        },0)
    }
    return (
         <tr className={(props.index+1) % 2 !==0 ? 'highlight': ''}>
            <th>{props.index+1}</th>
            <th>{code}</th>
            <th>{calcQuantity()}</th>
            <th>${calcPrice()}</th>
            <th>{createTime}</th>
             <th>{deliveryTime}</th>
            <th>
                <button className="delete">Delete</button>
            </th>
        </tr>
    );
};
export default OrderItem;