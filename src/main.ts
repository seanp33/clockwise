import * as PIXI from 'pixi.js'

import {Player} from './lib/core/actors' // TODO: remove test code
import {ViewportConfig, Viewport} from './lib/system/Viewport'

let stage: PIXI.Container = new PIXI.Container()
let centralVPConfig: ViewportConfig = new ViewportConfig(800, 600, stage)
let centralViewport: Viewport = new Viewport(centralVPConfig)
centralViewport.initialize()

window.onload = () => {
    centralViewport.mount(document.getElementById('centralViewport'))
    centralViewport.run()

    // TODO: remove test code
    let player = new Player('Forrest', Date.now())
    player.stats()
}
