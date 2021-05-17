import * as React from 'react'
import * as antd from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { inject, observer } from 'mobx-react';

@inject('AppStore')
@observer
class Upload extends React.Component<IProps> {
    type: string = "";
    state = {
        visible: true
    }
    componentWillMount() {
        let { type } = this.props;
        this.type = type;
    }

    beforeUpload = (file: File) => {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            let url = reader.result;
            this.props.AppStore.updateAttribute(this.type, url);
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
            <antd.Upload name={name} beforeUpload={this.beforeUpload} onRemove={this.onRemove} accept="image/png, image/jpeg" >
                {visible ? <antd.Button icon={<UploadOutlined />}>上传图片</antd.Button> : null}
            </antd.Upload>
        )
    }
}

export default Upload