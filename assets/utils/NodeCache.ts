import { instantiate, NodePool, Node } from "cc";


export default class NodeCache {
    protected nodePool;

    constructor(name:string) {
        this.nodePool = new NodePool(name)
    }
    copyNode(copedNode:Node):Node {
        let NewNode:Node;

        if (this.nodePool.size() > 0) {
            NewNode = this.nodePool.get()
        } else {
            console.log('instantiate')
            NewNode = instantiate(copedNode)
        }
        return NewNode
    }

    refundNode(newNode:Node) {
        this.nodePool.put(newNode)
    }
    clear() {
        this.nodePool.clear()
    }

}