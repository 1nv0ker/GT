
import { _decorator, Component, Node, Vec3, math, tween, AnimationClip, animation, instantiate, Tween } from 'cc';
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

    @property({type:Node})
    public ammoNode: Node = null

    rotateSpeed = 0.2

    distance = 0;

    attackSpeed = 0.5

    timer = null

    start () {
        if (!this.towerNode || !this.originNode) return

        // this.loadAmmo()
        // this.schedule(this.initAttack.bind(this), 0.5)
    }

    /**
     * 设置炮塔旋转速度
     * @param num 
     */
    setRotateSpeed(num:number) {
        this.rotateSpeed = num
    }

    /**
     * 设置炮弹加载速度
     * @param num 
     */
    setAttackSpeed(num:number) {
        this.attackSpeed = num
    }

    /**
     * 
     */

    /**
     * 炮管旋转
     * @param target 转动的目标或者坐标
     * @returns void
     */
    initRotate(target:Node | Vec3) {
        
        if (!this.towerNode || !this.originNode) return
        const targetVec = this.towerNode.getPosition()

        const originVec = this.originNode.getPosition()


        let vec = new Vec3()
        if (target instanceof Node) {
            vec = target.getPosition()
        } else {
            vec = target
        }
        const rad = this.getRad(vec, originVec)
        const rad1 = this.getRad(targetVec, originVec)

        let distance = this.getDistance(targetVec, originVec)
        let newAngel = 0
        const oldAngel = this.towerNode.angle
        let angel = math.toDegree(rad)
        const angel1 = math.toDegree(rad1)
        if (vec.x>=0) {
            newAngel = angel-angel1+oldAngel
        } else {
            angel = angel + 180
            newAngel = angel-angel1+oldAngel
            distance = -distance
        }

        const newX = distance*Math.cos(rad)
        const newY = distance*Math.sin(rad)
        // this.unscheduleAllCallbacks()
        // this.unschedule(this.initAttack.bind(this, angel))
        
        //角度转动缓动效果
        let t1 = tween(this.towerNode)
        .to(this.rotateSpeed, {
            eulerAngles: new Vec3(0, 0, newAngel),
            position: new Vec3(newX, newY, 0)
        })
        // .start()
        let t2 = tween(this.towerNode).to(this.rotateSpeed, {
            position: new Vec3(newX, newY, 0)
        })
        tween(this.towerNode).parallel(t1, t2).start()
        //坐标缓动效果
        // tween(this.towerNode.position)
        // .to(this.rotateSpeed, new Vec3(newX, newY, 0), {
        //     onUpdate: (target:Vec3, ratio:number) => {
        //         this.towerNode.setPosition(target)
        //     }
        // })
        // .start()

    }

    launch(newNode) {
        let angel = this.towerNode.eulerAngles.z
        this.distance++
        const rad = math.toRadian(angel)
        const newX = this.distance*Math.cos(rad)
        const newY = this.distance*Math.sin(rad)
        newNode.setPosition(newX, newY, 0)
        this.node.addChild(newNode)
    }
    /**
     * 初始化新炮弹
     */
    initAttack() {
        this.distance = 0
        const newNode = instantiate(this.ammoNode)
        this.launch(newNode)
        this.timer = setInterval(this.launch.bind(this, newNode), 5)
    }
    getRad(p1:Vec3, p2:Vec3):number {
        return Math.atan((p2.y - p1.y) / (p2.x - p1.x));
    }

    getDistance(p1:Vec3, p2:Vec3):number {
        return Vec3.distance(p2, p1)
    }


    update (deltaTime: number) {
        // this.initAttack()
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
