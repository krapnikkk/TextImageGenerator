import * as React from 'react'
import './Setting.css';
import { inject, observer } from 'mobx-react'
import { Button } from 'antd';
import DomToImage from 'dom-to-image';
import JSZip from 'jszip';
import emitter from "@event/index"
import { EVENT_UPDATE_OPTIONS } from '@constants/constants';
import FileSaver from 'file-saver';
import Radio from './component/Radio';
import { ExportType } from '@enum/index';
import { ExportItem } from '@interface/index';
import { createBMFont } from '@utils/BMFont';
import Switch from './component/Switch';
@inject('AppStore')
@observer
export default class ExportSetting extends React.Component<IProps> {
    componentWillMount() {
        emitter.on(EVENT_UPDATE_OPTIONS, () => {
            this.forceUpdate();
        })
    }
    onExport = async () => {
        let { exportType, bmfont } = this.props.AppStore;
        let node: Element,
            nodes: NodeListOf<Element>,
            base64DataArr: ExportItem[] = [],
            data: string,
            BMFont: { [key: string]: string } = {},
            bmfontName: string = "";
        bmfont ? exportType = ExportType.PerWord : null;
        switch (exportType) {
            case ExportType.View:
                node = document.querySelector(".view-content") as Element;
                data = await this.createPng(node);
                base64DataArr.push({ data, type: exportType, name: `${Date.now()}.png` });
                break;
            case ExportType.ViewContent:
                node = document.querySelector(".view-content>section") as Element;
                data = await this.createPng(node);
                base64DataArr.push({ data, type: exportType, name: `${Date.now()}.png` });
                break;
            case ExportType.PerLine:
                nodes = document.querySelectorAll(".view-content>section") as NodeListOf<Element>;
                for (let i = 0; i < nodes.length; i++) {
                    node = nodes[i];
                    data = await this.createPng(node);
                    base64DataArr.push({ data, type: exportType, name: `${Date.now()}.png` });
                }
                break;
            case ExportType.PerWord:
                nodes = document.querySelectorAll(".view-content>section") as NodeListOf<Element>;
                let parent = document.querySelector(".view-content") as HTMLSelectElement;
                let html, clone, childNodesHTML;
                for (let i = 0; i < nodes.length; i++) {
                    node = nodes[i];
                    let phoneticHTML = node.querySelectorAll('ruby');
                    clone = node.cloneNode(true) as HTMLSelectElement;
                    if(phoneticHTML.length>0){
                        childNodesHTML = phoneticHTML;
                    }else{
                        html = node.innerHTML;
                        childNodesHTML = html.split("");
                    }
                    clone.id = "clone";
                    parent?.appendChild(clone);
                    for (let j = 0; j < childNodesHTML.length; j++) {
                        let word = childNodesHTML[j];
                        if(typeof word !== "string"){
                            word = `<ruby>${word.innerHTML}</ruby>`;
                        }
                        clone.innerHTML = word;
                        clone.style.padding = "10px";
                        data = await this.createPng(clone);
                        let { clientWidth, clientHeight } = clone;
                        let [w, h, id] = [clientWidth, clientHeight, word];
                        base64DataArr.push({ id, data, type: exportType, name: `${Date.now()}.png`, w, h });
                    }
                    parent.removeChild(clone);
                    childNodesHTML = null;
                    clone = null;
                }
                if (bmfont) {
                    bmfontName = `${Date.now()}`;
                    BMFont = await createBMFont(bmfontName, base64DataArr);
                }
                break;
            default:
                break;
        }
        let zip = new JSZip();
        for (let i = 0; i < base64DataArr.length; i++) {
            let base64Data = base64DataArr[i];
            let { data, name } = base64Data;
            zip.file(name, data.replace(/^data:image\/\w+;base64,/, ""), { base64: true });
        }

        if (bmfont && BMFont) {
            let { sprite, bmfont } = BMFont;
            if (sprite && bmfont) {
                zip.folder("BMFont");
                zip.file(`BMFont/${bmfontName}.png`, sprite.replace(/^data:image\/\w+;base64,/, ""), { base64: true });
                zip.file(`BMFont/${bmfontName}.fnt`, bmfont);
            }
        }
        zip.generateAsync({ type: "blob" }).then((content) => {
            FileSaver.saveAs(content, `${Date.now()}.zip`);
        });
    }

    createPng = (node: Element): Promise<string> => {
        return new Promise((resolve, reject) => {
            if (node.innerHTML == "") {
                reject('生成图片失败！');
            }
            if (node.hasAttribute("contentEditable")) {
                node.removeAttribute("contentEditable");
            }
            DomToImage.toPng(node)
                .then((imgData: string) => {
                    // let base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
                    resolve(imgData);
                }).catch((error) => {
                    console.error('oops, something went wrong!', error);
                    reject('生成图片失败！');
                });
        })

    }

    render() {
        let { exportType, exportTypeData, bmfont } = this.props.AppStore;
        return (<section className="setting_export">
            {
                bmfont
                    ?
                    null
                    :
                    <section className="exportType">
                        <h4>导出类型：</h4>
                        <Radio type={"exportType"} value={exportType} data={exportTypeData} />
                    </section>
            }

            <section className="bmfont">
                <h4>Bitmap Font：</h4>
                <Switch type={"bmfont"} />
            </section>
            <section className="export">
                <Button type="primary" onClick={this.onExport.bind(this)}>导出图片</Button>
            </section>
        </section>)
    }
}
