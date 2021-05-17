import { observable, action } from 'mobx'
import * as _ from 'lodash';
import emitter from "@event/index"
import { EVENT_UPDATE_OPTIONS, EVENT_UPDATE_VIEW } from '@constants/constants';
import { storage } from '@utils/storage';
import { FontFamilyItem, GradientItem, TextShadowItem } from '@interface/index';
import { ExportType } from "@enum/index";

class AppStore {
    @observable fontSize: number = 16;
    @observable bgColor: string = JSON.stringify({
        r: 255,
        g: 255,
        b: 255,
    });

    @observable color: string = JSON.stringify({
        r: 0,
        g: 0,
        b: 0,
    });
    @observable strokeColor: string = JSON.stringify({
        r: 255,
        g: 0,
        b: 0,
    });
    @observable textDecorationColor: string = JSON.stringify({
        r: 0,
        g: 0,
        b: 0,
    });
    @observable fontFamily: string = "默认字体";
    @observable fontFamilyList: FontFamilyItem[] = [];
    @observable gradient: string = "";
    // @observable gradientList: GradientItem[] = [];
    @observable text: string = "";
    @observable texture: string = "";
    @observable textDecorationStyle: string = "solid";
    @observable textDecorationStyleList: string[] = ["solid", "double", "dotted", "dashed", "wavy"];
    @observable textDecorationLineCheckbox: { [key: string]: string }[] = [{ label: 'overline', value: 'overline' }, { label: 'line-through', value: 'line-through' }, { label: 'underline', value: 'underline' }];
    @observable textDecorationLine: string[] = [];
    @observable textDecorationThickness: number = 1;
    @observable viewWidth: number = window.innerWidth * 0.4;
    @observable contentData: { [key: string]: string | number | string[] | number[] | TextShadowItem[] | GradientItem[] }[] = [];
    @observable currentIndex: number = -1;
    @observable textAlign: number = 1;
    @observable alignData = [{ label: 1, value: "居左" }, { label: 2, value: "居中" }, { label: 3, value: "居右" }];
    @observable exportType: ExportType = ExportType.View;
    @observable exportTypeData = [{ label: ExportType.View, value: "画布宽高", text: "画布宽高" }, { label: ExportType.ViewContent, value: "内容宽高", text: "内容宽高" }, { label: ExportType.PerLine, value: "逐行导出", text: "逐行导出" }, { label: ExportType.PerWord, value: "逐字导出", text: "逐字导出" }]; //"画布宽高", "内容宽高", "逐行导出", "逐字导出"
    @observable bmfont: boolean = false;
    @observable textStroke: number = 0;
    @observable fontStyle: number = 1;
    @observable styleData = [{ label: 1, value: "normal", text: "标准" }, { label: 2, value: "oblique", text: "斜体" }];
    @observable fontWeight: number = 400;
    @observable letterSpacing: number = 0;
    @observable lineHeight: number = 1.2;
    @observable backgroundClip: string = "text";
    @observable backgroundClipList: string[] = ["text", "border-box", "padding-box", "content-box"];

    @observable textShadowColor: string = JSON.stringify({
        r: 0,
        g: 0,
        b: 0,
    });
    @observable textShadowList: TextShadowItem[] = [];
    @observable textShadowOffsetX: number = 0;
    @observable textShadowOffsetY: number = 0;
    @observable textShadowOffsetBlurRadius: number = 0;


    @observable sliderStatus: boolean = false;
    @observable border: string = "";
    @observable opacity: boolean = false;
    @observable beforeCSS: string = "";
    @observable contentCSS: string = "";
    @observable afterCSS: string = "";
    viewAttributes: string[] = ["opacity", "viewWidth", "bgColor"];
    textAttributes: string[] = [
        "text", "fontSize", "color", "strokeColor",
        "sliderStatus", "lineHeight", "letterSpacing",
        "fontWeight", "fontStyle", "textStroke",
        "textAlign", "textDecorationStyle",
        "textDecorationLine", "fontFamily", "textDecorationColor",
        "textDecorationThickness", "texture",
        "textShadowColor", "textShadowOffsetX", "textShadowOffsetY", "textShadowOffsetBlurRadius",
        "gradient", "backgroundClip", "backgroundClipList",
        "exportType", "bmfont",
        "afterCSS", "contentCSS", "beforeCSS"
    ];
    typeSort = (type: string): boolean => {
        return this.viewAttributes.includes(type);
    }

