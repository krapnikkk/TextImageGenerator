import * as React from 'react'
import { inject, observer } from 'mobx-react'
import TextArea from './component/TextArea';
import './Setting.css';


@inject('AppStore')
@observer
export default class AdvancedSetting extends React.Component<IProps> {
    type: string = "";
    componentWillMount() {
        let { type } = this.props;
        this.type = type;
    }

    render() {
        return (
            <section className="setting_advanced">
                <section className="content_css">
                    <h4>内容样式：</h4>
                    <TextArea type={"contentCSS"} rows={3} minRows={3} maxRows={5} placeholder="请输入自定义样式" title="应用" />
                </section>
                <section className="before_css">
                    <h4>before样式：</h4>
                    <TextArea type={"beforeCSS"} rows={3} minRows={3} maxRows={5} placeholder="请输入自定义样式" title="应用" />
                </section>
                <section className="after_css">
                    <h4>after样式：</h4>
                    <TextArea type={"afterCSS"} rows={3} minRows={3} maxRows={5} placeholder="请输入自定义样式" title="应用" />
                </section>
                {/* <section>
                    <h4>内置样式：</h4>
                </section> */}
            </section>
        )
    }
}
