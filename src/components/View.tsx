import * as React from 'react'
import './View.css';
import emitter from "@event/index"
import { EVENT_UPDATE_OPTIONS, EVENT_UPDATE_VIEW } from '@constants/constants';
import { TextData, TextShadowItem } from '@interface/index';
import { inject, observer } from 'mobx-react';
import { toRGBCSS } from '@utils/utils';
import { updateRule } from '@utils/styleSheets';
// import * as antd from 'antd';
import ViewTools from './ViewTools';

const TextData: TextData = { content: [] };

@inject('AppStore')
@observer
export default class ViewComponent extends React.Component<IProps> {
    state = {
        content: new Array
    }
    componentWillMount() {
        emitter.on(EVENT_UPDATE_OPTIONS, () => {
            this.updateContent();
        })
        emitter.on(EVENT_UPDATE_VIEW, () => {
            this.forceUpdate();
        })
    }

    componentDidUpdate() {
        let viewContent: NodeListOf<HTMLSelectElement> = document.querySelectorAll(".view-content>section");
        viewContent.forEach((item: HTMLSelectElement) => {
            let style = item.getAttribute("style");
            if (style?.includes("color: transparent;")) {
                item.setAttribute("style", `${style} -webkit-background-clip: text;`);
                item.setAttribute("textClip", "true");
                (document.querySelector(".view") as Element).setAttribute("textClip", "true");
            } else {
                item.setAttribute("textClip", "false");
            }
        })
    }
    updateContent() {
        let content = this.props.AppStore.contentData;
        this.setState({ content })
    }
    render() {
        const { content } = this.state;
        let { textAlign, bgColor, border, opacity, currentIndex } = this.props.AppStore;
        textAlign = textAlign == 1 ? "left" : textAlign == 2 ? "center" : "right";
        let backgroundColor = opacity ? toRGBCSS(bgColor) : "rgba(0,0,0,0)";
        const styles = {
            backgroundColor,
            // width: `${viewWidth}px`,
            textAlign,
        };
        return (
            <>
                {
                    currentIndex >= 0
                        ?
                        <ViewTools />
                        :
                        null
                }
                <section className="view">
                    <section style={styles} className="view-content">
                        {
                            content.map((item: any, idx: number) => {
                                let {
                                    index,
                                    color,
                                    value,
                                    fontSize,
                                    textStroke,
                                    strokeColor,
                                    fontFamily,
                                    fontStyle,
                                    textDecorationStyle,
                                    textDecorationLine,
                                    textDecorationThickness,
                                    textDecorationColor,
                                    fontWeight,
                                    letterSpacing,
                                    lineHeight,
                                    textShadowList,
                                    textShadowColor,
                                    textShadowOffsetBlurRadius,
                                    textShadowOffsetX,
                                    textShadowOffsetY,
                                    gradient,
                                    backgroundClip,
                                    texture,
                                    contentCSS,
                                    beforeCSS,
                                    afterCSS,
                                    extWords
                                } = item;
                                /**custom css */

                                color = toRGBCSS(color);
                                strokeColor = toRGBCSS(strokeColor);
                                textDecorationColor = toRGBCSS(textDecorationColor);
                                fontStyle = fontStyle == 1 ? "normal" : fontStyle == 2 ? "italic" : "oblique";
                                textDecorationLine = textDecorationLine.join(" ");



                                let textShadow = "";
                                if (textShadowList.length > 0) {
                                    textShadowList.forEach((TextShadowItem: TextShadowItem) => {
                                        let { offsetX, offsetY, blurRadius, color } = TextShadowItem;
                                        textShadow += `${toRGBCSS(color)} ${offsetX}px ${offsetY}px ${blurRadius}px,`;
                                    });
                                    if (index == currentIndex) {
                                        textShadow += `${toRGBCSS(textShadowColor)} ${textShadowOffsetX}px ${textShadowOffsetY}px ${textShadowOffsetBlurRadius}px`;
                                    }
                                } else {
                                    if (index == currentIndex) {
                                        textShadow = `${toRGBCSS(textShadowColor)} ${textShadowOffsetX}px ${textShadowOffsetY}px ${textShadowOffsetBlurRadius}px`;
                                    }
                                }


                                let backgroundImage = texture ? `url(${texture})` : "";

                                if (gradient != "") {
                                    if (backgroundImage == "") {
                                        backgroundImage += gradient;
                                    } else {
                                        backgroundImage += `,${gradient}`;
                                    }
                                }

                                let customStyle = {
                                    fontFamily,
                                    fontSize,
                                    fontWeight,
                                    color,
                                    fontStyle,
                                    letterSpacing: `${letterSpacing}px`,
                                    textShadow,
                                    lineHeight,
                                    border,
                                    backgroundImage,
                                    textDecoration: `${textDecorationLine} ${textDecorationThickness}px ${textDecorationStyle} ${textDecorationColor}`,
                                    WebkitTextStroke: `${textStroke}px ${strokeColor}`,
                                    userModify: "read-write-plaintext-only"
                                }

                                if (backgroundImage) {
                                    if (backgroundClip == "text") {
                                        color = "transparent";
                                        textShadow = "";
                                        lineHeight = "";
                                        // let background = background-image,background-position-x,background-position-y,background-size,background-repeat-x,background-repeat-y,background-attachment,background-origin,background-clip
                                        let background = `${backgroundImage} 0% 0% auto repeat repeat scroll padding-box text`;
                                        Object.assign(customStyle, { background, color, textShadow, lineHeight });
                                    } else {
                                        Object.assign(customStyle, { backgroundClip });
                                    }
                                }

                                /**advanced css */
                                let cssSelectors = [`content_${idx}`, `content_${idx}:before`, `content_${idx}:before`];
                                let className;
                                [contentCSS, beforeCSS, afterCSS].forEach((css, index) => {
                                    let cssSelector = cssSelectors[index];
                                    updateRule(`.${cssSelector}`, css);
                                    if (css) {
                                        className = cssSelector;
                                    }
                                });

                                if (extWords&&extWords.result&&extWords.result.length>0) {
                                    let html = "";
                                    extWords.result.forEach((item:string, idx:number) => {
                                        let phonetic = item[0];
                                        let word = value[idx];
                                        html += `<ruby>${word} <rt>${phonetic == word ? null : phonetic}</rt></ruby>`
                                    })
                                    value = html;
                                }
                                return <section suppressContentEditableWarning className={className} contentEditable={true} key={idx} style={customStyle} dangerouslySetInnerHTML={{ __html: value }} />
                            })
                        }
                    </section>
                </section>

            </>
        )
    }
}