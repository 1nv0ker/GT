
import { _decorator, Component, Node, math, geometry, Vec3, instantiate, CCBoolean, NodePool, Collider2D, Contact2DType, PhysicsSystem2D, director } from 'cc';
import NodeCache from '../utils/NodeCache';
const { ccclass, property } = _decorator;
/**
 * Predefined variables
 * Name = attack
 * DateTime = Thu Nov 10 2022 10:29:24 GMT+0800 (香港标准时间)
 * Author = riki123
 * FileBasename = attack.ts
 * FileBasenameNoExtension = attack
 * URL = db://assets/typescript/attack.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */
 
@ccclass('attack')
export class attack extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;

    @property(Node)
    point:Node;

    @property(Node)
    targetNode:Node;

    enemyNodePool:NodeCache;
    movingNode:Node;
    outRay:geometry.Ray;

    distance:number = 1
    callbacks:Function[] = [];
    onLoad() {
        this.enemyNodePool = new NodeCache('point')
        this.loadAttack()
    }
    start () {

        const collider = this.targetNode.getComponent(Collider2D)
        if (collider) {
            // console.log('collider', collider)
            collider.on(Contact2DType.BEGIN_CONTACT, this.onContact, this);
        }
    }
    /**
     * 回调碰撞删除射击点
     */
    onContact() {
        const callback = this.callbacks[0]
        const newNode = callback.apply(this)
        
        this.unschedule(callback)
        if (newNode) {
            this.enemyNodePool.refundNode(newNode)
        }
        this.callbacks.shift()
    }
    /**
     * 加载射线
     */
    loadAttack() {
        this.outRay = new geometry.Ray()
        const vec = new Vec3()
        Vec3.random(vec, 300)
        this.targetNode.setPosition(vec)
        geometry.Ray.fromPoints(this.outRay, new Vec3(0, 0, 0), vec)
    }
    /**
     * 使用闭包的方式
     * @returns function
     */
    createLine() {
        let distance = 0
        let tempVec = new Vec3()
        let newNode:Node;
        let outRay = this.outRay//缓存当前的射线
        return function() {
            if (newNode) {
                this.enemyNodePool.refundNode(newNode)
            }
            outRay.computeHit(tempVec, distance)//计算射线上的点坐标
            newNode = this.enemyNodePool.copyNode(this.point)

            newNode.setPosition(tempVec)
            newNode.active = true
            this.node.addChild(newNode)
            distance+=5
            return newNode
        }
    }
    /**
     * 开始射击
     */
    onAttack() {
        const callback = this.createLine()
        this.callbacks.push(callback)
        this.schedule(callback, 0.01)
    }
    /**
     * 改变目标位置
     */
    onChangeLocations() {
        this.loadAttack()
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
