
import { _decorator, Component, Node, Vec3, math, tween, AnimationClip, animation, instantiate } from 'cc';
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

    attackSpeed = 500

    start () {
        if (!this.towerNode || !this.originNode) return

        this.loadAmmo()
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
        
        const targetVec = this.towerNode.getWorldPosition()

        const originVec = this.originNode.getWorldPosition()


        let vec = new Vec3()
        if (target instanceof Node) {
            vec = target.getWorldPosition()
        } else {
            vec = target
        }
        const rad = this.getRad(vec, originVec)
        const rad1 = this.getRad(targetVec, originVec)

        const distance = this.getDistance(targetVec, originVec)

        const oldAngel = this.towerNode.angle
        const angel = math.toDegree(rad)
        const angel1 = math.toDegree(rad1)
        const newAngel = angel-angel1+oldAngel

        const newX = distance*Math.cos(rad)
        const newY = distance*Math.sin(rad)
        
        //角度转动缓动效果
        tween(this.towerNode.eulerAngles)
        .to(this.rotateSpeed, new Vec3(0, 0, newAngel), {
            onUpdate: (target:Vec3, ratio:number) => {
                // console.log('target', target.z, target.z)
                this.towerNode.setRotationFromEuler(target)
            }
        })
        .start()

        //坐标缓动效果
        tween(this.towerNode.position)
        .to(this.rotateSpeed, new Vec3(newX, newY, 0), {
            onUpdate: (target:Vec3, ratio:number) => {
                this.towerNode.setPosition(target)
            }
        })
        .start()

    }

    /**
     * 初始化新炮弹
     */
    initAttack() {
        let distance = 0
        const newNode = instantiate(this.ammoNode)
        const tempNode = instantiate(this.towerNode)
        let _this = this

        launch(distance)
        /**
         * 开始发射炮弹
         * @param distance 炮弹移动距离
         */
        function launch(distance:number) {
            const angel = tempNode.eulerAngles.z
            const rad = math.toRadian(angel)
            const newX = distance*Math.cos(rad)
            const newY = distance*Math.sin(rad)
            newNode.setPosition(newX, newY, 0)
            _this.node.addChild(newNode)
        }
        setInterval(() => {
            distance++
            launch(distance)
        })
        // this.distance++
        // if (Math.abs(newX)>=480 || Math.abs(newY)>=320) {
        //     this.distance = 0
        // }
        // 
    }
    loadAmmo() {
        this.initAttack()
        setInterval(() => {
            this.initAttack()
        }, this.attackSpeed)
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
