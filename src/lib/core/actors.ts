import { Sprite, Container, Texture } from 'pixi.js'

import { Graphical } from './behaviors'
import { TimeTraveler, YEAR_IN_MILLIS } from '../system/temporals'

export class Weapon {
    constructor(protected name: string, protected damage: number) { }
    // TODO: make abstract?
    // TODO: add getters and setters?
    // TODO: introduce sword and gun subtypes
}

export class Item {
    constructor(private name: string) { }
}

export class Player implements TimeTraveler, Graphical {

    private container: Container

    constructor(
        private name: string,
        private inceptionTime: number,
        private health: number = 100,
        private textures: Texture[] = [],
        private sprite: Sprite = new Sprite(),
        private weapons: Array<Weapon> = [],
        private inventory: Array<Item> = [],
    ) {
        this.pointInTime = this.inceptionTime
        if (this.sprite) {
            //this.sprite.anchor.set(0.5, 0.5)
        }
    }

    private pointInTime: number = 0

    public getAge(): number {
        return Math.floor((this.pointInTime - this.inceptionTime) / YEAR_IN_MILLIS)
    }

    public getInceptionTime(): number {
        return this.inceptionTime
    }

    public setPointInTime(pointInTime: number): void {
        this.pointInTime = pointInTime
    }

    public displayIn(container: Container): void {
        if (this.container) {
            this.container.removeChild(this.sprite)
        }
        this.container = container
        this.container.addChild(this.sprite)
    }

    public gotoFrame(frame: string) {
        this.sprite.texture = this.textures[frame]
    }

    public setSprite(sprite: Sprite): void {
        this.sprite = sprite
        //this.sprite.anchor.set(0.5, 0.5)
    }

    public getSprite(): Sprite {
        return this.sprite
    }

    public stats(): void {
        console.log(`name:${this.name} | health:${this.health} | age:${this.getAge()}`)
    }
}