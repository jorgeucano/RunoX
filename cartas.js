
window.onload = function() {
    let cartas = ["0","1","2","3","4","5","6","7","8","9","&empty;","+2","&duarr;","+4"];
    let colores = ["verde","amarilla","azul","roja"];
    let html = "";

    // Loop para generar las Cartas 
    for(carta = 0;carta<cartas.length;carta++)
    {
        // Genero un contenedor para que muestre de a 4 cartas
        html += `<div class='contenedor-cartas'>`;

        // Loop por cada Color
        for(color = 0;color<colores.length;color++) {

            // GeneraHtmlCarta construye y devuelve el html de una carta en particular, 
            // Recibe 2 parametros : carta y color, por ejemplo "1" y "amarilla"
            html += GeneraHtmlCarta( cartas[carta], colores[color] )
            this.console.log("html generado de carta: ",cartas[carta], colores[color])
            
        }
        html += `</div>`;
    }

    // Una vez generado el html, se debe insertar en el nodo #cartas para mostrarlo en la pagina
    try {
        document.getElementById("cartas").innerHTML = html;
    }
    catch (e) {
        console.log("No encuentro nodo #cartas para insertar el html generado.")
    }
}

function GeneraHtmlCarta( carta, color) {
    italic =  ["&empty;","+2","&duarr;","+4"].indexOf(carta) > -1 ? "" : "italic";
    maschica =  ["+2","+4","&duarr;"].indexOf(carta) > -1 ? "maschica" : "";
    normal =  (maschica === "") ? "normal" : "";

    let html = `
        <div class='carta ${color} ${italic} ${maschica}' data-value='${carta}'>
            <div class='ellipse ${normal} ${maschica}' data-value='${carta}'>
            </div>
        </div>`;
    
    return html;
}
