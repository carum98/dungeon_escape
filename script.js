import { Game } from './src/game.js'
import { Engine } from './src/core/engine.js'
import { King } from './src/king.js'
import { Hub } from './src/hub.js'
import { State } from './src/state.js'

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
