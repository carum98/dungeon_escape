import { Enemy } from './entities/enemy.js'
import { Sprite } from './core/sprite.js'

import Sprites from '../assets/sprites/pig.json' assert { type: 'json' }

export class Pig extends Enemy {
    constructor({ x, y }) {
        super({ 			
            x,
			y,
			width: 18,
			height: 18,
			sprite: new Sprite({
                src: './assets/img/pig_enemy.png',
                sprites: Sprites
            })
        })
    }
}