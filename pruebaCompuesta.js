const fs = require('fs');
const pdfParse = require('pdf-parse');

// Función para extraer datos del PDF
const extractPdfData = async (filePath) => {
    const pdfBuffer = fs.readFileSync(filePath);

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

        if (matchIntermedio) {
            const intermedio = matchIntermedio[1].trim(); // Contenido entre (8020) y (3900)
            console.log('Contenido entre (8020) y (3900):', intermedio);
        } else {
            console.log('No se encontró el patrón entre (8020) y (3900).');
        }

        // Llamamos a la función para generar el archivo TXT con los datos extraídos
        generateTxtFile(matchFactura ? matchFactura[1] : '', formattedDate);
    } catch (error) {
        console.error('Error al procesar el PDF:', error);
    }
};

// Función para generar el archivo de texto formateado
const generateTxtFile = (factura, formattedDate) => {
    // Función para formatear una línea con longitud fija
    const formatLine = (content, length) => {
        return content.padEnd(length, ' '); // Mantener el formato original sin ceros
    };

    // Definir las líneas con sus valores y sus longitudes respectivas
    const lines = [
        formatLine(`018903990295${formattedDate}05100000379400000574${formattedDate}2137Z01`, 162),
        formatLine(`0577099984169490001`, 162),
        formatLine(`0600000000000000000000000000000000000000000000007782${factura}00010183941131810405133320000002`, 162),
        formatLine(`0600000000000000000000000000000000000000000000651800000000000000010183945282545705133320000003`, 162),
        formatLine('080000000040000000000158800000001', 162),
        formatLine('09000000004000000000012544000', 162),
    ];

    // Unir todas las líneas con un salto de línea y escribirlas en un archivo
    const fileContent = lines.join('\n');

    fs.writeFileSync('resultaos.txt', fileContent);

    console.log('Archivo TXT generado con el formato especificado.');
};

// Ejecutar la extracción de datos del PDF y luego generar el archivo TXT
extractPdfData('prueba.pdf');
