import { Vec3 } from "cc";

/**
 * 随机
 * @param min 
 * @param max 
 * @returns 
 */
 export function randomInt(min:number, max:number) {
    return Math.floor(random(min, max));
}

function random(min, max) {
    min = Number(min);
    max = Number(max);

    if (Number.isNaN(min) || Number.isNaN(min))
        return null;

    if (min > max)
        min = (max ^= min ^= max) ^ min;
    return Math.random() * (max - min + 1) + min;
}

/**
 * 节点旋转
 * @param rad 弧度
 * @param nodeLen 节点长度
 * @returns 新坐标
 */
export function RotationByNode(rad:number, nodeLen:number ):Vec3 {
    const newX = nodeLen*Math.cos(rad)
    const newY = nodeLen*Math.sin(rad)
    const vec = new Vec3(newX, newY, 0)
    return vec
}


export function debounce(fn:Function, delay=100) {
    let timer = null

    return function() {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            fn.apply(this, arguments)
        }, delay);
    } 
}



