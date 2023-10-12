Pokedraw représente mon premier projet "fullstack", ayant comme objectif initial de mettre en pratique l'ensemble des outils nécessaires au développement d'une application web. En décrivant le projet, il s'agit d'une application web permettant de dessiner à la souris un monstre, de lui attribuer un nom et une description. Une fois ce formulaire envoyé, les données seront stockées dans une base de données et pourront être consultées via un composant affichant toutes les créations de monstres existantes.

Le choix des technologies comprend :
- MySQL pour la base de données.
- Node.js pour le backend, utilisant la bibliothèque Express.js pour gérer les requêtes HTTP.
- Angular pour le frontend.
- Utilisation de la bibliothèque Canvas pour gérer le dessin à la souris.

Les défis rencontrés incluent :
- Le stockage de l'image dans une base de données textuelle, avec le choix du format base64 permettant de transformer un fichier PNG en chaîne de caractères, facilitant ainsi le stockage dans une base de données MySQL.
- La gestion complexe de la bibliothèque Canvas pour le dessin à la souris.
- L'utilisation d'un composant dans un autre, nécessitant un système de liaison entre composants pour récupérer des données d'un à l'autre.

Les points d'amélioration envisagés comprennent :
- L'ajout d'une fonctionnalité de connexion/inscription fonctionnelle, permettant d'ajouter un utilisateur via un formulaire d'inscription qui envoie les données à la base de données.
- L'implémentation d'un composant "profile" renvoyant à l'utilisateur la liste des monstres qu'il a créés. Le routage de ce composant sera associé à un "guard" n'accordant l'accès qu'à un utilisateur connecté.
- L'implémentation d'un JWT à attribuer à un utilisateur s'étant connecté au site via son email et son mot de passe. Ce jeton permettra au "guard" d'accorder l'accès à la page de profil de l'utilisateur.
