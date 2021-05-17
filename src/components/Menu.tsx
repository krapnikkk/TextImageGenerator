import * as React from 'react'
import { Tabs } from 'antd';
// import { AppstoreOutlined, MailOutlined } from '@ant-design/icons';
import Preview from "./settings/Preview"
import Content from "./settings/Content"
// import Export from './settings/Export';
import Advanced from './settings/Advanced';
import './Menu.css';

// const { SubMenu } = Menu;
const { TabPane } = Tabs;
// submenu keys of first level
// const rootSubmenuKeys = ['sub1'];

const Sider = () => {
  return (
    // <nav className="menu">
    //   <Menu mode="horizontal" theme="dark" defaultOpenKeys={rootSubmenuKeys} >
    //     {/* <SubMenu key="sub0" icon={<SettingOutlined />} title="导出设置">
    //       <Export />
    //     </SubMenu> */}
    //     <SubMenu key="sub1" icon={<MailOutlined />} title="文字设置">
    //       <Content />
    //     </SubMenu>
    //     <SubMenu key="sub2" icon={<MailOutlined />} title="高级设置">
    //       <Advanced />
    //     </SubMenu>
    //     <SubMenu key="sub3" icon={<AppstoreOutlined />} title="预览设置">
    //       <Preview />
    //     </SubMenu>
    //   </Menu>
    // </nav>
    <section className="menu">
      <Tabs defaultActiveKey="2">
        {/* <TabPane tab="导出设置" key="1">
          <Export />
        </TabPane> */}
        <TabPane tab="内容设置" key="2">
          <Content />
        </TabPane>
        <TabPane tab="预览设置" key="3">
          <Preview />
        </TabPane>
        <TabPane tab="高级设置" key="4">
          <Advanced />
        </TabPane>
      </Tabs>
    </section>
  );
};

export default Sider;