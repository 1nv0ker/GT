
import { _decorator, Component, Node, geometry, Vec3, Quat, math, Vec2, tween, instantiate, v2, view } from 'cc';
import { debounce } from '../utils/tools';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = rotate
 * DateTime = Thu Nov 10 2022 16:38:15 GMT+0800 (香港标准时间)
 * Author = riki123
 * FileBasename = rotate.ts
 * FileBasenameNoExtension = rotate
 * URL = db://assets/typescript/rotate.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */
 
@ccclass('rotate')
export class rotate extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;
    @property(Node)
    targetNode:Node;

    @property(Node)
    canvasNode:Node;

    
    start () {
        // this.initRotate()
        
        this.canvasNode.on(Node.EventType.MOUSE_MOVE, debounce(this.initRotate), this)
    }

    initRotate(event) {
        const size = view.getVisibleSize()
        let point = new Vec3(event.getUILocation().x-size.x/2, event.getUILocation().y-size.y/2)
        const rad = this.getRad(this.node.getPosition(), point)
 
        let angel = math.toDegree(rad)
        
        if (point.x<=this.node.getPosition().x) {
            angel = angel+180
        }
        // tween(this.node).to(1.0, {
        //     angle: angel
        // })
        // .start()
        this.node.setRotationFromEuler(0, 0, angel)
    }

    getRad(p1:Vec3, p2:Vec3):number {
        return Math.atan((p2.y-p1.y) / (p2.x-p1.x));
    }


    // update (deltaTime: number) {
    //     // [4]
    // }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.4/manual/zh/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.4/manual/zh/scripting/decorator.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.4/manual/zh/scripting/life-cycle-callbacks.html
 */
