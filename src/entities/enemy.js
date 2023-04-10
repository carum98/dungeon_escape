import { Entity } from '../core/entitiy.js'

export class Enemy extends Entity {
    constructor({ x, y, width, height, sprite }) {
        super({ 			
            x,
            y,
            width,
            height,
            sprite,
        })

        this.isDead = false
    }

    dead() {
        this.isDead = true

        return super.dead()
    }
}