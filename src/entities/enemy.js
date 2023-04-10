import { Entity } from '../core/entitiy.js'

export class Enemy extends Entity {
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