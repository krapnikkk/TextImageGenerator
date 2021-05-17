import * as React from 'react'
import * as antd from 'antd';
import { inject, observer } from 'mobx-react';
import { RadioItem } from '@interface/index';


@inject('AppStore')
@observer
class Radio extends React.Component<IProps> {
    type: string = "";
    componentWillMount () {
        let { type } = this.props;
        this.type = type;
    }
    onLabelChange = (e: { [key: string]: any }) => {
        let value = e.target.value;
        console.log(value);
        this.props.AppStore.updateAttribute(this.type, value);
    };

    render() {
        let {  data,value } = this.props;
        return (
            <antd.Radio.Group onChange={this.onLabelChange} value={value}>
                {
                    data.map((item:RadioItem,idx:number)=>{
                        const {text,label} = item;
                        return <antd.Radio key={idx} value={label}>{text}</antd.Radio>
                    })
                }
            </antd.Radio.Group>
        )
    }
}

export default Radio