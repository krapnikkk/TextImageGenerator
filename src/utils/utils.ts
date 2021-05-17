export const toRGBCSS = (color: string) => {
    let colorObj = JSON.parse(color) as { [key: string]: string };
    return `rgb(${colorObj.r},${colorObj.g},${colorObj.b})`;
}