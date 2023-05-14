import { Camera } from './camera.js'
import { Controls } from './core/controls.js'
import { Diamond } from './diamond.js'
import { Heart } from './heart.js'
import { LevelLoader } from './level.js'

export class Game {
    constructor({ canvas, player, onLoaded, state }) {
        this.canvas = canvas
        this.player = player
        this.state = state

        this.ctx = canvas.getContext('2d')

        this.controls = new Controls()

        this.level = null

        LevelLoader.get(this.state.level).then(data => {
            this.#loadData(data)

            onLoaded()
        })

        this.camera = new Camera({
            canvas,
            player
        })
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
    }

    update() {
        const { player, controls, level, state } = this

        if (player.isColliding(level.door)) {
            if (controls.direction.up) {
                console.log('Next level')
                this.state.nextLevel()
                this.level.door.open()

                if (this.state.isMaxLevel) {
                    alert('You win!')
                    this.state.reset()
                    return
                }

                this.player.doorInAnimation().then(() => {
                    LevelLoader.get(this.state.level).then(this.#loadData.bind(this))
                })
            }

            controls.direction.up = false
        }

        player.movements(controls)
        player.update()
        player.collision(level.collisions)

        level.door.update()

        level.enemies.forEach(async enemy => {
            enemy.update()
            enemy.collision(level.collisions)
            enemy.follow(player)

            if (!enemy.isDead && player.isColliding(enemy)) {
                enemy.attack()

                state.removeLife()
                await player.hurt(enemy)
                
                if (state.isGameOver) {
                    player.dead()
                }
            }
        })

        level.objects.forEach(object => {
            object.update()
        })

        level.collectible.forEach(collectible => {
            collectible.update()
            collectible.collision(level.collisions)

            if (!collectible.isCollected && player.isColliding(collectible)) {
                if (collectible instanceof Heart) {
                    state.addLife()
                } else if (collectible instanceof Diamond) {
                    state.addDiamond()
                }
                

                collectible.collected().then(() => {
                    const index = level.collectible.indexOf(collectible)
                    level.collectible.splice(index, 1)
                })
            }
        })

        this.camera.sync()
    }

    draw() {
        const { player, canvas, ctx, level } = this

        ctx.clearRect(0, 0, canvas.width, canvas.height)

        level.drawBack(ctx)
        player.draw(ctx)
        level.drawFront(ctx)
    }

    #loadData(data) {
        this.level = data
        
        this.canvas.width = this.level.tilesWidth * 32
        this.canvas.height = this.level.tilesHeight * 32

        this.player.x = this.level.initialCoordsPlayer.x * 32
        this.player.y = this.level.initialCoordsPlayer.y * 32 
    }
}