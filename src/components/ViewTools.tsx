import * as React from 'react'
import * as antd from 'antd'
import ExportDrawer from './settings/component/ExportDrawer';
import { inject, observer } from 'mobx-react'
@inject('AppStore')
@observer

export default class ViewTools extends React.Component<IProps>  {
    onClick = () => {
        this.child.show()
    }

    clearContent = ()=>{
        this.props.AppStore.clearContent();
    }
    
    child: any;
    bindRef = (ref: any) => { this.child = ref }
    render() {
        return (<section className={"viewTools"}>
            <antd.Button type="primary" className={"btn-export"} onClick={this.onClick.bind(this)}>导出图片</antd.Button>
            <ExportDrawer triggerRef={this.bindRef} />
            <antd.Button type="primary" className={"btn-clear"} danger onClick={this.clearContent.bind(this)}>清空数据</antd.Button>
            <antd.Button type="primary" className={"btn-config-export"}  disabled onClick={this.onClick.bind(this)}>导出配置</antd.Button>
        </section>)
    }
}