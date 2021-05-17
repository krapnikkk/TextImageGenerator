import * as React from 'react'
import reactCSS from 'reactcss'
import { BlockPicker, RGBColor } from 'react-color'
import { inject, observer } from 'mobx-react';

@inject('AppStore')
@observer
class ColorPicker extends React.Component<IProps> {
    type: string = "";
    state = {
        displayColorPicker: false
    };
    componentWillMount () {
        let { type } = this.props;
        this.type = type;
    }

    componentWillReceiveProps(){
        this.forceUpdate();
    }
    
    handleClick = () => {
        this.setState({ displayColorPicker: !this.state.displayColorPicker })
    };

    handleClose = () => {
        this.setState({ displayColorPicker: false })
    };

    handleChange = (color: any) => {
        this.handleClose();
        this.props.AppStore.updateAttribute(this.type,JSON.stringify(color.rgb));
    };

    render() {
        let color = this.props.AppStore[this.type];
        color = JSON.parse(color);
        const styles = reactCSS({
            'default': {
                color: {
                    width: '60px',
                    height: '14px',
                    borderRadius: '2px',
                    background: `rgb(${color.r}, ${color.g}, ${color.b})`,
                },
                swatch: {
                    padding: '5px',
                    background: '#fff',
                    borderRadius: '1px',
                    boxShadow: '0 0 0 1px rgba(0,0,0,0.1)',
                    display: 'inline-block',
                    cursor: 'pointer',
                },
                popover: {
                    position: 'absolute',
                    zIndex: '2',
                },
                cover: {
                    position: 'fixed',
                    top: '0px',
                    right: '0px',
                    bottom: '0px',
                    left: '0px',
                },
            },
        });

        return (
            <div>
                <div style={styles.swatch} onClick={this.handleClick}>
                    <div style={styles.color} />
                </div>
                { this.state.displayColorPicker ? <div style={styles.popover as React.CSSProperties}>
                    <div style={styles.cover as React.CSSProperties} onClick={this.handleClose} />
                    <BlockPicker color={color as RGBColor} onChange={this.handleChange} />
                </div> : null}
            </div>
        )
    }
}

export default ColorPicker