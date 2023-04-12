import { GameElement } from './game-element.js'

export class Collectible extends GameElement {
    constructor({ x, y, width, height, sprite }) {
        super({ x, y, width, height })

        this.vx = 0
		this.vy = 0

		this.gravity = 0.5
		this.velocity = 4

        this.sprite = sprite

        this.isCollected = false
    }

    update() {
		this.sprite.update()

        this.vy += this.gravity
		this.x += this.vx
		this.y += this.vy
    }

    draw(ctx) {
        this.sprite.draw(ctx, this)
    }

    collected() {
        this.isCollected = true

        return new Promise(resolve => {
            this.sprite.startAnimation('hit').then(() => {
                resolve()
            })
        })
    }

    collision(blocks) {
		for (const block of blocks) {
			if (this.isColliding(block)) {
				const position = this.collidePosition(block)

				const gap = 0.01

				if (position === 'left') {
					this.x = block.x + block.width + gap
				} else if (position === 'right') {
					this.x = block.x - this.width - gap
				} else if (position === 'top') {
					this.vy = 0
					this.y = block.y + block.height + gap
				} else if (position === 'bottom') {
					this.vy = 0
					this.y = block.y - this.height - gap
				}
			}
		}
	}
}