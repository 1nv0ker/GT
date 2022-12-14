
import { _decorator, Component, Node, PhysicsSystem, PhysicsSystem2D, ERaycast2DType } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = game
 * DateTime = Thu Nov 17 2022 14:54:45 GMT+0800 (香港标准时间)
 * Author = riki123
 * FileBasename = game.ts
 * FileBasenameNoExtension = game
 * URL = db://assets/typescript/game.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */
 
@ccclass('game')
export class game extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;
    @property(Node)
    point1:Node;

    @property(Node)
    point2:Node;

    start () {
        const results = PhysicsSystem2D.instance.raycast(this.point1.getPosition(), this.point2.getPosition())
        console.log(results)
        // [3]
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
