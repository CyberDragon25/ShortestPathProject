document.addEventListener("DOMContentLoaded", function () {
    let rows, columns;
    let table;
    let sourceX, sourceY, destX, destY;

    const form = document.getElementById("arrayForm");
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        rows = parseInt(document.getElementById("rows").value, 10);
        columns = parseInt(document.getElementById("columns").value, 10);

        if (isNaN(rows) || isNaN(columns) || rows <= 0 || columns <= 0) {
            alert("Please enter valid positive integers for rows and columns.");
            return;
        }

        const tableContainer = document.getElementById("tableContainer");
        tableContainer.innerHTML = "";
        table = create2DArrayTable(rows, columns);
        tableContainer.appendChild(table);
    });

    const pathForm = document.getElementById("pathForm");
    pathForm.addEventListener("submit", function (event) {
        event.preventDefault();

        sourceX = parseInt(document.getElementById("startX").value, 10);
        sourceY = parseInt(document.getElementById("startY").value, 10);
        destX = parseInt(document.getElementById("endX").value, 10);
        destY = parseInt(document.getElementById("endY").value, 10);

        if (isNaN(sourceX) || isNaN(sourceY) || isNaN(destX) || isNaN(destY) ||
            sourceX < 0 || sourceX >= rows || sourceY < 0 || sourceY >= columns ||
            destX < 0 || destX >= rows || destY < 0 || destY >= columns) {
            alert("Please enter valid coordinates within the array bounds.");
            return;
        }

        const path = dijkstra(rows, columns, sourceX, sourceY, destX, destY);

        if (path) {
            highlightPath(table, path);
        }
    });

    function create2DArrayTable(rows, columns) {
        const table = document.createElement("table");

        for (let i = 0; i < rows; i++) {
            const row = document.createElement("tr");

            for (let j = 0; j < columns; j++) {
                const cell = document.createElement("td");
                cell.textContent = i + "," + j;
                cell.classList.add("array-tile"); // Add the "array-tile" class
                row.appendChild(cell);
            }

            table.appendChild(row);
        }

        return table;
    }

    function dijkstra(rows, columns, sourceX, sourceY, destX, destY) {
        // Create a priority queue to store vertices with their distances
        const queue = new PriorityQueue();

        // Create a 2D array to store distances from the source to each vertex
        const distances = new Array(rows);
        for (let i = 0; i < rows; i++) {
            distances[i] = new Array(columns);
            distances[i].fill(Infinity);
        }

        // Create a 2D array to store the previous vertex in the shortest path
        const previous = new Array(rows);
        for (let i = 0; i < rows; i++) {
            previous[i] = new Array(columns);
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
            const neighbors = getNeighbors(rows, columns, currentX, currentY);

            // Calculate distances to neighbors
            for (const [neighborX, neighborY] of neighbors) {
                const distance = distances[currentX][currentY] + 1;

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

    function getNeighbors(rows, columns, x, y) {
        const neighbors = [];

        const dx = [-1, 1, 0, 0];
        const dy = [0, 0, -1, 1];

        for (let i = 0; i < 4; i++) {
            const newX = x + dx[i];
            const newY = y + dy[i];

            if (isValidCoordinate(rows, columns, newX, newY)) {
                neighbors.push([newX, newY]);
            }
        }

        return neighbors;
    }

    function isValidCoordinate(rows, columns, x, y) {
        return x >= 0 && x < rows && y >= 0 && y < columns;
    }

    function highlightPath(table, path) {
        for (const [x, y] of path) {
            const cell = table.rows[x].cells[y];
            cell.classList.remove("array-tile");
            cell.classList.add("path-tile");
        }
    }
});

// Priority Queue implementation for Dijkstra's algorithm
class PriorityQueue {
    constructor() {
        this.queue = [];
    }

    enqueue(element, priority) {
        this.queue.push({ element, priority });
        this.sortQueue();
    }

    dequeue() {
        return this.queue.shift().element;
    }

    sortQueue() {
        this.queue.sort((a, b) => a.priority - b.priority);
    }

    isEmpty() {
        return this.queue.length === 0;
    }
}