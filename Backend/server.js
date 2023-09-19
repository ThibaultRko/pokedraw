const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(express.json()); // Pour pouvoir analyser les données JSON des requêtes POST
app.use(cors());

// Configuration de la connexion à la base de données
const db = mysql.createConnection({
  host: '193.70.38.162',
  user: 'powerninja',
  password: 'UN5p87w74sU2bbGN',
  database: 'pokedraw',
});

// Connexion à la base de données
db.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données :', err);
  } else {
    console.log('Connecté à la base de données MySQL');
  }
});

// Endpoint GET pour récupérer les données du pokedex
app.get('/pokedex', (req, res) => {
  // Exécute une requête SQL pour récupérer les données de la table "pokedex"
  db.query('SELECT * FROM pokedraw.Pokedex;', (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des données du pokedex :', err);
      res.status(500).json({ message: 'Erreur lors de la récupération des données' });
    } else {
      // Envoie les données du pokedex en réponse
      res.json(results);
    }
  });
});

// Endpoint POST pour ajouter des données via le formulaire
app.post('/forms', (req, res) => {
  const { nom, description } = req.body; // Récupère les données du corps de la requête

  // Vérifie si les données requises (nom et description) sont présentes
  if (!nom || !description) {
    return res.status(400).json({ message: 'Le nom et la description sont requis.' });
  }

  // Requête SQL pour insérer une nouvelle ligne dans la table "Pokedex"
  const sql = 'INSERT INTO Pokedex (Name, description) VALUES (?, ?)';
  
  // Paramètres à insérer dans la requête SQL
  const values = [nom, description];

  // Exécute la requête SQL
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Erreur lors de l\'insertion dans la table Pokedex :', err);
      return res.status(500).json({ message: 'Erreur lors de l\'insertion des données.' });
    }

    // Réponse indiquant que l'insertion a réussi
    res.status(201).json({ message: 'Données insérées avec succès dans la table Pokedex.' });
  });
});

// Démarrez le serveur Express
app.listen(port, () => {
  console.log(`Serveur en écoute sur le port ${port}`);
});

