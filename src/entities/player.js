import { Entity } from '../core/entitiy.js'

export class Player extends Entity {
    constructor({ x, y, width, height, sprite }) {
        super({ 			
            x,
            y,
            width,
            height,
            sprite,
        })
    }
}