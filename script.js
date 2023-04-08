import { Game } from './src/game.js'
import { Loop } from './src/loop.js'
import { Player } from './src/player.js'

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

const size = 32

canvas.width = size * 16
canvas.height = size * 9

canvas.style = 'scale: 2; transform: translateX(50%) translateY(50%); image-rendering: pixelated;'
document.body.style = 'background: #3f3952;'

const player = new Player()

const game = new Game({
	canvas,
	player,
	onLoaded: () => {
		game.start()
		loop.start()
	}
})

const loop = new Loop(() => {
	ctx.clearRect(0, 0, canvas.width, canvas.height)

	ctx.fillStyle = 'black'
	ctx.fillRect(0, 0, canvas.width, canvas.height)

	game.update()
	game.draw()
})
