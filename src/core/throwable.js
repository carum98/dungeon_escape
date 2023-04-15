import { GameElement } from './game-element.js'

export class Throwable extends GameElement {
    #initialX = 0
    #initialY = 0

    constructor({ x, y, width, height, sprite }) {
        super({ x, y, width, height })

        this.#initialX = x
        this.#initialY = y

        this.vx = 0
		this.vy = 0

		this.gravity = 0
		this.velocity = 0.1

        this.sprite = sprite

        this.isActive = false
        this.canDraw = false

        this.interval = 0
    }

    throw(collisions, callback) {
        this.isActive = true
        this.canDraw = true

        const refreshTime = 100

        const id = setInterval(async () => {
            this.interval += refreshTime

            if (this.interval >= 300) {
                this.gravity = 0.03
            }

            if (collisions.some(item => item.isColliding(this))) {
                clearInterval(id)

                this.isActive = false
                await callback()
                this.canDraw = false

                this.reset()
            } 
        }, refreshTime)
    }

    update() {
        this.sprite.update()

        if (!this.isActive) return

        this.vy += this.gravity
        this.vx -= this.velocity

        this.x += this.vx
        this.y += this.vy
    }

    draw(ctx) {
        if (!this.canDraw) return

        this.sprite.draw(ctx, this)
    }

    reset() {
        this.x = this.#initialX
        this.y = this.#initialY

        this.vx = 0
        this.vy = 0

        this.interval = 0
        this.gravity = 0
    }
}