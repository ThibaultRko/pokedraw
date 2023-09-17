const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 3000;

app.use(express.json()); // Pour pouvoir analyser les données JSON des requêtes POST

// Configuration de la connexion à la base de données
const db = mysql.createConnection({
  host: '',
  user: '',
  password: '',
  database: '',
});

// Connexion à la base de données
db.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données :', err);
  } else {
    console.log('Connecté à la base de données MySQL');
  }
});

// Endpoint GET
app.get('/PokeDex', (req, res) => {
  // Ici, tu peux exécuter une requête SQL pour récupérer des données de la base de données
  // Puis, tu renvoies les données en réponse
  res.json({ message: 'Données récupérées avec succès' });
});

// Endpoint POST
app.post('/api/data', (req, res) => {
  const { key } = req.body; // Suppose que le corps de la requête contient des données au format JSON

  // Ici, tu peux insérer les données dans la base de données en utilisant une requête SQL
  // Assure-toi de valider et d'échapper les données correctement pour éviter les injections SQL

  res.json({ message: 'Données insérées avec succès' });
});

// Endpoint DELETE
app.delete('/api/data/:id', (req, res) => {
  const { id } = req.params;

  // Ici, tu peux supprimer les données correspondant à l'ID spécifié dans la base de données
  // Encore une fois, assure-toi de valider et d'échapper les données correctement

  res.json({ message: `Donnée avec l'ID ${id} supprimée avec succès` });
});

// Démarrez le serveur Express
app.listen(port, () => {
  console.log(`Serveur en écoute sur le port ${port}`);
});

