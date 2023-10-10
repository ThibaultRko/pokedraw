import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements AfterViewInit {
  nom: string = '';
  description: string = '';
  validationMessage: string = '';
  drawings: string[] = [];


  @ViewChild('pokedrawCanvas', { static: true }) pokedrawCanvas!: ElementRef<HTMLCanvasElement>;

  constructor(private http: HttpClient) {}

  onCanvasMouseUp() {
    this.onCanvasReady();
    const canvasImage = this.getCanvasImage();
    if (canvasImage) {
      this.drawings.push(canvasImage);
    }
  }

  // Méthode appelée lorsque le dessin est terminé
  onCanvasReady() {
    // Maintenant, vous pouvez appeler getCanvasImage en toute sécurité.
    console.log("Canvas ready!");
    const canvasImage = this.getCanvasImage();
    console.log("Canvas Image:", canvasImage);
    // Faites ce que vous avez à faire avec canvasImage.
}

  ngAfterViewInit() {
    // Assure-toi que le contexte est obtenu après le rendu de l'élément.
    const canvas = this.pokedrawCanvas?.nativeElement;
    if (canvas) {
      const context = canvas.getContext('2d');
      // Tu peux également configurer le contexte ici si nécessaire.
    }
  }

  getCanvasImage(): string {
    // Vérifie que l'élément canvas est disponible avant d'appeler getContext.
    if (this.pokedrawCanvas && this.pokedrawCanvas.nativeElement) {
        const canvas = this.pokedrawCanvas.nativeElement;
        const context = canvas.getContext('2d');
        console.log('Context in getCanvasImage:', context);

        if (context) {
            const dataUrl = canvas.toDataURL('image/png');
            console.log('Data URL:', dataUrl);
            return dataUrl;
        }
    }
    console.log('Aucun dessin capturé.');
    return ''; // Ou retourne quelque chose de significatif en cas d'erreur.
}

onSubmit() {
  // Vérifie si le tableau de dessins est vide
  if (this.drawings.length === 0) {
    console.error('Aucun dessin capturé.');
    return;
  }

  // Utilisez this.drawings pour envoyer les dessins à votre backend
  const data = {
    nom: this.nom,
    description: this.description,
    drawings: this.drawings,
  };

  this.http.post('http://localhost:3000/forms', data).subscribe((response: any) => {
    console.log(response.message);
    this.validationMessage = " ✨ La donnée a été ajoutée avec succès ✨";
    this.nom = '';
    this.description = '';
    // Réinitialisez le tableau après l'envoi
    this.drawings = [];
  }, (error) => {
    console.error('Erreur lors de la requête POST :', error);
  });
}

}
