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

        this.velocity = 1

        this.isDead = false
    }

    dead() {
        this.isDead = true

        return super.dead()
    }

    attack() {
        if (this.isDead) return

        this.velocity = 0
        setTimeout(() => this.velocity = 1, 1000)

        return super.attack()
    }

    update() {
        if (this.isDead) return

        super.update()
    }

    follow(player) {
        if (this.isDead) return

        const { x, y } = player

        this.movements({
            direction: {
                left: false,
                right: false,
                up: false,
                down: false,
            }
        })

        // Check if the player is close to the enemy
        if (Math.abs(x - this.x) < 80 && Math.abs(y - this.y) < 80) {
            this.movements({
                direction: {
                    left: x < this.x && Math.abs(x - this.x) > 10,
                    right: x > this.x && Math.abs(x - this.x) > 10,
                    up: false,
                    down: false,
                }
            })
        }


    }
}