import { Object } from './core/object.js'
import { Sprite } from './core/sprite.js'

import Sprites from '../assets/sprites/objects.json' assert { type: 'json' }

export class Door extends Object {
    constructor({ x, y }) {
        super({ 
            x, 
            y, 
            width: 48, 
            height: 64,
            sprite: new Sprite({
                src: './assets/img/objects.png',
                sprites: Sprites.door
            })
        })
    }

    open() {
        this.startAnimation('open')
    }
}