import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent {
  nom: string = '';
  description: string = '';
  validationMessage: string = '';

  constructor(private http: HttpClient) {}

  onSubmit() {
    // Crée un objet avec les données du formulaire
    const data = {
      nom: this.nom,
      description: this.description
    };

    // Effectue une requête POST vers le serveur Express
    this.http.post('http://localhost:3000/forms', data).subscribe((response: any) => {
      console.log(response.message); // Affiche la réponse du serveur
      this.validationMessage = " ✨  la donnée a été ajoutée avec succès ✨";

      // Réinitialise les champs du formulaire après l'ajout
      this.nom = '';
      this.description = '';
    }, (error) => {
      console.error('Erreur lors de la requête POST :', error);
    });
  }
}

