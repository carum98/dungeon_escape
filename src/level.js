import { Door } from './door.js'
import { GameElement } from './core/game-element.js'
import { KingPig } from './king-pig.js'
import { Pig } from './pig.js'
import { Cannon } from './cannon.js'
import { Heart } from './heart.js'
import { Diamond } from './diamond.js'

export class Level {
    constructor({ 
        image, 
        collisionsCoords, 
        doorsCoords, 
        tiles, 
        initialCoordsPlayer, 
        platformCoords, 
        initialCoordsPig, 
        initialCoordsEnemies,
        initialCoordsCannon,
    }) {
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
        })

        this.enemies = [
            new KingPig({
                x: initialCoordsPig.x * 32,
                y: initialCoordsPig.y * 32,
            })
        ]

        initialCoordsEnemies.forEach(coords => {
            this.enemies.push(new Pig({
                x: coords.x * 32,
                y: coords.y * 32,
            }))
        })

        this.objects = []

        initialCoordsCannon.forEach(coords => {
            this.objects.push(new Cannon({
                x: coords.x * 32,
                y: coords.y * 32,
            }))
        })

        this.collectible = []

        this.collectible.push(new Heart({
            x: 32 * 8,
            y: 32 * 6,
        }))

        this.collectible.push(new Diamond({
            x: 32 * 7,
            y: 32 * 4,
        }))

        this.tilesWidth = tiles.width
        this.tilesHeight = tiles.height

        this.initialCoordsPlayer = initialCoordsPlayer

        setInterval(() => {
            // Fire cannon
            this.objects[0].fire(this.collisions)
        }, 5000)

        Object.freeze(this)
    }
}

export class LevelLoader {
	static async get(level) {
		const data = await import(`../assets/levels/${level}.json`, { assert: { type: "json" } })

		return new Level(data.default)
	}
}