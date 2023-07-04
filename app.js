console.log("Hello World");

const dijkstra = require('./Dikjstra');

// Import the chalk module this is for coloring the array
// const chalk = require('chalk');

const array2D = new Array(25);

// Loop to create each row
for (let i = 0; i < 25; i++) {
    // Create an array for each row
    array2D[i] = new Array(25);
}

// assinging values to the array
// setting the value to 0
for (let i = 0; i < 25; i++) {
    for (let j = 0; j < 25; j++) {
        array2D[i][j] = 0;
    }

}

// Print the 2D array as a box
for (let i = 0; i < 25; i++) {
    let row = '';

    for (let j = 0; j < 25; j++) {
        row += array2D[i][j] + ' ';
    }

    console.log(row);
}


const sourceX = 0;
const sourceY = 0;
const destX = 4;
const destY = 4;

const path = dijkstra(array2D, sourceX, sourceY, destX, destY);

// Print the path as coordinates
for (const [x, y] of path) {
    console.log(`(${x}, ${y})`);
}