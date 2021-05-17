import * as React from 'react'
import * as antd from 'antd';
import { inject, observer } from 'mobx-react';

@inject('AppStore')
@observer
class Slider extends React.Component<IProps> {
    type: string = "fontSize";
    state = {
        value: 0
    }
    componentWillMount() {
        let { type, value } = this.props;
        this.type = type;
        this.setState({
            value
        });
    }
    onSliderChange = (value: number) => {
        this.props.AppStore.updateSliderStatus(true);
        this.props.AppStore.updateAttribute(this.type, value);
        this.setState({
            value
        });
    };
    onChange = (value: number) => {
        this.props.AppStore.updateAttribute(this.type, value);
        this.setState({
            value
        });
    };
    onAfterChange = (checkedValues: number) => {
        this.props.AppStore.updateSliderStatus(false);
    };

    render() {
        let { type, defaultValue, min, max, step } = this.props;
        this.type = type;
        const { value } = this.state;
        return (
            <antd.Row>
                <antd.Col span={16}>
                    <antd.Slider
                        min={min}
                        max={max}
                        step={step}
                        onAfterChange={this.onAfterChange}
                        onChange={this.onSliderChange}
                        defaultValue={defaultValue}
                        value={typeof value === 'number' ? value : 0}
                    />
                </antd.Col>
                <antd.Col span={2}>
                    <antd.InputNumber
                        min={min}
                        max={max}
                        style={{ margin: '0 28px' }}
                        value={value}
                        step={step}
                        onChange={this.onChange}
                    />
                </antd.Col>
            </antd.Row>
            // <antd.Slider defaultValue={defaultValue} min={min} max={max} step={step}  onChange={this.onSliderChange} onAfterChange={this.onAfterChange} />
        )
    }
}

export default Slider