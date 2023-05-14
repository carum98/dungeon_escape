import { Game } from './src/game.js'
import { Engine } from './src/core/engine.js'
import { King } from './src/king.js'
import { Hub } from './src/hub.js'
import { State } from './src/state.js'
import { renderCollision } from './src/util.js'

const canvasHub = document.getElementById('hub')
const canvasGame = document.getElementById('canvas')

const state = new State()

const player = new King()

const hub = new Hub({
	canvas: canvasHub,
	state
})

const game = new Game({
	canvas: canvasGame,
	player,
	state,
	onLoaded: () => {
		game.start()
		loop.start()
	}
})

const loop = new Engine(() => {
	game.update()
	game.draw()
	
	hub.update()
	hub.draw()
})

const values = renderCollision([0, 0, 0, 7, 7, 7, 0, 0, 0, 0,
	0, 0, 7, 0, 0, 0, 7, 7, 7, 0,
	0, 0, 7, 0, 0, 0, 0, 0, 0, 7,
	0, 0, 7, 0, 0, 0, 0, 0, 0, 7,
	0, 0, 7, 7, 9, 0, 0, 7, 7, 0,
	0, 7, 0, 0, 0, 0, 0, 0, 0, 7,
	0, 7, 0, 0, 0, 9, 9, 0, 0, 7,
	0, 7, 0, 0, 0, 0, 0, 0, 0, 7,
	0, 0, 7, 0, 9, 7, 7, 7, 7, 0,
	0, 0, 7, 0, 0, 7, 7, 7, 0, 0,
	0, 7, 0, 9, 0, 0, 0, 0, 7, 0,
	0, 7, 0, 0, 9, 9, 0, 0, 7, 0,
	0, 0, 7, 0, 0, 0, 0, 9, 7, 0,
	0, 7, 0, 0, 0, 0, 0, 7, 0, 0,
	0, 0, 7, 7, 7, 7, 7, 0, 0, 0], 9, 15, 10)

console.log(values)
