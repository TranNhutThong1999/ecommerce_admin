import Input from '../../../components/input/Input';
import './FormProduct.css';
import { useEffect, useState } from 'react';
import Border from '../../../components/common/Border'
import { useDispatch, useSelector } from 'react-redux';
import { productActions } from '../ProductSlice';
import { useHistory, useParams } from 'react-router-dom';
import productAPI from '../../../api/ProductAPI'
import Form, { Field } from 'rc-field-form';

const FormProduct = () => {
    const dispatch = useDispatch();
    const productDataStore = useSelector(state => state.productSlice);
    const resultAction = productDataStore.resultAction;
    const param = useParams();
    const history = useHistory();
    const [form] = Form.useForm();
    const [error, setError] = useState({});
    const [defaultValue, setDefaultValue] = useState({
                            name: '',
                            description: '',
                            price: 0,
                            quantity:1
                        });
                        
    console.log(defaultValue);
    useEffect(()=>{
        dispatch(productActions.setDefaultResultMessage())
        if (param.productId) {
            fetchData(param.productId)
        } 
    }, [param.productId])
    
    const fetchData = async (id) => {
        const response = await productAPI.getOneProduct(id);
        const product = response.data;
        //setDefaultValue()
        form.setFieldsValue({
            name: product.name,
            description: product.description,
            price: product.price,
            quantity:product.quantity
        })
    
    }

    const fieldChangeHandler = (changeFields, allFields) => {
       setErrorValue(changeFields)
    }
    const submitFaildHandler = ({values, errorFields}) => {
       setErrorValue(errorFields)
    }
    const setErrorValue = (errorFields) => {
        for (let index = 0; index < errorFields.length; index++) {
            const name = errorFields[index].name[0];
            const value = errorFields[index].errors[0];
            setError((prev) => {
                return {
                    ...prev,
                [name]: value
                }
            })
             
        }
        
    }
    const submitFormHandler = (value) => {
    //  console.log(value)
        
            if (param.productId) {
                value['id'] = param.productId;
                dispatch(productActions.editData(value));
                return;
            }
             dispatch(productActions.addData(value));
        
    }
    const clickCancelHandler = () => {
        history.push("/products")
    }
    return (
         <Border>
                <Border className="add-data">
                    <h3>{param.productId ? 'Edit product ': 'New product '}</h3>
                    {resultAction.display && <h3 className="message success">{resultAction.status ? 'Successfully' :'Failure'}</h3>}
                    <div className="container">
                    <Form
                        onFinish={submitFormHandler}
                        onFinishFailed={submitFaildHandler}
                        form={form}
                        onFieldsChange={fieldChangeHandler}
                        initialValues={defaultValue}
                    >
                            <Input   
                                lable="Name"
                                id="name"
                                error={error.name}
                                name="name"
                                rules={[{ required: true }]}
                                input={{
                                    type: 'text'
                                }}
                            />
                            <Input
                                lable="Price"
                                id="price"
                                name="price"
                                error={error.price}
                                input={{
                                    type: 'number',
                                    min: 0,
                                    defaultValue:0
                                }}
                               
                            />
                            <Input
                                lable="Description"
                                id="description"
                                name="description"
                                error={error.description}
                                rules={[{ required: true }]}
                                input={{
                                    type: 'text',
                                }}
                             
                            />
                            <Input
                                lable="Quantity"
                                id="quantity"
                                name="quantity"
                                error={error.quantity}
                                input={{
                                    type: 'number',
                                     defaultValue:1
                                }}
                            />
                        
                            <div className="button">                   
                                <button className="submit" type="submit">Submit</button>
                                <button  className="cancel" onClick={clickCancelHandler}>Cancel</button>
                        </div>
                        </Form>
                    </div>
                </Border>
            </Border>
    )
};
export default FormProduct;