import {TimeTraveler, YEAR_IN_MILLIS} from '../system/temporals'

export class Weapon {
    constructor(protected name: string, protected damage: number) { }
    // TODO: make abstract?
    // TODO: add getters and setters?
    // TODO: introduce sword and gun subtypes
}

export class Item {
    constructor(private name: string) { }
}

export class Player2  {}
export class Player  {
    constructor(
        private name: string,
        private inceptionTime: number,
        private health: number = 100,
        private weapons: Array<Weapon> = [],
        private inventory: Array<Item> = []
    ) {
        this.pointInTime = this.inceptionTime
    }

    private pointInTime:number = 0

    public getAge():number{
        return Math.floor((this.pointInTime - this.inceptionTime) / YEAR_IN_MILLIS)
    }

    public getInceptionTime():number{
        return this.inceptionTime
    }

    public setPointInTime(pointInTime:number):void{
        this.pointInTime = pointInTime
    }

    public stats():void {
        console.log(`name:${this.name} | health:${this.health} | age:${this.getAge()}`)
    }
}