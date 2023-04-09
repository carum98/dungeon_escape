import { Door } from './door.js'
import { GameElement } from './core/game-element.js'

export class Level {
    constructor({ image, collisionsCoords, doorsCoords, tiles, initialCoordsPlayer, platformCoords }) {
        this.img = new Image()
        this.img.src = `./assets/img/${image}`

        this.collisions = []

        collisionsCoords.forEach(coords => {
            this.collisions.push(new GameElement({
                x: coords.x * 32,
                y: coords.y * 32,
                width: 32,
                height: 32
            }))
        })

        platformCoords.forEach(coords => {
            this.collisions.push(new GameElement({
                x: coords.x * 32,
                y: coords.y * 32,
                width: 32,
                height: 16
            }))
        })

        this.door = new Door({
            x: doorsCoords.x * 32,
            y: doorsCoords.y * 32,
            width: 46,
            height: 64
        })

        this.tilesWidth = tiles.width
        this.tilesHeight = tiles.height

        this.initialCoordsPlayer = initialCoordsPlayer

        Object.freeze(this)
    }
}

export class LevelLoader {
	static async get(level) {
		const data = await import(`../assets/levels/${level}.json`, { assert: { type: "json" } })

		return new Level(data.default)
	}
}