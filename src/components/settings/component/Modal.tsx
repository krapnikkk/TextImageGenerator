import * as React from 'react'
import * as antd from 'antd';
import { inject, observer } from 'mobx-react';
import FontUpload from './FontUpload';
import { FontFileType } from '@enum/index';
import emitter from "@event/index"
import { EVENT_UPDATE_FONTS } from '@constants/constants';

@inject('AppStore')
@observer
class Modal extends React.Component<IProps> {
    type: string = "";
    state = {
        isModalVisible: false
    }

    componentWillMount() {
        let { type } = this.props;
        this.type = type;
        emitter.on(EVENT_UPDATE_FONTS, () => {
            this.forceUpdate();
        })
    }
    showModal = () => {
        this.setState({ isModalVisible: true })
        // setIsModalVisible(true);
    };

    handleOk = () => {
        this.setState({ isModalVisible: false })
        // setIsModalVisible(false);
    };

    handleCancel = () => {
        this.setState({ isModalVisible: false })
        // setIsModalVisible(false);
    };

    render() {
        // let { data, value } = this.props;
        let { title } = this.props;
        let { fontFamilyList } = this.props.AppStore;
        const columns = [
            {
                title: 'en',
                dataIndex: 'en',
            },
            {
                title: 'zh',
                dataIndex: 'zh',
            },
            {
                title: 'type',
                dataIndex: 'type',
                render: (type: FontFileType) => <span>{type == FontFileType.local ? "本地" : "远程"}</span>
            },
        ];
        return (
            <>
                <antd.Button type="primary" onClick={this.showModal}>
                    管理字体
                </antd.Button>
                <antd.Modal title={title} visible={this.state.isModalVisible} onOk={this.handleOk} onCancel={this.handleCancel} style={{width:"70vw"}}>
                    <h3>系统已安装字体，列表没显示？</h3>
                    <p>通过字体文件添加到字体列表【支持.ttf|.oft|woff类型文件】</p>
                    <FontUpload />
                    <antd.Divider />
                    {/* // todo */}
                    {/* <antd.Button type="primary" onClick={this.showModal}>添加字体</antd.Button> */}
                    <antd.Table columns={columns} dataSource={fontFamilyList} />
                </antd.Modal>
            </>
        )
    }
}

export default Modal