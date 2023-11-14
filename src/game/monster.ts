import Character from "./character";
import Weapon from "./weapon";

export class Monster extends Character {
  name = "Monster";
  constructor(HP: number, weapon?: Weapon) {
    super(HP, 1, 1, weapon);
  }

  attack(characterAttacked: Character) {
    super.attack(characterAttacked);
  }
  receiveDamage(damage: number): void | Weapon {
    super.receiveDamage(damage);

    if (this.HP <= 0) {
      return this.weapon;
    }
  }
}
