console.log("Hello World");

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