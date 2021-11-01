import './App.css';
import Router from './routes';
import { Layout } from 'antd';
import Menu from './components/common/Menu';
import { useState } from 'react';
function App() {
    const { Header, Sider, Content } = Layout;
    const [collapsed, setCollapsed] = useState(false)
    const collapsedHandler = (value) => {
        setCollapsed(value)
    }
    return (
    <Layout>
        <Header>Header</Header>
            <Layout> 
                <Sider defaultCollapsed={true} collapsed={collapsed} ><Menu onCollapsed={collapsedHandler} collapsed={collapsed} /></Sider>
                <Content><Router/></Content>
            </Layout>
    </Layout>
    );
}

export default App;
