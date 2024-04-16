const express = require('express');
const xlsx = require('xlsx');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.json());

app.post('/validarCredenciales', (req, res) => {
    const { usuario, contraseña, hoja } = req.body;

    // Lee el archivo Excel y valida las credenciales
    const workbook = xlsx.readFile(path.join(__dirname, 'Usuarios.xlsx'));
    const sheet = workbook.Sheets[hoja];
    const datos = xlsx.utils.sheet_to_json(sheet);

    // Buscar el usuario en los datos
    const usuarioEncontrado = datos.find(data => data.usuario === usuario);

    if (usuarioEncontrado && usuarioEncontrado.contraseña === contraseña) {
        res.json({ valido: true }); // Credenciales válidas
    } else {
        res.json({ valido: false }); // Credenciales inválidas
    }
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
