
import { _decorator, Component, Node, Vec3, math, tween } from 'cc';
const { ccclass, property } = _decorator;
import { randomInt, RotationByNode } from '../utils/tools'
/**
 * Predefined variables
 * Name = Attack
 * DateTime = Mon Oct 24 2022 15:21:11 GMT+0800 (香港标准时间)
 * Author = riki123
 * FileBasename = Attack.ts
 * FileBasenameNoExtension = Attack
 * URL = db://assets/typescript/Attack.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */
 
@ccclass('Tower')
export class Tower extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;

    @property({type: Node})
    public towerNode:Node = null;

    @property({type: Node})
    public originNode: Node = null;

    speed = 1.0

    start () {
        if (!this.towerNode || !this.originNode) return
    }

    setAttackSpeed(num:number) {
        this.speed = num
    }

    init(targetNode:Node) {
        if (!this.towerNode || !this.originNode) return
        
        const targetVec = this.towerNode.getWorldPosition()

        const originVec = this.originNode.getWorldPosition()

        const rad = this.getRad(targetNode.getWorldPosition(), originVec)
        const rad1 = this.getRad(targetVec, originVec)

        const distance = this.getDistance(targetVec, originVec)

        const oldAngel = this.towerNode.angle
        const angel = math.toDegree(rad)
        const angel1 = math.toDegree(rad1)
        const newAngel = angel-angel1+oldAngel

        const newX = distance*Math.cos(rad)
        const newY = distance*Math.sin(rad)
        
        

        tween(this.towerNode.eulerAngles)
        .to(this.speed, new Vec3(0, 0, newAngel), {
            onUpdate: (target:Vec3, ratio:number) => {
                this.towerNode.setRotationFromEuler(target)
            }
        })
        .start()

        tween(this.towerNode.position)
        .to(this.speed, new Vec3(newX, newY, 0), {
            onUpdate: (target:Vec3, ratio:number) => {
                this.towerNode.setPosition(target)
            }
        })
        .start()

    }

    getRad(p1:Vec3, p2:Vec3):number {
        return Math.atan((p2.y - p1.y) / (p2.x - p1.x));
    }

    getDistance(p1:Vec3, p2:Vec3):number {
        return Vec3.distance(p2, p1)
    }


    update (deltaTime: number) {
        // this.init()
        // [4]
        // console.log('deltaTime', new Date().getTime())
    }
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
