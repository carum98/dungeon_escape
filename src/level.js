import { CollisionBlock } from './entities/collision-block.js'

export class Level {
    constructor({ image, collisionsCoords }) {
        this.img = new Image()
        this.img.src = `./assets/img/${image}`

        this.collisions = []

        collisionsCoords.forEach(coords => {
            this.collisions.push(new CollisionBlock({
                x: coords.x * 32,
                y: coords.y * 32,
                width: 32,
                height: 32
            }))
        })

        Object.freeze(this)
    }
}

export class LevelLoader {
	static async get(level) {
		const data = await import(`../assets/levels/${level}.json`, { assert: { type: "json" } })

		return new Level(data.default)
	}
}