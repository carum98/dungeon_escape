import { Entity } from '../core/entitiy.js'

export class Player extends Entity {
    constructor({ x, y, width, height, sprite }) {
        super({ 			
            x,
            y,
            width,
            height,
            sprite,
        })
    }

    hurt(enemy) {
        const recoil = 32

        if (this.x < enemy.x) this.x -= recoil
        if (this.x > enemy.x) this.x += recoil
        if (this.y < enemy.y) this.y -= recoil
    
        return super.hurt()
    }
}