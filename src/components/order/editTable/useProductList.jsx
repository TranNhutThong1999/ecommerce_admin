import { useSelector } from "react-redux";

const useProductList=()=>{
    const dataStore = useSelector(state=> state.orderSlice);

    const findPrice=(productId)=>{
        const product = dataStore.listProductKey[productId]
        return product?.price;
    }
    return (
        {findPrice}
    )
};
export default useProductList;