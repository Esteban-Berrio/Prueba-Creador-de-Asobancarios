const fs = require('fs');
const pdfParse = require('pdf-parse');


 
// Datos extraídos (máximo 50 caracteres)
function procesarFila3(fila3,ultimosNumeros) {
    // Usar la cadena recibida
    const conteoFila = fila3.length; // Longitud total de fila3

    let cantidadNumeros = ultimosNumeros.length;
    
    // Partición de la cadena original
    const parteAntes = fila3.substring(0, 2); // Parte antes del índice 2
    const parteDespues = fila3.substring(3);   // Parte después del índice 6
    
    // Nueva parte que se va a cambiar
    let nuevaParteCambiar = ultimosNumeros ; // Limitar a 50 caracteres máximo

        console.log ('parte de 0= ',nuevaParteCambiar) ;

    // Si la longitud de nuevaParteCambiar es menor que cantidadNumeros, rellenar con ceros hasta llegar a cantidadNumeros
    if (nuevaParteCambiar.length < cantidadNumeros) {
        nuevaParteCambiar = nuevaParteCambiar.padStart(cantidadNumeros, '0'); 
    } else if (nuevaParteCambiar.length > cantidadNumeros) {
        nuevaParteCambiar = nuevaParteCambiar.substring(0, cantidadNumeros); // Truncar si tiene más de cantidadNumeros
    }
    
    // Unir la parte antes del índice 2, la parte modificada y los ceros necesarios a la derecha del índice 2
    let nuevaFila2 = parteAntes + nuevaParteCambiar;

    let  parteCerosRegla= "000"+parteDespues

    // Calcular cuántos ceros necesitamos para alcanzar los 94 caracteres en total
    const longitudRestante = 94 - nuevaFila2.length - parteCerosRegla.length;

    // Añadir los ceros después del índice 2 (justo después de la parte modificada)
    let nuevaFila3;
    if (longitudRestante > 0) {
        nuevaFila3 = parteAntes + '0'.repeat(longitudRestante) + nuevaParteCambiar  +parteCerosRegla;
    } else {
        nuevaFila3 = nuevaFila2 + parteCerosRegla; // Si no se necesita rellenar
    }

    
    console.log('este es el nuevo valor de fila '+nuevaFila3);
    
    return nuevaFila3; 
}
module.exports = { procesarFila3};