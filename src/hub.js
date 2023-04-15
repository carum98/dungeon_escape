import { Sprite } from './core/sprite.js'

import Sprites from '../assets/sprites/objects.json' assert { type: 'json' }

export class Hub {
    constructor({ canvas, state }) {
        this.canvas = canvas
        this.ctx = canvas.getContext('2d')

        this.state = state

        this.heart = new Sprite({
            src: './assets/img/objects.png',
            sprites: Sprites.hub,
            initialSprite: 'heart'
        })

        this.diamond = new Sprite({
            src: './assets/img/objects.png',
            sprites: Sprites.hub,
            initialSprite: 'diamond'
        })

        this.image = new Image()
        this.image.src = './assets/img/objects.png'

        this.canvas.width = 66
        this.canvas.height = 40
 
        Object.freeze(this)
    }

    update() {
        this.heart.update()
        this.diamond.update()
    }

    draw() {
        const { ctx, canvas } = this
        const { lives, diamonds } = this.state
        
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        this.#drawSprite({ name: 'live-bar', x: 0,  y: 0 })

        for (let i = 0; i < lives; i++) {
            this.heart.draw(ctx, { x: 17 + (i * 11), y: 14 })
        }

        this.diamond.draw(ctx, { x: 10, y: 28 })
        this.#drawSprite({ name: 'x', x: 25, y: 28 })
        this.#drawSprite({ name: diamonds.toString(), x: 37, y: 30 })
    }

    #drawSprite({ name, x, y }) {
        const { ctx, image } = this

        const sprite = Sprites.hub[name]

        ctx.drawImage(
            image,
            sprite.x,
            sprite.y,

            sprite.w,
            sprite.h,

            x,
            y,

            sprite.w,
            sprite.h,
        )
    }
}