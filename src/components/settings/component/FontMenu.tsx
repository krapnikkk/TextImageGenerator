import * as React from 'react'
import * as antd from 'antd';
import { DownOutlined, CheckOutlined } from '@ant-design/icons';
import { inject, observer } from 'mobx-react';
import { getLocalFontlist } from '@utils/fontdetect';
import { EVENT_UPDATE_FONTS } from '@constants/constants';
import emitter from "@event/index"
@inject('AppStore')
@observer
class FontMenu extends React.Component<IProps> {
    type: string = "";
    state = {
        index: -1,
        title: "",
        loading: false
    }
    componentWillMount() {
        let { type } = this.props;
        this.type = type;
        emitter.on(EVENT_UPDATE_FONTS, () => {
            this.forceUpdate();
        })
    }

    onClick = (event: { [key: string]: any }) => {
        let index = event.item.props.index;
        this.props.AppStore.updateList(this.type, index);
        let item = this.props.AppStore[`${this.type}List`][index];
        let { en, zh } = item;
        this.props.AppStore.updateAttribute(this.type, en);
        this.setState({
            index,
            title: `${en}【${zh}】`
        })
    };
    scanClick = () => {
        const key = 'updatable';
        antd.message.loading({ content: '检索系统自带默认字体中', key }).then(() => {
            let fontFamilyList = getLocalFontlist();
            this.props.AppStore.createList(this.type, fontFamilyList);
            this.forceUpdate();
            antd.message.success({ content: '检索完成!', key, duration: 2 });
        })

    };

    render() {
        let { title } = this.props;
        let menu = this.props.AppStore[`${this.type}List`];

        let disabled = false;
        if (menu.length == 0) {
            disabled = true;
        }
        let menuList = <antd.Menu onClick={this.onClick}>
            {
                menu.map((item: { [key: string]: string }, idx: number) => {
                    let { zh, en } = item;
                    return <antd.Menu.Item key={idx}>{`${en}【${zh}】`}{this.state.index == idx ? <CheckOutlined /> : null}</antd.Menu.Item>
                })
            }
        </antd.Menu>;
        return (
            <>
                <antd.Dropdown overlay={menuList} trigger={['click']} placement="bottomCenter" disabled={disabled}>
                    <antd.Button style={{ marginRight: "10px" }} >
                        <a className="ant-dropdown-link"onClick={e => e.preventDefault()}>{title} <DownOutlined />
                        </a>
                    </antd.Button>
                </antd.Dropdown>
                {disabled ? <antd.Button onClick={this.scanClick.bind(this)}>检索字体</antd.Button> : null}
            </>
        )
    }
}

export default FontMenu