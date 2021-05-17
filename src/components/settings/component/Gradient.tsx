import * as React from 'react'
import * as antd from 'antd';
import { inject, observer } from 'mobx-react';


@inject('AppStore')
@observer
class Gradient extends React.Component<IProps> {
    type: string = "";
    state = {
        value: ""
    };
    componentWillMount() {
        let { type } = this.props;
        this.type = type;
    }

    onChange = (e: any) => {
        let { value } = e.target;
        this.setState({ value });
        if (value.startsWith("linear-gradient(") && value.endsWith(");")) {
            value = value.replace(/;/g, "");
            this.props.AppStore.updateAttribute(this.type, value);
        }

    };

    onClick = () => {
        let { value } = this.state;
        if (value == "" || !value.startsWith("linear-gradient(") || !value.endsWith(");")) {
            antd.message.warn({ content: '格式不符或者内容为空！', duration: 2 })
            return;
        }
        value = value.replace(/;/g, "");
        this.forceUpdate();
    };

    onRemove = () => {
        let value = "";
        this.setState({ value });
        this.props.AppStore.updateAttribute(this.type, value);
        this.props.AppStore.clearContentAttribute(this.type);
        this.forceUpdate();
    }

    render() {
        let { placeholder } = this.props;
        let { gradient } = this.props.AppStore;
       
        return (
            <>
                <antd.Input placeholder={placeholder} onChange={this.onChange} onPressEnter={this.onClick} value={this.state.value} />
                {
                    gradient!==""
                        ?
                        <antd.Button type="primary" onClick={this.onRemove.bind(this)}>移除渐变</antd.Button>
                        :
                        null
                }
            </>
        )
    }
}

export default Gradient;