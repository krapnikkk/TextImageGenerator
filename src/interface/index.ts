import { FontFileType } from "@enum/index";


export interface TextData {
    content: Array<TextOption>;
}

export interface TextOption {
    fontSize?: number;
    fontFamily?: string;
    color?: string;
    value: string;
}

export interface RadioItem {
    value: string,
    label: string | number,
    text: string
}
export interface FontFamilyItem {
    zh: string,
    en: string,
    url: string | null,
    type: FontFileType
}
export interface TextShadowItem {
    color: string,
    offsetX: number,
    offsetY: number,
    blurRadius: number
}

export interface GradientItem {
    gradient: string
}

export interface ExportItem {
    type: string
    data: string
    name: string
    id?: number|string
    w?:number
    h?:number
}
