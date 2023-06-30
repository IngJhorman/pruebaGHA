const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();

const dbConfig = {
  host: '51.222.104.17',
  user: 'cdhproye_admin_dev',
  password: 'Prueba@protela2023',
  database: 'cdhproye_protela'
};

app.use(cors()); // Usar el middleware cors

app.get('/datos', (req, res) => {
  const connection = mysql.createConnection(dbConfig);
  connection.connect((err) => {
    if (err) {
      res.status(500).json({ error: 'Error de conexión a la base de datos' });
      return;
    }
    
    connection.query('SELECT * FROM realtime_tricot_samples', (err, results) => {
      if (err) {
        res.status(500).json({ error: 'Error al ejecutar la consulta' });
        return;
      }
      
      res.json(results);
      connection.end(); // Cerrar la conexión después de enviar la respuesta
    });
  });
});

app.get('/general_dashboard_alamos', (req, res) => {
  const connection = mysql.createConnection(dbConfig);
  connection.connect((err) => {
    if (err) {
      res.status(500).json({ error: 'Error de conexión a la base de datos' });
      return;
    }
    
    connection.query('SELECT * FROM dashboard_alamos', (err, results) => {
      if (err) {
        res.status(500).json({ error: 'Error al ejecutar la consulta' });
        return;
      }
      
      res.json(results);
      connection.end(); // Cerrar la conexión después de enviar la respuesta
    });
  });
});

app.listen(3000, () => {
  console.log('Servidor iniciado en el puerto 3000');
});
