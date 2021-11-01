import Input from '../../../components/input/Input';
import './FormCustomer.css';
import { useEffect } from 'react';
import Border from '../../../components/common/Border'
import { useDispatch, useSelector } from 'react-redux';
import { customerActions } from '../CustomerSlice';
import { useHistory, useParams } from 'react-router-dom';
import customerAPI from '../../../api/CustomerAPI';
import { useForm } from 'react-hook-form';
const FormCustomer = () => {
    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({mode:'onChange'});
    const dispatch = useDispatch();
    const customerDataStore = useSelector(state => state.customerSlice);
    const resultAction = customerDataStore.resultAction;
    const param = useParams();
    const history = useHistory();
    console.log(watch())
    useEffect(() => {
        dispatch(customerActions.setDefaultResultMessage())
        if (param.customerId) {
            fetchData(param.customerId)
        }
    }, [param.customerId])
    
    const fetchData = async (id) => {
        const response = await customerAPI.getOneCustomer(id);
        const customer = response.data;
        setValue('name', customer.name)
        setValue('address', customer.address)
        setValue('age', customer.age)
        setValue('gender',customer.gender)
    }

    const nullErrorMessage = "This field can not be null";
    const submitFormHandler = (value) => {
            if (param.customerId) {
                value['id'] = param.customerId;
                dispatch(customerActions.editData(value));
                return;
            }
            dispatch(customerActions.addData(value));
        
    }
    return (
         <Border>
        <Border className="add-data">
            <h3>{param.productId ? 'Edit customer ': 'New customer '}</h3>
            { resultAction.display && <h3 className="message success">{resultAction.status ? 'Successfully' :'Failure'}</h3>}
            <div className="container">
                <form onSubmit={handleSubmit(submitFormHandler)}>
                    <Input
                        lable="Name"
                        id="name"
                        input={{
                            type: 'text'
                        }}
                        register={register('name',{
                            required:{
                                value: true,
                                message:nullErrorMessage
                            }
                        })}
                        error={errors.name}
                    />
                      <Input
                        lable="Gender"
                        id="gender"
                        
                        input={{
                            type: 'select',
                            defaultValue: 'Nam',
                            name:"gender"
                        }}
                        register={register('gender')}
                    
                    />
                     <Input
                        lable="Address"
                        id="address"
                        input={{
                            type: 'text',
                        }}
                       register={register('address',{
                            required:{
                                value: true,
                                message:nullErrorMessage
                            }
                        })}
                        error={errors.address}
                    />
                     <Input
                        lable="Age"
                        id="age"
                        input={{
                            type: 'number',
                            defaultValue:1
                        }}
                       register={register('age',{ valueAsNumber:true})}
                 
                    />
                   
                    <div className="button">                   
                        <button className="submit" type="submit">Submit</button>
                        <button  className="cancel" onClick={()=> history.push("/customers")}>Cancel</button>
                   </div>
                </form>
            </div>
            </Border>
            </Border>
    )
};
export default FormCustomer;