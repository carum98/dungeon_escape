export function renderCollision(data, idBlock, tilesRow, tilesColumn) {
    return getCoordinatesFromTiled(renderCollisionFromTiled(data, idBlock, tilesRow, tilesColumn), 1)
}

export function renderCollisionFromTiled(data, idBlock, tilesRow, tilesColumn) {
    const values = []

    // Convert the array into a 2D array
    for (let i = 0; i < data.length; i += tilesColumn) {
	    values.push(data.slice(i, i + tilesRow))
    }

    // Remplace the 0 by null and the [idBlock] by 1
    values.forEach((row, y) => {
	    row.forEach((tile, x) => {
		    if (tile === 0) {
			    values[y][x] = null
		    } else if (tile === idBlock) {
			    values[y][x] = 1
		    }
	    })
    })

    return values
}

export function getCoordinatesFromTiled(data, idBlock) {
    const coordinates = []

    data.forEach((row, y) => {
        row.forEach((tile, x) => {
            if (tile === idBlock) {
                coordinates.push({ x, y })
            }
        })
    })

    return coordinates
}