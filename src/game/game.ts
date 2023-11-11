import { Warrior } from "./hero";
import { Monster } from "./monster";
import Side from "./side";
import { Spell } from "./spell";
import Weapon from "./weapon";

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

  start(): void {
    while (true) {
      /* TODO: Seleccionar Habilidad */

      this.bando1.attack(this.bando2, Spell.RandomSpell());
      if (this.bando2.isDead()) break;

      /* TODO: Habilidad */
      this.bando2.attack(this.bando1, Spell.RandomSpell());
      if (this.bando1.isDead()) break;

      console.log("Turn end");
    }
    /* Gameover */
    if (this.bando1.isDead()) console.log("Ganó el bando 2 :D");
    else console.log("Ganó el bando 1 :P");
  }
}
