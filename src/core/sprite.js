export const SpritesNames = {
    IDLE: 'idle',
    JUMP: 'jump',
    RUN: 'run',
    ATTACK: 'attack',
    HURT: 'hurt',
    DIE: 'die',
    DEAD: 'dead',
    FALL: 'fall',
    GROUND: 'ground',
}

export class Sprite {
    constructor({ src, sprites }) {
        this.image = new Image()
        this.image.src = src

        this.sprites = sprites
        this.name = SpritesNames.IDLE

        this.animation = null

        this.frames = {
            current: 0,
            elapsed: 0,
            max: 0,
            speed: 0,
        }
    }

    sync(entity) {
        const { vx, vy } = entity

        const isRunning = vx !== 0
		const isJumping = vy < 0
		const isFalling = vy > 0
		const isGround = this.name === SpritesNames.FALL && vy === 0

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

        if (this.animation) {
			name = this.animation
		}

        if (this.name !== name) {
			this.name = name

			this.frames.current = 0
        	this.frames.elapsed = 0
        	this.frames.max = this.sprites[name].frames
        	this.frames.speed = this.sprites[name].speed
		}
    }

    update() {
        this.frames.elapsed = (this.frames.elapsed + 1) % 60

        if (this.frames.max > 1 && this.frames.elapsed % this.frames.speed === 0) {
            this.frames.current = (this.frames.current + 1) % this.frames.max
        }
    }

    draw(ctx, entity) {
        const { x: dx, y: dy, width: dw, direction } = entity
        const { x: sx, y: sy, w: sw, h: sh, offsetX, offsetY } = this.sprites[this.name]

        const flip = direction === 'left'

        const draw = () => ctx.drawImage(
            this.image,
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
    }

    startAnimation(name) {
        return new Promise(resolve => {
            this.animation = name
            const ms = this.sprites[name].frames * this.sprites[name].speed * 1000 / 60 - this.sprites[name].speed

		    setTimeout(() => {
			    this.animation = null
                resolve()
		    }, ms)
        })
    }

    attachAnimation() {
        return this.startAnimation(SpritesNames.ATTACK)
    }

    hurtAnimation() {
        return this.startAnimation(SpritesNames.HURT)
    }

    dieAnimation() {
        return new Promise(async resolve => {
            await this.startAnimation(SpritesNames.DIE)
            this.animation = SpritesNames.DEAD
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