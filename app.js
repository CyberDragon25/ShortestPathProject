document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("arrayForm");
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const rows = parseInt(document.getElementById("rows").value, 10);
        const columns = parseInt(document.getElementById("columns").value, 10);

        if (isNaN(rows) || isNaN(columns) || rows <= 0 || columns <= 0) {
            alert("Please enter valid positive integers for rows and columns.");
            return;
        }

        const tableContainer = document.getElementById("tableContainer");
        tableContainer.innerHTML = "";
        tableContainer.appendChild(create2DArrayTable(rows, columns));
    });

    function create2DArrayTable(rows, columns) {
        const table = document.createElement("table");

        for (let i = 0; i < rows; i++) {
            const row = document.createElement("tr");

            for (let j = 0; j < columns; j++) {
                const cell = document.createElement("td");
                cell.textContent = i + "," + j;
                row.appendChild(cell);
            }

            table.appendChild(row);
        }

        return table;
    }
});