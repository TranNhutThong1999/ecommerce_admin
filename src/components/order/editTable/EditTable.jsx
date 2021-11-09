import React, { useEffect, useState, useRef } from 'react';
import { Table, Form, InputNumber, Popconfirm, Typography, Button } from 'antd';
import { useSelector } from 'react-redux';
import EditableMultiCell from './EditTableMultiCell';

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  dataOption,
  rules,
  showValue,
  custom,
  editable,
  ...restProps
}) => {
    const inputNode = inputType;
    if(editing && showValue){ 
        return <td{...restProps}>
        <Form.Item shouldUpdate>
            {(form) => {
                return custom(form.getFieldsValue())
            }}
        </Form.Item>
        </td>
    }
    if(editing && showValue){ 
        return <td{...restProps}>
        <Form.Item shouldUpdate>
            {(form) => {
                return custom(form.getFieldsValue())
            }}
        </Form.Item>
        </td>
    }
  return (
    <td {...restProps}>
      {editing && !showValue ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={rules}
        >
          {inputNode}
        </Form.Item>
    ) : (
        children
    )}
    </td>
  );
};

const EditTable = ({ columns, dataSource , editableForm, onChangeHandler, mode, trigger}) => {    
    const [data, setData] = useState()
    const [editingKey, setEditingKey] =useState('');
    const isEditing = (record) => record.key === editingKey;
    const [form] = Form.useForm();
    const dataStore = useSelector(state=> state.orderSlice);
    const listSelectKey = dataStore.listProductKey;
    if(editingKey){
        form.setFieldsValue(data[editingKey-1])
    }
    useEffect(()=>{
        editableForm(form)
        renderDataSource()
    },[dataSource])
    
    const renderDataSource=()=>{
        const data = dataSource.map((item, index) => {return {...item, key:index+1}});
        if(mode === 'multiple'){
            form.setFieldsValue(data)
        }
        setData(data)
    }
    const editRecord = (key) => {
        setEditingKey(key) 
    };

    const save = (record)=>{
        form.submit() 
    }
    const onFinish=(values)=>{
        onChangeHandler(data)
        setEditingKey('')
    }
    const onValuesChangeHandler=(changedValues, allValues)=>{
        if(mode==='single'){
            const key = Object.keys(changedValues)
            const dataSelect = listSelectKey[changedValues[key]]
            let  newData = [...data];
            if(dataSelect){
                    newData[editingKey-1]={
                        ...newData[editingKey-1],
                        ...dataSelect,
                        key: editingKey
                    }
                }else{
                    newData[editingKey-1]={
                        ...newData[editingKey-1],
                        [key]:changedValues[key]
                    }
                }
            const valueTrigger= trigger[key]?.(form, null, newData[editingKey-1]);
            if(valueTrigger) newData[editingKey-1] = valueTrigger;
            setData(newData)
        }else{
            const index = Object.keys(changedValues);
            const dataIndex = Object.keys(changedValues[index]);
            const dataSelect = listSelectKey[changedValues[index][dataIndex]];
            let newData = [...data];
            if(dataSelect){
                newData[index]={
                    ...newData[index],
                    ...dataSelect,
                    key: (parseInt(index)+1)
                }
            }else{
                newData[index]={
                    ...newData[index], 
                    [dataIndex]:changedValues[index][dataIndex]
                }
            }
            const valueTrigger= trigger[dataIndex]?.(form, index, newData[index]);
            if(valueTrigger) newData[index] = valueTrigger;
            onChangeHandler(newData)
        } 
    }
    
    const clickButtonNewHandler=()=>{
        setEditingKey(data.length+1)
        const newData = [...data];
        newData.push({
            key: data.length+1
        })
        setData(newData)
        form.resetFields()
        if(mode==="multiple"){
            onChangeHandler(newData)
        }
    }

    const cancelNewProduct =(key)=>{
        setEditingKey('');
        setData(dataSource);
    }
    const deleteRecord =(key)=>{
        let newData= [...data];
        newData = newData.filter((e, index)=> index !== (key -1));
        setData(newData)
        onChangeHandler(newData)
    }
    
    // const columnsDataIndexKey = columns.reduce((prev, current)=>{
    //      prev[current.dataIndex]= current
    //      return prev;
    // },{})
    const addOpetationColumn=()=>{
        columns = columns.filter(e=> e.title !== 'Operation');
        if(mode ==='single'){
            columns.push(
                {
                    title: 'Operation',
                    dataIndex: 'operation',
                    width: '40%',
                    render: (_, record) => {                   
                    const editable = isEditing(record);
                    return editable ? (
                        <span>
                        <a
                            onClick={() => save(record)}
                            style={{
                            marginRight: 8,
                            }}
                        >
                            Save
                        </a>
                        <Popconfirm title="Sure to cancel?" onConfirm={()=>cancelNewProduct(record.key)}>
                            <a>Cancel</a>
                        </Popconfirm>
                        </span>
                    ) : (
                        <span>
                            <Typography.Link disabled={editingKey !== ''} onClick={() => editRecord(record.key)} style={{marginRight:8}}>
                            Edit
                            </Typography.Link>
                            <Popconfirm title="Sure to delete?" disabled={editingKey !== ''} onConfirm={()=>deleteRecord(record.key)}>
                                <a disabled={editingKey !== ''}>Delete</a>
                            </Popconfirm>
                        </span>
                    );
                    }
                }
            )
        }else{
            columns.push(
                {
                    title: 'Operation',
                    dataIndex: 'operation',
                    width: '40%',
                    render: (_, record) => {                   
                        return (
                                <Popconfirm title="Sure to delete?" onConfirm={()=>deleteRecord(record.key)}>
                                    <a >Delete</a>
                                </Popconfirm>
                        );
                    }
                }
            )
        }
        
    }
    addOpetationColumn()
    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
        return col;
        }
        return {
        ...col,
        onCell: (record) => ({
            record,
            inputType: col.type,
            dataIndex: col.dataIndex,
            title: col.title,
            editing: isEditing(record),
            rules:col.rules,
            showValue: col.showValue,
            custom:col.custom,
            editable: col.editable,
        }),
        };
    });
    const disableButtonHandler=()=>{
        if(mode ==='single'){
            return editingKey ? true: false
        }else{
            return false;
        }
    }

    return (
        <Form  onValuesChange={onValuesChangeHandler} form={form} onFinish={onFinish} component={false}  >
          <Button type="primary" onClick={clickButtonNewHandler} disabled={disableButtonHandler()}>New</Button>
          <Table
              components={{
                body: {
                  cell: mode==="single" ? EditableCell : EditableMultiCell,
                  //
                },
              }}
              bordered
              dataSource={data}
              columns={mergedColumns}
              rowClassName="editable-row"
          />
        </Form>
    );
};

export default EditTable;