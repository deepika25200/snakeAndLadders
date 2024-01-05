import { Component,ViewChild,ElementRef ,AfterViewInit} from '@angular/core';
import { PlayerService } from './player.service';
import { Player2Service } from './player2.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit  {
  title = 'snakeAndLadders';
  boxes: number[] = Array(100).fill(0).map((_, i) => i + 1);
  tog = 1;
  turn: string = "Red's Turn :";
  p1sum: number = 0;
  p2sum: number = 0;
  @ViewChild('player1') player1!: ElementRef;
  @ViewChild('player2') player2!: ElementRef;
  constructor(private service:PlayerService,private service2:Player2Service)
  {

  }
  ngAfterViewInit()
  {
    this.service.setPlayerElement(this.player1);
    this.service2.setPlayerElement(this.player2);
  }
  onDiceRolled(num: number) {
    //this.rollingSound.play();
    console.log(num);
    if (this.tog % 2 !== 0) {
      this.turn = "Yellow's Turn :";
      this.play('p1', 'p1sum', 0, num);
    } else {
      this.turn = "Red's Turn :";
      this.play('p2', 'p2sum', 55, num);
    }

    this.tog++;
  }
  play(player: string, psum: string, correction: number, num: number)
  {
          let sum=0;
          console.log("player is called with "+player);
          
          if (psum === 'p1sum') {
            this.p1sum += num;

            if (this.p1sum > 100) {
              this.p1sum -= num;
            }

            // Handle special cases for p1sum
           // this.handleSpecialCases(this.p1sum);

            sum = this.p1sum;
          } else if (psum === 'p2sum') {
            this.p2sum += num;

            if (this.p2sum > 100) {
              this.p2sum -= num;
            }

            // Handle special cases for p2sum
           // this.handleSpecialCases(this.p2sum);

            sum = this.p2sum;
          }
          this.movePlayer(player, sum, correction);
  }
  movePlayer(player: string, sum: number, correction: number) {
    console.log("player "+player)
      let playerElement! : any;
    if(player==='p2')
    {
      playerElement=this.service.getPlayerElement().nativeElement;
      console.log("player 1 "+playerElement);
      
    }
    else
      playerElement=this.service2.getPlayerElement().nativeElement;
    console.log("element "+playerElement.id);
    playerElement.style.transition = 'linear all .5s';

  if (sum < 10) {
    playerElement.style.left = `${(sum-1) * 70}px`;
    //playerElement.style.top = `${-0 * 62 - correction}px`;
  } else if (sum === 100) {
    //this.winSound.play();
    alert(`${player === 'p1' ? 'Red' : 'Yellow'} Won !!`);
    location.reload();
  } else {
    const row = Math.floor((sum - 1) / 10);
    const col = (row % 2 === 0) ? (sum - 1) % 10 : 9 - (sum - 1) % 10;

    playerElement.style.left = `${col * 62}px`;
    playerElement.style.top = `${-row * 62 - correction}px`;
  }
}
}// import { Component,ViewChild,ElementRef ,AfterViewInit,Renderer2} from '@angular/core';
// import { PlayerService } from './player.service';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrl: './app.component.scss'
// })
// export class AppComponent implements AfterViewInit  {
//   title = 'snakeAndLadders';
//   boxes: number[] = Array(100).fill(0).map((_, i) => i + 1);
//   tog = 1;
//   turn: string = "Red's Turn :";
//   p1sum: number = 0;
//   p2sum: number = 0;
//   @ViewChild('player') set playerElement(player: ElementRef | undefined) {
//     if (player) {
//       console.log("element "+player.nativeElement);
//       this.service.setPlayerElement(player.nativeElement);
//     }
//   }

//   constructor(private service: PlayerService,private render:Renderer2) {}
//   ngOninit()
//   {
//     console.log("init called");
//   }

//   ngAfterViewInit() {
//     console.log("view init called");
//     console.log(this.service.getPlayerElement());
//   }

//   onDiceRolled(num: number) {
//     if (this.tog % 2 !== 0) {
//       this.turn = "Yellow's Turn :";
//       this.play('p1', 'p1sum', 0, num);
//     } else {
//       this.turn = "Red's Turn :";
//       this.play('p2', 'p2sum', 55, num);
//     }
//     this.tog++;
//   }

//   play(player: string, psum: string, correction: number, num: number) {
//     let sum=0;

//     if (psum === 'p1sum') {
//       this.p1sum += num;
//       this.handleSpecialCases('p1', this.p1sum);
//       sum = this.p1sum;
//     } else if (psum === 'p2sum') {
//       this.p2sum += num;
//       this.handleSpecialCases('p2', this.p2sum);
//       sum = this.p2sum;
//     }

//     this.movePlayer(player, sum, correction);
//   }

//   handleSpecialCases(player: string, sum: number) {
//     // Handle special cases for players' sums
//     // Add your special case logic here
//   }

//   movePlayer(player: string, sum: number, correction: number) {
//     const playerElement = this.service.getPlayerElement().nativeElement.getAttribute('id');
//     console.log("only  "+playerElement);
    
//     if(playerElement)
//     {
//     playerElement.style.transition = 'linear all .5s';

//     if (sum < 10) {
//       playerElement.style.left = `${(sum - 1) * 62}px`;
//       playerElement.style.top = `${-0 * 62 - correction}px`;
//     } else if (sum === 100) {
//       alert(`${player === 'p1' ? 'Red' : 'Yellow'} Won !!`);
//       location.reload();
//     } else {
//       const numarr = Array.from(String(sum));

//       if (numarr.length > 0) {
//         const n1: number = parseInt(numarr.shift()!);
//         const n2: number | undefined = parseInt(numarr.pop() || '');

//         if (n1 % 2 !== 0) {
//           if (n2 === 0) {
//             playerElement.style.left = `${9 * 62}px`;
//             playerElement.style.top = `${(-n1 + 1) * 62 - correction}px`;
//           } else {
//             playerElement.style.left = `${(9 - (n2 - 1)) * 62}px`;
//             playerElement.style.top = `${-n1 * 62 - correction}px`;
//           }
//         } else if (n1 % 2 === 0) {
//           if (n2 === 0) {
//             playerElement.style.left = `${0}px`;
//             playerElement.style.top = `${(-n1 + 1) * 62 - correction}px`;
//           } else {
//             playerElement.style.left = `${(n2 - 1) * 62}px`;
//             playerElement.style.top = `${-n1 * 62 - correction}px`;
//           }
//         }
//       }
//     }
//   }
//   else
//   {
//     console.log(undefined);
//   }
// }
// }