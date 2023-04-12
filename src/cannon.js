import { Object } from './core/object.js'
import { Sprite } from './core/sprite.js'

import Sprites from '../assets/sprites/objects.json' assert { type: 'json' }

export class Cannon extends Object {
    constructor({ x, y }) {
        super({ 			
            x,
            y,
            width: 32,
            height: 32,
            sprite: new Sprite({
                src: './assets/img/objects.png',
                sprites: Sprites.cannon
            })
        })
    }

    fire() {
        this.startAnimation('fire').then(() => this.sprite.stopAnimation())
    }
}