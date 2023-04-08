import { GameElement } from '../core/game-element.js'

export class Entity extends GameElement {
    constructor({ x, y, width, height }) {
        super({ x, y, width, height })

        this.img = new Image()
		this.img.src = './assets/img/player.png'
    }

    draw(ctx) {
        // Position on the sprite
        const positionSprite = {
            x: 0,
            y: 0,
        }

        // Position on the canvas
        const positionCanvas = {
            x: this.x - 18,
            y: this.y - 18,
        }

		ctx.drawImage(
			this.img,
			positionSprite.x,
			positionSprite.y,
			48,
			this.img.height,
			positionCanvas.x,
			positionCanvas.y,
			48,
			this.img.height,
		)
	}
}