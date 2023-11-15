import { Warrior } from "./hero";
import { Monster } from "./monster";
import Side from "./side";
import { Spell } from "./spell";
import Weapon from "./weapon";

/**
 * @deprecated
 */
export default class Game {
  bando1: Side;
  bando2: Side;
  constructor() {
    this.bando1 = new Side([new Warrior(new Weapon("Sable laser", 5))]);
    this.bando2 = new Side([
      new Monster(35, new Weapon("palo", 3)),
      new Monster(35, new Weapon("palo", 10)),
      new Monster(35, new Weapon("palo", 5)),
    ]);
  }

  turn(attacker: number, usedSpell: Spell): any {
    console.log("ananashe");
    console.log(this.bando1, this.bando2);
    if (attacker == 1) this.bando1.attack(this.bando2, usedSpell);
    else this.bando2.attack(this.bando1, usedSpell);

    console.log("Turn end");
    /* Gameover */

    if (this.bando1.isDead()) console.log("Ganó el bando 2 :D");
    else if (this.bando2.isDead()) console.log("Ganó el bando 1 :P");
  }

  start() {
    while (true) {
      this.bando1.attack(this.bando2);
      if (this.bando2.isDead()) {
        console.log("Ganó bando 1");
        break;
      }
      this.bando2.attack(this.bando1);
      if (this.bando1.isDead()) {
        console.log("Ganó bando 2");
        break;
      }
    }
  }
}
