export class GameElement {
    constructor({ x, y, width, height }) {
        this.x = x
        this.y = y

        this.width = width
        this.height = height
    }

    isColliding(element) {
        return (
            this.x <= element.x + element.width &&
			this.x + this.width >= element.x &&
			this.y <= element.y + element.height &&
			this.y + this.height >= element.y
        )
    }

    collidePosition(element) {
        const { x, y, width, height } = this

        const leftDistance = Math.abs(x - (element.x + element.width))
        const rightDistance = Math.abs((x + width) - element.x)
        const topDistance = Math.abs(y - (element.y + element.height))
        const bottomDistance = Math.abs((y + height) - element.y)

        const distances = {
            left: leftDistance,
            right: rightDistance,
            top: topDistance,
            bottom: bottomDistance
        }

        const minDistance = Math.min(...Object.values(distances))

        const position = Object.keys(distances).find(key => distances[key] === minDistance)

        return position
    }
}