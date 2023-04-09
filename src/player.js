import { Entity } from './entities/entity.js'

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

export class Player extends Entity {
	constructor() {
		super({
			x: 0,
			y: 0,
			width: 25,
			height: 25,
		})

		this.vx = 0
		this.vy = 0

		this.gravity = 1.8
		this.velocity = 4

		this.status = STATUS.idle
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