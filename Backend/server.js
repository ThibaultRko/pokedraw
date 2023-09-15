const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 3000;

// Configuration de la connexion à la base de données
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'pokedb',
});

// Connexion à la base de données
db.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données :', err);
  } else {
    console.log('Connecté à la base de données MySQL');
  }
});

// Démarrez le serveur Express
app.listen(port, () => {
  console.log(`Serveur en écoute sur le port ${port}`);
});
