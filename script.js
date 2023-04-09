import { Game } from './src/game.js'
import { Engine } from './src/core/engine.js'
import { Player } from './src/player.js'

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

const player = new Player()

const game = new Game({
	canvas,
	player,
	onLoaded: () => {
		game.start()
		loop.start()
	}
})

const loop = new Engine(() => {
	ctx.clearRect(0, 0, canvas.width, canvas.height)

	ctx.fillStyle = 'black'
	ctx.fillRect(0, 0, canvas.width, canvas.height)

	game.update()
	game.draw()
})
