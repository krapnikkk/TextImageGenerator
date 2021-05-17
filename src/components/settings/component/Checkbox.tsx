import * as React from 'react'
import * as antd from 'antd';
import { inject, observer } from 'mobx-react';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';

@inject('AppStore')
@observer
class Checkbox extends React.Component<IProps> {
    type: string = "";
    componentWillMount () {
        let { type } = this.props;
        this.type = type;
    }
    onChange = (checkedValues: Array<CheckboxValueType>) => {
        this.props.AppStore.updateCheckbox(this.type, checkedValues);
    };

    render() {
        let list = this.props.AppStore[`${this.type}Checkbox`];
        return (
            <antd.Checkbox.Group
                options={list}
                onChange={this.onChange}
            />
        )
    }
}

export default Checkbox