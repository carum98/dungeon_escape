import { GameElement } from './core/game-element.js'

export class Door extends GameElement {
    constructor({ x, y, width, height }) {
        super({ x, y, width, height });
    
        this.img = new Image();
        this.img.src = './assets/img/door.png';
    }
    
    draw(ctx) {
        ctx.drawImage(
            this.img,
            this.x,
            this.y + 8,
            this.img.width,
            this.img.height,
        );
    }
}