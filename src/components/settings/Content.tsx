import * as React from 'react'
import emitter from "@event/index"
import { EVENT_UPDATE_OPTIONS } from '@constants/constants';
import { inject, observer } from 'mobx-react'
import './Setting.css';
import ColorPicker from './component/ColorPicker';
import Menu from './component/Menu';
import Checkbox from './component/Checkbox';
import Slider from './component/Slider';
import TextArea from './component/TextArea';
import Radio from './component/Radio';
import Upload from './component/Upload';
import TextShadow from './component/TextShadow';
// import { Divider } from 'antd';
import * as antd from 'antd';
import Modal from './component/Modal';
import Gradient from './component/Gradient';
import FontMenu from './component/FontMenu';

// const rootSubmenuKeys = ['sub0', 'sub1', 'sub2', 'sub3', 'sub4'];
const defaultOpenKeys = ['sub0'];
@inject('AppStore')
@observer
export default class ContentSetting extends React.Component<IProps> {
    componentWillMount() {
        emitter.on(EVENT_UPDATE_OPTIONS, () => {
            this.forceUpdate();
        })
    }
    // state = {
    //     openKeys: defaultOpenKeys
    // }
    // onOpenChange = (keys: string[]) => {
    //     const latestOpenKey = keys.find((key: string) => this.state.openKeys.indexOf(key) === -1);
    //     if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
    //         this.setState({ openKeys: keys });
    //     } else {
    //         this.setState({ openKeys: latestOpenKey ? [latestOpenKey] : [] });
    //     }
    // };
    render() {
        let {
            textDecorationLine, textStroke, letterSpacing,
            lineHeight,
            fontWeight, fontSize, fontStyle,
            fontFamily, fontFamilyList, styleData,
            textDecorationStyle, textDecorationThickness, backgroundClip,
            text } = this.props.AppStore;
        return (
            <nav className="text">
                <antd.Menu mode="inline" defaultOpenKeys={defaultOpenKeys}>
                    {
                        text == ""
                            ? <antd.Menu.SubMenu key="sub0" title="内容设置">
                                <section className="input">
                                    <TextArea type={"text"} rows={3} minRows={3} maxRows={5} placeholder="请输入你要生成的图片的文字" title="添加内容" />
                                </section>
                            </antd.Menu.SubMenu>
                            :
                            <>
                                <antd.Menu.SubMenu key="sub0" title="内容设置">
                                    <section className="input">
                                        <TextArea type={"text"} rows={3} minRows={3} maxRows={5} placeholder="请输入你要生成的图片的文字" title="添加内容" />
                                    </section>
                                </antd.Menu.SubMenu>

                                <antd.Menu.SubMenu key="sub1" title="基础设置">
                                    <section className="basic">
                                        <section className="color">
                                            <h4>文字颜色：</h4>
                                            <ColorPicker type={"color"} />
                                        </section>
                                        <section className="fontStyle">
                                            <h4>字体样式：</h4>
                                            <Radio type={"fontStyle"} value={fontStyle} data={styleData} />
                                        </section>
                                        <section className="fontFamily">
                                            <h4>文字字体：</h4>
                                            <section>
                                                <FontMenu type={"fontFamily"} title={fontFamily} />
                                                {fontFamilyList.length == 0 ? null : <Modal />}
                                            </section>
                                        </section>
                                        <section className="fontSize">
                                            <h4>文字大小：</h4>
                                            <Slider type={"fontSize"} defaultValue={fontSize} value={fontSize} min={12} max={150} step={1} />
                                        </section>
                                        <section className="fontWeight">
                                            <h4>文字粗细：</h4>
                                            <Slider type={"fontWeight"} defaultValue={fontWeight} value={fontWeight} min={100} max={900} step={100} />
                                        </section>
                                        <section className="letterSpacing">
                                            <h4>文字间距：</h4>
                                            <Slider type={"letterSpacing"} defaultValue={letterSpacing} value={letterSpacing} min={-6} max={6} step={0.1} />
                                        </section>
                                        <section className="lineHeight">
                                            <h4>文字高度：</h4>
                                            <Slider type={"lineHeight"} defaultValue={lineHeight} value={lineHeight} min={1} max={20} step={0.2} />
                                        </section>
                                        <section className="textStroke">
                                            <h4>文字描边：</h4>
                                            <Slider type={"textStroke"} defaultValue={textStroke} value={textStroke} min={0} max={8} step={1} />
                                        </section>
                                        {
                                            textStroke > 0
                                                ?
                                                <section className="strokeColor">
                                                    <h4>描边颜色：</h4>
                                                    <ColorPicker type={"strokeColor"} />
                                                </section>
                                                :
                                                null
                                        }
                                    </section>
                                </antd.Menu.SubMenu>
                                <antd.Menu.SubMenu key="sub2" title="线条装饰">
                                    <section className="textDecoration">
                                        <section className="textDecorationLine">
                                            <h4>线条位置：</h4>
                                            <Checkbox type={"textDecorationLine"} />
                                        </section>
                                        {
                                            textDecorationLine.length > 0
                                                ? <>
                                                    <section className="textDecorationThickness">
                                                        <h4>线条粗细：</h4>
                                                        <Slider type={"textDecorationThickness"} defaultValue={textDecorationThickness} value={textDecorationThickness} min={1} max={20} step={1} />
                                                    </section>
                                                    <section className="textDecorationColor">
                                                        <h4>线条颜色：</h4>
                                                        <ColorPicker type={"textDecorationColor"} />
                                                    </section>
                                                    <section className="textDecorationStyle">
                                                        <h4>线条样式：</h4>
                                                        <Menu type={"textDecorationStyle"} title={textDecorationStyle} />
                                                    </section>
                                                </>
                                                :
                                                null
                                        }
                                    </section>
                                </antd.Menu.SubMenu>
                                <antd.Menu.SubMenu key="sub3" title="文本阴影">
                                    <section className="textShadow">
                                        <TextShadow />
                                    </section>
                                </antd.Menu.SubMenu>
                                <antd.Menu.SubMenu key="sub4" title="背景设置">
                                    <section className="background">
                                        <section className="backgroundClip">
                                            <h4>覆盖样式：</h4>
                                            <Menu type={"backgroundClip"} title={backgroundClip} />
                                        </section>
                                        <section className="texture">
                                            <h4>图片纹理：</h4>
                                            <Upload type={"texture"} name={"texture"} />
                                        </section>
                                        <h4>背景渐变：</h4>
                                        <p>前往<a href="https://gradientlab.space/" target="_blank">gradientlab</a>复制自定义gradient</p>
                                        <Gradient type="gradient" placeholder="请输入自定义gradient" />
                                    </section>
                                </antd.Menu.SubMenu>
                            </>
                    }
                </antd.Menu>
            </nav>

        )
    }
}
