import { Character } from "./character";
import { Weapon } from "./weapon";

export class Hero extends Character {
  name = "Hero";
  HP = 100;

  attack(characterAttacked: Character) {
    super.attack(characterAttacked);
  }
}

export class Warrior extends Hero {
  name = "Warrior";

  constructor(weapon?: Weapon) {
    super(100, 3, 0, weapon);
  }
}
export class Wizard extends Hero {
  name = "Wizard";
  constructor() {
    super();
    this.weapon = new Weapon("spell", 20);
  }
}
