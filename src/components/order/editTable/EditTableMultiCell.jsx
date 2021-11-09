import React, { useEffect, useState, useRef } from 'react';
import {  Form } from 'antd';

const EditableMultiCell = ({
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
    const indexCell =  record?.key-1;
  return (
    <td {...restProps}>
      {editable && !showValue ? (
        <Form.Item validateFirst={true}
          name={[ indexCell ,dataIndex ]}
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
  export default EditableMultiCell;