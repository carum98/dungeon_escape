export class Loop {
    #loopId = null

    #fps = 60
    #interval = 1000 / this.#fps
    #tick = 0
    #callback = null

    constructor(callback) {
        this.#callback = callback
    }

    start() {
        requestAnimationFrame(this.#loop.bind(this))
    }

    stop() {
		if (this.#loopId !== null) {
			cancelAnimationFrame(this.#loopId)
			this.#loopId = null
		}
	}

    #loop(timestamp) {
        requestAnimationFrame(this.#loop.bind(this))

        const delta = timestamp - this.#tick

        if (delta >= this.#interval) {
            this.#tick = timestamp - (delta % this.#interval)

            if (this.#callback !== null) {
                this.#callback()
            }
        }
    }
}