import { GameElement } from './game-element.js'

export class CollisionBlock extends GameElement {
    constructor({ x, y, width, height }) {
        super({ x, y, width, height })
    }

    draw(ctx) {
        ctx.fillStyle = 'rgba(255, 0, 0, 0.2)'
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}