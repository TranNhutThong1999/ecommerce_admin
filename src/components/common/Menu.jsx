import React, { useState } from 'react';
import { Menu, Button } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
} from '@ant-design/icons';
import { Link, NavLink } from 'react-router-dom';

const MenuC = ({collapsed, onCollapsed}) => {

    const toggleCollapsed = () => {
      onCollapsed(!collapsed)
    }
    return (
        <div class="full-width">
        <Button type="primary" onClick={toggleCollapsed} style={{ marginBottom: 16 }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
        </Button>
        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="dark"
          inlineCollapsed={ collapsed}
        >
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            <NavLink to="/product" activeClassName ="ant-menu-item-selected"/> Product
          </Menu.Item>
          <Menu.Item key="2" icon={<DesktopOutlined />}>
            <NavLink to="/order" activeClassName ="ant-menu-item-selected"/>  Order
          </Menu.Item>
          <Menu.Item key="3" icon={<ContainerOutlined />}>
            <NavLink to="/customer" activeClassName ="ant-menu-item-selected"/> Customer
          </Menu.Item>
        </Menu>
      </div>
    );
};
export default MenuC;