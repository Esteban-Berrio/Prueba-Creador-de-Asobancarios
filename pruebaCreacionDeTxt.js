const fs = require('fs');

// Función para formatear una línea con longitud fija
const formatLine = (content, length) => {
    return content.padEnd(length, ' ');
};

const generateTxtFile = () => {
    // Definir las líneas con sus valores y sus longitudes respectivas
    const lines = [
        formatLine('0189190027212024070502300000379400000574202407051810Z01', 162),
        formatLine('0577099984169490001', 162),
        formatLine('0600000000000000000000000000000000000000001075072800002691888900010198787656600005143320000002', 162),
        formatLine('080000000040000000000158800000001', 162),
        formatLine('09000000004000000000012544000', 162),
    ];

    // Unir todas las líneas con un salto de línea y escribirlas en un archivo
    const fileContent = lines.join('\n');

    fs.writeFileSync('output.txt', fileContent);

    console.log('Archivo TXT generado con el formato especificado.');
};

generateTxtFile();