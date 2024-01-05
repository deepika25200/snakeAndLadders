import { Injectable,ElementRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor() { }
  private playerElement!: ElementRef;

  setPlayerElement(playerElement: ElementRef) {
    this.playerElement = playerElement;
  }

  getPlayerElement() {
    return this.playerElement;
  }
}
