import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})

export class GraphComponent implements AfterViewInit{

  // its important myCanvas matches the variable name in the template
  @ViewChild('canvas', { static: false })
  canvas!: ElementRef;

  context!: CanvasRenderingContext2D;

  ngAfterViewInit(): void {
    this.context = this.canvas.nativeElement.getContext('2d');

    this.renderGraph("hi")
  }

  renderGraph(data: String) {

    this.context.moveTo(150, 150);
    
    this.drawSlice("red", 0, 0.2, 150, 150, 140);
    this.drawSlice("blue", 0.2, 0.4, 150, 150, 140);
    this.drawSlice("green", 0.4, 0.99, 150, 150, 140);
    this.drawSlice("black", 0.99, 1, 150, 150, 140, true);

  }

  private drawSlice(colour: string, start: number, end: number, x: number, y: number, length: number = 40, selected: boolean = false) {

    var offsetX = selected ? -Math.sin((start + end - 1) * Math.PI) * 15 : 0;
    var offsetY = selected ? Math.cos((start + end - 1) * Math.PI) * 15 : 0;

    var startX = -Math.sin((start * 2 - 1) * Math.PI) * (length + 15);
    var startY = Math.cos((start * 2 - 1) * Math.PI) * (length + 15);

    var endX = Math.sin(end * 2 * Math.PI);
    var endY = Math.cos(end * 2 * Math.PI);

    this.context.beginPath();

    this.context.lineTo(x + startX + offsetX, y + startY + offsetY);
    this.context.arc(x + offsetX, y + offsetY, length + (selected ? 5 : 0), (start * 2 - 0.5) * Math.PI, (end * 2 - 0.5) * Math.PI)
    this.context.lineTo(x + offsetX, y + offsetY);

    this.context.fillStyle = colour;
    this.context.fill();

    this.context.closePath();

  }

}
