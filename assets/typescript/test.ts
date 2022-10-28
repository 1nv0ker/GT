
import { _decorator, Component, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;
import { randomInt, RotationByNode } from '../utils/tools'
/**
 * Predefined variables
 * Name = test
 * DateTime = Thu Oct 27 2022 14:12:25 GMT+0800 (香港标准时间)
 * Author = riki123
 * FileBasename = test.ts
 * FileBasenameNoExtension = test
 * URL = db://assets/typescript/test.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */
 
@ccclass('test')
export class test extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;
    @property(Node)
    towerNode:Node;

    @property(Node)
    enemyNode:Node;

    @property(Node)
    testNode:Node


    start () {
        // [3]
        const compoent:any = this.towerNode.getComponent('Tower')
        compoent.initRotate(this.enemyNode)
        
        this.schedule(() => {
            const vec = new Vec3()
            Vec3.random(vec, 400)
            compoent.initRotate(vec)
        }, 2)
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
