import { GameElement } from './game-element.js'

export class Entity extends GameElement {
    constructor({ x, y, width, height, sprite }) {
        super({ x, y, width, height })

        this.vx = 0
		this.vy = 0

		this.gravity = 0.5
		this.velocity = 4

        this.direction = 'right'

        this.sprite = sprite

        this.lastControls = null
    }

    update() {
        this.vy += this.gravity
		this.x += this.vx
		this.y += this.vy

        this.sprite.update()
    }

    draw(ctx) {
        this.sprite.sync(this)
        this.sprite.draw(ctx, this)
    }

	attack() {
		return this.sprite.attachAnimation()
	}

	hurt() {
		return this.sprite.hurtAnimation()
	}

	dead() {
		return this.sprite.dieAnimation()
	}

    movements(controls) {
        const { direction } = controls

		if (JSON.stringify(direction) === JSON.stringify(this.lastControls)) return
		this.lastControls = { ...direction }

		this.vx = 0

		if (direction.left) {
			this.vx = -this.velocity
			this.direction = 'left'
		} else if (direction.right) {
			this.vx = this.velocity
			this.direction = 'right'
		}

		if (direction.up && this.vy === 0) {
			this.vy = -10
		}
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

