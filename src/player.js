import { Entity } from './entities/entity.js'

const sprite = {
    idle: {
        x: 0,
        y: 0,
        w: 48,
        h: 32,

        offsetX: 10,
        offsetY: 7,

        frames: 10,

        speed: 5,
    },
    jump: {
        x: 0,
        y: 64,
        w: 48,
        h: 32,

        offsetX: 10,
        offsetY: 7,

        frames: 1,

        speed: 0,
    },
    fall: {
        x: 48,
        y: 64,
        w: 48,
        h: 32,

        offsetX: 10,
        offsetY: 7,

        frames: 1,

        speed: 18,
    },
    falling: {
        x: 96,
        y: 64,
        w: 48,
        h: 32,

        offsetX: 10,
        offsetY: 7,

        frames: 1,

        speed: 0,
    },
    run: {
        x: 0,
        y: 32,
        w: 48,
        h: 32,

        offsetX: 10,
        offsetY: 7,

        frames: 8,

        speed: 5,
    },
	attack: {
		x: 0,
		y: 224,
		w: 80,
		h: 65,

		offsetX: 10,
        offsetY: 20,

		frames: 3,

		speed: 8,
	},
	dead: {
		x: 0,
		y: 96,
		w: 48,
		h: 32,

		offsetX: 10,
		offsetY: 7,

		frames: 4,

		speed: 15,
	},
	hit: {
		x: 240,
		y: 240,
		w: 48,
        h: 32,

        offsetX: 10,
        offsetY: 7,

        frames: 2,

        speed: 8,
	},
	dead_floor: {
		x: 144,
		y: 96,
		w: 48,
		h: 32,

		offsetX: 10,
		offsetY: 7,

		frames: 1,

		speed: 0,
	},
	door_in: {
		x: 0,
		y: 176,
		w: 48,
		h: 48,

		offsetX: 10,
		offsetY: 25,

		frames: 8,

		speed: 8,
	}
}

export class Player extends Entity {
	constructor() {
		super({
			x: 0,
			y: 0,
			width: 25,
			height: 26,
			src: './assets/img/player_king.png',
		})

		this.vx = 0
		this.vy = 0

		this.gravity = 0.5
		this.velocity = 4

		this.status = 'idle'

		this.lastMovement = null

		this.direction = 'right'

		this.animation = null
	}

	movements(controls) {
		const { direction } = controls

		if (JSON.stringify(direction) === JSON.stringify(this.lastMovement)) return
		this.lastMovement = { ...direction }

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

	update() {
		this.vy += this.gravity
		this.x += this.vx
		this.y += this.vy

		super.update()
	}

	draw(ctx) {
		const isRunning = this.vx !== 0
		const isJumping = this.vy < 0
		const isFalling = this.vy > 0
		const isFall = this.status === 'falling' && this.vy === 0
		
		let status = 'idle'

		if (isRunning) {
			status = 'run'
		} else if (isJumping) {
			status = 'jump'
		} else if (isFalling) {
			status = 'falling'
		} else if (isFall) {
			this.falldownAnimation()
		}

		if (this.animation) {
			status = this.animation
		}

		if (this.status !== status) {
			this.status = status

			this.frames.current = 0
        	this.frames.elapsed = 0
        	this.frames.max = sprite[this.status].frames
        	this.frames.speed = sprite[this.status].speed
		}

		super.draw(ctx, sprite[this.status], this.direction === 'left')
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

	attackAnimation() {
		this.animation = 'attack'
		const ms = sprite.attack.frames * sprite.attack.speed * 1000 / 60 - sprite.attack.speed

		setTimeout(() => {
			this.animation = null
		}, ms)
	}

	hitAnimation() {
		this.animation = 'hit'
		const ms = sprite.hit.frames * sprite.hit.speed * 1000 / 60 - sprite.hit.speed

		setTimeout(() => {
			this.animation = null
		}, ms)
	}

	falldownAnimation() {
		this.animation = 'fall'
		const ms = 150

		setTimeout(() => {
			this.animation = null
		}, ms)
	}

	deadAnimation() {
		this.animation = 'dead'

		const ms = sprite.dead.frames * sprite.dead.speed * 1000 / 60 - sprite.dead.speed

		setTimeout(() => {
			this.animation = 'dead_floor'
		}, ms)
	}

	doorInAnimation() {
		return new Promise (resolve => {
			this.animation = 'door_in'
			const ms = sprite.door_in.frames * sprite.door_in.speed * 1000 / 60 - sprite.door_in.speed
	
			setTimeout(() => {
				this.animation = null

				resolve()
			}, ms)
		})
	}
}