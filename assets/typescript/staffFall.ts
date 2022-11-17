
import { _decorator, Component, Node, Collider2D, Contact2DType, RigidBody2D, Vec2, math, Vec3, view, geometry, instantiate, Label, PhysicsSystem2D } from 'cc';
const { ccclass, property } = _decorator;
import NodeCache from '../utils/NodeCache';

import { randomInt } from '../utils/tools'
/**
 * Predefined variables
 * Name = staffFall
 * DateTime = Wed Nov 16 2022 11:05:04 GMT+0800 (香港标准时间)
 * Author = riki123
 \* FileBasename = staffFall.ts
 * FileBasenameNoExtension = staffFall
 * URL = db://assets/typescript/staffFall.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */
@ccclass('staffFall')
export class staffFall extends Component {
    // [1]
    // dummy = '';
    @property(Node)
    ball:Node;

    @property(Node)
    point:Node;

    @property(Node)
    tower:Node;

    @property(Label)
    score:Label

    ballNodePool:NodeCache;

    pointNodePool:NodeCache;

    newNodeCount = 0;
    deleteCount =  0;
    callbacks:Function[] = [];

    count:number = 0;
    // [2]
    // @property
    // serializableDummy = 0;
    onLoad() {
        this.ballNodePool = new NodeCache('ball')
        this.pointNodePool = new NodeCache('point')
        this.initBalls()
        
    }
    start () {
        // [3]
        this.node.parent.on(Node.EventType.MOUSE_DOWN, this.onMouseDown, this)
        const collider = this.node.getComponent(Collider2D)
        
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
    }
    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D) {
        setTimeout(() => {
            this.deleteCount++
            otherCollider.node && otherCollider.node.destroy()
            // this.ballNodePool.refundNode(otherCollider.node)
        }, 1);
        
    }

    initBalls() {
        this.schedule(this.createBall(), 0.1)
    }
    createBall() {
        return function() {
            let newNode:Node;
            // if (newNode) {
            //     this.ballNodePool.refundNode(newNode)
            // }
            // console.log(this.newNodeCount, this.deleteCount)
            // newNode = this.ballNodePool.copyNode(this.ball)
            newNode = instantiate(this.ball)
            this.newNodeCount++;
            const x = randomInt(-450, 10)
            newNode.setPosition(x, 330)
            newNode.active = true
            this.node.parent.addChild(newNode)
            const collider = newNode.getComponent(Collider2D)
            if (collider) {
                collider.on(Contact2DType.BEGIN_CONTACT, (selfCollider: Collider2D, otherCollider: Collider2D)=>{
                    if (otherCollider.node.name === this.point.name) {
                        
                        setTimeout(() => {
                            this.count++
                            this.score.string = `得分:${this.count}`
                            otherCollider.node && otherCollider.node.destroy()
                            selfCollider.node && selfCollider.node.destroy()
                            // this.node.parent.removeChild(otherCollider.node)
                            // this.pointNodePool.refundNode(otherCollider.node)
                            // this.ballNodePool.refundNode(selfCollider.node)
                        }, 1);
                    }
                }, this);
            }
        }
    }
    onMouseDown(event) {
        const size = view.getVisibleSize()
        const point = new Vec3(event.getUILocation().x-size.x/2, event.getUILocation().y-size.y/2)
        // this.unscheduleAllCallbacks()
        // this.unschedule(this.callback)
        console.log(point.x, point.y)
        this.onAttak(point)
    }

    /**
     * 使用闭包的方式
     * @returns function
     */
    createLine(outRay) {
        let distance = 0
        let tempVec = new Vec3()
        let newNode:Node;
        return function() {
            if (newNode) {
                distance+=5
                outRay.computeHit(tempVec, distance)//计算射线上的点坐标
                // console.log(newNode)
                newNode.active && newNode.setPosition(tempVec)
                // newNode.destroy()
                // this.pointNodePool.refundNode(newNode)
                return newNode
            }
            outRay.computeHit(tempVec, distance)//计算射线上的点坐标
            // newNode = this.pointNodePool.copyNode(this.point)
            newNode = instantiate(this.point)
            newNode.setPosition(tempVec)
            this.node.parent.addChild(newNode)
            newNode.active = true
            distance+=5
            return newNode
        }
    }
    onAttak(point:Vec3) {
        const outRay = new geometry.Ray()

        geometry.Ray.fromPoints(outRay, this.tower.getPosition(), point)
        
        this.schedule(this.createLine(outRay), 0.01)
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
``