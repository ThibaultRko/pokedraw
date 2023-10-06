import { Component, AfterViewInit  } from '@angular/core';
import * as paper from 'paper';

@Component({
  selector: 'app-p-pokedraw',
  templateUrl: './p-pokedraw.component.html',
  styleUrls: ['./p-pokedraw.component.css'],
  template: '<canvas id="myCanvas"></canvas>',
})



export class PPokedrawComponent implements AfterViewInit {

  ngAfterViewInit(): void { 
    const canvas = document.getElementById('myCanvas') as HTMLCanvasElement;
    paper.setup(canvas); 


    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      paper.view.viewSize = new paper.Size(window.innerWidth, window.innerHeight);
    }); 

    // Je crée un outil de dessin
    const tool = new paper.Tool();
    let path: paper.Path;


    tool.onMouseDown = (event: paper.ToolEvent) => {
      path = new paper.Path();
      path.strokeColor = new paper.Color('white');
      path.add(event.point);
    };
    

    // Fonction pour dessiner en trainant la souris
    tool.onMouseDrag = (event: paper.ToolEvent) => {
      path.add(event.point);
    };

    // Fonction pour terminer le dessin
    tool.onMouseUp = (event: paper.ToolEvent) => {
      path.simplify(); // Pour rendre le trait plus fluide
    };

  }

}

