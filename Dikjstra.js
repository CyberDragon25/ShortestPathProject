const PriorityQueue = require('./PriorityQueue');

function dijkstra(array2D, sourceX, sourceY, destX, destY) {
    // Create a priority queue to store vertices with their distances
    const queue = new PriorityQueue();

    // Create a 2D array to store distances from the source to each vertex
    const distances = new Array(array2D.length);
    for (let i = 0; i < array2D.length; i++) {
        distances[i] = new Array(array2D[i].length);
        distances[i].fill(Infinity);
    }

    // Create a 2D array to store the previous vertex in the shortest path
    const previous = new Array(array2D.length);
    for (let i = 0; i < array2D.length; i++) {
        previous[i] = new Array(array2D[i].length);
        previous[i].fill(null);
    }

    // Initialize the source vertex with a distance of 0
    distances[sourceX][sourceY] = 0;
    queue.enqueue([sourceX, sourceY], 0);

    // Dijkstra's algorithm
    while (!queue.isEmpty()) {
        const [currentX, currentY] = queue.dequeue();

        // Stop if we reach the destination
        if (currentX === destX && currentY === destY) {
            break;
        }

        // Get neighbors of the current vertex
        const neighbors = getNeighbors(array2D, currentX, currentY);

        // Calculate distances to neighbors
        for (const [neighborX, neighborY] of neighbors) {
            const distance = distances[currentX][currentY] + array2D[neighborX][neighborY];

            if (distance < distances[neighborX][neighborY]) {
                distances[neighborX][neighborY] = distance;
                previous[neighborX][neighborY] = [currentX, currentY];
                queue.enqueue([neighborX, neighborY], distance);
            }
        }
    }

    // Generate the path
    const path = [];
    let current = [destX, destY];

    while (current !== null) {
        path.unshift(current);
        current = previous[current[0]][current[1]];
    }

    return path;
}

function getNeighbors(array2D, x, y) {
    const neighbors = [];

    const dx = [-1, 1, 0, 0];
    const dy = [0, 0, -1, 1];

    for (let i = 0; i < 4; i++) {
        const newX = x + dx[i];
        const newY = y + dy[i];

        if (isValidCoordinate(array2D, newX, newY)) {
            neighbors.push([newX, newY]);
        }
    }

    return neighbors;
}

function isValidCoordinate(array2D, x, y) {
    return x >= 0 && x < array2D.length && y >= 0 && y < array2D[0].length;
}

module.exports = dijkstra;