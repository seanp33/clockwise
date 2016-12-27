import { Container, Sprite, Texture } from 'pixi.js'

export class Audible {
    // TODO: implement a class that provides some form of
    // 1. sound file loading
    // 2. sound playback controls
    // 3. maybe some kind of event contract indicating when assets are loaded
}

export interface Graphical {
    displayIn(stage: Container): void
    gotoFrame(frameId: string): void
    setSprite(sprite: Sprite): void
    getSprite(): Sprite
}

export class Movable {
    // TODO: implement a class that provides some form of
    // 1. PIXI sprite base-classing
    // 2. perhaps some decent abstraction over repositioning
}