    @action updateContent = (type: string, value: string): void => {
        if (type != "text") {
            this.updateAttribute(type, value);
        } else {
            this[type] = value;
            let { fontSize, color, textAlign,
                textStroke, strokeColor, fontStyle,
                textDecorationLine, textDecorationStyle, textDecorationColor,
                textDecorationThickness, texture,
                fontWeight, letterSpacing, lineHeight,
                textShadowColor, textShadowOffsetX, textShadowOffsetY, textShadowOffsetBlurRadius,
                textShadowList, currentIndex, fontFamily,
                gradient, backgroundClip,
                afterCSS, contentCSS, beforeCSS } = this;

            this.contentData.push({
                index: currentIndex + 1,
                value, fontSize, color,
                textAlign, textStroke, strokeColor,
                fontStyle, textDecorationLine, textDecorationStyle,
                textDecorationThickness, texture,
                textDecorationColor, fontWeight, letterSpacing,
                textShadowColor, textShadowOffsetX, textShadowOffsetY, textShadowOffsetBlurRadius,
                gradient, backgroundClip,
                textShadowList, fontFamily,
                lineHeight, afterCSS, contentCSS, beforeCSS
            });
            this.currentIndex = this.contentData.length - 1;

            emitter.emit(EVENT_UPDATE_OPTIONS);
        }
    }
    
    @action clearContent() {
        this.currentIndex = -1;
        this.contentData = [];
        emitter.emit(EVENT_UPDATE_OPTIONS);
        emitter.emit(EVENT_UPDATE_VIEW);
    }

    @action clearContentAttribute = (type: string) => {
        this.contentData[this.currentIndex][this[`${type}`]] = [];
        emitter.emit(EVENT_UPDATE_OPTIONS);
    }

    @action createList = (type: string, list: any[]) => {
        this[`${type}List`] = list;
        emitter.emit(EVENT_UPDATE_OPTIONS);
    }

    @action clearList = (type: string) => {
        this[`${type}List`] = [];
        emitter.emit(EVENT_UPDATE_OPTIONS);
    }

    @action deleteList = (type: string, index: number) => {
        _.pullAt(this[`${type}List`], index);
        emitter.emit(EVENT_UPDATE_OPTIONS);
    }

    @action addList = (type: string, value: any) => {
        value['key'] = this[`${type}List`].length;
        this[`${type}List`].push(value);
        emitter.emit(EVENT_UPDATE_OPTIONS);
    }

    @action uniqAddList = (type: string, value: any) => {
        value['key'] = this[`${type}List`].length;
        this[`${type}List`].push(value);
        this[`${type}List`] = _.uniqWith(this[`${type}List`], _.isEqual);
        emitter.emit(EVENT_UPDATE_OPTIONS);
    }

    @action updateList = (type: string, index: number): void => {
        let value = this[`${type}List`][index];
        this.updateAttribute(type, value);
    }

    @action updateCheckbox = (type: string, arr: string[] | number[]): void => {
        this.updateAttribute(type, arr);
    }

    @action updateViewAttribute = (): void => {
        emitter.emit(EVENT_UPDATE_VIEW);
    }

    @action updateSliderStatus = (status: boolean) => {
        if (status) {
            this.border = "1px solid rgb(191, 191, 191)";
        } else {
            this.border = "";
            emitter.emit(EVENT_UPDATE_VIEW);
        }
    }

    @action updateTextAttribute = (attribute: string, value: string | number | string[] | number[]) => {
        if (this.currentIndex > -1) {
            this.contentData[this.currentIndex][attribute] = value;
        }
        emitter.emit(EVENT_UPDATE_OPTIONS);
    }

    @action updateAttribute = (attribute: string, value: string | number | string[] | number[]) => {
        // console.log(attribute, value);
        this[attribute] = value;
        if (this.typeSort(attribute)) {
            this.updateViewAttribute();
        } else {
            this.updateTextAttribute(attribute, value);
        }
    }


    constructor() {
        this.fontFamilyList = storage.get("font") || [];
    }
}

export default new AppStore()