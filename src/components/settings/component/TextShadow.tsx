import * as React from 'react'
import * as antd from 'antd';
import { inject, observer } from 'mobx-react';
import ColorPicker from './ColorPicker';
import Slider from './Slider';
import { toRGBCSS } from '@utils/utils';
import '../Setting.css';
import emitter from "@event/index"
import { EVENT_UPDATE_OPTIONS } from '@constants/constants';


@inject('AppStore')
@observer
class TextShadow extends React.Component<IProps> {
    type: string = "textShadow";
    componentWillMount() {
        emitter.on(EVENT_UPDATE_OPTIONS, () => {
            this.forceUpdate();
        })
    }
    addClick = () => {
        let { textShadowOffsetBlurRadius, textShadowOffsetX, textShadowOffsetY, textShadowColor } = this.props.AppStore;
        let [blurRadius, offsetX, offsetY, color] = [textShadowOffsetBlurRadius, textShadowOffsetX, textShadowOffsetY, textShadowColor];
        this.props.AppStore.addList(this.type, { color, offsetX, offsetY, blurRadius });
    }

    onClear = () => {
        this.props.AppStore.clearList(this.type);
        this.forceUpdate();
    }

    // resetClick = () => {
    //     this.props.AppStore.updateAttribute("textShadowColor",JSON.stringify({
    //         r: 0,
    //         g: 0,
    //         b: 0,
    //     }));
    //     this.props.AppStore.updateAttribute("textShadowOffsetX",0);
    //     this.props.AppStore.updateAttribute("textShadowOffsetY",0);
    //     this.props.AppStore.updateAttribute("textShadowOffsetBlurRadius",0);
    //     this.forceUpdate();
    // }

    onDelete = (index: number) => {
        this.props.AppStore.deleteList(this.type, index);
        this.forceUpdate();
    }

    render() {
        let { textShadowOffsetBlurRadius, textShadowOffsetX, textShadowOffsetY, textShadowList } = this.props.AppStore;
        let list = [...textShadowList];
        const columns = [
            {
                title: '阴影颜色',
                dataIndex: 'color',
                render: (color: any) => <span style={{ background: toRGBCSS(color), width: "10px", height: "10px" }}></span>
            },
            {
                title: '水平偏移',
                dataIndex: 'offsetX',
                render: (text: string) => <span>{text}px</span>
            },
            {
                title: '垂直偏移',
                dataIndex: 'offsetY',
                render: (text: string) => <span>{text}px</span>

            },
            {
                title: '模糊半径',
                dataIndex: 'blurRadius',
                render: (text: string) => <span>{text}px</span>
            },
            {
                title: '操作',
                dataIndex: 'operation',
                render: (_: any, record: { key: React.Key }) =>
                    <antd.Popconfirm title="确定移除该项？" onConfirm={() => this.onDelete(+record.key)}>
                        <a>移除</a>
                    </antd.Popconfirm>
            },
        ];
        return (
            <>
                <section className={"textshadow"}>
                    <section className={"textshadowColor"}>
                        <h4>阴影颜色</h4>
                        <ColorPicker type={"textShadowColor"} />
                    </section>
                    <section>
                        <h4>水平偏移</h4>
                        <Slider type={"textShadowOffsetX"} defaultValue={textShadowOffsetX} min={-25} max={25} step={1} />
                    </section>
                    <section>
                        <h4>垂直偏移</h4>
                        <Slider type={"textShadowOffsetY"} defaultValue={textShadowOffsetY} min={-25} max={25} step={1} />
                    </section>
                    <section>
                        <h4>模糊半径</h4>
                        <Slider type={"textShadowOffsetBlurRadius"} defaultValue={textShadowOffsetBlurRadius} min={0} max={20} step={1} />
                    </section>
                </section>
                <antd.Button type="primary" style={{ marginRight: "10px" }} onClick={this.addClick.bind(this)}>添加样式</antd.Button>
                {/* <antd.Button type="primary" style={{ marginRight: "10px" }} onClick={this.resetClick.bind(this)}>重置样式</antd.Button> */}
                {
                    textShadowList.length
                        ?
                        <antd.Button type="primary" onClick={this.onClear.bind(this)}>清空样式</antd.Button>
                        :
                        null
                }
                {
                    textShadowList.length
                        ?
                        <antd.Table columns={columns} dataSource={list} rowKey={(record) => {
                            return record.key;
                        }} />
                        : null
                }
            </>
        )
    }
}

export default TextShadow