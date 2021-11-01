import Border from '../../../../components/common/Border'
import './AddOrderProduct.css';
import AddOrderProductItem from './AddOrderProductItem';
import { useEffect, useState, useRef } from 'react';
import productAPI from '../../../../api/ProductAPI';

const AddOrderProduct = () => {
    const [dataFetch, setDataFetch] = useState([]);
    const ref = useRef();
    const searchHandler = (e) => {
        e.preventDefault();
        const value =ref.current.value;
        fetchAPI(value);
        ref.current.value = value 
    }
    const fetchAPI = async (key) => {
      
        const response = await productAPI.findByName(key);
        const data = response.data;
          console.log(data)
            for (const key in data) {
                const value = {
                    id: key,
                    ...data[key]
                };
                setDataFetch([
                    value
                    ])
                 }
    }
       
    const renderDataItem = () => {
        return dataFetch.map((data,index) => {
            return <AddOrderProductItem
                        key={data.id}
                        id={data.id}
                        index={index}
                        name={data.name}
                        price={data.price}
                        quantity="1"
            />
        })
    }
    return (

            <Border className="product-search">
                <div className="title">
                    <h3>Product</h3>
                </div>
                <div className="search">
                    <form className="d-flex" onSubmit={searchHandler}>
                        <input ref={ref}  type="text"/>             
                        <button type="submit">search</button>
                    </form>
                </div>
                {dataFetch.length > 0 && <div className="content">
                    <table>
                        <tr>
                            <td>ID</td>
                            <td>Name</td>
                            <td>Price</td>
                            <td>Setting</td>

                        </tr>
                        {renderDataItem()}
                    </table>
                </div>}
            </Border>
    );
};
export default AddOrderProduct;