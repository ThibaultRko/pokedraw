const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotEnv = require('dotenv').config();
const { log } = require('console');


const app = express();
const port = 3000;

app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({limit: '5mb', extended: true}));

app.use(express.json()); // Pour pouvoir analyser les données JSON des requêtes POST
app.use(cors());


// Configuration de la connexion à la base de données
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
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

//////////////////////////////////////////////////////////////////////////////////////////////////

// Endpoint POST pour ajouter des données via le formulaire
app.post('/forms', (req, res) => {
  const { nom, description, image } = req.body; // Récupère les données du corps de la requête

  // Vérifie si le nom est présent
  if (!nom) {
    return res.status(400).json({ message: 'Le nom est requis.' });
  }

  // Vérifie si la description est présente
  if (!description) {
    return res.status(400).json({ message: 'La description est requise.' });
  }

  // Vérifie si l'image est présente
  if (!image) {
    return res.status(400).json({ message: 'L\'image est requise.' });
  }

  //Convertit l'image base64 en un buffer binaire
  // const imageBuffer = Buffer.from(image, 'base64');

  // Requête SQL pour insérer une nouvelle ligne dans la table "Pokedex"
  const sql = 'INSERT INTO Pokedex (Name, description, PokedrawImg) VALUES (?, ?, ?)';
  
  // Paramètres à insérer dans la requête SQL
  const values = [nom, description, image];

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


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////



// Endpoint POST pour ajouter des données via le formulaire vers la table Users
app.post('/inscription', (req, res) => {
  const { nom, email, motDePasse } = req.body; // Récupère les données de la requête

  // Vérifie si les données requises sont présentes
  if (!nom || !email || !motDePasse) {
    return res.status(400).json({ message: 'Vous ne remplissez pas l\'ensemble des champs requis.' });
  }

  // Requête SQL pour vérifier si l'e-mail existe déjà dans la table "Users"
  const emailCheckSql = 'SELECT COUNT(*) AS count FROM Users WHERE email = ?';

  // Paramètre à insérer dans la requête SQL pour la vérification de l'e-mail
  const emailCheckValues = [email];

  // Exécute la requête SQL pour vérifier si l'e-mail existe déjà
  db.query(emailCheckSql, emailCheckValues, (emailCheckError, emailCheckResult) => {
    if (emailCheckError) {
      console.error('Erreur lors de la vérification de l\'e-mail :', emailCheckError);
      return res.status(500).json({ message: 'Erreur lors de la vérification de l\'e-mail.' });
    }

    const emailCount = emailCheckResult[0].count;

    if (emailCount > 0) {
      // L'e-mail existe déjà, renvoie une réponse d'erreur
      return res.status(400).json({ message: 'Cet e-mail est déjà enregistré.' });
    }

    // L'e-mail est unique, continuez avec l'insertion dans la table "Users"
    const insertSql = "INSERT INTO Users (name, email, password) VALUES (?, ?, ?)";

    // Paramètres à insérer dans la requête SQL d'insertion
    const insertValues = [nom, email, motDePasse];

    // Exécute la requête SQL d'insertion
    db.query(insertSql, insertValues, (insertError, insertResult) => {
      if (insertError) {
        console.error("Erreur lors de l'insertion dans la table Users :", insertError);
        return res.status(500).json({ message: "Erreur lors de l'insertion des données." });
      }

      // Réponse indiquant que l'insertion est réussie
      res.status(201).json({ message: 'Données insérées avec succès dans la table Users' });
    });
  });
});


////////////////////////////////////////////////////////////////////////////////////////////////



// Démarrez le serveur Express
app.listen(port, () => {
  console.log(`Serveur en écoute sur le port ${port}`);
});

