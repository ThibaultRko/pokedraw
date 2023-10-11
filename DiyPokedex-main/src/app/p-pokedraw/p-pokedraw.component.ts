import { Component, AfterViewInit, ElementRef } from '@angular/core';
import * as paper from 'paper';

@Component({
  selector: 'app-p-pokedraw',
  templateUrl: './p-pokedraw.component.html',
  styleUrls: ['./p-pokedraw.component.css']
})
export class PPokedrawComponent implements AfterViewInit {

  strokeWidth: number = 5;
  eraserSize: number = 5;
  currentColor: string = 'white';
  isEraserActive: boolean = false;
  paths: paper.Path[] = [];
  private canvas?: HTMLCanvasElement;


  constructor(private el: ElementRef) {}

  changeStrokeWidth(size: number) {
    this.strokeWidth = size;
  }

  changeColor(color: string) {
    this.currentColor = color;
    this.isEraserActive = false;
  }

  toggleEraser() {
    this.isEraserActive = !this.isEraserActive;
  }

  undoLastAction() {
    if (this.paths.length > 0) {
      const lastPath = this.paths.pop();
      if (lastPath) {
        lastPath.remove();
      }
    }
  }

  clearCanvas() {
    this.paths.forEach(path => path.remove());
    this.paths = [];
  }

  changeEraserSize(size: number) {
    this.eraserSize = size;
    this.isEraserActive = true;
  }

  saveDrawing(): string | null {
    if (this.canvas) {
      const dataUrl = this.canvas.toDataURL();
      // console.log(`donnée sauvée dans saveDrawing : ${dataUrl}`);
      return dataUrl;
    }
    return null;
  }

  ngAfterViewInit(): void {
    this.canvas = this.el.nativeElement.querySelector('canvas') as HTMLCanvasElement;
    paper.setup(this.canvas);

    const tool = new paper.Tool();
    let path: paper.Path;
    let eraserPath: paper.Path | null = null;

    let cursorCircle = new paper.Path.Circle(new paper.Point(0, 0), this.strokeWidth);
    cursorCircle.strokeColor = new paper.Color('grey');

    tool.onMouseMove = (event: paper.ToolEvent) => {
      cursorCircle.position = event.point;
      cursorCircle.scale(this.isEraserActive ? this.eraserSize / cursorCircle.bounds.width : this.strokeWidth / cursorCircle.bounds.width);
    };

    tool.onMouseDown = (event: paper.ToolEvent) => {
      path = new paper.Path();
      path.strokeColor = new paper.Color(this.currentColor);
      path.add(event.point);
      this.paths.push(path);
      cursorCircle.bringToFront();
    };

    tool.onMouseDrag = (event: paper.ToolEvent) => {
      cursorCircle.position = event.point;
      cursorCircle.scale(this.isEraserActive ? this.eraserSize / cursorCircle.bounds.width : this.strokeWidth / cursorCircle.bounds.width);
      if (this.isEraserActive) {
        path.add(event.point);
        path.strokeColor = new paper.Color('#111822');
        path.strokeWidth = this.eraserSize;
      } else {
        path.add(event.point);
        path.strokeColor = new paper.Color(this.currentColor);
        path.strokeWidth = this.strokeWidth;
      }
      cursorCircle.bringToFront();
    };

    tool.onMouseUp = () => {
      if (this.isEraserActive && eraserPath) {
        let newPath = path.subtract(eraserPath) as paper.Path;
        path.remove();
        path = newPath;
        eraserPath.remove();
        eraserPath = null;
      }
    };
  }
}
