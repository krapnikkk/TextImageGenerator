import GrowingPacker from "./Packer";
import AppStore from '../store'
const canvas = document.createElement('canvas') as HTMLCanvasElement;
const context = canvas.getContext('2d', { alpha: true }) as CanvasRenderingContext2D;

const offsetCanvas = document.createElement('canvas') as HTMLCanvasElement;
const offsetContext = offsetCanvas.getContext('2d', { alpha: true }) as CanvasRenderingContext2D;
// see:http://www.angelcode.com/products/bmfont/doc/file_format.html
const BMFomatTPL = `info face="{face}" size={size} bold=0 italic=0 charset="" unicode=1 stretchH=100 smooth=1 aa=1 padding=0,0,0,0 spacing=1,1 outline=0
common lineHeight={lineHeight} base=24 scaleW={scaleW} scaleH={scaleH} pages=1 packed=0 alphaChnl=1 redChnl=0 greenChnl=0 blueChnl=0
page id=0 file="{file}.png"
chars count={count}
`;

const charTPL = `char id={id}   x={x}    y={y}     width={width}    height={height}    xoffset={xoffset}     yoffset={yoffset}     xadvance={xadvance}    page=0  chnl=15`;
let image: HTMLImageElement | null;
const drawImage = (x: number, y: number, width: number, height: number, base64: string) => {
    return new Promise<void>((resolve, reject) => {

        image = new Image(width, height);
        image.onload = () => {
            context.drawImage(image!, x, y, width, height);
            image = null;
            resolve();
        }
        image.onerror = () => {
            reject();
        }

        image.src = base64;
    })

}

const getImageBounding = (block: any) => {
    return new Promise<void>((resolve, reject) => {
        let { data, w, h } = block;
        image = new Image(w, h);

        image.onload = () => {
            let bounding = calculateImageBounding(image!.naturalWidth, image!.naturalHeight);
            Object.assign(block, bounding)
            image = null;
            resolve();
        }
        image.onerror = () => {
            reject();
        }

        image.src = data;
    })


}

const calculateImageBounding = (width: number, height: number) => {
    offsetCanvas.width = width;
    offsetCanvas.height = height;
    offsetContext.clearRect(0, 0, width, height);
    offsetContext.drawImage(image!, 0, 0, width, height);
    let x = 0, y = 0, w = width, h = height;
    let x_1 = 0, x_2 = 0, x_3 = w, x_4 = w, y_1 = 0, y_2 = 0, y_3 = h, y_4 = h;
    let transparent = false;

    for (let i = 0; i < width; i++) {
        if (transparent) {
            transparent = false;
            break;
        }
        for (let j = 0; j < height; j++) {
            let imageData = offsetContext.getImageData(i, j, 1, 1);
            if (imageData.data[0] !== 0 || imageData.data[1] !== 0 || imageData.data[2] !== 0 || imageData.data[3] !== 0) {
                transparent = true;
                x_1 = i;
                y_1 = j;
                break;
            }
        }
    }

    for (let i = 0; i < height; i++) {
        if (transparent) {
            transparent = false;
            break;
        }
        for (let j = 0; j < width; j++) {
            let imageData = offsetContext.getImageData(j, i, 1, 1);
            if (imageData.data[0] !== 0 || imageData.data[1] !== 0 || imageData.data[2] !== 0 || imageData.data[3] !== 0) {
                transparent = true;
                x_2 = j;
                y_2 = i;
                break;
            }
        }
    }

    for (let i = width; i > 0; i--) {
        if (transparent) {
            transparent = false;
            break;
        }
        for (let j = height; j > 0; j--) {
            let imageData = offsetContext.getImageData(i, j, 1, 1);
            if (imageData.data[0] !== 0 || imageData.data[1] !== 0 || imageData.data[2] !== 0 || imageData.data[3] !== 0) {
                transparent = true;
                x_3 = i;
                y_3 = j;
                break;
            }
        }
    }
    for (let i = height; i > 0; i--) {
        if (transparent) {
            transparent = false;
            break;
        }
        for (let j = width; j > 0; j--) {
            let imageData = offsetContext.getImageData(j, i, 1, 1);
            if (imageData.data[0] !== 0 || imageData.data[1] !== 0 || imageData.data[2] !== 0 || imageData.data[3] !== 0) {
                transparent = true;
                x_4 = j;
                y_4 = i;
                break;
            }
        }
    }

    x = Math.min(x_1, x_2);
    y = Math.min(y_1, y_2);
    w = Math.max(x_3, x_4) + 1;
    h = Math.max(y_3, y_4) + 1;
    w -= x;
    h -= y;
    offsetCanvas.width = w + 2;
    offsetCanvas.height = h + 2;
    offsetContext.clearRect(0, 0, w, h);
    offsetContext.drawImage(image!, x, y, w, h, 1, 1, w, h);
    let data = offsetCanvas.toDataURL("image/png");
    // w = offsetCanvas.width;
    // h = offsetCanvas.height;
    // 包括空白像素宽高：width & height
    // 裁剪像素宽高: w & h 
    return { x, y, w, h,width, height, data };
}

const updateCanvas = (w: number, h: number) => {
    canvas.width = w;
    canvas.height = h;
}

const repalceStr = (text: string, keys: string[], blank: boolean = false): string => {
    for (let i = 0; i < keys.length; i += 2) {
        let key = keys[i];
        let value = keys[i + 1];
        if (blank) {
            if (value.length > 1) {
                key = key.padEnd(key.length + value.length - 1);
            }
        }
        text = text.replace(key, value);
    }
    return text;
}

export const createBMFont = async (name: string, blocks: any[]) => {
    for (let i = 0; i < blocks.length; i++) {
        let block = blocks[i];
        await getImageBounding(block);
        blocks[i] = block;
    }
    let packer = new GrowingPacker();
    packer.fit(blocks);
    updateCanvas(packer.root.w, packer.root.h);
    (packer as any) = null;
    let sprite = await createBMFontSprite(blocks);
    let bmfont = createBMFontStr(name, blocks);
    return {
        sprite,
        bmfont
    }
}

export const createBMFontStr = (name: string, blocks: any[]): string => {
    let { width, height } = canvas;
    let { fontFamily, fontSize, lineHeight } = AppStore;
    lineHeight = Math.round(fontSize * lineHeight);
    let replaceWords = ["{face}", fontFamily, "{size}", fontSize + "", "{lineHeight}", lineHeight + "", "{scaleW}", width + "", "{scaleH}", height + "", "{file}", name, "{count}", blocks.length + ""];
    let bmfont = repalceStr(BMFomatTPL, replaceWords);

    blocks.forEach((block: any, idx: number) => {
        let { id, fit,w,h,width } = block;
        let { x, y } = fit;
        let xadvance = width; // width +  xoffset
        replaceWords = ["{id}", id.charCodeAt(), "{x}", x + "", "{y}", y + "", "{width}", w + "", "{height}", h + "", "{xoffset}", block.x, "{yoffset}", block.y, "{xadvance}", xadvance + ""]
        let char = repalceStr(charTPL, replaceWords, true);

        if (idx != 0) {
            bmfont += `\n${char}`;
        } else {
            bmfont += `${char}`;
        }
    })
    return bmfont;
}

export const createBMFontSprite = async (blocks: any[]) => {
    for (let n = 0; n < blocks.length; n++) {
        let block = blocks[n];
        let { fit, w, h, data } = block;
        if (fit) {
            let { x, y } = fit;
            await drawImage(x, y, w, h, data);
        }
    }
    return canvas.toDataURL("image/png");

}