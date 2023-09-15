import { Component } from '@angular/core';

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

    // Si tout est valide, effectuez la soumission du formulaire
    // Vous pouvez envoyer les données au serveur ici
  }
}


