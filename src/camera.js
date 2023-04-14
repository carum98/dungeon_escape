export class Camera {
    constructor({ canvas, player }) {
        this.canvas = canvas
        this.player = player

        Object.freeze(this)
    }

    sync() {
        const { canvas, player } = this

        const x = -(player.x - canvas.width / 2).toFixed(0)
        const y = -(player.y - canvas.height / 2).toFixed(0)
    
        canvas.style.transform = `translate(${x}px, ${y}px)`
    }
}