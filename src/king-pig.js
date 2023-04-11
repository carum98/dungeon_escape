import { Enemy } from './entities/enemy.js'
import { Sprite } from './core/sprite.js'

import Sprites from '../assets/sprites/king-pig.json' assert { type: 'json' }

export class KingPig extends Enemy {
    constructor({ x, y }) {
        super({ 			
            x,
			y,
			width: 18,
			height: 26,
			sprite: new Sprite({
                src: './assets/img/pig_king.png',
                sprites: Sprites
            })
        })
    }
}