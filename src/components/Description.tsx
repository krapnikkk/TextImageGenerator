import * as React from 'react'
// import * as ReactMarkdown from 'react-markdown'
// import description from "../../readme.md";
import './Description.css';


export default class Description extends React.Component {
    render() {
        return (
            <section className="description">
                <h2>TextImageGenerator</h2>
                <p>一款十分方便使用的在线文字生成图片工具，可以对文字的属性进行各种搭配混合调整至特定效果，所见即所得。主要利用浏览器渲染引擎对文字+CSS样式进行设置，通过svg标签转换成图片成品，支持将文字导出成Bitmap Font，并支持汉字拼音模式。</p>
            </section>
        )
    }
}