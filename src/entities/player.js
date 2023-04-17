import { Entity } from '../core/entitiy.js'
import { Sound } from '../core/sound.js'

export class Player extends Entity {
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

    hurt(enemy) {
        Sound.play(Sound.name.player_hurt)

        const recoil = 32

        if (this.x < enemy.x) this.x -= recoil
        if (this.x > enemy.x) this.x += recoil
        if (this.y < enemy.y) this.y -= recoil
    
        return super.hurt()
    }

    dead() {
        this.isDead = true

        return super.dead()
    }

    movements(controls) {
        if (this.isDead) return

        super.movements(controls)
    }
}