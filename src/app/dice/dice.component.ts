import { Component,Output,EventEmitter,Input } from '@angular/core';
@Component({
  selector: 'app-dice',
  templateUrl: './dice.component.html',
  styleUrl: './dice.component.scss'
})
export class DiceComponent {
  @Output() turnChange = new EventEmitter<string>();
  @Output() diceRolled = new EventEmitter<number>();
  private _turn = "Red's Turn :";
  get turn(): string {
    return this._turn;
  }
  set turn(value: string) {
    this._turn = value;
    this.turnChange.emit(value);
  }

  diceValue = 0;
  tog=0;
  rollDice() {
    const num = Math.floor(Math.random() * (6 - 1 + 1) + 1);
    this.tog++;
    this.diceValue = num;
    this.turn = this.tog % 2 !== 0 ? "Yellow's Turn :" : "Red's Turn :";
    this.diceRolled.emit(num);
  }
}
