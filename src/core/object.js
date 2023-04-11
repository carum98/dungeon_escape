import { GameElement } from './game-element.js'

export class Object extends GameElement {
    constructor({ x, y, width, height, sprite }) {
        super({ x, y, width, height })

        this.direction = 'right'
        this.sprite = sprite
    }

    update() {
        this.sprite.update()
    }

    draw(ctx) {
        this.sprite.draw(ctx, this)
    }

    startAnimation(name) {
        return this.sprite.startAnimation(name)
    }
}