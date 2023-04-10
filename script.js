import { Game } from './src/game.js'
import { Engine } from './src/core/engine.js'
import { King } from './src/king.js'

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

const player = new King()

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

	const x = -(player.x - canvas.width / 2).toFixed(0)
	const y = -(player.y - canvas.height / 2).toFixed(0)

	canvas.style.transform = `translate(${x}px, ${y}px)`
})
