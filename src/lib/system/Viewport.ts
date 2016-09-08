import * as PIXI from 'pixi.js'

export class ViewportConfig {
    constructor(private _width: number, private _height: number, private _root: PIXI.Container) { }

    get width(): number {
        return this._width
    }

    get height(): number {
        return this._height
    }

    get root(): PIXI.Container {
        return this._root
    }
}

const ERROR_INITIALIZATION: string = 'A Viewport must be initialized before it can be used'

export class Viewport {
    private _renderer: PIXI.WebGLRenderer
    private _ticker: PIXI.ticker.Ticker

    constructor(private _config: ViewportConfig) { }

    initialize(): HTMLCanvasElement {
        if (this._renderer) throw new Error('')
        this._renderer = new PIXI.WebGLRenderer(this._config.width, this._config.height)
        this._ticker = new PIXI.ticker.Ticker()
        return this.view
    }

    run(): void {
        if (!this.initialized) throw new Error(ERROR_INITIALIZATION)
        if (this._ticker.started) return
        this._ticker.add(this._render.bind(this))
        this._ticker.start()
    }

    pause(): void {
        this._ticker.stop()
    }

    mount(element: HTMLElement): void {
        if (!this.initialized) throw new Error(ERROR_INITIALIZATION)
        element.appendChild(this._renderer.view);
    }

    _render(deltaTime: number): void {
        this._renderer.render(this._config.root)
    }

    get view(): HTMLCanvasElement {
        return this._renderer.view
    }

    get initialized(): boolean {
        return !!this._renderer
    }
}