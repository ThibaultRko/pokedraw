import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent {
  // Déclarez des propriétés pour stocker les valeurs des champs de formulaire
  nom: string = '';
  motDePasse: string = '';
  confirmationMotDePasse: string = '';
  email: string = '';
  confirmationEmail: string = '';

  // Déclarez des propriétés pour les messages d'erreur
  nomError: string = '';
  motDePasseError: string = '';
  emailError: string = '';

  constructor(private http: HttpClient) {} // Injection de HttpClient dans le constructeur

  onSubmit() {
    
    // Réinitialisez les messages d'erreur
    this.nomError = '';
    this.motDePasseError = '';
    this.emailError = '';
    
    // Ajoutez ici la logique de validation, par exemple :
    if (this.nom.length < 3 || this.nom.length > 15) {
      // Affichez une erreur pour le nom
      this.nomError = 'Le nom doit contenir entre 3 et 15 caractères.';
      return;
    }

    if (this.motDePasse !== this.confirmationMotDePasse) {
      // Affichez une erreur pour le mot de passe
      this.motDePasseError = 'Les mots de passe ne correspondent pas.';
      return;
    }

    if (this.email !== this.confirmationEmail) {
      // Affichez une erreur pour l'email
      this.emailError = "Les adresses email ne correspondent pas.";
      return;
    }
    
    // Crée un objet avec les données du formulaire
    const data = {
      nom: this.nom,
      email: this.email,
      motDePasse: this.motDePasse
    };

    // Si tout est valide, effectuez la soumission du formulaire
    // Vous pouvez envoyer les données au serveur ici

    //Effectuez une requête POST vers le serveur Express
    this.http.post('http://localhost:3000/inscription', data).subscribe((response: any) => {
      console.log(response.message);

      //Réinitialisez les champs du formulaire après l'ajout
      this.nom = '';
      this.email = '';
      this.motDePasse = '';
      this.nomError = '';
      this.emailError = '';
    }, (error) => {
      console.error('Erreur lors de la requête POST :', error)
    });
  }
}


