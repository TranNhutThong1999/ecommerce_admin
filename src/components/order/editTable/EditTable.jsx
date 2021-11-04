import React, { useEffect, useState } from 'react';
import { Table, Form, InputNumber, Popconfirm, Typography, Button } from 'antd';
import { useSelector } from 'react-redux';

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

const EditTable = ({ columns, dataSource , editableForm, onChangeHandler, mode}) => {    
    const [data, setData] = useState(dataSource)
    const [editingKey, setEditingKey] =useState();
    const isEditing = (record) => record.key === editingKey;
    const [form] = Form.useForm();
    const dataStore = useSelector(state=> state.orderSlice);
    const listSelectKey = dataStore.listProductKey;

    if(editingKey){
        form.setFieldsValue(data[editingKey-1])
    }
    useEffect(()=>{
        editableForm(form)
        setData(dataSource)
    },[dataSource])
 
    const editRecord = (key) => {
        setEditingKey(key) 
    };

    const save = (record)=>{
        form.submit() 
    }
    const onFinish=(values)=>{
        onChangeHandler(data)
        setEditingKey('')
       // onChangeHandler(editingKey-1,data[editingKey-1])
    }
    const onValuesChangeHandler=(changedValues, allValues)=>{
        const key = Object.keys(changedValues)
        const dataSelect = listSelectKey[changedValues[key]]
        const newData = [...data];
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
        setData(newData)
    }
  
    const clickButtonNewHandler=()=>{
        setEditingKey(data.length+1)
        const newData = [...data];
        newData.push({
            key: data.length+1
        })
        console.log({newData});
        setData(newData)
        form.resetFields()
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
    
    const addOpetationColumn=()=>{
        columns = columns.filter(e=> e.title !== 'Operation');
        if(mode ==='single'){
            
        }
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
            custom:col.custom
        }),
        };
    });
    return (
        <Form onValuesChange={onValuesChangeHandler} form={form} onFinish={onFinish} component={false}>
          <Button type="primary" onClick={clickButtonNewHandler} disabled={editingKey ? true: false}>New</Button>
          <Table
              components={{
                body: {
                  cell: EditableCell,
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