import { GameElement } from '../core/game-element.js'

export class Entity extends GameElement {
    constructor({ x, y, width, height, src }) {
        super({ x, y, width, height })

        this.image = new Image()
		this.image.src = src

        this.frames = {
            current: 0,
            elapsed: 0,
            max: 0,
            speed: 0,
        }
    }

    update() {
        this.frames.elapsed = (this.frames.elapsed + 1) % 60

        if (this.frames.max > 1 && this.frames.elapsed % this.frames.speed === 0) {
            this.frames.current = (this.frames.current + 1) % this.frames.max
        }
    }

    draw(ctx, sprite, flip = false) {
        const { image, x: dx, y: dy, width: dw, height: dh } = this
		const { x: sx, y: sy, w: sw, h: sh, offsetX, offsetY } = sprite

        const draw = () => ctx.drawImage(
            image,
            sx + (sw * this.frames.current),
            sy,

            sw,
            sh,

            flip ? (-dx - dw - offsetX) : (dx - offsetX),
            dy - offsetY,

            sw,
            sh,
        )

        if (flip) {
            ctx.save()
            ctx.scale(-1, 1)
            draw()
            ctx.restore()
        } else {
            draw()
        }

        // super.draw(ctx)
	}
}