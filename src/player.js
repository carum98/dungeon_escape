import { GameElement } from './core/game-element.js'

const STATUS = {
	idle: 'idle',
	running: 'running',
	jumping: 'jumping',
}

const SPRITES = {
	[STATUS.idle]: {},
	[STATUS.running]: {},
	[STATUS.jumping]: {},
}

export class Player extends GameElement {
	constructor() {
		super({
			x: 50,
			y: 80,
			width: 25,
			height: 25,
		})

		this.vx = 0
		this.vy = 0

		this.gravity = 1.8
		this.velocity = 4

		this.img = new Image()
		this.img.src = './assets/img/player.png'

		this.status = STATUS.idle
	}

	draw(ctx) {
		ctx.drawImage(
			this.img,
			0,
			0,
			48,
			this.img.height,
			this.x - 18,
			this.y - 18,
			48,
			this.img.height,
		)
	}

	movements(controls) {
		const { direction } = controls

		this.vx = 0

		if (direction.left) {
			this.vx = -this.velocity
		} else if (direction.right) {
			this.vx = this.velocity
		}

		if (direction.up && this.vy === 0) {
			this.vy = -20
		}
	}

	update() {
		this.vy += this.gravity
		this.x += this.vx
		this.y += this.vy
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