export enum ItemType {
    KEY,
    TOOL,
    CHEST,
    FOOD,
    POTION
}

export class Item {
    constructor(private name: string, private type: ItemType) { }
}