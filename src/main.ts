import * as PIXI from 'pixi.js'

import { Player } from './lib/core/actors'
import { ViewportConfig, Viewport } from './lib/system/Viewport'

let stage: PIXI.Container = new PIXI.Container()
let player

let centralVPConfig: ViewportConfig = new ViewportConfig(800, 600, stage)
let centralViewport: Viewport = new Viewport(centralVPConfig)
centralViewport.initialize()

window.onload = () => {
    centralViewport.mount(document.getElementById('centralViewport'))
    centralViewport.run()
}

PIXI.loader
    .add("images/player.json")
    .load(() => {
        var playerTextures = PIXI.loader.resources["images/player.json"].textures;
        player = new Player('Tommy', Date.now(), 100, playerTextures)
        player.gotoFrame('build.png')
        player.displayIn(stage)
    });
