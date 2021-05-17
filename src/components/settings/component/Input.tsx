import * as React from 'react'
import * as antd from 'antd';
import { inject, observer } from 'mobx-react';


@inject('AppStore')
@observer
class Input extends React.Component<IProps> {
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
    };

    onClick = () => {
        this.props.AppStore.updateAttribute(this.type, this.state.value);
    };

    render() {
        let { placeholder } = this.props;
        return (
            <>
                <antd.Input placeholder={placeholder} onChange={this.onChange} onPressEnter={this.onClick} />
                <antd.Button type="primary" onClick={this.onClick.bind(this)} >添加渐变</antd.Button>
            </>
        )
    }
}

export default Input;