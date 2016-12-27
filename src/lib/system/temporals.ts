/**
 * A TimeNode
 * A TimeNode represents a unique moment in time and the potential consquences of the game.
 * TimeNodes are arranged in a tree graph where any TimeNode can maintain a single parent
 * and many children. TimeNodes communicate with any node across the entire graph
 *
 *
 * The TimeNode/TimeTraveler relationship
 *
 * When a TimeTraveler visits a TimeNode it is subject to the TimeNode's collection of potentionally
 * meaningful game events, known as Effectors. Effectors can be pulled from the TimeNode'ss set of
 * standing Effectors, or any other Effector source. A TimeNode is responsible for introducing a
 * visiting TimeTraveler to its Effectors before the TimeNode and the TimeTraveler can consider
 * the TimeNode free of the visiting TimeTraveler.
 *
 */

export const YEAR_IN_MILLIS:number = 31536000000

export interface Effector {
    applicable(ts:TimeTraveler):number
    apply(ts:TimeTraveler):void
}

export interface TimeTraveler{
    getAge():number
    getInceptionTime():number
    setPointInTime(current:number):void
}

export type TimeId = number

import {without} from 'lodash'

export class TimeFabric{
    private oneTimeHandlers:Map<string, Array<Function>> = new Map()
    private persistentHandlers:Map<string, Array<Function>> = new Map()
    private pending:Map<string, Array<any>> = new Map()

    private handlePending(channel:string, handlers:Map<string, Array<Function>>){
        this.pending.get(channel).forEach((payload) => {
            handlers.get(channel).forEach((handler) => {
                handler(payload)
            })
            handlers.delete(channel)
        })
    }

    private register(channel:string, handler:Function, handlers:Map<string, Array<Function>>):void{
        if(!handlers.has(channel))handlers.set(channel, new Array<Function>())
        handlers.get(channel).push(handler)
    }

    private unregister(channel:string, handler:Function, handlers:Map<string, Array<Function>>):void{
        if(handlers.has(channel)){
            handlers.set(channel, without(handlers.get(channel), handler))
        }
    }

    public once(channel:string, handler:Function):void{
        this.register(channel, handler, this.oneTimeHandlers)
        this.handlePending(channel, this.oneTimeHandlers)
    }

    public on(channel:string, handler:Function):void{
        this.register(channel, handler, this.persistentHandlers)
        this.handlePending(channel, this.persistentHandlers)
    }

    public off(channel:string, handler:Function):void{
        this.unregister(channel, handler, this.persistentHandlers)
    }

    public send(channel:string, payload?:any):void{
        if(this.oneTimeHandlers.has(channel)){
            let handlers = this.oneTimeHandlers.get(channel)
            handlers.forEach((handler) => handler(payload))
            handlers.forEach((handler) => {
                this.unregister(channel, handler, this.oneTimeHandlers)
            })
        }
        if(this.persistentHandlers.has(channel)){
            this.persistentHandlers.get(channel).forEach((handler) => handler(payload))
        }else{
            if(!this.pending.has(channel)) this.pending.set(channel, new Array<Function>())
            this.pending.get(channel).push(payload)
        }
    }
}

import * as Events from './events'
export class TimeNode{
    constructor(
        private id:TimeId,
        private pointInTime:number,
        private fabric:TimeFabric,
        private parent?:TimeNode,
        private children:TimeNode[] = [],
        private effectors:Effector[] = []
    ){
        this.fabric.on(Events.GAME_INITIALIZING, this.onGameInitializing)
        this.fabric.on(Events.GAME_TERMINATING, this.onGameTerminating)
    }

    protected onGameInitializing():void{
        // TODO: here is where we would prep any initialization?
    }

    protected onGameTerminating():void{
        this.fabric.off(Events.GAME_INITIALIZING, this.onGameInitializing)
        this.fabric.off(Events.GAME_TERMINATING, this.onGameTerminating)
    }

    public getId():TimeId{
        return this.id
    }

    public getParent():TimeNode{
        return this.parent
    }

    public setParent(timeNode:TimeNode):void{
        this.parent = timeNode
    }

    public getChildren():TimeNode[]{
        return this.children
    }

    public addChild(timeNode:TimeNode):void{
        this.children.push(timeNode)
    }

    public visit(traveler:TimeTraveler):void{
        traveler.setPointInTime(this.pointInTime)
        this.fabric.send(Events.TIME_TRAVELER_VISITING, traveler)
        // do we buffer these Effectors up at some point
        // add them to some datastructure where they can
        // cancel each other out where necessary, compliment oneanother, compound their effect... etc
        // consider some form of effector filtering logic,
        // where a stream of effectors can be assembled
        // based on the current state of the game or any condition
        // related to the TimeTraveler or TimeNode. We would then
        // allow the TimeTraveler to be considered by each Effector in
        // the the stream, as apposed to the logic below which is applicable? then apply!
        this.effectors.forEach((effector:Effector) => {
            if(effector.applicable(traveler)) effector.apply(traveler)
        })
    }

}