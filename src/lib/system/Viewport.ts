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
    private _tick: number

    constructor(private _config: ViewportConfig) { }

    initialize(): HTMLCanvasElement {
        if (this._renderer) throw new Error('')
        this._renderer = new PIXI.WebGLRenderer(this._config.width, this._config.height)
        return this.view
    }

    run(): void {
        if (!this.initialized) throw new Error(ERROR_INITIALIZATION)
        if (this._tick) return
        this._animate()
    }

    pause(): void {
        if (!this._tick) return
        cancelAnimationFrame(this._tick)
    }

    mount(element: HTMLElement): void {
        if (!this.initialized) throw new Error(ERROR_INITIALIZATION)
        element.appendChild(this._renderer.view);
    }

    _animate(): void {
        this._tick = requestAnimationFrame(this._animate.bind(this))
        this._renderer.render(this._config.root)
    }

    get view(): HTMLCanvasElement {
        return this._renderer.view
    }

    get initialized(): boolean {
        return !!this._renderer
    }
}