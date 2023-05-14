export class State {
    constructor() {
        this.lives = 3
        this.diamonds = 0

        this.level = 1
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

    nextLevel() {
        this.level++
    }

    get isGameOver() {
        return this.lives <= 0
    }

    get isMaxLives() {
        return this.lives === 3
    }

    get isMaxLevel() {
        return this.level === 4
    }

    reset() {
        this.lives = 3
        this.diamonds = 0

        this.level = 0
    }
}