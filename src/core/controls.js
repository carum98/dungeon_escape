const DIRECTIONS = {
	LEFT: 'left',
	RIGHT: 'right',
	UP: 'up',
	DOWN: 'down',
}

const KEY_CODES = {
	ArrowLeft: 'ArrowLeft',
	ArrowRight: 'ArrowRight',
	ArrowUp: 'ArrowUp',
	ArrowDown: 'ArrowDown',
	KeyA: 'KeyA',
	KeyD: 'KeyD',
	KeyW: 'KeyW',
	KeyS: 'KeyS',
	Space: 'Space',
}

const KEYS = {
	[KEY_CODES.ArrowLeft]: DIRECTIONS.LEFT,
	[KEY_CODES.ArrowRight]: DIRECTIONS.RIGHT,
	[KEY_CODES.ArrowUp]: DIRECTIONS.UP,
	[KEY_CODES.ArrowDown]: DIRECTIONS.DOWN,
	[KEY_CODES.KeyA]: DIRECTIONS.LEFT,
	[KEY_CODES.KeyD]: DIRECTIONS.RIGHT,
	[KEY_CODES.KeyW]: DIRECTIONS.UP,
	[KEY_CODES.KeyS]: DIRECTIONS.DOWN,
	[KEY_CODES.Space]: DIRECTIONS.UP,
}

export class Controls {
    direction = {
        [DIRECTIONS.UP]: false,
        [DIRECTIONS.DOWN]: false,
        [DIRECTIONS.LEFT]: false,
        [DIRECTIONS.RIGHT]: false,
    }

    start() {
        window.addEventListener('keydown', this.#onKeyDown.bind(this))
        window.addEventListener('keyup', this.#onKeyUp.bind(this))
    }

    stop() {
        window.removeEventListener('keydown', this.#onKeyDown.bind(this))
        window.removeEventListener('keyup', this.#onKeyUp.bind(this))
    }

    #onKeyDown(event) {
        Object.keys(KEY_CODES).includes(event.code) && event.preventDefault()

        if (event.code === KEY_CODES.Space) {
            this.direction[DIRECTIONS.UP] = !event.repeat
        } else {
            const directionKey = KEYS[event.code]
            this.direction[directionKey] = true        
        }
    }

    #onKeyUp(event) {
        const directionKey = KEYS[event.code]
        this.direction[directionKey] = false 
    }
}