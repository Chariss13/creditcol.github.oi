const xlsx = require('xlsx');
const path = require('path');

// Función para validar credenciales de inicio de sesión
function validarCredenciales(usuario, contraseña, hoja) {
    const workbook = xlsx.readFile(path.join(__dirname, 'Usuarios.xlsx'));
    const sheet = workbook.Sheets[hoja];
    const datos = xlsx.utils.sheet_to_json(sheet);

    // Buscar el usuario en los datos
    const usuarioEncontrado = datos.find(data => data.usuario === usuario);

    if (usuarioEncontrado && usuarioEncontrado.contraseña === contraseña) {
        return true; // Credenciales válidas
    } else {
        return false; // Credenciales inválidas
    }
}

// Ejemplo de uso
const usuario = 'usuario';
const contraseña = 'contraseña';
const hojaInicio = 'inicio';
const hojaAdmin = 'Admin';

if (validarCredenciales(usuario, contraseña, hojaInicio)) {
    console.log('Credenciales de cliente válidas.');
} else {
    console.log('Credenciales de cliente inválidas.');
}

if (validarCredenciales(usuario, contraseña, hojaAdmin)) {
    console.log('Credenciales de administrador válidas.');
} else {
    console.log('Credenciales de administrador inválidas.');
}
