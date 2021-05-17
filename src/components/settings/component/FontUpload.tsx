import * as React from 'react'
import * as antd from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { inject, observer } from 'mobx-react';
import opentype from 'opentype.js'
import _ from 'lodash';
import { storage } from '@utils/storage';
import { FontFileType } from '@enum/index';
import emitter from "@event/index"
import { EVENT_UPDATE_FONTS } from '@constants/constants';

@inject('AppStore')
@observer
class FontUpload extends React.Component<IProps> {
    type: string = "fontFamily";
    state = {
        visible: true
    }

    beforeUpload = (file: File) => {
        let reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onload = () => {
            let content = reader.result;
            let font, fontFamily;
            try {
                font = opentype.parse(content);
                fontFamily = font.names.fontFamily;
            } catch (e) {
                console.log(e);
                antd.message.warning({ content: '该字体文件读取失败，请检查文件的有效性！', duration: 2 });
            }
            (content as unknown) = null;
            (file as unknown) = null;
            (font as unknown) = null;
            if (fontFamily) {
                fontFamily['type'] = FontFileType.local;
                this.props.AppStore.uniqAddList(this.type, fontFamily);
                let { fontFamilyList } = this.props.AppStore;
                storage.set("font", fontFamilyList);
                antd.message.success({ content: '添加成功！', duration: 2 });
                emitter.emit(EVENT_UPDATE_FONTS);
            }
        };
        this.setState({ visible: false })
        return false;
    }

    onRemove = (file: any) => {
        this.setState({ visible: true })
    }

    render() {
        let { name } = this.props;
        let { visible } = this.state;
        return (
            <antd.Upload name={name} beforeUpload={this.beforeUpload} accept={".ttf,.otf,.woff"} onRemove={this.onRemove}>
                {visible ? <antd.Button icon={<UploadOutlined />}>查询字体</antd.Button> : null}
            </antd.Upload>
        )
    }
}

export default FontUpload