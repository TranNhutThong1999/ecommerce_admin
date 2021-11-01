import { Select } from 'antd';
const SelectForm =({value, onChange, dataOption}, props)=>{
    const { Option } = Select;
    const renderDataOption=()=>{
        return dataOption.map(item=> 
            <Option key={item.key} value={item.id} >{item.name}</Option>)
    }
    const changeValueHandler =(e)=>{
        onChange(e)
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