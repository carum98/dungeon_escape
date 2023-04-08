import { Controls } from './core/controls.js'
import { LevelLoader } from './level.js'

export class Game {
    constructor({ canvas, player, onLoaded }) {
        this.canvas = canvas
        this.player = player

        this.ctx = canvas.getContext('2d')

        this.controls = new Controls()

        this.level = null

        LevelLoader.get('1').then(data => {
            this.level = data
            onLoaded()
        })

        this.drawCollisions = false
    }

    start() {
        this.controls.start()
    }

    update() {
        const { player, controls, level } = this

        if (player.isColliding(level.door)) {
            if (controls.direction.up) {
                console.log('Next level')
            }

            controls.direction.up = false
        }

        player.movements(controls)
        player.update()
        player.collision(level.collisions)
    }

    draw() {
        const { player, ctx, level } = this

        ctx.drawImage(level.img, 0, 0)

        level.door.draw(ctx)

        player.draw(ctx)

        if (this.drawCollisions) {
            level.collisions.forEach(block => {
                block.draw(ctx)
            })
        }
    }
}