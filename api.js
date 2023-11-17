const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');

app.use(bodyParser.json());

// Habilita CORS para todas las solicitudes
app.use(cors());

// Configura la conexión a la base de datos MySQL
const db = mysql.createConnection({
  host: '127.0.0.1',  // Reemplaza con la dirección de tu servidor MySQL
  user: 'root', // Reemplaza con tu nombre de usuario
  password: 'Edrei01.', // Reemplaza con tu contraseña
  database: 'calculadora' // Reemplaza con el nombre de tu base de datos
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Conexión a la base de datos MySQL establecida');
});

// Obtener historial de operaciones
app.get('/api/history', (req, res) => {
  const sql = 'SELECT * FROM historial';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// Almacenar una nueva operación
app.post('/api/history', (req, res) => {
  const operation = req.body;
  const sql = 'INSERT INTO historial (operation, result) VALUES (?, ?)';
  const values = [operation.operation, operation.result];
  
  db.query(sql, values, (err, result) => {
    if (err) throw err;
    res.status(201).json(operation);
  });
});

const port = 5000;
app.listen(port, () => {
  console.log(`API en ejecución en el puerto ${port}`);
});