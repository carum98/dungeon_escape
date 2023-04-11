import { GameElement } from './game-element.js'
import { SpritesNames } from './sprite.js'

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
		this.sprite.update()

        this.vy += this.gravity
		this.x += this.vx
		this.y += this.vy
    }

    draw(ctx) {
        const isRunning = this.vx !== 0
		const isJumping = this.vy < 0
		const isFalling = this.vy > 0
		const isGround = this.name === SpritesNames.FALL && this.vy === 0

        let name = SpritesNames.IDLE

		if (isRunning) {
			name = SpritesNames.RUN
		} else if (isJumping) {
			name = SpritesNames.JUMP
		} else if (isFalling) {
			name = SpritesNames.FALL
		} else if (isGround) {
            this.#groundAnimation()
		}

        this.sprite.draw(ctx, this, name)
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

	attack() {
		return this.sprite.startAnimation(SpritesNames.ATTACK)
	}

	hurt() {
		return this.sprite.startAnimation(SpritesNames.HURT)
	}

	dead() {
		return new Promise(async resolve => {
            await this.sprite.startAnimation(SpritesNames.DIE)
            this.sprite.animation = SpritesNames.DEAD
            resolve()
        })
	}

	#groundAnimation() {
        this.animation = SpritesNames.GROUND

        setTimeout(() => {
            this.animation = null
        }, 150)
    }
}

