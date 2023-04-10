import { Entity } from './core/entitiy.js'
import { Sprite, SpritesNames } from './core/sprite.js'

export class King extends Entity {
    constructor() {
        super({ 			
            x: 0,
			y: 0,
			width: 25,
			height: 26,
			sprite: new Sprite({
                src: './assets/img/player_king.png',
                sprites: {
                    [SpritesNames.IDLE]: {
                        x: 0,
                        y: 0,
                        w: 48,
                        h: 32,
    
                        offsetX: 10,
                        offsetY: 7,
    
                        frames: 10,
    
                        speed: 5,
                    },
                    [SpritesNames.JUMP]: {
                        x: 0,
                        y: 64,
                        w: 48,
                        h: 32,
    
                        offsetX: 10,
                        offsetY: 7,
    
                        frames: 1,
    
                        speed: 0,
                    },
                    [SpritesNames.GROUND]: {
                        x: 48,
                        y: 64,
                        w: 48,
                        h: 32,
    
                        offsetX: 10,
                        offsetY: 7,
    
                        frames: 1,
    
                        speed: 350,
                    },
                    [SpritesNames.FALL]: {
                        x: 96,
                        y: 64,
                        w: 48,
                        h: 32,
    
                        offsetX: 10,
                        offsetY: 7,
    
                        frames: 1,
    
                        speed: 0,
                    },
                    [SpritesNames.RUN]: {
                        x: 0,
                        y: 32,
                        w: 48,
                        h: 32,
    
                        offsetX: 10,
                        offsetY: 7,
    
                        frames: 8,
    
                        speed: 5,
                    },
                    [SpritesNames.ATTACK]: {
                        x: 0,
                        y: 224,
                        w: 80,
                        h: 65,
    
                        offsetX: 10,
                        offsetY: 20,
    
                        frames: 3,

                        speed: 8,
                    },
                    [SpritesNames.DIE]: {
                        x: 0,
                        y: 96,
                        w: 48,
                        h: 32,
    
                        offsetX: 10,
                        offsetY: 7,
    
                        frames: 4,
    
                        speed: 15,
                    },
                    [SpritesNames.DEAD]: {
                        x: 144,
                        y: 96,
                        w: 48,
                        h: 32,
                
                        offsetX: 10,
                        offsetY: 7,
                
                        frames: 1,
                
                        speed: 0,
                    },
                    [SpritesNames.HURT]: {
                        x: 240,
                        y: 240,
                        w: 48,
                        h: 32,
    
                        offsetX: 10,
                        offsetY: 7,
    
                        frames: 2,
    
                        speed: 8,
                    },
                    door_in: {
                        x: 0,
                        y: 176,
                        w: 48,
                        h: 48,
                
                        offsetX: 10,
                        offsetY: 25,
                
                        frames: 8,
                
                        speed: 8,
                    }
                }
            })
        })
    }

    async doorInAnimation() {
        return this.sprite.startAnimation('door_in')
    }
}