import * as PIXI from 'pixi.js'

export class ViewportConfig {
    constructor(
        private _width: number,
        private _height: number,
        private _root: PIXI.Container,
        private _rendererOptions?: PIXI.RendererOptions) {

        //http://www.goodboydigital.com/pixi-js-v2-fastest-2d-webgl-renderer/
        this._rendererOptions = _rendererOptions || {
            transparent: false,
            antialias: true,
            autoResize: true,
            resolution: window.devicePixelRatio
        }
    }

    get width(): number {
        return this._width
    }

    get height(): number {
        return this._height
    }

    get root(): PIXI.Container {
        return this._root
    }

    get rendererOptions(): PIXI.RendererOptions {
        return this._rendererOptions
    }
}

const ERROR_INITIALIZATION: string = 'A Viewport must be initialized before it can be used'

export class Viewport {
    private _renderer: PIXI.WebGLRenderer | PIXI.CanvasRenderer
    private _ticker: PIXI.ticker.Ticker

    constructor(private _config: ViewportConfig) { }

    initialize(): HTMLCanvasElement {
        if (this._renderer) throw new Error('')
        this._renderer = PIXI.autoDetectRenderer(this._config.width, this._config.height, this._config.rendererOptions)
        this._renderer.view.style.position = "absolute";
        this._renderer.view.style.display = "block";
        this._renderer.autoResize = true;
        this._renderer.resize(window.innerWidth, window.innerHeight);
        
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