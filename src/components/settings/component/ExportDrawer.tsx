import * as React from 'react'
import * as antd from 'antd'
import ExportSetting from '../Export'

export default class ExportDrawer extends React.Component<IProps>  {
    componentDidMount() {
        this.props.triggerRef(this)
    }
    state = {
        visible: false
    }

    show = () => {
        this.setState({
            visible: true
        })
    }

    onClose = () => {
        this.setState({
            visible: false
        })
    }
    render() {
        return (
            <>
                <antd.Drawer
                    title="导出设置"
                    placement="right"
                    width="40vw"
                    closable={true}
                    visible={this.state.visible}
                    onClose={this.onClose}
                    key="export"
                >
                    <ExportSetting />
                </antd.Drawer>

            </>
        )
    }
}