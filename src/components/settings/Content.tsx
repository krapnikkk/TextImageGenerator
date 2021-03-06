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
import Switch from './component/Switch';

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
            text, phonetic, phoneticModel, phoneticData } = this.props.AppStore;
        return (
            <nav className="text">
                <antd.Menu mode="inline" defaultOpenKeys={defaultOpenKeys}>

                    {
                        text == ""
                            ? <antd.Menu.SubMenu key="sub0" title="????????????">
                                <section className="text">
                                    <section className="phonetic">
                                        <h4>???????????????</h4>
                                        <Switch type={"phonetic"} />
                                    </section>
                                    {
                                        phonetic
                                            ?
                                            <section className="phoneticModel">
                                                <h4>???????????????</h4>
                                                <Radio type={"phoneticModel"} value={phoneticModel} data={phoneticData} />
                                            </section>
                                            :
                                            null
                                    }
                                    <section className="input">
                                        <h4>???????????????</h4>
                                        <TextArea type={"text"} rows={3} minRows={3} maxRows={5} placeholder="???????????????????????????????????????" title="????????????" />
                                    </section>
                                </section>
                            </antd.Menu.SubMenu>
                            :
                            <>
                                <antd.Menu.SubMenu key="sub0" title="????????????">
                                    <section className="text">
                                        <section className="phonetic">
                                            <h4>???????????????</h4>
                                            <Switch type={"phonetic"} />
                                        </section>
                                        {
                                            phonetic
                                                ?
                                                <section className="phoneticModel">
                                                    <h4>???????????????</h4>
                                                    <Radio type={"phoneticModel"} value={phoneticModel} data={phoneticData} />
                                                </section>
                                                :
                                                null
                                        }
                                        <section className="input">
                                            <h4>???????????????</h4>
                                            <TextArea type={"text"} rows={3} minRows={3} maxRows={5} placeholder="???????????????????????????????????????" title="????????????" />
                                        </section>
                                    </section>
                                </antd.Menu.SubMenu>

                                <antd.Menu.SubMenu key="sub1" title="????????????">
                                    <section className="basic">
                                        <section className="color">
                                            <h4>???????????????</h4>
                                            <ColorPicker type={"color"} />
                                        </section>
                                        <section className="fontStyle">
                                            <h4>???????????????</h4>
                                            <Radio type={"fontStyle"} value={fontStyle} data={styleData} />
                                        </section>
                                        <section className="fontFamily">
                                            <h4>???????????????</h4>
                                            <section>
                                                <FontMenu type={"fontFamily"} title={fontFamily} />
                                                {fontFamilyList.length == 0 ? null : <Modal />}
                                            </section>
                                        </section>
                                        <section className="fontSize">
                                            <h4>???????????????</h4>
                                            <Slider type={"fontSize"} defaultValue={fontSize} value={fontSize} min={12} max={150} step={1} />
                                        </section>
                                        <section className="fontWeight">
                                            <h4>???????????????</h4>
                                            <Slider type={"fontWeight"} defaultValue={fontWeight} value={fontWeight} min={100} max={900} step={100} />
                                        </section>
                                        <section className="letterSpacing">
                                            <h4>???????????????</h4>
                                            <Slider type={"letterSpacing"} defaultValue={letterSpacing} value={letterSpacing} min={-6} max={6} step={0.1} />
                                        </section>
                                        <section className="lineHeight">
                                            <h4>???????????????</h4>
                                            <Slider type={"lineHeight"} defaultValue={lineHeight} value={lineHeight} min={1} max={20} step={0.2} />
                                        </section>
                                        <section className="textStroke">
                                            <h4>???????????????</h4>
                                            <Slider type={"textStroke"} defaultValue={textStroke} value={textStroke} min={0} max={8} step={1} />
                                        </section>
                                        {
                                            textStroke > 0
                                                ?
                                                <section className="strokeColor">
                                                    <h4>???????????????</h4>
                                                    <ColorPicker type={"strokeColor"} />
                                                </section>
                                                :
                                                null
                                        }
                                    </section>
                                </antd.Menu.SubMenu>
                                <antd.Menu.SubMenu key="sub2" title="????????????">
                                    <section className="textDecoration">
                                        <section className="textDecorationLine">
                                            <h4>???????????????</h4>
                                            <Checkbox type={"textDecorationLine"} />
                                        </section>
                                        {
                                            textDecorationLine.length > 0
                                                ? <>
                                                    <section className="textDecorationThickness">
                                                        <h4>???????????????</h4>
                                                        <Slider type={"textDecorationThickness"} defaultValue={textDecorationThickness} value={textDecorationThickness} min={1} max={20} step={1} />
                                                    </section>
                                                    <section className="textDecorationColor">
                                                        <h4>???????????????</h4>
                                                        <ColorPicker type={"textDecorationColor"} />
                                                    </section>
                                                    <section className="textDecorationStyle">
                                                        <h4>???????????????</h4>
                                                        <Menu type={"textDecorationStyle"} title={textDecorationStyle} />
                                                    </section>
                                                </>
                                                :
                                                null
                                        }
                                    </section>
                                </antd.Menu.SubMenu>
                                <antd.Menu.SubMenu key="sub3" title="????????????">
                                    <section className="textShadow">
                                        <TextShadow />
                                    </section>
                                </antd.Menu.SubMenu>
                                <antd.Menu.SubMenu key="sub4" title="????????????">
                                    <section className="background">
                                        <section className="backgroundClip">
                                            <h4>???????????????</h4>
                                            <Menu type={"backgroundClip"} title={backgroundClip} />
                                        </section>
                                        <section className="texture">
                                            <h4>???????????????</h4>
                                            <Upload type={"texture"} name={"texture"} />
                                        </section>
                                        <h4>???????????????</h4>
                                        <p>??????<a href="https://gradientlab.space/" target="_blank">gradientlab</a>???????????????gradient</p>
                                        <Gradient type="gradient" placeholder="??????????????????gradient" />
                                    </section>
                                </antd.Menu.SubMenu>
                            </>
                    }
                </antd.Menu>
            </nav>

        )
    }
}
