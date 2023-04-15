import { Object } from './core/object.js'
import { Sprite } from './core/sprite.js'
import { Throwable } from './core/throwable.js'

import Sprites from '../assets/sprites/objects.json' assert { type: 'json' }

export class Cannon extends Object {
    constructor({ x, y }) {
        super({ 			
            x,
            y,
            width: 32,
            height: 32,
            sprite: new Sprite({
                src: './assets/img/objects.png',
                sprites: Sprites.cannon
            })
        })

        this.ball = new CannonBall({ x: this.x, y: this.y + 12 })
    }

    fire(collisions) {
        this.ball.throw(collisions)
        this.startAnimation('fire').then(() => this.sprite.stopAnimation())
    }

    update() {
        this.ball.update()
        super.update()
    }

    draw(ctx) {
        super.draw(ctx)
        this.ball.draw(ctx)
    }
}

class CannonBall extends Throwable {
    constructor({ x, y }) {
        super({
            x,
            y,
            width: 16,
            height: 16,
            sprite: new Sprite({
                src: './assets/img/objects.png',
                sprites: {
                    "idle": Sprites.cannon.ball,
                    "explosion": Sprites.cannon.explosion
                }
            })
        })
    }

    throw(collisions) {
        super.throw(collisions, async () => {
            await this.sprite.startAnimation('explosion')
            await this.sprite.stopAnimation()
        })
    }
}