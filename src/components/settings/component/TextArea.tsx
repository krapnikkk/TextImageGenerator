import * as React from 'react'
import * as antd from 'antd';
import { inject, observer } from 'mobx-react';

@inject('AppStore')
@observer
class TextArea extends React.Component<IProps> {
    type: string = "";
    state = {
        value: '',
    };
    componentWillMount() {
        let { type } = this.props;
        this.type = type;
    }
    onSwitchChange = (checked: boolean) => {
        this.props.AppStore.updateAttribute(this.type, checked);
    };

    addText = () => {
        let value = this.state.value;
        value = value.replace(/\s+/g,"");
        if (value == "") { antd.message.warning({ content: '请输入你要生成的图片的文字!', duration: 2 });return };
        this.setState({ value: "" });
        this.props.AppStore.updateContent(this.type, value);
    };

    onChange = (e: any) => {
        let { value } = e.target;
        this.setState({ value });
    };

    render() {
        let { value } = this.state;
        let { placeholder, rows, minRows, maxRows,title } = this.props;
        return (
            <>
                <antd.Input.TextArea rows={rows}
                    placeholder={placeholder}
                    autoSize={{ minRows, maxRows }}
                    value={value}
                    onPressEnter={this.addText}
                    onChange={this.onChange}
                />
                <antd.Button type="primary" style={{ marginTop: "10px" }} onClick={this.addText.bind(this)}>{title}</antd.Button>
            </>
        )
    }
}

export default TextArea