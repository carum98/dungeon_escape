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
            this.#loadData(data)

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

                LevelLoader.get('2').then(this.#loadData.bind(this))
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

    #loadData(data) {
        this.level = data
        
        this.canvas.width = this.level.tilesWidth * 32
        this.canvas.height = this.level.tilesHeight * 32

        this.player.x = this.level.initialCoordsPlayer.x * 32
        this.player.y = this.level.initialCoordsPlayer.y * 32 
    }
}