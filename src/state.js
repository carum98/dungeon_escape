export class State {
    constructor() {
        this.lives = 3
        this.diamonds = 0
    }

    addDiamond() {
        this.diamonds++
    }

    removeLife() {
        this.lives--
    }

    addLife() {
        if (this.isMaxLives) return

        this.lives++
    }

    get isGameOver() {
        return this.lives <= 0
    }

    get isMaxLives() {
        return this.lives === 3
    }
}