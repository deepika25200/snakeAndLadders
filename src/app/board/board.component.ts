import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent {
  boxes: number[] = Array(100).fill(0).map((_, i) => i + 1);
}
