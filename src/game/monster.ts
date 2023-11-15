import Character from "./character";
import Weapon from "./weapon";

export class Monster extends Character {
isAttacking= false;
  
  name = "Monster";
  constructor(HP: number, weapon?: Weapon) {
    super(HP, 1, 1, weapon);
  }

  attack(characterAttacked: Character) {
 
   {
    this.isAttacking = true; 
    super.attack(characterAttacked);
    
   
    setTimeout(() => {
      this.isAttacking = false;
    }, 1000); 
}
    super.attack(characterAttacked);
  }
  receiveDamage(damage: number): void | Weapon {
    super.receiveDamage(damage);

    if (this.HP <= 0) {
      return this.weapon;
    }
  }
}
