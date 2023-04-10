import { Enemy } from './entities/enemy.js'
import { Sprite, SpritesNames } from './core/sprite.js'

export class KingPig extends Enemy {
    constructor({ x, y }) {
        super({ 			
            x,
			y,
			width: 18,
			height: 26,
			sprite: new Sprite({
                src: './assets/img/pig_king.png',
                sprites: {
                    [SpritesNames.IDLE]: {
                        x: 0,
                        y: 0,
                        w: 32,
                        h: 32,
    
                        offsetX: 7,
                        offsetY: 6,
    
                        frames: 12,
    
                        speed: 5,
                    },
                    [SpritesNames.JUMP]: {
                        x: 0,
                        y: 64,
                        w: 32,
                        h: 32,
    
                        offsetX: 7,
                        offsetY: 6,
    
                        frames: 1,
    
                        speed: 0,
                    },
                    [SpritesNames.GROUND]: {
                        x: 32,
                        y: 64,
                        w: 32,
                        h: 32,
    
                        offsetX: 7,
                        offsetY: 6,
    
                        frames: 1,
    
                        speed: 350,
                    },
                    [SpritesNames.FALL]: {
                        x: 64,
                        y: 64,
                        w: 32,
                        h: 32,
    
                        offsetX: 7,
                        offsetY: 6,
    
                        frames: 1,
    
                        speed: 0,
                    },
                    [SpritesNames.RUN]: {
                        x: 0,
                        y: 32,
                        w: 32,
                        h: 32,
    
                        offsetX: 7,
                        offsetY: 6,
    
                        frames: 6,
    
                        speed: 5,
                    },
                    [SpritesNames.ATTACK]: {
                        x: 0,
                        y: 128,
                        w: 32,
                        h: 32,
    
                        offsetX: 10,
                        offsetY: 20,
    
                        frames: 5,

                        speed: 5,
                    },
                    [SpritesNames.DIE]: {
                        x: 0,
                        y: 96,
                        w: 32,
                        h: 32,
    
                        offsetX: 7,
                        offsetY: 6,
    
                        frames: 4,
    
                        speed: 15,
                    },
                    [SpritesNames.DEAD]: {
                        x: 96,
                        y: 96,
                        w: 32,
                        h: 32,
                
                        offsetX: 7,
                        offsetY: 6,
                
                        frames: 1,
                
                        speed: 0,
                    },
                    [SpritesNames.HURT]: {
                        x: 160,
                        y: 128,
                        w: 32,
                        h: 32,
    
                        offsetX: 7,
                        offsetY: 6,

                        frames: 2,
    
                        speed: 8,
                    },
                }
            })
        })
    }
}