import { Select } from 'antd';
const SelectForm =({value, onChange, dataOption ,onUpdateValue})=>{
    const { Option } = Select;
    const renderDataOption=()=>{
        return dataOption.map(item=> 
            <Option key={item.key} value={item.productId} title={item.name} >{item.name}</Option>)
    }
    //console.log({dataOption});
    const changeValueHandler =(e)=>{
        onChange(e);      
    }
   
    return(
        <Select
            showSearch
            style={{ width: "100%" }}
            placeholder="Select a customer"
            optionFilterProp="children"
            onChange={changeValueHandler}
            value={value}
            //filterOption={filterOption}
            >
            {renderDataOption()}
        </Select>
    );
}
export default SelectForm;