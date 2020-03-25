
window.onload = function() {
    let colores = ["verde","amarilla","azul","roja"];
    let html = "";

    // Cartas de 1 a 9
    for(i = 1;i<10;i++)
    {
        html += `<div class='contenedor-cartas'>`;

        // Por cada color de las Cartas
        for(j = 0;j<4;j++) {
            html += `
                <div class='carta ${colores[j]}' data-value='${i}'>
                    <div class='ellipse' data-value='${i}'>
                    </div>
                </div>`
            html += `</div>`;
        }
    }

    // Termine de generar el html, voy a tratar de pegarlo en el nodo #cartas
    try {
        document.getElementById("cartas").innerHTML = html;
    }
    catch (e) {
        console.log("no encuentro nodo con #cartas para insertar el html generado.")
    }
}
