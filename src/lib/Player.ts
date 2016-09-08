import {Weapon} from './Weapon'
import {Item} from './Item'

export class Player {
    constructor(private name: string, private health: number = 100, private weapons: Array<Weapon> = [], private inventory: Array<Item> = []) {
    }
    stats() {
        console.log(`name:${this.name} | health:${this.health}`)
    }
}