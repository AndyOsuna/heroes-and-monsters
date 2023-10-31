import { Bando } from "./bando";
import { Warrior } from "./hero";
import { Monster } from "./monster";
import { Weapon } from "./weapon";

export class Game {
  bando1: Bando;
  bando2: Bando;
  constructor() {
    this.bando1 = new Bando([new Warrior(new Weapon("Sable laser", 5))]);
    this.bando2 = new Bando([
      new Monster(35, new Weapon("palo", 3)),
      new Monster(35, new Weapon("palo", 10)),
      new Monster(35, new Weapon("palo", 5)),
    ]);
  }

  start(): void {
    while (true) {
      this.bando1.attack(this.bando2);
      this.bando2.attack(this.bando1);
      console.log("Turn end");
      /* Gameover */
      if (this.bando1.isDead() || this.bando2.isDead()) break;
    }
    if (this.bando1.isDead()) console.log("Ganó el bando 2 :D");
    else console.log("Ganó el bando 1 :P");
  }
}
