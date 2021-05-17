import * as React from 'react'
import * as antd from 'antd';
import { DownOutlined, CheckOutlined } from '@ant-design/icons';
import { inject, observer } from 'mobx-react';


@inject('AppStore')
@observer
class Menu extends React.Component<IProps> {
    type: string = "";
    state = {
        index: -1,
        title: ""
    }
    componentWillMount() {
        let { type } = this.props;
        this.type = type;
    }

    onClick = (event: { [key: string]: any }) => {
        let index = event.item.props.index;
        this.props.AppStore.updateList(this.type, index);
        this.setState({
            index,
            title: this.props.AppStore[`${this.type}List`][index]
        })
    };

    render() {

        let { title } = this.props;

        let menu = this.props.AppStore[`${this.type}List`];

        let menuList = <antd.Menu onClick={this.onClick}>
            {
                menu.map((item: string, idx: number) => {

                    return <antd.Menu.Item key={idx}>{item}{this.state.index == idx ? <CheckOutlined /> : null}</antd.Menu.Item>
                })
            }
        </antd.Menu>;
        return (
            <antd.Dropdown overlay={menuList} trigger={['click']} placement="bottomCenter">
                <antd.Button>
                    <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>{title} <DownOutlined />
                    </a>
                </antd.Button>
            </antd.Dropdown>
        )
    }
}

export default Menu