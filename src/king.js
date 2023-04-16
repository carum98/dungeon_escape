import { Player } from './entities/player.js'
import { Sprite } from './core/sprite.js'

import Sprites from '../assets/sprites/king.json' assert { type: 'json' }

export class King extends Player {
    constructor() {
        super({
            x: 0,
			y: 0,
			width: 25,
			height: 26,
			sprite: new Sprite({
                src: './assets/img/player_king.png',
                sprites: Sprites
            })
        })
    }

    async doorInAnimation() {
        return this.sprite.startAnimation('door_in')
    }

    hitEnemy(enemy) {
        const sizeHammer = 35

        const hitbox = {
            x: this.direction === 'right' ? (this.x + this.width + sizeHammer) : (this.x - sizeHammer),
            y: this.y,
            width: 20,
            height: this.height,
        }

        if (enemy.isColliding(hitbox)) {
            enemy.hurt().then(() => enemy.dead())
        }
    }
}