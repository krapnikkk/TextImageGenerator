const findStyleSheets = (selector: string): number => {
    let idx = -1;

    let cssRuleList: CSSRuleList = document.styleSheets[0].rules;
    let len = cssRuleList.length;
    for (let i = 0; i < len; i++) {
        let item = cssRuleList[i] as CSSStyleRule;
        if (item && item.selectorText == selector) {
            idx = i;
            break;
        }
    }
    return idx;
}

/**
 * 
 * @param selector 
 * @param style like witdh:126px;height:126px;
 * @returns 
 */
const addRule = (selector: string, style: string) => {
    return document.styleSheets[0].addRule(selector, style);
}

const deleteRule = (index: number) => {
    document.styleSheets[0].deleteRule(index);
}

export const updateRule = (selector: string, style: string) => {
    let index = findStyleSheets(selector);
    if (index > -1) {
        deleteRule(index)
    }
    if (selector && style) {
        addRule(selector, style);
    }
}
