import { Injectable,ElementRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Player2Service {
  private playerElement!: ElementRef;
  setPlayerElement(playerElement: ElementRef) {
    this.playerElement = playerElement;
  }

  getPlayerElement() {
    return this.playerElement;
  }

  constructor() { }
}
