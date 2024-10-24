const fs = require('fs');
const pdfParse = require('pdf-parse');

// Función para extraer datos del PDF
const extractPdfData = async (filePath) => {
    const pdfBuffer = fs.readFileSync(filePath);



    function generarNumerosAleatorios(cantidad = 4, min = 0, max = 9) {
        let numerosComoTexto = '';
    
        for (let i = 0; i < cantidad; i++) {
            // Genera un número aleatorio entre min y max
            const numeroAleatorio = Math.floor(Math.random() * (max - min + 1)) + min;
            // Concatenar el número a la cadena
            numerosComoTexto += numeroAleatorio;
        }
    
        return numerosComoTexto;
    }
    
    // Ejemplo de uso
    const numerosGenerados = generarNumerosAleatorios();
    console.log("numerosGenerados: ", numerosGenerados);

    // Obtener la fecha actual en el formato deseado
    const formattedDate = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    console.log(formattedDate); // Imprime la fecha en formato yyyyMMdd, por ejemplo, "20240705"

    try {
        const data = await pdfParse(pdfBuffer);

        // Aquí 'data.text' contiene todo el texto del PDF
        console.log('Texto extraído del PDF:', data.text);

        // Expresión regular para capturar los números entre (3900) y (96)
        const regexFactura = /\(3900\)(\d+)\(96\)/;

        // Expresión regular para capturar los datos entre (8020) y (3900)
        const regexIntermedio = /\(8020\)(.*?)\(3900\)/s; // 's' permite que '.' capture saltos de línea

        // Ejecutar las expresiones regulares
        const matchFactura = data.text.match(regexFactura);
        const matchIntermedio = data.text.match(regexIntermedio);

        if (matchFactura) {
            const factura = matchFactura[1]; // Valor capturado entre (3900) y (96)
            console.log('Valor entre (3900) y (96):', factura);
        } else {
            console.log('No se encontró el patrón entre (3900) y (96).');
        }

        console.log("REGEX INTERMEDIO 8020-3900: ", matchIntermedio[1])
        let ultimosNumeros = '';
        if (matchIntermedio) {
            const intermedio = matchIntermedio[1].trim();
            
            // Expresión regular modificada para capturar los últimos dígitos relevantes
            const regexUltimosNumeros = /0{2,}([1-9][0-9]*)$/; // Captura los números antes de (3900)
            const matchUltimosNumeros = intermedio.match(regexUltimosNumeros);

            if (matchUltimosNumeros) {
                // Extraer el último número ignorando los ceros a la izquierda
                ultimosNumeros = matchUltimosNumeros[1]
                console.log('Últimos dígitos antes de (3900) sin ceros a la izquierda:', ultimosNumeros);
            }
        }

        
        // Llamamos a la función para generar el archivo TXT con los datos extraídos
        generateTxtFile(matchFactura ? matchFactura[1] : '', formattedDate, numerosGenerados, ultimosNumeros);

    } catch (error) {
        console.error('Error al procesar el PDF:', error);
    }
};

// Función para generar el archivo de texto formateado
const generateTxtFile = (factura, formattedDate, numerosGenerados, ultimosNumeros)  => {
    // Función para formatear una línea con longitud fija
    const formatLine = (content, length) => {
        return content.padEnd(length, ' '); // Mantener el formato original sin ceros
    };

    // Definir las líneas con sus valores y sus longitudes respectivas
    const lines = [
        formatLine(`018903990295${formattedDate}05100000379400000574${formattedDate}2137Z01`, 162),
        formatLine(`0577099984169490001`, 162),
        formatLine(`0600000000000000000000000000000000000000000000007782${factura}000101${numerosGenerados}1131810405133320000002`, 162),
        formatLine(`0600000000000000000000000000000000000000000000651800000000000000010183945282545705133320000003`, 162),
        formatLine('080000000040000000000158800000001', 162),
        formatLine('09000000004000000000012544000', 162),
    ];


    console.log(datosExtraidos.length);

    















    // Cadena original
const Fila3 = '0600000000000000000000000000000000000000000000778200000099683100010183941131810405133320000002';
const conteoFila = Fila3.length; // Longitud total de Fila3

// Partición de la cadena original
const parteAntes = Fila3.substring(0, 45); // Parte antes del índice 45
const parteDespues = Fila3.substring(50);   // Parte después del índice 50

// Nueva parte que se va a cambiar
let nuevaParteCambiar = datosExtraidos; // Valor a insertar entre los índices 45 y 50

// Calcular la longitud de la nueva parte necesaria
const longitudTotal = 94; // Longitud total deseada de la cadena
const longitudNuevaParte = longitudTotal - (parteAntes.length + parteDespues.length); // Longitud que debe tener la nueva parte

// Rellenar con ceros o truncar nuevaParteCambiar según la longitud calculada
if (nuevaParteCambiar.length < longitudNuevaParte) {
    nuevaParteCambiar = nuevaParteCambiar.padStart(longitudNuevaParte, '0'); // Rellenar con ceros a la izquierda
} else if (nuevaParteCambiar.length > longitudNuevaParte) {
    nuevaParteCambiar = nuevaParteCambiar.substring(0, longitudNuevaParte); // Truncar si es necesario
}

// Unir todas las partes para formar la nueva cadena
const nuevaFila3 = parteAntes + nuevaParteCambiar + parteDespues;

// Imprimir el resultado final
//console.log(nuevaFila3);



      console.log(conteoFila) ;
    console.log(nuevaFila3);
   const fileContent = lines.join('\n');
    fs.writeFileSync('resultaos.txt', fileContent);
    console.log('Archivo TXT generado con el formato especificado.');
};


// Ejecutar la extracción de datos del PDF y luego generar el archivo TXT
extractPdfData('./data/prueba3.pdf');
