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
        this.pointInCenter = false
    }

    start() {
        this.controls.start()

        document.addEventListener('keydown', e => {
            if (['KeyE', 'Enter'].includes(e.code)) {
                this.player.attack()

                for (const enemy of this.level.enemies) {
                    this.player.hitEnemy(enemy)
                }

				e.preventDefault()
			}
        })

        if (this.pointInCenter) {
            const div = document.createElement('div')
            div.style = `
                width: 10px;
                height: 10px;
                background: red;
                position: absolute;
            `
            document.body.appendChild(div)
        }
    }

    update() {
        const { player, controls, level } = this

        if (player.isColliding(level.door)) {
            if (controls.direction.up) {
                console.log('Next level')
                this.level.door.open()
                this.player.doorInAnimation().then(() => {
                    LevelLoader.get('2').then(this.#loadData.bind(this))
                })
            }

            controls.direction.up = false
        }

        player.movements(controls)
        player.update()
        player.collision(level.collisions)

        level.door.update()

        level.enemies.forEach(enemy => {
            enemy.update()
            enemy.collision(level.collisions)

            if (!enemy.isDead && player.isColliding(enemy)) {
                player.hurt(enemy)
            }
        })

        level.objects.forEach(object => {
            object.update()
        })

        level.collectible.forEach(collectible => {
            collectible.update()
            collectible.collision(level.collisions)

            if (!collectible.isCollected && player.isColliding(collectible)) {
                collectible.collected().then(() => {
                    const index = level.collectible.indexOf(collectible)
                    level.collectible.splice(index, 1)
                })
            }
        })
    }

    draw() {
        const { player, ctx, level } = this

        ctx.drawImage(level.img, 0, 0)

        level.door.draw(ctx)

        level.enemies.forEach(enemy => {
            enemy.draw(ctx)
        })

        level.objects.forEach(object => {
            object.draw(ctx)
        })

        player.draw(ctx)

        level.collectible.forEach(collectible => {
            collectible.draw(ctx)
        })

        if (this.drawCollisions) {
            level.collisions.forEach(block => block.draw(ctx))
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