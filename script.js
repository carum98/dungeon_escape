import { Game } from './src/game.js'
import { Engine } from './src/core/engine.js'
import { King } from './src/king.js'
import { Hub } from './src/hub.js'

const player = new King()

const hub = new Hub({
	canvas: document.getElementById('hub')
})

const game = new Game({
	canvas: document.getElementById('canvas'),
	player,
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
