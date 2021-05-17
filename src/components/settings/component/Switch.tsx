import * as React from 'react'
import * as antd from 'antd';
import { inject, observer } from 'mobx-react';

@inject('AppStore')
@observer
class Switch extends React.Component<IProps> {
    type: string = "";
    componentWillMount () {
        let { type } = this.props;
        this.type = type;
    }
    onSwitchChange = (checked: boolean) => {
        console.log(checked);
        this.props.AppStore.updateAttribute(this.type, checked);
    };

    render() {
        let { value } = this.props;
        return (
            <antd.Switch disabled={value} onChange={this.onSwitchChange} />
        )
    }
}

export default Switch