type packerRoot = {
    x: number,
    y: number,
    w: number,
    h: number,
    down?: packerRoot,
    right?: packerRoot,
    used?: boolean,
}
type packerBlock = {
    w: number,
    h: number,
    fit?: packerRoot | null
}
export default class GrowingPacker {
    root: packerRoot;

    fit(blocks: packerBlock[]) {
        var n, node, block, len = blocks.length;
        var w = len > 0 ? blocks[0].w : 0;
        var h = len > 0 ? blocks[0].h : 0;
        this.root = { x: 0, y: 0, w, h };
        for (n = 0; n < len; n++) {
            block = blocks[n];
            node = this.findNode(this.root, block.w, block.h)
            if (node)
                block.fit = this.splitNode(node, block.w, block.h);
            else
                block.fit = this.growNode(block.w, block.h);
        }
    }

    findNode(root: packerRoot, w: number, h: number): packerRoot | null {
        if (root.used)
            return this.findNode(root.right!, w, h) || this.findNode(root.down!, w, h);
        else if ((w <= root.w) && (h <= root.h))
            return root;
        else
            return null;
    }

    splitNode(node: packerRoot, w: number, h: number): packerRoot {
        node.used = true;
        node.down = { x: node.x, y: node.y + h, w: node.w, h: node.h - h };
        node.right = { x: node.x + w, y: node.y, w: node.w - w, h: h };
        return node;
    }

    growNode(w: number, h: number): packerRoot | null {
        var canGrowDown = (w <= this.root.w);
        var canGrowRight = (h <= this.root.h);

        var shouldGrowRight = canGrowRight && (this.root.h >= (this.root.w as number + w)); // attempt to keep square-ish by growing right when height is much greater than width
        var shouldGrowDown = canGrowDown && (this.root.w >= (this.root.h as number + h)); // attempt to keep square-ish by growing down  when width  is much greater than height

        if (shouldGrowRight)
            return this.growRight(w, h);
        else if (shouldGrowDown)
            return this.growDown(w, h);
        else if (canGrowRight)
            return this.growRight(w, h);
        else if (canGrowDown)
            return this.growDown(w, h);
        else
            return null; // need to ensure sensible root starting size to avoid this happening
    }

    growRight(w: number, h: number): packerRoot | null {
        this.root = {
            used: true,
            x: 0,
            y: 0,
            w: this.root.w as number + w,
            h: this.root.h,
            down: this.root,
            right: { x: this.root.w, y: 0, w: w, h: this.root.h }
        };
        let node = this.findNode(this.root, w, h);
        if (node)
            return this.splitNode(node, w, h);
        else
            return null;
    }

    growDown(w: number, h: number): packerRoot | null {
        this.root = {
            used: true,
            x: 0,
            y: 0,
            w: this.root.w,
            h: this.root.h + h,
            down: { x: 0, y: this.root.h, w: this.root.w, h },
            right: this.root
        };
        let node = this.findNode(this.root, w, h);
        if (node)
            return this.splitNode(node, w, h);
        else
            return null;
    }

}