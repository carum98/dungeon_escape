import { Collectible } from './core/collectible.js'
import { Sprite } from './core/sprite.js'

import Sprites from '../assets/sprites/objects.json' assert { type: 'json' }

export class Heart extends Collectible {
    constructor({ x, y }) {
        super({ 			
            x,
            y,
            width: 16,
            height: 16,
            sprite: new Sprite({
                src: './assets/img/objects.png',
                sprites: Sprites.heart
            })
        })
    }
}
