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

    this.drawShadow(150, 150, 300, 300, 140, 100)
    
    this.drawSlice("red", 0, 0.2, 150, 150, 140,100);
    this.drawSlice("blue", 0.2, 0.4, 150, 150, 140, 100);
    this.drawSlice("green", 0.4, 0.99, 150, 150, 140, 100);
    this.drawSlice("black", 0.99, 1, 150, 150, 140, 100);

  }

  private drawSlice(colour: string, start: number, end: number, x: number, y: number, outer: number = 40, inner: number = 30) {

    var startX = -Math.sin((start * 2 - 1) * Math.PI) * outer;
    var startY = Math.cos((start * 2 - 1) * Math.PI) * outer;

    this.context.beginPath();

    this.context.lineTo(x + startX, y + startY);
    this.context.arc(x, y, outer, (start * 2 - 0.5) * Math.PI, (end * 2 - 0.5) * Math.PI)
    this.context.lineTo(x, y);
    this.context.arc(x, y, inner, (end * 2 - 0.5) * Math.PI, (start * 2 - 0.5) * Math.PI, true)

    this.context.fillStyle = colour;
    this.context.fill();

    this.context.closePath();

  }

  private drawShadow(x: number, y: number, width: number, height: number, outer: number = 40, inner: number = 30) {

    const outerShadow = this.context.createRadialGradient(x,y,outer-5,x,y,outer+10);
    outerShadow.addColorStop(0,"#ffffff00");
    outerShadow.addColorStop(0,"#000000aa");
    outerShadow.addColorStop(1,"#ffffff00");

    this.context.fillStyle = outerShadow;
    this.context.fillRect(0, 0, width, height);

    const innerShadow = this.context.createRadialGradient(x,y,inner+5,x,y,inner-10);
    innerShadow.addColorStop(0,"#ffffff00");
    innerShadow.addColorStop(0,"#000000aa");
    innerShadow.addColorStop(1,"#ffffff00");

    this.context.fillStyle = innerShadow;
    this.context.fillRect(0, 0, width, height);

  }

}
