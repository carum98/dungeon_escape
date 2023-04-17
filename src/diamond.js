import { Collectible } from './core/collectible.js'
import { Sprite } from './core/sprite.js'

import Sprites from '../assets/sprites/objects.json' assert { type: 'json' }
import { Sound } from './core/sound.js'

export class Diamond extends Collectible {
    constructor({ x, y }) {
        super({ 			
            x,
            y,
            width: 16,
            height: 16,
            sprite: new Sprite({
                src: './assets/img/objects.png',
                sprites: Sprites.diamond
            })
        })
    }

    collected() {
        Sound.play(Sound.name.diamond)

        return super.collected()
    }
}
