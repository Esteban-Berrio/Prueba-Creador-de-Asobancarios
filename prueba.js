const fs = require('fs');
const pdfParse = require('pdf-parse');

const extractPdfData = async (filePath) => {
    const pdfBuffer = fs.readFileSync(filePath);

    try {
        const data = await pdfParse(pdfBuffer);

        // Aquí 'data.text' contiene todo el texto del PDF
        console.log('Texto extraído del PDF:', data.text);

        // Expresión regular para capturar los números entre todos los patrones
        const regex = /\(415\)(\d+)\(8020\)(\d+)\(3900\)(\d+)\(96\)(\d+)/;

        // Ejecutar la expresión regular
        const match = data.text.match(regex);

        if (match) {
            const part415 = match[1];  // Números capturados después de (415)
            const part8020 = match[2]; // Números capturados después de (8020)
            const part3900 = match[3]; // Números capturados después de (3900)
            const part96 = match[4];   // Números capturados después de (96)

            // Imprimir los valores capturados
            console.log('Números entre (415):', part415);
            console.log('Números entre (8020):', part8020);
            console.log('Números entre (3900):', part3900);
            console.log('Números entre (96):', part96);
        } else {
            console.log('No se encontró el patrón en el texto.');
        }
    } catch (error) {
        console.error('Error al procesar el PDF:', error);
    }

   
};

extractPdfData('21102024_001.pdf');
