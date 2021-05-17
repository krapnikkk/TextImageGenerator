import * as React from 'react'
import './Setting.css';
import { inject, observer } from 'mobx-react'
import emitter from "@event/index"
import ColorPicker from './component/ColorPicker'
// import { Slider } from 'antd';
// import Radio from './component/Radio';
import Switch from './component/Switch';
import { EVENT_UPDATE_VIEW } from '@constants/constants';
@inject('AppStore')
@observer
export default class PreviewSetting extends React.Component<IProps> {
    componentWillMount() {
        emitter.on(EVENT_UPDATE_VIEW, () => {
            this.forceUpdate();
        })

        
    }
    onSliderChange = (value: number) => {
        this.setState({
            inputValue: value,
        });
    };
    render() {
        // const { textAlign, alignData, opacity } = this.props.AppStore;
        const { opacity } = this.props.AppStore;
        return (<section className="setting_preview">
            <section className="opacity">
                <h4>背景设置：</h4>
                <Switch type={"opacity"} />
            </section>
            {
                opacity
                    ?
                    <section className="bgColor">
                        <h4>背景颜色：</h4>
                        <ColorPicker type={"bgColor"} />
                    </section>
                    :
                    null
            }
            {/* <section className="viewWidth">
                <h4>宽度设置：</h4>
                <Slider defaultValue={100} onChange={this.onSliderChange} />
            </section> */}
            {/* <section className="align">
                <h4>水平对齐：</h4>
                <Radio type={"textAlign"} value={textAlign} data={alignData} />
            </section> */}
        </section>)
    }
}
