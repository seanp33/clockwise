export enum WeaponType {
    SWORD,
    GUN
}

export class Weapon {
    constructor(protected name: string, protected damage: number, protected weaponType: WeaponType) { }
}