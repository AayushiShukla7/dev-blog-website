import { Component, OnInit } from '@angular/core';
import { Application } from '@splinetool/runtime';

@Component({
  selector: 'app-robot',
  standalone: true,
  imports: [],
  templateUrl: './robot.component.html',
  styleUrl: './robot.component.css'
})
export class RobotComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {
    // make sure you have a canvas in the body
    const canvas: any = document.getElementById('canvas3d');

    // start the application and load the scene
    const spline = new Application(canvas);
    spline.load('https://prod.spline.design/4CnqhnCF54OexexB/scene.splinecode');
  }
}
