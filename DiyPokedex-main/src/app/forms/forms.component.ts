import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PPokedrawComponent } from '../p-pokedraw/p-pokedraw.component';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent {
  nom: string = '';
  description: string = '';
  validationMessage: string = '';
  image: string[] = [];

  @ViewChild(PPokedrawComponent)
  private pPokedrawComponent!: PPokedrawComponent;

  constructor(private http: HttpClient) {}


  onSaveDrawing(dataUrl: string) {
    // Sauvegarde le dessin
    this.image.push(dataUrl);
    console.log("check du contenu drawing :" + this.image);
  }

  onSubmit() {

    const dataUrl = this.pPokedrawComponent.saveDrawing();
    

    if (dataUrl) {
      // Ajoutez le dataUrl récupéré à votre tableau image
      this.image.push(dataUrl);
      console.log('DataUrl récupéré :', dataUrl);
    } else {
      console.error('Erreur lors de la récupération du dataUrl.');
    }

    // Utilisez this.image pour envoyer les dessins à votre backend
    const data = {
      nom: this.nom,
      description: this.description,
      image: this.image,
    };
    console.log(data);
    
    // Vérifiez si image est défini et n'est pas vide
    if (!data.image) {
      console.error('Erreur: image est manquant ou vide.');
      return;
    }
    
    this.http.post('http://localhost:3000/forms', data).subscribe((response: any) => {
      console.log(response.message);
      this.validationMessage = " ✨ La donnée a été ajoutée avec succès ✨";
      this.nom = '';
      this.description = '';
      this.image = [];
    }, (error) => {
      console.error('Erreur lors de la requête POST coté formsComponent:', error);
    });
  }
}
